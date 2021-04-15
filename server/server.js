const express = require("express");
const mongoose = require("mongoose");
const morgan = require("morgan");
const bodyParser = require("body-parser");
const cors = require("cors");
require('dotenv').config();
const authRoutes = require('./routes/auth.js')

const app = express();

mongoose
  .connect(process.env.DATABASE, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: true,
  })
  .then(() => console.log('DB connect'))
  .catch(err => console.log('error connection', err));

app.use(morgan('dev'));
app.use(bodyParser.json({ limit: '2mb' }));
app.use(cors());

//routes middleware
app.use('/api', authRoutes);

const PORT = process.env.PORT || 8000;
app.listen(PORT, () => console.log(`Server run on port: ${PORT}`));
