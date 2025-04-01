const path = require('path');
const express = require('express');
const bodyParser = require('body-parser');
const { STATUS_CODE } = require('./constants/statusCode');
const logger = require('./utils/logger');
const { PORT } = require('./config');

// Import routerów
const productRoutes = require('./routing/product');
const logoutRoutes = require('./routing/logout');
const killRoutes = require('./routing/kill');
const homeRoutes = require('./routing/home');

// Tworzenie instancji Express
const app = express();

// Middleware do parsowania danych formularzy
app.use(bodyParser.urlencoded({ extended: false }));

// Middleware do logowania żądań
app.use((req, res, next) => {
  console.log(logger.getInfoLog(req.method, req.url));
  next();
});

// Middleware do obsługi różnych ścieżek
app.use('/product', productRoutes);
app.use('/logout', logoutRoutes);
app.use('/kill', killRoutes);
app.use('/', homeRoutes);

// Middleware dla strony 404
app.use((req, res) => {
  console.log(logger.getErrorLog(req.url));
  res.status(STATUS_CODE.NOT_FOUND).sendFile(path.join(__dirname, 'views', '404.html'));
});

// Uruchomienie serwera
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});