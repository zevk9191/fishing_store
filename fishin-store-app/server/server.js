// server.js
const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');

const app = express();
app.use(cors()); // Для дозволу запитів з фронтенду

// Підключення до MySQL
const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',      // Ваш MySQL користувач
  password: '1234',      // Ваш MySQL пароль
  database: 'pubalka' // Ваша база даних
});

db.connect((err) => {
  if (err) throw err;
  console.log('Connected to the MySQL server.');
});

// Створення маршруту для отримання всіх продуктів
app.get('/api/products', (req, res) => {
  // Запит до бази даних для отримання всіх продуктів
  db.query('SELECT * FROM Products', (err, results) => {  // замінено connection на db
    if (err) {
      console.error('Error executing query:', err.stack);
      return res.status(500).send('Database query error');
    }

    // Якщо запит успішний, повертаємо дані у форматі JSON
    res.json(results);
  });
});

// Запуск сервера
app.listen(3000, () => {
  console.log('Server is running on http://localhost:3000');
});
