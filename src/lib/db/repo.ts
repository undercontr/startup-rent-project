import { PrismaClient } from "@prisma/client";
import { tryCatchNext } from "../helper/decorators/tryCatch";

export async function getUserByEmail(email) {
    try {
        const client = new PrismaClient();
        return {success: true, user: await client.user.findUnique({ where: { email: email } })}
    } catch (error) {
        return {success: false, user: null, message: error.message};
    }
}

export async function rentCar(data) {
    try {
        const client = new PrismaClient();
        const car = await client.userCar.findUnique({ where: { id: data.userCarId } });

        if (car.isOccupied == true) {
            return {success: false, data: null, message: "Araç bir kiralama işleminde veya kiralama sürecindedir."};
        }

        const [sales, userCar] = (await client.$transaction([
            client.sales.create({ data: { ...data } }),
            client.userCar.update({ where: { id: data.userCarId }, data: { isOccupied: true } }),
        ]));

        return {success: true, data: {sales, userCar}, message: "Araç kiralama işlemi başarıyla tamamlandı"};;
    } catch (error) {
        return {success: false, data: error.message, message: "Araç kiralama sürecinde bir hata gerçekleşti."}
    }
}

export async function processRentRequest({ salesId, isApproved }) {
    try {
        const client = new PrismaClient();
        const uncompletedSaleRecord = await client.sales.findUnique({ where: { id: Number(salesId) } })

        if (uncompletedSaleRecord.isApproved !== undefined) {
            return {success: false, data: null, message: "Bu satış daha önceden işlenmiş"};
        }

        if (isApproved) {
            return {success: true, data: await client.sales.update({
                where: { id: Number(salesId) }, data: {
                    isApproved: true,
                    isFinished: false,
                    salesDate: new Date()
                }
            }), message: "Kiralama isteği başarıyla onaylandı."}

        } else {
            const [sales, userCar] = await client.$transaction([
                client.sales.delete({ where: { id: Number(salesId) } }),
                client.userCar.update({ where: { id: uncompletedSaleRecord.userCarId}, data: {isOccupied: false}})
            ])
            return {success: true, data: {sales, userCar}, message: "Kiralama isteği reddedildi."}
        }

    } catch (error) {
        return { success: false, data: error.message, message: "Kiralama onay sırasında hata!" }
    }
}

export async function finishRent({ salesId, distanceMade }) {
    try {
        const client = new PrismaClient();
        const toFinishedSale = await client.sales.findUnique({ where: { id: Number(salesId) } })

        if (toFinishedSale.isApproved !== true) {
            return {success: false, dada: null, message: "Onaylanmayan kiralama işlemleri sonlandırılamaz."};
        }

        const [sales, userCar] = await client.$transaction([
            client.sales.update({ where: { id: Number(salesId) }, data: { isFinished: true, distanceMade: Number(distanceMade) } }),
            client.userCar.update({ where: { id: toFinishedSale.userCarId }, data: { isOccupied: false } })
        ])
        return {success: true, data: { sales, userCar }, message: "Kiralama işlemi tamamlandı"}
    } catch (error) {
        return { success: false, data: error.message, message: "Kiralama tamamlama işleminde hata oluştu." }
    }
}