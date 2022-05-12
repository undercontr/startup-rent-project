export async function jsonResult(res, fn, message = null) {
    try {
      const data = await fn()
      return res
        .status(200)
        .json({
          success: fn !== null ? true : false,
          rowCount: Array.isArray(data) ? data.length : 0,
          data: data,
          message: message,
        });
    } catch (error) {
      return res
        .status(400)
        .json({
          success: false,
          error: fn !== null ? error.message : null,
          message: message,
        });
    }
  }
  