const express = require("express");
const mysql = require("mysql2");
const cors = require("cors");

const app = express();
app.use(cors());

// Підключення до MySQL
const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "1234",
  database: "fishing_store",
});

db.connect((err) => {
  if (err) {
    console.error("Error connecting to MySQL:", err);
    return;
  }
  console.log("Connected to the MySQL server.");
});

// Маршрут для отримання перших 10 товарів
app.get("/api/products/first10", (req, res) => {
  db.query("SELECT * FROM Products LIMIT 10", (err, results) => {
    if (err) {
      console.error("Error executing query:", err.stack);
      return res.status(500).send("Database query error");
    }
    res.json(results);
  });
});

// Головна сторінка
// app.get("/", (req, res) => {
//   res.send("Сервер працює!");
// });

// Запуск сервера
app.listen(3000, () => {
  console.log("Server is running on http://localhost:3000");
});