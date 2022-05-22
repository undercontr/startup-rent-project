import {getSession} from "next-auth/react"

export default function shoudAuthorized(fn) {
    return async (req, res) => {
        const session = await getSession({req})

        if (session) {
            return await fn.apply(this, [req, res])
        } else {
            res.redirect("/auth/signin")
        }
    }
}