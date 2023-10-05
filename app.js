// ℹ️ Gets access to environment variables/settings
// https://www.npmjs.com/package/dotenv
require('dotenv').config();

// ℹ️ Connects to the database
require('./db');

// Handles http requests (express is node js framework)
// https://www.npmjs.com/package/express
const express = require('express');

const { isAuthenticated } = require('./middleware/jwt.middleware');

const app = express();

// ℹ️ This function is getting exported from the config folder. It runs most pieces of middleware
require('./config')(app);

// 👇 Start handling routes here
const indexRoutes = require('./routes/index.routes');
app.use('/api', indexRoutes);

const authRoutes = require('./routes/auth.routes');
app.use('/api', authRoutes);

const booksRoutes = require('./routes/books.routes');
app.use('/api', booksRoutes);

const readersRoutes = require('./routes/readers.routes');
app.use('/api', isAuthenticated, readersRoutes);

const logsRoutes = require('./routes/log.routes');
app.use('/api', isAuthenticated, logsRoutes);

// ❗ To handle errors. Routes that don't exist or errors that you handle in specific routes
require('./error-handling')(app);

module.exports = app;
