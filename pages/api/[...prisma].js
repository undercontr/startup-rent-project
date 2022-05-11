import { PrismaClient } from "@prisma/client";
import { jsonResult } from "../../src/lib/resultType";

export default async function handler(req, res) {
  const client = global.client || new PrismaClient({ log: ["info"] });
  global.client = client;

  const [entity, id] = req.query.prisma;

  const { method, body } = req;
  switch (method) {
    case "GET":
      {
        if (id) {
          return jsonResult(res, () =>
            client[entity].findUnique({ where: { id: Number(id) } })
          );
        } else {
          return jsonResult(res, () => client[entity].findMany());
        }
      }
      break;
    case "POST": {
      return jsonResult(res, () => client[entity].create({ data: body }));
    }
    break;
    case "PUT": {
        if (id) {
            return jsonResult(res, () =>
              client[entity].update({data: body,  where: { id: Number(id) } })
            );
          } else {
            return jsonResult(res, null, "Lütfen bir ID belirtin");
          }
    }
  }
}
