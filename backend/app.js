const express = require('express');
const morgan = require('morgan');
const rateLimit = require('express-rate-limit');
const helmet = require('helmet');
const mongoSanitize = require('express-mongo-sanitize');
const xss = require('xss-clean');
const hpp = require('hpp');

const AppError = require('./utils/appError');
const globalErrorHandler = require('./controllers/errorController');
const postRouter = require('./routes/postRoutes');
const userRouter = require('./routes/userRoutes');
const commentRouter = require('./routes/commentRoutes');

const app = express();

// GLOBAL MIDDLEWARES
// Set security HTTP headers
app.use(helmet());

// Development logging
if(process.env.NODE_ENV === 'development'){
    app.use(morgan('dev'));
}

// Limit requests from same IP
const limiter = rateLimit({
    max: 100,
    windowMs: 60 * 60 * 1000,
    message: 'Too many requests from this IP, please try again in an hour!'
});
app.use('/api', limiter);

// Body parser, reading data from the body into req.body
app.use(express.json({ limit: '10kb' })); // Data from the body is added to req

// Data sanitization against NoSQL query injection
app.use(mongoSanitize());

// Data sanitization against XSS attacks
app.use(xss());

// Prevent parameter pollution
app.use(hpp({
    whitelist: ['commentsQuantity', 'category', 'slug']
}));

// ROUTES
app.use('/api/v1/posts', postRouter); // Mounting Routers
app.use('/api/v1/users', userRouter);
app.use('/api/v1/comments', commentRouter);

app.all('*', (req, res, next) => { // Non-specified url error handler
    next(new AppError(`Can't find ${req.originalUrl} on this server!`, 404));
});

app.use(globalErrorHandler);

module.exports = app;