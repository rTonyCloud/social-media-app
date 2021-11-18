const router = require('express').Router();
const ThoughtRoutes = require('./thought-routes.js');
const UserRoutes = require('./user-routes.js');

router.use('/thoughts', ThoughtRoutes);
router.use('/users', UserRoutes);



module.exports = router;
