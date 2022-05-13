import getModelNames from "../helper/getModelNames";
import { jsonResult } from "../resultType";

export default async function handleGetResponse(client, req, res) {
  const models = getModelNames(client);

  const [entityRegular, id] = req.query.prisma;
  const entity = entityRegular.toLowerCase();
  const isPlural = models.isPlural(entity);
  if (id) {
    if (isPlural) {
      return jsonResult(
        res,
        null,
        "Please use non-plural model name for querying the entries"
      );
    } else {
      return jsonResult(res, () =>
      client[entity].findUnique({ where: { id: Number(id) } })
    );
    }
  } else {
    if (!isPlural) {
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
