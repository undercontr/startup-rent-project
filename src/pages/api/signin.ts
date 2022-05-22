import { PrismaClient, User } from "@prisma/client";
import { NextApiRequest, NextApiResponse } from "next";
import json from "../../lib/resultType";
import tryCatch from "../../lib/helper/decorators/tryCatch"
import { comparePassword } from "../../lib/helper/crypt";

async function handler(req: NextApiRequest, res: NextApiResponse) {

    const { email, password } = req.body

    if (!(email && password)) {
        return json.error(res, "", "Lütfen eposta ve şifrenizi giriniz!")
    }

    const client = new PrismaClient();

    const user = await client.appUser.findUnique({ where: { email: email }, include: { userCars: true, bought: true, sold: true, user: true } })

    if (user) {
        if (await comparePassword(password, user.password)) {
            delete user.password;
            return json.success(res, () => user, "Başarıyla oturum açıldı")
        } else {
            return json.error(res, "", "Eposta veya şifreniz yanlış")
        }
    } else {
        return json.error(res, "", "Eposta veya şifreniz yanlış")
    }

}

export default tryCatch(handler, "Oturum açarken bir hata oluştu")