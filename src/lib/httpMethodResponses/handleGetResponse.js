import getModelNames from "../helper/getModelNames";
import { jsonResult } from "../resultType";

export default async function handleGetResponse(client, req, res) {
  const models = getModelNames(client);

  const [entityRegular, id, ...rest] = req.query.prisma;
  const entity = entityRegular.toLowerCase();

  const { method, body } = req;

  if (id) {
    return jsonResult(
      res,
      await client[entity].findUnique({ where: { id: Number(id) } })
    );
  } else {
    if (!models.isPlural(entity)) {
      return jsonResult(
        res,
        null,
        "Please provide an unique identifier value for this model. eg: " +
          "/" +
          entity +
          "/1"
      );
    } else {
      return jsonResult(
        res,
        await client[models.searchInPlural(entity).lower].findMany()
      );
    }
  }
}
