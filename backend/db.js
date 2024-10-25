

// backend/db.js
const mongoose = require("mongoose");
require("dotenv").config(); // Load environment variables

mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => console.log("Connected to MongoDB"))
  .catch((error) => console.error("MongoDB connection error:", error));

const AccountSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    unique: true,
  },
  balance: {
    type: Number,
    default: 0,
  },
});

const UserSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  firstName: String,
  lastName: String,
});

const Account = mongoose.model("Account", AccountSchema);
const User = mongoose.model("User", UserSchema);

module.exports = { Account, User };
