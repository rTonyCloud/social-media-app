const router = require('express').Router();
const ThoughtRoutes = require('./thoughts-routes.js');
const UserRoutes = require('./users-routes.js');

router.use('/api/thoughts', ThoughtRoutes);
router.use('/api/users', UserRoutes);



module.exports = router;
