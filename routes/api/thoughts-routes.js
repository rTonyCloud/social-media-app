
const router = require('express').Router();
const { get } = require('mongoose');
const {
    getAllThoughts,
    getThoughtsById,
    createThoughts,
    updateThoughtsById,
    addReaction,
    deleteThoughtsById,
    removeReaction

} = require('../../controllers/thoughts-controller');

// /api/thought/<thoughtId>
// router.route('/:thoughtId').get(getThought);

router
    .route('/')
    .get(getAllThoughts)
    
router
    .route('/:Id')
    .get(getThoughtsById)
    .put(updateThoughtsById)
    .delete(deleteThoughtsById);

router
    .route('/:id')
    .post(createThoughts)

router
    .route('/:thoughtId/reactions')
    .post(addReaction)

router
    .route('/:thoughtId/:reactionId')
    .delete(removeReaction);



module.exports = router;
