export async function jsonResult(res, data, message = null) {
    try {
      return res
        .status(200)
        .json({
          success: data !== null ? true : false,
          rowCount: Array.isArray(data) ? data.length : 0,
          data: data,
          message: message,
        });
    } catch (error) {
      return res
        .status(400)
        .json({
          success: false,
          error: data !== null ? error.message : null,
          message: message,
        });
    }
  }
  