import { Prisma } from "@prisma/client"

const carWithRelations = Prisma.validator<Prisma.CarArgs>()({
    include: {fuelType: true, brand: true, userCars: true}
})

const userWithRelations = Prisma.validator<Prisma.UserArgs>()({
    include: {userCars: true, bought: true, sold: true}
})

export type CarWithRelations = Prisma.CarGetPayload<typeof carWithRelations>
export type UserWithRelations = Prisma.UserGetPayload<typeof userWithRelations>