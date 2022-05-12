import getModelNames from "../helper/getModelNames";
import { jsonResult } from "../resultType";

// TODO: burası düzeltilecek. PUT request de çoğul ve tekil kontrolü yapılacak

export default async function handlePutResponse(client, req, res) {
  const models = getModelNames(client);

  const [entityRegular, id] = req.query.prisma;
  const entity = entityRegular.toLowerCase();

  const { body } = req;

  if (id) {
    return jsonResult(
      res,
      await client[entity].update({ data: body, where: { id: Number(id) } })
    );
  } else {
    return jsonResult(res, null, "Please specify an unique identifier value");
  }
}
