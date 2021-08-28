const Sauce = require('../models/saucesMdl') //Sauce from mongoose model

/**************************************************************
 * ***********************GET ALL SAUCES*************************
 ***************************************************************/

//get all sauce use find({}) to get all the sauces from the database
const getAllSauces = async (req, res) => {
    try {
        const sauces = await Sauce.find();
        res.status(200).json(sauces)
    } catch (error) {
        res.status(500).json(error)
    }
}

/**************************************************************
 * ***********************POST SAUCE*************************
 ***************************************************************/

const createSauce = async (req, res) => {
    const sauceObject = JSON.parse(req.body.sauce);
    try {
       const sauce = new Sauce({
    ...sauceObject,
    imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`,
    likes: 0,
    dislikes: 0,
    usersLiked: [],
    usersDisliked: []
  });
  sauce.save()

  res.status(201).json({ message: 'Sauce saved'})
  
    } catch (error) {
        res.status(500).json({msg: error})
    }
}

/**************************************************************
 * ***********************ADD LIKE SAUCE*************************
 ***************************************************************/
const postLikeSauce = async (req, res, next) => {
  
  const sauce = await Sauce.findOne({ _id: req.params.id })
    .then(sauce => {
       // if like = 1, adding userId to usersLiked and update likes
      if (req.body.like === 1) {
        sauce.usersLiked.push(req.body.userId) //push user
        Sauce.updateOne(
          { _id: req.params.id },
          { likes: sauce.usersLiked.length, usersLiked: sauce.usersLiked }
        )
          .then(res.status(200).json({ message: 'You liked the sauce' }))
          .catch(error => res.status(500).json({ error }))


        // if like = -1, adding userId to usersDisliked and update dislikes  
      } else if (req.body.like === -1) {
        sauce.usersDisliked.push(req.body.userId)
        Sauce.updateOne(
          { _id: req.params.id },
          {
            dislikes: sauce.usersDisliked.length,
            usersDisliked: sauce.usersDisliked
          }
        )
          .then(res.status(200).json({ message: 'You did not like the sauce' }))
          .catch(error => res.status(500).json({ error }))



          // if like = 0, removing userId from usersLike and usersDisliked and update dislikes
      } else if (req.body.like === 0) {
        if (sauce.usersLiked.includes(req.body.userId)) {
          const indexUserId = sauce.usersLiked.indexOf(req.body.userId)

          sauce.usersLiked.splice(indexUserId, 1) //take out user and update
          Sauce.updateOne(
            { _id: req.params.id },
            {
              usersLiked: sauce.usersLiked,
              likes: sauce.usersLiked.length
            }
          )
            .then(
              res.status(200).json({ message: 'You did not give any feedback' })
            )
            .catch(error => res.status(500).json({ error }))
        } else if (sauce.usersDisliked.includes(req.body.userId)) {
          const indexUserId = sauce.usersDisliked.indexOf(req.body.userId)
          sauce.usersDisliked.splice(indexUserId, 1) //take out user of dislikes
          Sauce.updateOne(
            { _id: req.params.id },
            {
              usersDisliked: sauce.usersDisliked,
              dislikes: sauce.usersDisliked.length
            }
          )
            .then(
              res.status(200).json({ message: 'You did not give any feedback' })
            )
            .catch(error => res.status(500).json({ error }))
        }
      }
    })
    .catch(error => res.status(500).json({ error }))
};


/**************************************************************
 * ***********************GET ONE SAUCE*************************
 ***************************************************************/

const getSauce = async (req, res) => {
    try {
        const {id: sauceID}= req.params
        const sauce = await Sauce.findOne({_id: sauceID}); //if it fails sauce will be = null

        if (!sauce) {
            return res.status(404).json({msg: 'No sauce with this id'})
        }

        res.status(200).json(sauce)

    } catch (error) {
        res.status(500).json({msg: error})
    }
}

/**************************************************************
 * ***********************UPDATE SAUCE*************************
 ***************************************************************/

const updateSauce = async (req, res) => {

//ternairy to know if req.file exists. if thats the case we handle it
//if not = req.body
    const sauceObject = req.file ? 
  {
      ...JSON.parse(req.body.sauce), //get the data of the sauce
      imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}` //modify the image
  } :
  { ...req.body };
  Sauce.updateOne({ _id: req.params.id }, { ...sauceObject, _id: req.params.id })
    .then(() => res.status(200).json({ message: 'Sauce updated !'}))
    .catch(error => res.status(400).json({ error }));
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