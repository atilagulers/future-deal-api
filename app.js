require('dotenv').config();

const express = require('express');
const helmet = require('helmet');
const cors = require('cors');
const connectDB = require('./db/connect');
connectDB();

//auth
require('./middlewares/passportSetup');
const session = require('express-session');

// routes
const claimRouter = require('./routes/claim');
const userRouter = require('./routes/user');
const authRouter = require('./routes/auth');
const passport = require('passport');

const app = express();

app.use(helmet());
app.use(express.urlencoded({extended: true}));
app.use(express.json());
app.use(cors());

app.use(
  session({
    secret: process.env.GOOGLE_CLIENT_SECRET,
    resave: false,
    saveUninitialized: false,
  })
);

app.use(passport.initialize());
app.use(passport.session());

app.use('/api/v1/auth', authRouter);
app.use('/api/v1/user', userRouter);
app.use('/api/v1/claim', claimRouter);

app.get('/', (req, res) => {
  res.send('here');
});

const authCheck = (req, res, next) => {
  console.log('hererer');
  if (!req.user) {
    res.status(401).json({
      authenticated: false,
      message: 'user has not been authenticated',
    });
  } else {
    next();
  }
};
app.use('/api/v1/auth', authCheck);

app.listen(3000, () => {
  console.log(`Server is listening on port 3000...`);
});
