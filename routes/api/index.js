const router = require('express').Router();
const thoughtRoutes = require('./thought-routes');
const userRoutes = require('./user-routes');
const reactionRoutes = require('./reaction-routes')
const friendRoutes = require('./friend-route')

router.use('/thoughts', thoughtRoutes);
router.use('/users', userRoutes);



module.exports = router;
