require("dotenv").config();

const express = require("express");
const mysql = require("mysql2");
const cors = require("cors");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const multer = require("multer");
const path = require("path");

const app = express();
app.use(cors());
app.use(express.json());
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

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

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/");
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});

const upload = multer({ storage });

const generateToken = (user) => {
  return jwt.sign(
    { id: user.id, position: user.position },
    process.env.JWT_SECRET,
    { expiresIn: "1h" }
  );
};

app.post("/api/signup", async (req, res) => {
  const { first_name, last_name, phone_number, email, password } = req.body;

  if (!first_name || !last_name || !phone_number || !email || !password) {
    return res.status(400).json({ message: "All fields are required" });
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  db.query(
    "INSERT INTO Users (first_name, last_name, phone_number, email, password) VALUES (?, ?, ?, ?, ?)",
    [first_name, last_name, phone_number, email, hashedPassword],
    (err, result) => {
      if (err) {
        if (err.code === "ER_DUP_ENTRY") {
          return res.status(400).json({ message: "Email already exists" });
        }
        console.error("Error inserting user:", err);
        return res.status(500).json({ message: "Database error" });
      }
      res.status(201).json({ message: "User registered successfully" });
    }
  );
});

app.post("/api/login", (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).json({ message: "Email and password are required" });
  }

  db.query(
    "SELECT * FROM Users WHERE email = ?",
    [email],
    async (err, results) => {
      if (err) return res.status(500).json({ message: "Database error" });
      if (results.length === 0)
        return res.status(401).json({ message: "Invalid credentials" });

      const user = results[0];
      const passwordMatch = await bcrypt.compare(password, user.password);
      if (!passwordMatch)
        return res.status(401).json({ message: "Invalid credentials" });

      const token = generateToken(user);
      res.json({
        user: {
          id: user.id,
          first_name: user.first_name,
          last_name: user.last_name,
          position: user.position,
        },
        token,
      });
    }
  );
});

const authenticateToken = (req, res, next) => {
  const token = req.headers["authorization"]?.split(" ")[1];

  console.log("Отриманий токен:", token); // Лог токена

  if (!token) return res.status(401).json({ message: "Access denied" });

  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err) {
      console.log("Помилка при розшифруванні токена:", err);
      return res.status(403).json({ message: "Invalid token" });
    }

    console.log("Розшифрований токен:", user); // Лог розшифрованого токена

    req.user = user;
    next();
  });
};

app.get("/api/auth/user", authenticateToken, (req, res) => {
  db.query(
    "SELECT id, first_name, last_name, email, phone_number, position FROM Users WHERE id = ?",
    [req.user.id],
    (err, results) => {
      if (err) return res.status(500).json({ message: "Database error" });
      if (results.length === 0)
        return res.status(404).json({ message: "User not found" });
      res.json(results[0]);
    }
  );
});

app.post("/api/products", authenticateToken, (req, res) => {
  console.log("Користувач у запиті:", req.user);

  if (req.user.position !== "Admin") {
    return res
      .status(403)
      .json({ message: "У вас немає прав для додавання товарів" });
  }

  const { name, price, category_id, image_url } = req.body;

  db.query(
    "INSERT INTO Products (name, price, category_id, image_url) VALUES (?, ?, ?, ?)",
    [name, price, category_id, image_url],
    (err, result) => {
      if (err) {
        console.error("Error inserting product:", err);
        return res.status(500).json({ message: "Database error" });
      }
      res.status(201).json({ message: "Product added successfully" });
    }
  );
});

app.get("/api/products", (req, res) => {
  const page = req.query.page ? parseInt(req.query.page) : null;
  const limit = req.query.limit ? parseInt(req.query.limit) : null;
  const category = req.query.category ? parseInt(req.query.category) : null;

  let query = "SELECT * FROM Products";
  let queryParams = [];

  if (category) {
    query += " WHERE category_id = ?";
    queryParams.push(category);
  }

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

app.get("/api/search", (req, res) => {
  const search = req.query.search ? `%${req.query.search}%` : "%";

  const query = "SELECT * FROM Products WHERE name LIKE ?";

  db.query(query, [search], (err, results) => {
    if (err) {
      console.error("Error executing search query:", err.stack);
      return res.status(500).send("Database query error");
    }
    res.json(results);
  });
});

app.get("/api/categories", (req, res) => {
  db.query("SELECT * FROM Category", (err, results) => {
    if (err) {
      console.error("Error executing query:", err.stack);
      return res.status(500).send("Database query error");
    }
    res.json(results);
  });
});

app.get("/api/user", authenticateToken, (req, res) => {
  const userId = req.user.id; // ID користувача з токена

  db.query(
    "SELECT first_name, last_name, phone_number FROM Users WHERE id = ?",
    [userId],
    (err, result) => {
      if (err) {
        console.error("Помилка отримання користувача:", err);
        return res.status(500).json({ message: "Помилка сервера" });
      }

      if (result.length === 0) {
        return res.status(404).json({ message: "Користувача не знайдено" });
      }

      res.json(result[0]); // Повертаємо перший (єдиний) запис
    }
  );
});

app.put("/api/user", authenticateToken, (req, res) => {
  const userId = req.user.id; // ID користувача з токена
  let { firstName, lastName, phone } = req.body;

  // Перевіряємо, чи всі поля заповнені
  if (!firstName || !lastName || !phone) {
    return res.status(400).json({ message: "Усі поля повинні бути заповнені" });
  }

  db.query(
    "UPDATE Users SET first_name = ?, last_name = ?, phone_number = ? WHERE id = ?",
    [firstName, lastName, phone, userId],
    (err, result) => {
      if (err) {
        console.error("Помилка оновлення користувача:", err);
        return res.status(500).json({ message: "Помилка сервера" });
      }

      if (result.affectedRows === 0) {
        return res.status(404).json({ message: "Користувача не знайдено" });
      }

      res.json({ message: "Дані оновлено успішно" });
    }
  );
});

app.listen(3000, () => {
  console.log("Server is running on http://localhost:3000");
});
