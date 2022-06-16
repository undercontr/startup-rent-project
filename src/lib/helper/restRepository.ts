import axios from "axios";

export async function getUserCarsIndex(email) {
    const sendData = {
        include: { car: { include: { brand: true, fuelType: true } }, user: true },
        where: { isOccupied: false },
    }

    const { data: { data: userCars } } = await axios.post("/api/getusercars", sendData)

    return userCars.filter((e) => e.user.email !== email)
        .map(({ user: { password, ...user }, ...e }) => ({
            ...e,
            user: user,
        }));
}
