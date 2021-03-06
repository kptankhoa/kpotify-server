const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
require('dotenv').config();

const app = express();
app.use(morgan('dev'));
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.get('/', (req, res) => {
  res.json({
    message: 'hello there! kpotify api by KP',
  });
});
const authRouter = require('./routes/auth.route');
app.use('/auth', authRouter);

const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}!`);
});

module.exports = app;
