// server.js
const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');

const app = express();
app.use(cors()); // Для дозволу запитів з фронтенду

app.get('/', (req, res) => {
  res.send('Hello, world!');
});

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
  console.log('Database time:', results);
  console.log('Connected to the database as id ' + connection.threadId);
});

// Запуск сервера
app.listen(3306, () => {
  console.log('Server is running on http://localhost:3306');
});
