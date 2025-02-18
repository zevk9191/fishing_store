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

app.get("/api/products", (req, res) => {
  const page = req.query.page ? parseInt(req.query.page) : null;
  const limit = req.query.limit ? parseInt(req.query.limit) : null;
  const category = req.query.category ? parseInt(req.query.category) : null;

  let query = "SELECT * FROM Products";
  let queryParams = [];

  // Додаємо фільтр за категорією, якщо він є
  if (category) {
    query += " WHERE category_id = ?";
    queryParams.push(category);
  }

  // Додаємо пагінацію, якщо вона є
  if (page && limit) {
    const offset = (page - 1) * limit;
    query += " LIMIT ? OFFSET ?";
    queryParams.push(limit, offset);
  }

  db.query(query, queryParams, (err, products) => {
    if (err) {
      console.error("Error executing query:", err.stack);
      return res.status(500).send("Database query error");
    }

    // Якщо є пагінація, підраховуємо загальну кількість товарів у цій категорії
    if (page && limit) {
      let countQuery = "SELECT COUNT(*) as total FROM Products";
      let countParams = [];

      if (category) {
        countQuery += " WHERE category_id = ?";
        countParams.push(category);
      }

      db.query(countQuery, countParams, (err, countResult) => {
        if (err) {
          console.error("Error executing count query:", err.stack);
          return res.status(500).send("Database query error");
        }

        const totalProducts = countResult[0].total;
        const totalPages = Math.ceil(totalProducts / limit);

        res.json({ products, totalPages });
      });
    } else {
      res.json({ products });
    }
  });
});

// Запуск сервера
app.listen(3000, () => {
  console.log("Server is running on http://localhost:3000");
});

// Маршрут для отримання категорій товарів
app.get("/api/categories", (req, res) => {
  db.query("SELECT * FROM Category", (err, results) => {
    if (err) {
      console.error("Error executing query:", err.stack);
      return res.status(500).send("Database query error");
    }
    res.json(results);
  });
});
