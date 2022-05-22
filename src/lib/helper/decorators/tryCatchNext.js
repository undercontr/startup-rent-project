import json from "../../resultType"

export default function tryCatch(fn, message) {
    return async function (req, res) {
        try {
            return await fn.apply(this, [req, res])
        } catch (error) {
            return json.error(res, error.message, message)
        }
    }
    
}