require('dotenv').config();
const path = require('path');

const express = require('express');
const morgan = require('morgan');
const { findAndUpdate, getAll } = require('./db');

const app = express();
app.use(morgan('dev'));

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(express.static(path.join(__dirname, '../client/dist')));

app.get('/pixelhunter', async (req, res) => {
  const leaderboard = await getAll();
  res.send(leaderboard);
});

app.put('/pixelhunter', async (req, res) => {
  const update = await findAndUpdate(req.body);
  res.send(update);
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server available at http://localhost:${PORT}`);
});
