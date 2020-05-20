const mongoose = require('mongoose');
const dotenv = require('dotenv');

process.on('uncaughtException', err => {
    console.log(err.name, err.message);
    console.log('UNHANDLED EXCEPTION! Shutting down...');
    process.exit(1);
});
dotenv.config({path: './config.env'});
const app = require('./app');

const DB = process.env.DATABASE.replace('<PASSWORD>', process.env.DATABASE_PASSWORD);

mongoose.connect(DB, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
    useUnifiedTopology: true
}).then(() => console.log('DB CONNECTION SUCCESSFUL'));

// START SERVER
const port = process.env.PORT || 3000;
const server = app.listen(port, () => {
    console.log(`Running ${process.env.NODE_ENV}`);
    console.log(`app running on port ${port}...`);
});

process.on('unhandledRejection', err => {
    console.log(err.name, err.message);
    console.log('UNHANDLED REJECTION! Shutting down...');
    server.close(() => {
        process.exit(1); // 0 means success, 1 means uncalled exception
    });
});
