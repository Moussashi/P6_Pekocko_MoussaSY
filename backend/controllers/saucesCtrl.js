const Sauce = require('../models/saucesMdl')

/**************************************************************
 * ***********************GET ALL SAUCES*************************
 ***************************************************************/
const getAllSauces = async (req, res) => {
    try {
        const sauce = await Sauce.find({});
        res.status(200).json({sauce})
    } catch (error) {
        res.status(500).json(error)
    }
}

/**************************************************************
 * ***********************POST SAUCE*************************
 ***************************************************************/

const createSauce = async (req, res) => {
    try {
        const sauce = await Sauce.create(req.body)
        res.status(201).json(sauce)

    } catch (error) {
        res.status(500).json({msg: error})
    }
}

/**************************************************************
 * ***********************ADD LIKE SAUCE*************************
 ***************************************************************/

const postLikeSauce = (req, res) => {
    res.send('add a like on sauce')
}

/**************************************************************
 * ***********************GET ONE SAUCE*************************
 ***************************************************************/

const getSauce = async (req, res) => {
    try {
        const {id: sauceID}= req.params
        const sauce = await Sauce.findOne({_id: sauceID}); //if fail will be null

          //never forget the return 
        if (!sauce) {
            return res.status(404).json({msg: 'No sauce with this id'})
        }

        res.status(200).json({ sauce })

    } catch (error) {
        res.status(500).json({msg: error})
    }
}

/**************************************************************
 * ***********************UPDATE SAUCE*************************
 ***************************************************************/

const updateSauce = async (req, res) => {
    try {
        const { id:sauceID } = req.params;
        
        const sauce = await Sauce.findOneAndUpdate({_id:sauceID}, req.body, {
            new: true, //to have the new value returned since fOaU by default does not
            runValidators: true
        })

        if (!sauce) {
            return res.status(404).json({msg: 'No sauce with this id'})
        }

        res.status(200).json({sauce})
    } catch (error) {
        res.status(500).json({msg: 'no sauce with that id'})
    }
}

/**************************************************************
 * ***********************DELETE SAUCE*************************
 ***************************************************************/

const deleteSauce = async (req, res) => {
    try {
        const {id:sauceID} = req.params;
        const sauce = await Sauce.findOneAndDelete({_id:sauceID})

        if (!sauce) {
            return res.status(404).json({msg: 'No sauce with this id'})
        }
        res.status(200).json({msg: 'sauce deleted'})
    } catch (error) {
        res.status(500).json({msg: error})
    }
}

module.exports = {
    getAllSauces,
    createSauce,
    postLikeSauce,
    getSauce,
    updateSauce,
    deleteSauce
}