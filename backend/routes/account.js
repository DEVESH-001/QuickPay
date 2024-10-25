// // // backend/routes/account.js
// // const express = require("express");
// // const { authMiddleware } = require("../middleware");
// // const { Account } = require("../db");
// // const { default: mongoose } = require("mongoose");

// // const router = express.Router();

// // // Route to get balance
// // router.get("/balance", authMiddleware, async (req, res) => {
// //   try {
// //     const account = await Account.findOne({
// //       userId: req.userId,
// //     });

// //     if (!account) {
// //       return res.status(404).json({ message: "Account not found" });
// //     }

// //     res.json({
// //       balance: account.balance,
// //     });
// //   } catch (err) {
// //     res.status(500).json({ message: "Error fetching balance" });
// //   }
// // });

// // // Route for money transfer

// // router.post("/transfer", authMiddleware, async (req, res) => {
// //   const session = await mongoose.startSession();
// //   session.startTransaction();

// //   const { amount, to } = req.body;

// //   try {
// //     const account = await Account.findOne({ userId: req.userId }).session(
// //       session
// //     );

// //     if (!account || account.balance < amount) {
// //       await session.abortTransaction();
// //       return res.status(400).json({
// //         message: "Insufficient balance",
// //       });
// //     }

// //     const toAccount = await Account.findOne({ userId: to }).session(session);

// //     if (!toAccount) {
// //       await session.abortTransaction();
// //       return res.status(400).json({
// //         message: "Invalid account",
// //       });
// //     }

// //     // Perform the transfer
// //     await Account.updateOne(
// //       { userId: req.userId },
// //       { $inc: { balance: -amount } }
// //     ).session(session);
// //     await Account.updateOne(
// //       { userId: to },
// //       { $inc: { balance: amount } }
// //     ).session(session);

// //     // Commit the transaction
// //     await session.commitTransaction();
// //     res.json({
// //       message: "Transfer successful",
// //     });
// //   } catch (error) {
// //     await session.abortTransaction();
// //     res.status(500).json({ message: "Transfer failed" });
// //   } finally {
// //     session.endSession();
// //   }
// // });

// // module.exports = router;

// // backend/routes/account.js
// const express = require("express");
// const { authMiddleware } = require("../middleware");
// const { Account } = require("../db");
// const mongoose = require("mongoose");

// const router = express.Router();

// // Route to get balance
// router.get("/balance", authMiddleware, async (req, res) => {
//   try {
//     const account = await Account.findOne({ userId: req.userId });

//     if (!account) {
//       return res.status(404).json({ message: "Account not found" });
//     }

//     res.json({ balance: account.balance });
//   } catch (err) {
//     res.status(500).json({ message: "Error fetching balance" });
//   }
// });

// // Route for money transfer
// router.post("/transfer", authMiddleware, async (req, res) => {
//   const session = await mongoose.startSession();
//   session.startTransaction();

//   const { amount, to } = req.body;

//   try {
//     const account = await Account.findOne({ userId: req.userId }).session(session);

//     if (!account || account.balance < amount) {
//       await session.abortTransaction();
//       return res.status(400).json({ message: "Insufficient balance" });
//     }

//     const toAccount = await Account.findOne({ userId: to }).session(session);

//     if (!toAccount) {
//       await session.abortTransaction();
//       return res.status(400).json({ message: "Invalid account" });
//     }

//     // Perform the transfer
//     await Account.updateOne(
//       { userId: req.userId },
//       { $inc: { balance: -amount } }
//     ).session(session);
//     await Account.updateOne(
//       { userId: to },
//       { $inc: { balance: amount } }
//     ).session(session);

//     // Commit the transaction
//     await session.commitTransaction();
//     res.json({ message: "Transfer successful" });
//   } catch (error) {
//     await session.abortTransaction();
//     res.status(500).json({ message: "Transfer failed" });
//   } finally {
//     session.endSession();
//   }
// });

// module.exports = router;


// backend/routes/account.js
const express = require('express');
const { authMiddleware } = require('../middleware');
const { Account } = require('../db');
const { default: mongoose } = require('mongoose');

const router = express.Router();

// Get account balance for a user
router.get("/balance", authMiddleware, async (req, res) => {
    try {
        const account = await Account.findOne({ userId: req.userId });
        if (!account) {
            return res.status(404).json({
                message: "Account not found"
            });
        }

        res.json({
            balance: account.balance
        });
    } catch (error) {
        res.status(500).json({
            message: "Error fetching balance",
            error: error.message,
        });
    }
});

// Transfer money from one account to another
router.post("/transfer", authMiddleware, async (req, res) => {
    const session = await mongoose.startSession();
    session.startTransaction();

    try {
        const { amount, to } = req.body;

        // Find the account of the user initiating the transfer
        const fromAccount = await Account.findOne({ userId: req.userId }).session(session);

        if (!fromAccount || fromAccount.balance < amount) {
            await session.abortTransaction();
            return res.status(400).json({
                message: "Insufficient balance or account not found",
            });
        }

        // Find the recipient's account
        const toAccount = await Account.findOne({ userId: to }).session(session);
        if (!toAccount) {
            await session.abortTransaction();
            return res.status(400).json({
                message: "Recipient account not found",
            });
        }

        // Deduct amount from sender's account
        fromAccount.balance -= amount;
        await fromAccount.save({ session });

        // Add amount to recipient's account
        toAccount.balance += amount;
        await toAccount.save({ session });

        // Commit the transaction
        await session.commitTransaction();
        session.endSession();

        // Return the updated balance of the sender
        res.json({
            message: "Transfer successful",
            balance: fromAccount.balance,
        });
    } catch (error) {
        await session.abortTransaction();
        session.endSession();
        res.status(500).json({
            message: "Error processing the transfer",
            error: error.message,
        });
    }
});

module.exports = router;
