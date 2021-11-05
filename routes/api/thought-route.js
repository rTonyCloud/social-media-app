

const router = require('express').Router();
const {
    getThought
//   addComment,
//   removeComment,
//   addReply,
//   removeReply
} = require('../../controllers/thought-controller');

// /api/thought/<thoughtId>
router.route('/:thoughtId').get(getThought);

// /api/comments/<pizzaId>/<commentId>
// router
//   .route('/:pizzaId/:commentId')
//   .put(addReply)
//   .delete(removeComment);

// // /api/comments/<pizzaId>/<commentId>/<replyId>
// router.route('/:pizzaId/:commentId/:replyId').delete(removeReply);

module.exports = router;
