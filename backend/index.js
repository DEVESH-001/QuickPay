// backend/index.js
const express = require("express");
const cors = require("cors");
const rootRouter = require("./routes/index");
const accountRouter = require("./routes/account"); // Import account routes

const app = express();


app.use(cors(
  {
    origin:["https://quick-pay-nine.vercel.app"],
    methods:["POST","GET"],
    credentials:true
  }
));
app.use(express.json());

// Register your routes
app.use("/api/v1", rootRouter);
app.use("/api/v1/account", accountRouter); // Register account route

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
