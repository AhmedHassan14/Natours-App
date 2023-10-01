const mongoose = require('mongoose');
const dotenv = require('dotenv');

process.on('uncaughtException', (err) => {
  console.log(`UNCAUGHT EXCEPTION!  Shutting down...`);
  console.log(err.name, err.message);
  process.exit(1);
});

dotenv.config({ path: './config.env' }); // put it before app if you want to use it in any middleware like morgan
const app = require('./app.js');

const DB = process.env.DATABASE.replace(
  '<PASSWORD>',
  process.env.DATABASE_PASSWORD
);

mongoose
  .connect(DB, {
    useNewUrlParser: true,
  })
  .then((con) => {
    // console.log(con.connections);
    console.log(`DB connection successful!`);
  });

// const port = 3000;
const port = process.env.PORT || 3000;
const server = app.listen(port, () => {
  console.log(`App running on port : ${port}`);
});

process.on('unhandledRejection', (err) => {
  console.log(`UNHANDLED REJECTION!  Shutting down...`);
  console.log(err.name, err.message);
  server.close(() => {
    process.exit(1);
  });
});

// console.log(app.get("env"));
// console.log(process.env);
// console.log(process.env.NODE_ENV);
//  npm install --save-dev prettier

// Test debugginggggg with jonas
