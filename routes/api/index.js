const router = require('express').Router();
const thoughtRoutes = require('./thought-routes');
const userRoutes = require('./user-routes');
const thoughtRoutes = require('./api/thought-routes')
const reactionRoutes = require('./api/reaction-routes')
const friendRoutes = require('./api/friend-route')

router.use('/thoughts', thoughtRoutes);
router.use('/users', userRoutes);



module.exports = router;
