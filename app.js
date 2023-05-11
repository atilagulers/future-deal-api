require('dotenv').config();

const express = require('express');
const helmet = require('helmet');
const connectDB = require('./db/connect');
connectDB();

// routes
const claimRouter = require('./routes/claim');

const app = express();

app.use(helmet());
app.use(express.urlencoded({extended: true}));
app.use(express.json());

app.use('/api/v1/claim', claimRouter);

app.get('/', (req, res) => {
  res.send('here');
});

app.listen(3000, () => {
  console.log(`Server is listening on port 3000...`);
});
