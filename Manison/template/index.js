// Here the web service should be setup and routes declared
const artistService = require('./services/artistService');
const artService = require('./services/artService');
const customerService = require('./services/customerService');
const auctionService = require('./services/auctionService');
const express = require('express');
const bodyParser = require('body-parser');
const app = express();

app.use(bodyParser.json());





/********************Art***************************/
app.get('/api/arts', function(req, res){
    artService.getAllArts(function(artists){
        return res.json(artists);
    })
})
app.get('/api/arts/:id', function(req, res){
    const id = req.params.id;
    artService.getArtById(id, function(art){
        return res.json(art);
    });
});
app.post('/api/arts', function(req, res){
    artService.createArt(req.body, function(art){
        return res.status(201).json(art);
    },function(err){
        return res.status(400).json(err);
    });
})

/********************Art***************************/

/********************Artist***************************/
app.get('/api/artists', function(req, res){
    artistService.getAllArtists(function(artists){
        return res.json(artists);
    });
});

app.get('/api/artists/:id', function(req, res){
    const id = req.params.id;
    artistService.getArtistById(id, function(artist){
        return res.json(artist);
    });
});
app.post('/api/artists', function(req, res){
    artistService.createArtist(req.body, function(artist){
        return res.status(201).json(artist);
    }, function(err){
        return res.status(400).json(err);
    });
});
/**********************Artist*************************/

/********************Customer***************************/
app.get('/api/customers', function(req, res){
    customerService.getAllCustomers(function(customers){
        return res.json(customers);
    });
});

app.get('/api/customers/:id', function(req, res){
    const id = req.params.id;
    customerService.getCustomerById(id, function(customer){
        return res.json(customer);
    });
});
app.post('/api/customers', function(req, res){
    customerService.createCustomer(req.body, function(customer){
        return res.status(201).json(customer);
    }, function(err){
        return res.status(400).json(err);
    });
});
/********************Customer***************************/

/********************Auctions***************************/
app.get('/api/auctions', function(req, res){
    auctionService.getAllAuctions(function(auctions){
        return res.json(auctions);
    });
});
app.get('/api/auctions/:id', function(req, res){
    const id = req.params.id;
    auctionService.getAuctionById(id, function(auction){
        return res.json(auction);
    });
});


/********************Auctions***************************/

// http://localhost:3000
app.listen(3000, function() {
    console.log('Server is listening on port 3000');
});