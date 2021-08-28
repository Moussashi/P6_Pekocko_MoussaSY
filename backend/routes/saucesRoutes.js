const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const multer = require('../middleware/multer');
const { getAllSauces, createSauce, postLikeSauce, getSauce, updateSauce, deleteSauce } = require('../controllers/saucesCtrl');

router.get('/', auth, getAllSauces);

router.post('/', auth, multer, createSauce);

router.post('/:id/like', auth, postLikeSauce);

router.get('/:id', auth, getSauce);

router.put('/:id', multer, auth, updateSauce);

router.delete('/:id', auth, deleteSauce);


module.exports = router;