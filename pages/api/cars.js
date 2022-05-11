import { PrismaClient } from "@prisma/client";

export default async function handler(req, res) {
  const client = global.client || new PrismaClient({log: ["info"]});
  global.client = client;

  const { method } = req;
  switch (method) {
    case "GET":
      {
        try {
          const data = await client.car.findMany();
          return res
            .status(200)
            .json({ success: true, data: data, message: null });
        } catch (error) {
          return res
            .status(400)
            .json({ success: false, data: null, message: error.message });
        } finally {
          client.$disconnect();
        }
      }
      break;
    case "POST":
      {
        const { body } = req;
        try {
          const data = await client.car.findMany(body);
          return res
            .status(200)
            .json({ success: true, data: data, message: null });
        } catch (error) {
          return res
            .status(400)
            .json({ success: false, data: null, message: error.message });
        } finally {
          client.$disconnect();
        }
      }
      break;
  }
}
