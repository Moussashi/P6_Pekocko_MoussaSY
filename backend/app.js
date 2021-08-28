const express = require('express');
const app = express();
const helmet = require('helmet')
const saucesRoutes = require('./routes/saucesRoutes');
const authRoutes = require('./routes/authRoutes');
const connectDB = require('./db/connect');
require('dotenv').config();

//MIDDLEWARE
app.use(express.json())
app.use(express.static('./public'));
app.use(helmet())
//security middleware helmet.
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
  next();
});
const port = process.env.PORT || 3000



// ROUTES 
app.use('/api/sauces', saucesRoutes)
app.use('/api/auth', authRoutes)


//FUNCTION MADE TO AVOID DELAYS BETWEEN SERVER AND DB CONNECTION
const start = async () => {
    try {
        await connectDB(process.env.MONGO_URI)
        app.listen(port, () => {
    console.log(' server Listening... ');
})      
    } catch (error) {
        console.log(error);
    }
}

start();