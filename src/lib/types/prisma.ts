import { Prisma } from "@prisma/client"

const carWithRelations = Prisma.validator<Prisma.CarArgs>()({
    include: { fuelType: true, brand: true, userCars: true }
})

const userWithRelations = Prisma.validator<Prisma.UserArgs>()({
    include: { userCars: true, bought: true, sold: true }
})

const userCarWithRelations = Prisma.validator<Prisma.UserCarArgs>()({
    include: { car: { include: { brand: true, fuelType: true } }, user: true }
})

const salesWithRelations = Prisma.validator<Prisma.SalesArgs>()({
    include: {userBuyer: true, userSeller: true, userCar: true}
});

export type CarWithRelations = Prisma.CarGetPayload<typeof carWithRelations>
export type UserWithRelations = Prisma.UserGetPayload<typeof userWithRelations>
export type UserCarWithRelations = Prisma.UserCarGetPayload<typeof userCarWithRelations>
export type SalesWithRelations = Prisma.SalesGetPayload<typeof salesWithRelations>