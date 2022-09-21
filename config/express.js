const cors = require('cors');
const express = require('express');
const morgan = require('morgan');

/* const whitelist = ['http://localhost/', 'https:/proyect-frontend.vercel.app/'];
const corsOptions = {
  origin(origin, callback) {
    if (whitelist.indexOf(origin) !== -1) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
}; */

function configExpress(app) {
  app.use(cors());
  // app.use(cors(corsOptions));

  app.use(express.json());
  app.use(morgan('dev'));
}
module.exports = configExpress;
