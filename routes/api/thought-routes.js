
const router = require('express').Router();
const {
    getAllThought,
    addThought,
    updateThought,
    getThoughtById,
    addReaction,
    deleteThought,
    deleteReaction

} = require('../../controllers/thought-controller');

router
    .route('/')
    .get(getAllThought)
    .post(addThought)
    
router
    .route('/:thoughtId')
    .get(getThoughtById)
    .put(updateThought)
    .delete(deleteThought);

router
    .route('/:thoughtId/reactions')
    .post(addReaction)
    .delete(deleteReaction);



module.exports = router;
