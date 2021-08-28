const router = require('express').Router();
require('dotenv').config
const User = require('../models/userMdl'); // User
const {signupValidation, loginValidation} = require('../controllers/userValidation')
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');


/*************************************************************
 * *********************  SIGNUP  *****************************
 ************************************************************/

router.post('/signup', async (req, res) => {

    //VALIDATION
    const { error } = signupValidation(req.body);
    if (error) {
        console.log(error.details[0].message);
        return res.status(400).send(error.details[0].message);
    }

    //CHECK IF USER ALREADY IN THE DATABASE
    const emailExist = await User.findOne({email: req.body.email})
    if (emailExist) return res.status(400).send('Email already exists')

    // HASH THE PASSWORD
    /*We generate a salt to encrypt the password's data with a complexity
    of 10 wich is the default. Then use it to encrypt the password provided*/
    const salt = await bcrypt.genSalt(10);
    const hashPassword = await bcrypt.hash(req.body.password, salt)


    //CREATE NEW USER
    /*creation of new user with email provided and hashed password*/
    const user = new User({
        email: req.body.email,
        password: hashPassword
    })
    
    // response (user._id) have to change

    try {
        const savedUser =  await user.save();
        console.log(savedUser);
        //res.json({user: user._id})
        
    } catch (error) {
        res.status(400).json({message: 'logged in'})
    }
})

/*************************************************************
 * *********************  LOGIN  *****************************
 ************************************************************/


router.post('/login', async (req, res) => {

    //VALIDATION
    /*we use our validation schema to check if the data are valid. if not
    we return the message in link with the error*/

    const { error } = loginValidation(req.body);
    if (error) return res.status(401).send(error.details[0].message);


     //CHECK IF USER ALREADY IN THE DATABASE
     /*we just use the findOne function to check if user exist (email) 
     if not return a message to the user*/

    const user = await User.findOne({email: req.body.email})
    if (!user) return res.status(402).send('email or password is wrong')

    //CHECK PASSWORD
    /*we compare the password provided with the password of the user we founded above
    and then if it doesn't exist we return a message to the user*/
    const validPassword = await bcrypt.compare(req.body.password, user.password);
    if (!validPassword) return res.status(403).send('Wrong email or password');

    // CREATE AND ASSIGN A TOKEN
    const token = jwt.sign({_id: user._id}, process.env.TOKEN_SECRET)
    res.header('auth-token', token)
    res.status(200).send({userId:user._id, token: token})

})


module.exports = router