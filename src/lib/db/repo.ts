import { PrismaClient } from "@prisma/client";
import { tryCatchNext } from "../helper/decorators/tryCatch";

export async function getUserByEmail(email) {
    try {
        const client = new PrismaClient();
        return await client.user.findUnique({ where: { email: email } })
    } catch (error) {
        return null;
    }
}

export async function rentCar(data) {
    try {
        const client = new PrismaClient();
        const car = await client.userCar.findUnique({ where: { id: data.userCarId } });

        if (car.isOccupied == true) {
            return false;
        }

        const [sales, userCar] = (await client.$transaction([
            client.sales.create({ data: { ...data } }),
            client.userCar.update({ where: { id: data.userCarId }, data: { isOccupied: true } }),
        ]));

        return true;
    } catch (error) {
        return false;
    }
}

export async function processRentRequest({ salesId, isApproved }) {
    try {
        const client = new PrismaClient();
        const uncompletedSaleRecord = await client.sales.findUnique({ where: { id: Number(salesId) } })

        if (uncompletedSaleRecord.isApproved !== undefined) {
            return null;
        }

        if (isApproved) {
            return await client.sales.update({
                where: { id: Number(salesId) }, data: {
                    isApproved: true,
                    isFinished: false,
                    salesDate: new Date()
                }
            });

        } else {
            return await client.sales.delete({ where: { id: Number(salesId) } })
        }

    } catch (error) {
        return { error: error.message }
    }
}

export async function finishRent({ salesId, distanceMade }) {
    try {
        const client = new PrismaClient();
        const toFinishedSale = await client.sales.findUnique({ where: { id: Number(salesId) } })

        if (toFinishedSale.isApproved !== true) {
            return null;
        }

        const [sales, userCar] = await client.$transaction([
            client.sales.update({ where: { id: Number(salesId) }, data: { isFinished: true, distanceMade: Number(distanceMade) } }),
            client.userCar.update({ where: { id: toFinishedSale.userCarId }, data: { isOccupied: false } })
        ])
        return { sales, userCar }
    } catch (error) {
        return { error: error.message }
    }
}