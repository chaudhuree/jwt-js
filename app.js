require('dotenv').config();
//no need try catch for this package
require('express-async-errors');

const express = require('express');
const app = express();

// routes
//main router
const mainRouter = require('./routes/main');

//custom middleware
//page not found(404)
const notFoundMiddleware = require('./middleware/not-found');
//error handler
const errorHandlerMiddleware = require('./middleware/error-handler');

// middleware
app.use(express.static('./public'));
app.use(express.json());

app.use('/api/v1', mainRouter);

//if go to any route that is not defined
app.use(notFoundMiddleware);
//custom error handler.
//it needs to be set at the end of the middleware stack
app.use(errorHandlerMiddleware);

const port = process.env.PORT || 5000;

//start server and connect to db
//as no database is used, no need to connect to db
const start = async () => {
  try {
    app.listen(port, () =>
      console.log(`Server is listening on port ${port}...`)
    );
  } catch (error) {
    console.log(error);
  }
};

start();
