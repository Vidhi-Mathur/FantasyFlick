require('dotenv').config()
const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
const app = express()
const playerRoutes = require('./routes/player-route')
const teamRoutes = require("./routes/team-route")

//Handling cors error
app.use(cors({
    origin: '*'
}))

//Parsing JSON bodies
app.use(express.json({limit: '50mb'}))

//Parsing URL-encoded bodies
app.use(express.urlencoded({extended: true, limit: '50mb'}))

//Forwarding
app.use('/players', playerRoutes)
app.use('/teams', teamRoutes)

//Error Handling
app.use((err, req, res, next) => {
    const code = err.statusCode || 500; 
    const message = err.message || 'Internal Server Error'; 
    return res.status(code).json({ message: message });
});

//Listening to server
mongoose.connect(process.env.MONGODB_URI).then(() => app.listen(3000)).catch((err) => console.log(err))