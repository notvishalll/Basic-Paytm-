const express = require('express');
const { authmid } = require('../middleware');
const { Account } = require('../db');
const { default: mongoose } = require('mongoose');
const router = express.Router()


router.get('/balance', authmid, async(req,res)=>{
    const account = await Account.findOne({
        userid: req.userid
    });
    res.json({
        balance:account.balance
    })
})

router.post('/transfer', authmid, async(req,res)=>{
    const session = await mongoose.startSession();

    session.startTransaction();
    const {amount , to} = req.body;
    const account = await Account.findOne({
        userid:req.userid}).session(session);
        if (!account || account.balance< amount){
            await session.abortTransaction();
            return res.status(400).json({
                message:'Insufficient balance'
            })
        }

        const toaccount = await Account.findOne({
            userid: to
        }).session(session);
        if (!toaccount){
            await session.abortTransaction();
            return res.status(400).json({
                msg:'Invalid amount'
            })
        }
        await Account.updateOne({userid:req.userid},{$inc:{balance: -amount}}).session(session)
        await Account.updateOne({userid:to},{$inc:{balance: amount}}).session(session);

        await session.commitTransaction();
        res.json({
            msg:'Transfer successful'
        })
})

module.exports = router;