import getModelNames from "../helper/getModelNames";
import { jsonResult } from "../resultType";

// TODO: burası düzeltilecek. PUT request de çoğul ve tekil kontrolü yapılacak

export default async function handlePutResponse(client, req, res) {
  const [entityRegular, id] = req.query.prisma;
  const entity = entityRegular.toLowerCase();

  const models = getModelNames(client);
  const isPlural = models.isPlural(entity);

  const { body } = req;

  if (id) {
    if (isPlural) {
      return jsonResult(
        res,
        null,
        "Please use non-plural model name for updating an entry"
      );
    } else {
      if (body) {
        return jsonResult(res, () =>
        client[entity].update({ data: body, where: { id: Number(id) } })
      );
      } else {
        return jsonResult(
          res,
          null,
          "JSON body needed for creating an entry for " + models.search(entity).regular + " model"
        );
      }
      
    }
  } else {
    if (isPlural) {
      return jsonResult(
        res,
        null,
        "Please use non-plural model name for updating an entry"
      );
    } else {
      return jsonResult(res, null, "Please specify an unique identifier value");
    }
  }
}
