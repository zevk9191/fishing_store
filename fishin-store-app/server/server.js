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
});

// Запуск сервера
app.listen(3000, () => {
  console.log('Server is running on http://localhost:3000');
});



// Приклад SQL запиту для витягування даних з таблиці "products"
connection.query('SELECT * FROM Products', (err, results) => {
  if (err) {
    console.error('Error in query execution:', err);
    return;
  }
  
  // Якщо запит успішний, виводимо отримані результати
  console.log('Products:', results);

  // Наприклад, повертаємо результат у вигляді JSON
  // Це може бути корисно для API
  // res.json(results); // Ти можеш використати цей код в рамках express.js
});


