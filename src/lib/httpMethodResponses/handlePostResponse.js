import getModelNames from "../helper/getModelNames";
import { jsonResult } from "../resultType";

export default async function handlePostResponse(client, req, res) {
  const models = getModelNames(client);

  const [entityRegular] = req.query.prisma;
  const entity = entityRegular.toLowerCase();

  const { body } = req;

  if (!models.isPlural(entity)) {
    if (body) {
      return jsonResult(res, () => client[entity].create({ data: body }));
    } else {
      return jsonResult(
        res,
        null,
        "JSON body needed for creating an entry for " + models.search(entity).regular + " model"
      );
    }
  } else {
    if (body) {
      return jsonResult(res, () => client[models.searchInPlural(entity).lower].findMany(body))
    } else {
      return jsonResult(
        res,
        null,
        "JSON body needed for fitering the " + models.searchInPlural(entity).regular + " model"
      );
    }
  }
  
}
