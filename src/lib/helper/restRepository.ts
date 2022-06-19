import axios from "axios";

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

export async function approveRentRequest(salesId: number) {
    const sendData = {
        entity: "sales",
        query: {
            where: {id: Number(salesId)}, data: {isAprroved: true, salesDate: new Date()}
        }
    }

    const {data: sales} = await axios.post("/api/updateentity", sendData)
    return sales
}