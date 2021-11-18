const router = require('express').Router();
const thoughtRoutes = require('./thoughts-routes');
const userRoutes = require('./users-routes');

router.use('/api/thoughts', thoughtRoutes);
router.use('/api/users', userRoutes);



module.exports = router;
