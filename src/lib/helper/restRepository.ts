import axios from "axios";
import { CarFilterType } from "../types/restTypes";

export async function getUserCarsIndex(email: string) {
    const sendData = {
        entity: "userCar",
        query: {
            include: { car: { include: { brand: true, fuelType: true } }, user: true },
            where: { isOccupied: false },
        }
    }

    const { data: { data: userCars } } = await axios.post("/api/getentitydata", sendData)

    return userCars.filter((e) => e.user.email !== email)
        .map(({ user: { password, ...user }, ...e }) => ({
            ...e,
            user: user,
        }));
}

export async function processRentRequestApiCall(salesId: number, isApproved) {
    const sendData = {
        salesId: Number(salesId), isApproved
    }
    const { data: salesResult } = await axios.post("/api/processrentrequest", sendData)
    return salesResult;
}

export async function processCarReturn(salesId: number) {
    const sendData = {
        entity: "sales",
        query: {
            where: { id: Number(salesId) }, data: { isFinished: true }
        }
    }
    const { data: salesResult } = await axios.post("/api/updateentity", sendData)
    return salesResult;
}

export async function getUserSoldCars(userEmail: string, filter: CarFilterType) {
    let filterObj = {} as any;

    switch(filter) {
        case "approved": {
            filterObj.isApproved = true
            filterObj.isFinished = false
        }
        break;
        case "completed": {
            filterObj.isApproved = true;
            filterObj.isFinished = true;
        }
        break;
        case "rejected": {
            filterObj.isApproved = false;
            filterObj.isFinished = false;
        }
        break;
        case "requiredAction": {
            filterObj.isApproved = null;
            filterObj.isFinished = false;
        }
        break;
    }

    const sendData = {
        entity: "sales",
        query: {
            where: { userSeller: { email: userEmail }, ...filterObj},
            include: {
                userBuyer: true,
                userCar: {
                    include: {
                        car: {
                            include: {
                                brand: true,
                                fuelType: true,
                            },
                        },
                    },
                },
            },
        }
    }

    const {data: salesResult} = await axios.post("/api/getentitydata", sendData)
    return salesResult
}

export async function getUserBoughtCars(userEmail: string, filter: CarFilterType) {
    let filterObj = {} as any;

    switch(filter) {
        case "approved": {
            filterObj.isApproved = true
            filterObj.isFinished = false
        }
        break;
        case "completed": {
            filterObj.isApproved = true;
            filterObj.isFinished = true;
        }
        break;
        case "rejected": {
            filterObj.isApproved = false;
            filterObj.isFinished = false;
        }
        break;
        case "requiredAction": {
            filterObj.isApproved = null;
            filterObj.isFinished = false;
        }
        break;
    }

    const sendData = {
        entity: "sales",
        query: {
            where: { userBuyer: { email: userEmail }, ...filterObj},
            include: {
                userSeller: true,
                userCar: {
                    include: {
                        car: {
                            include: {
                                brand: true,
                                fuelType: true,
                            },
                        },
                    },
                },
            },
        }
    }

    const {data: salesResult} = await axios.post("/api/getentitydata", sendData)
    return salesResult
}