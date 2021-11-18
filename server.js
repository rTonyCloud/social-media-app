const express = require('express')
const mongoose = require('mongoose');

const { thoughts, users } = require('./models')
const database = "social-media-app"
const app = express();
const PORT = process.env.PORT || 3002;


app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(require('./routes/api'));

mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost/social-media-app', {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

// Use this to log mongo queries being executed!
mongoose.set('debug', true);

app.listen(PORT, () => console.log(`🌍 Connected on localhost:${PORT}`));
