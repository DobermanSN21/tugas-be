const express = require("express");
const app = express();
const PORT = 3000;
const bodyParser = require("body-parser");
const connection = require("./connection");
const response = require("./response");

app.use(bodyParser.json());

app.get("/", (req, res) => {
  //apa-apa yang dibuka di url nya. fungsi nya misal kita butuh data mahasiswa dan dimunculkan berupa table di browser itu bisa atau segala macem element di html
  response(200, "api tugas ready to go", "Success", res);
});

// Route untuk mendapatkan semua pengguna
app.get("/tugas", (req, res) => {
  const sql = "SELECT * FROM user";
  connection.query(sql, (err, users) => {
    if (err) {
      response(500, {}, "Internal Server Error", res);
    } else {
      response(200, users, "List of users", res);
    }
  });
});

// Route untuk mendapatkan detail pengguna berdasarkan username
app.get("/tugas/:username", (req, res) => {
  const username = req.params.username;
  const sql = `SELECT user.id AS user_id, user.username, user.email, user.password, role_id, role.name
  FROM user 
  JOIN role ON user.role_id = role.id 
  WHERE username = '${username}'`;
  connection.query(sql, (err, user) => {
    if (err) {
      response(500, {}, "Internal Server Error", res);
    } else if (user.length === 0) {
      response(404, {}, "User not found", res);
    } else {
      response(200, user[0], "User details", res);
    }
  });
});

app.post("/tugas", (req, res) => {
  //tidak akan bisa dibuka di browser (untuk menginsert data)
  const { username, email, password, role_id } = req.body;

  const sql = `INSERT INTO user (username, email, password, role_id) VALUES (
    '${username}', '${email}', '${password}', ${role_id})`;

  connection.query(sql, (err, fields) => {
    if (err) response(404, "Invalid", "Error", res);
    if (fields?.affectedRows) {
      const data = {
        isSuccess: fields.affectedRows,
        id: fields.insertId,
      };
      response(200, data, "Data Added Successfully", res);
    }
  });
});

app.put("/tugas", (req, res) => {
  //untuk merubah atau mengupdate data yang sudah ada didatabase
  const { id, username, email, password, role_id } = req.body;

  const sql = `UPDATE user SET username = '${username}', email= '${email}', password = '${password}', 
  role_id = ${role_id} WHERE id = ${id}`;

  connection.query(sql, (err, fields) => {
    if (err) response(404, "Invalid", "Error", res);
    if (fields?.affectedRows) {
      const data = {
        isSuccess: fields.affectedRows,
        message: fields.message,
      };
      response(200, data, "Data Update Successfully", res);
    } else {
      response(404, "User not found", "Error", res);
    }
  });
});

app.delete("/tugas", (req, res) => {
  //untuk menghapus data
  const { id } = req.body;

  const sql = `DELETE FROM user WHERE id = ${id}`;

  connection.query(sql, (err, fields) => {
    if (err) response(404, "Invalid", "Error", res);
    if (fields?.affectedRows) {
      const data = {
        isDeleted: fields.affectedRows,
      };
      response(200, data, "Data Delete Successfully", res);
    } else {
      response(404, "User not found", "Error", res);
    }
  });
});

app.listen(PORT, () => {
  console.log(`Example app listening on port ${PORT}`);
});
