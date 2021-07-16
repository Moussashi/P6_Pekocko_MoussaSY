const express = require('express');
const app = express();
const saucesRoutes = require('./routes/saucesRoutes');
const authRoutes = require('./routes/authRoutes');
const connectDB = require('./db/connect');
require('dotenv').config();

//MIDDLEWARE
app.use(express.json())
app.use(express.static('./public'))
//const port = process.env.PORT || 3000



// ROUTES 
app.use('/api/sauces', saucesRoutes)
app.use('/api/auth', authRoutes)


//START MADE TO AVOID DELAYS BETWEEN SERVER AND DB CONNECTION
const start = async () => {
    try {
        await connectDB(process.env.MONGO_URI)
        app.listen(3000, () => {
    console.log('Listening on port 3000... ');
})      
    } catch (error) {
        console.log(error);
    }
}

start();