
const express = require('express');
const { authMiddleware } = require('../middleware');
const { Account } = require('../db');
const { default: mongoose } = require('mongoose');
const zod = require("zod")

const router = express.Router();

router.get("/balance", authMiddleware, async (req, res) => {
    const account = await Account.findOne({
        userId: req.userId
    });

    res.json({
        balance: account.balance
    })
});

router.post("/transfer", authMiddleware, async (req, res) => {
    const session = await mongoose.startSession();
    session.startTransaction();
    const { amount, to } = req.body;
    const account = await Account.findOne({ userId: req.userId }).session(session);

    if (!account || account.balance < amount) {
        await session.abortTransaction();
        return res.status(400).json({
            message: "Insufficient balance"
        });
    }

    const toAccount = await Account.findOne({ userId: to }).session(session);
    if (!toAccount) {
        await session.abortTransaction();
        return res.status(400).json({
            message: "Invalid account"
        });
    }
    
    await Account.updateOne({ userId: req.userId }, { $inc: { balance: -amount } }).session(session);
    await Account.updateOne({ userId: to }, { $inc: { balance: amount } }).session(session);
    await session.commitTransaction();
    res.json({
        message: "Transfer successful"
    });
});

const updateBody = zod.object({
    userId: zod.string(),
    balanceChange : zod.number()
})

router.put("/update", authMiddleware, async (req, res) => {
    const { success, data } = updateBody.safeParse(req.body);
    if (!success) {
        return res.status(411).json({
            message: "Error while updating information"
        });
    }

    const { userId, balanceChange } = data;

    try {
        const result = await Account.updateOne(
            { userId }, 
            { $inc: { balance: balanceChange} } 
        );

        if (result.nModified == 0) {
            return res.status(404).json({ message: 'Account not found' });
        }
        res.json({
            message: "Balance updated successfully",
            newBalance: Account.balance 
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
});

module.exports = router;