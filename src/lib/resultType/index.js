const result = {
  success: async function (res, fn, message = null) {
    const data = await fn();
    return res.status(200).json({
      success: true,
      rowCount: Array.isArray(data) ? data.length : 0,
      data: data,
      message: message,
    });
  },
  error: async function (res, error, message = null) {
    return res.status(400).json({
      success: false,
      error: error,
      message: message,
    });
  },
};

export default result;
