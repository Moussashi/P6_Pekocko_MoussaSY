const express = require('express');
const router = express.Router();

const { getAllSauces, createSauce, postLikeSauce, getSauce, updateSauce, deleteSauce } = require('../controllers/saucesCtrl');

router.get('/', getAllSauces);

router.post('/', createSauce);

router.post('/:id/likes', postLikeSauce);

router.get('/:id', getSauce);

router.put('/:id', updateSauce);

router.delete('/:id', deleteSauce);


module.exports = router;