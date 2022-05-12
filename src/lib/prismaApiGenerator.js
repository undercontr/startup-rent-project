import { PrismaClient } from "@prisma/client";
import getModelNames from "./helper/getModelNames";
import handlePostResponse from "./httpMethodResponses/handlePostResponse";
import handlePutResponse from "./httpMethodResponses/handlePutResponse";
import handleGetResponse from "./httpMethodResponses/handleGetResponse";
import { jsonResult } from "./resultType";

export default async function prismaApiGenerator(req, res) {
  const client = global.client || new PrismaClient({ log: ["info"] });
  global.client = client;

  const models = getModelNames(client)

  const [entityRegular] = req.query.prisma;
  const entity = entityRegular.toLowerCase()

  if (!models.lower.includes(entity) && !models.searchInPlural(entity).plural) {
    return jsonResult(res, null, "Cannot find this model: " + entity);
  }
  console.log(req.method)
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
