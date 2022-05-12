import getModelNames from "../helper/getModelNames";
import { jsonResult } from "../resultType";

export default async function handleGetResponse(client, req, res) {
  const models = getModelNames(client);

  const [entityRegular, id] = req.query.prisma;
  const entity = entityRegular.toLowerCase();

  if (id) {
    return jsonResult(res, () =>
      client[entity].findUnique({ where: { id: Number(id) } })
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
      return jsonResult(res, () =>
        client[models.searchInPlural(entity).lower].findMany()
      );
    }
  }
}
