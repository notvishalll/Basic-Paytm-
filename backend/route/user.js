const express = require("express");
const router = express.Router();
const authmid = require('./../middleware');
require('dotenv').config();
const zod = require('zod');
const { User, Account } = require('../db');
const jwt = require('jsonwebtoken');

const { default: mongoose } = require('mongoose');

const signupSchema = zod.object({
    username: zod.string().email(),
    password: zod.string(),
    firstname: zod.string(),
    lastname: zod.string(),
});

router.post('/signup', async (req, res) => {
    const body = req.body;
    const success = signupSchema.safeParse(req.body);
    if (!success.success) {
        return res.status(400).json({ error: "Invalid inputs" });
    }

    const userexist = await User.findOne({ username: body.username });
    if (userexist) {
        return res.status(409).json({ error: "User already exists" });
    }

    const newuser = await User.create(body);
    const token = jwt.sign({ userid: newuser._id }, process.env.JWT_KEY);
    await Account.create({ userid: newuser._id, balance: Math.random() * 10000 });

    res.json({
        success: 'Welcome ' + body.firstname,
        token: token,
    });
});

const signinSchema = zod.object({
    username: zod.string().email(),
    password: zod.string(),
});

router.post('/signin', async (req, res) => {
    const body = req.body;
    const { success } = signinSchema.safeParse(body);
    if (!success) {
        return res.status(400).json({ error: 'Incorrect inputs' });
    }

    const user = await User.findOne({
        username: body.username,
        password: body.password,
    });

    if (user) {
        const token = jwt.sign({ userid: user._id }, process.env.JWT_KEY);
        return res.json({ token: token });
    }

    res.status(401).json({ message: 'Invalid username or password' });
});

const updateUser = zod.object({
    password: zod.string().optional(),
    firstname: zod.string().optional(),
    lastname: zod.string().optional(),
});

router.put('/update', async (req,res)=>{
    const obj = updateUser.safeParse(req.body);
    if (!obj.success) {
        return res.status(400).json({
            Error:"Invalid input"
        })
    }
    try {await User.updateOne({_id:req.userid}, {$set: req.body})
            return res.json({
                msg: "User updated"
            })
        } catch (error) {
            console.error(error)
            
        }
        
})

router.get('/search', async (req, res) => {
    const search = req.query.search || '';
    const users = await User.find({
        $or: [
            { firstname: { $regex: search, $options: 'i' } },
            { lastname: { $regex: search, $options: 'i' } },
        ],
    });

    res.json({
        users: users.map(user => ({
            id: user.id,
            firstname: user.firstname,
            lastname: user.lastname,
            username: user.username,
        })),
    });
});

module.exports = router;
