const express = require('express');
const mongoose = require('mongoose');
const morgan = require('morgan');
const cors = require('cors');
require('dotenv').config();
const authRoutes = require('./routes/auth.js');
const {readdirSync} = require('fs');

const app = express();

mongoose
  .connect(process.env.DATABASE, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: true,
  })
  .then(() => console.log('DB connect'))
  .catch((err) => console.log('error connection', err));

//middleware
app.use(morgan('dev'));
app.use(express.json({ limit: '2mb' }));
app.use(cors());

//routes middleware
app.use('/api', authRoutes);
readdirSync('./routes').map((item) =>
  app.use('/api', require('./routes/' + item))
);

const PORT = process.env.PORT || 8000;
app.listen(PORT, () => console.log(`Server run on port: ${PORT}`));
