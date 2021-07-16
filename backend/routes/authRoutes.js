const router = require('express').Router();
const User = require('../models/userMdl'); // User
const {signupValidation, loginValidation} = require('../models/userValidation')


router.post('/signup', async (req, res) => {

    //validation
    const { error } = signupValidation(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    //check if user already in database
    const emailExist = await User.findOne({email: req.body.email})

    if (emailExist) return res.status(400).send('Email already exists')



    //create new user
    const user = new User({
        email: req.body.email,
        password: req.body.password
    })
    

    try {
        const savedUser =  await user.save();
        res.json({savedUser})
    } catch (error) {
        res.status(400).json({msg: error})
    }
})



router.post('/login', (req, res) => {
    res.send('login brother')
})


module.exports = router