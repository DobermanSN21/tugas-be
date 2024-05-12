const response = (statusCode, data, message, res) => {
  if (data.role_id) {
    data.role = {
      id: data.role_id,
      name: data.name,
    };
    delete data.role_id;
    delete data.name;
  }
  res.status(statusCode).json({
    response: data, // Gunakan 'response' sebagai properti utama
    message: message,
  });
};

module.exports = response;
