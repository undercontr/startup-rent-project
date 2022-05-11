import { PrismaClient } from "@prisma/client";
import getModelNames from "../../src/lib/helper/getModelNames";
import handlePostResponse from "../../src/lib/httpMethodResponses/handlePostResponse";
import handlePutResponse from "../../src/lib/httpMethodResponses/handlePutResponse";
import handleGetResponse from "../../src/lib/httpMethodResponses/handlePutResponse";
import { jsonResult } from "../../src/lib/resultType";

export default async function handler(req, res) {
  const client = global.client || new PrismaClient({ log: ["info"] });
  global.client = client;

  const models = getModelNames(client)

  const [entityRegular] = req.query.prisma;
  const entity = entityRegular.toLowerCase()

  if (!models.lower.includes(entity) && !models.searchInPlural(entity).plural) {
    return jsonResult(res, null, "Cannot find this model: " + entity);
  }

  switch (req.method) {
    case "GET": {
      return handleGetResponse(client, req, res)
    }
    case "POST": {
      return handlePostResponse(client, req, res)
    }
    case "PUT": {
      return handlePutResponse(client, req, res)
    }
  }
}
