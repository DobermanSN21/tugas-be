const mysql = require("mysql");

const connection = mysql.createConnection({
  host: "busgii0smgc3x5fdptrz-mysql.services.clever-cloud.com",
  user: "utuxniwmjioc9hpa",
  password: "S3gQIHsKCTy0xQVZHVND",
  database: "busgii0smgc3x5fdptrz",
});

// Tes koneksi
connection.connect((err) => {
  if (err) {
    console.error("Error connecting to database: ", err);
    return;
  }
  console.log("Connected to database!");
});

module.exports = connection;
