const cors = require('cors');
const jsonServer = require('json-server');
const express = require('express');

// Ініціалізація json-server
const app = express();
const router = jsonServer.router('db.json'); // Використовуємо db.json як джерело даних
const middlewares = jsonServer.defaults();  // Стандартні middlewares json-server

// Налаштування CORS
const corsOptions = {
    origin: ['http://localhost:3000', 'https://ilariondub.github.io'],  // Дозволяємо доступ з цих доменів
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    credentials: true, // Дозволяємо використання cookies та аутентифікації
};

// Налаштування серверу
app.use(cors(corsOptions)); // Додаємо підтримку CORS
app.use(middlewares);       // Використовуємо стандартні middlewares json-server
app.use(express.json());    // Додаємо middleware для роботи з JSON

// Налаштування маршруту
app.use('/api', router);    // Додаємо маршрутизатор на /api (замість /)

// Безпека
app.use((req, res, next) => {
    res.setHeader("Content-Security-Policy", "default-src 'self';");
    next();
});

// Запуск сервера
app.listen(3000, () => {
    console.log('Server is running on http://localhost:3000');
});
