import { PrismaClient } from "@prisma/client";
import { NextApiRequest, NextApiResponse } from "next";
import json from "../../../lib/resultType";
import checkIdentity from "../../../lib/helper/identityCheck"
import passwordRequirement from "../../../lib/helper/passwordRequirement"

import { cryptPassword } from "../../../lib/helper/crypt"
import tryCatch from "../../../lib/helper/decorators/tryCatchNext";

async function handler(req: NextApiRequest, res: NextApiResponse) {
    const client = new PrismaClient();
    const user = req.body

    if (!(user.email && user.password)) {
        return json.error(res, null, "Lütfen kullanıcı adı ve şifresi belirleyiniz.")
    }

    const isUserExists = await client.user.count({ where: { email: user.email } })

    if (isUserExists && isUserExists > 0) {
        return json.error(res, null, "Sistemde kayıtlı böyle bir kullanıcı mevcuttur.")
    }

    const isPasswordEligble = passwordRequirement(user.password);

    if (!isPasswordEligble.success) {
        return json.error(res, null, isPasswordEligble.message)
    }

    user.password = await cryptPassword(user.password)
    const userInsertResult = await client.user.create({ data: { name: user.fullName, email: user.email, password: user.password }, select: { password: false, name: true } })
    return json.success(res, () => userInsertResult, "Başarılı bir şekilde kayıt oldunuz.")
}

export default tryCatch(handler, "Kayıt olurken hata oluştu")