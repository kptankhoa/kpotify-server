const express = require('express');
const morgan = require("morgan");
const cors = require('cors');
require('dotenv').config();

const app = express();
app.use(morgan('dev'));
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended: true}));

const authRouter = require('./routes/auth.route');
app.use('/auth', authRouter);

app.listen(3001);
