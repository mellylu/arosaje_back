require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const apiRouter = require('./src/routes');
const swaggerJSDoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');
const cors = require('cors');
// const {Client} = require('pg')
// const client = new Client({
//     user: process.env.USER_BD,
//     host: process.env.HOST_BD,
//     database: process.env.DATABASE,
//     password: process.env.PASSWORD_BD,
//     port: process.env.PORT_BD,
// })



var port = process.env.PORT;
const app = express();

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Your API Title',
      version: '1.0.0',
      description: 'Your API Description',
    },
  },
  apis: ['./src/routes/*.js'],
};

const swaggerSpec = swaggerJSDoc(options);

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

app.use(bodyParser.json());
app.use(cors())


app.use('/api/v1/', apiRouter);

app.listen(port, (err) => {
    if (err) {
      console.log(`Errors: ${err}`);
      process.exit(-1);
    }
    console.log(`app is runnning on port ${port}`);
    });

// client.connect()
//     .then(() => {
//         console.log("successfully connected to the database")
//     }).catch(err => {
//         console.log("couldnt connect to the database", err);
//         process.exit();
//     })
// client.connect().then(() => {
//     console.log("successfully connected to the database")
// }).catch(err => {
//     console.log("couldnt connect to the database", err);
//     process.exit();
// })


