
const cors = require('cors');
const jsonServer = require('json-server');
const express = require('express');

const router = jsonServer.router('db.json'); // Використання db.json як джерела даних
const app = express();
const middlewares = jsonServer.defaults(); // Замість `create`

const corsOptions = {
    origin: ['https://ilariondub.github.io'],
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    credentials: true,
};

app.use('/api', router); // Додаємо маршрутизатор на /api

// Налаштування middleware
app.use(cors(corsOptions)); // Додати підтримку CORS
app.use(middlewares);
app.use((req, res, next) => {
    res.setHeader("Content-Security-Policy", "default-src 'self';");
    next();
});


// Запуск сервера
app.listen(3000, () => {
    console.log('Server is running on http://localhost:3000');
});