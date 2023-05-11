const mongoose = require('mongoose');
mongoose.set('strictQuery', true);

const connectDB = () => {
  console.log('Connected to DB!');
  return mongoose.connect(process.env.MONGO_URI);
};

module.exports = connectDB;

//const MONGO_URI = `mongodb+srv://${process.env.EFFECTS_DB_USER}:${process.env.EFFECTS_DB_PASSWORD}@${process.env.EFFECTS_DB_HOST}?retryWrites=true&w=majority`;
