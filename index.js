const express = require('express');
const router = require('./controllers/routes');
const app = express();
const port = process.env.PORT || 3000;

app.use('/',router);

app.listen(port, function() {
    console.log(`listenin on port ${port}`);
});