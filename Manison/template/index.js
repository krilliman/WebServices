// Here the web service should be setup and routes declared
const artistService = require('./services/artistService');
const express = require('express');
const bodyParser = require('body-parser');
const app = express();

app.use(bodyParser.json());


app.get('/api/artist', function(req, res){
    artistService.getAllArtists(function(artists){
        return res.json(artists);
    });
});

// http://localhost:3000
app.listen(3000, function() {
    console.log('Server is listening on port 3000');
});