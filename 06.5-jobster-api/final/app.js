require('dotenv').config();
require('express-async-errors');

const express = require('express');
const app = express();

const path = require('path');
const helmet = require('helmet');
const xss = require('xss-clean');

const connectDB = require('./db/connect');
const authenticateUser = require('./middleware/authentication');
const authRouter = require('./routes/auth');
const jobsRouter = require('./routes/jobs');
const notFoundMiddleware = require('./middleware/not-found');
const errorHandlerMiddleware = require('./middleware/error-handler');


const logger = (req, res, next) => {
  const currentTime = new Date().toISOString();
  console.log(`[${currentTime}] ${req.method} ${req.url}`);
  next();
};


app.set('trust proxy', 1);
app.use(express.static(path.resolve(__dirname, './client/build')));
app.use(express.json());
app.use(helmet());
app.use(xss());

app.use('/api/v1/auth', logger, authRouter);
app.use('/api/v1/jobs', logger, authenticateUser, jobsRouter);


app.get('*', logger, (req, res) => {
  res.sendFile(path.resolve(__dirname, './client/build', 'index.html'));
});


app.use(notFoundMiddleware);
app.use(errorHandlerMiddleware);

const port = process.env.PORT || 5000;

const start = async () => {
  try {
    await connectDB(process.env.MONGO_URI);
    app.listen(port, () =>
      console.log(`Server is listening on port ${port}...`)
    );
  } catch (error) {
    console.error(error);
    process.exit(1); 
  }
};

start();

