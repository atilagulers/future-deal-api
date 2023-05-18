require('dotenv').config();

const express = require('express');
const helmet = require('helmet');
const cors = require('cors');
var cookieSession = require('cookie-session');
const cookieParser = require('cookie-parser'); // parse cookie header
const connectDB = require('./db/connect');

//auth
require('./middlewares/passportSetup');
const session = require('express-session');

// routes
const claimRouter = require('./routes/claim');
const userRouter = require('./routes/user');
const authRouter = require('./routes/auth');
const passport = require('passport');

const app = express();

connectDB();

app.use(helmet());
app.use(express.urlencoded({extended: true}));
app.use(express.json());
app.use(
  cors({
    origin: 'http://localhost:3001', // allow to server to accept request from different origin
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true, // allow session cookie from browser to pass through
  })
);

app.use(
  cookieSession({
    name: 'session',
    keys: [process.env.COOKIE_KEY],
    maxAge: 24 * 60 * 60 * 100,
  })
);

app.use(
  session({
    secret: 'session',
    resave: false,
    saveUninitialized: false,
    cookie: {
      maxAge: 60 * 60 * 1000,
    },
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
