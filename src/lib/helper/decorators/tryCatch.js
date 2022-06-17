import json from "../../resultType"

export function tryCatchNext(fn, errorMessage) {
    return async function (req, res) {
        try {
            return await fn.apply(this, [req, res])
        } catch (error) {
            return json.error(res, error.message, errorMessage)
        }
    }
    
}