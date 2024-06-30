const express = require("express");
const router = express.Router();

const rootRouter = require('./route/index')
require('dotenv').config()
const cors = require('cors');

const app = express();

app.use(cors())
app.use(express.json())
app.use('/', rootRouter)

app.listen(3000, () => {
    console.log("Server running on port 3000");
});
