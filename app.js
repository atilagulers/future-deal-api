require('dotenv').config();

const express = require('express');
const helmet = require('helmet');
const cors = require('cors');
const connectDB = require('./db/connect');
connectDB();

//auth
require('./auth/auth');
const session = require('express-session');

// routes
const claimRouter = require('./routes/claim');
const userRouter = require('./routes/user');
const passport = require('passport');

const app = express();

app.use(helmet());
app.use(express.urlencoded({extended: true}));
app.use(express.json());
app.use(cors());

app.use('/api/v1/user', userRouter);
app.use('/api/v1/claim', claimRouter);

app.get('/', (req, res) => {
  res.send('here');
});

app.use(
  session({
    secret: process.env.GOOGLE_CLIENT_SECRET,
    resave: false,
    saveUninitialized: false,
  })
);

app.use(passport.initialize());
app.use(passport.session());

app.get(
  '/api/v1/auth/google',
  passport.authenticate('google', {scope: 'profile'})
);

app.get(
  '/api/v1/auth/google/callback',
  passport.authenticate('google', {
    successRedirect: process.env.CLIENT_URL,
    failureRedirect: '/login',
  }),
  function (req, res) {
    // Successful authentication, redirect home.
    res.end('Logged in');
  }
);

app.listen(3000, () => {
  console.log(`Server is listening on port 3000...`);
});
