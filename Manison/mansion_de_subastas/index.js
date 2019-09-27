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
app.get('/api/arts', async function(req, res){
    try{
        const arts = await artService.getAllArts(err =>{
            throw(err);
        });
        return res.status(200).json(arts);
    }
    catch(err){
        return res.status(400).json(err);
    }
});

app.get('/api/arts/:id', async function(req, res){
    try{
        const art = await artService.getArtById(req.params.id, err=>{
            throw(err);
        });
        if(art == null){
            return res.status(404).send("No item with the given id found");
        }
        return res.status(200).json(art);
    }
    catch(err){
        return res.status(400).json(err);
    }
});

app.post('/api/arts', async function(req, res){
    try{
        const art = await artService.createArt(req.body, err=>{
            throw(err);
        });
        return res.status(201).json(art);
    }
    catch(err){
        return res.status(400).json(err);
    }
});

/********************Artist***************************/

app.get('/api/artists', async function(req, res){
    try{
        const artists = await artistService.getAllArtists(err =>{
            throw(err);
        })
        return res.status(200).json(artists);
    }
    catch(err){
        return res.status(400).json(err);
    }
})

app.get('/api/artists/:id', async function(req, res){
    try{
        const artist = await artistService.getArtistById(req.params.id, err=>{
            throw(err);
        });
        if(artist == null){
            return res.status(404).send("No item with the given id found");
        }
        return res.status(200).json(artist);
    }
    catch(err){
        return res.status(400).json(err);
    }
})

app.post('/api/artists', async function(req, res){
    try{
        const artist = await artistService.createArtist(req.body, err => {
            throw(err);
        })
        return res.status(201).json(artist);
    }
    catch(err){
        return res.status(400).json(err);
    }
})

/********************Customer***************************/
app.get('/api/customers', async function(req, res){
    try{
        const customers = await customerService.getAllCustomers(err=>{
            throw(err);
        });
        return res.status(200).json(customers);
    }
    catch(err){
        return res.status(400).json(err);
    }
})
app.get('/api/customers/:id', async function(req, res){
    try{
        const customer = await customerService.getCustomerById(req.params.id, err => {
            throw(err);
        })
        if(customer == null){
            return res.status(404).send("No item with the given id found");
        }
        return res.status(200).json(customer);
    }
    catch(err){
        return res.status(400).json(err);
    }
});

app.post('/api/customers', async function(req, res){
    try{
        return customerService.createCustomer(req.body, res);
    }
    catch(err){
        return res.status(400).json(err);
    }
});

app.get('/api/customers/:id/auction-bids', async function(req, res){
    try{
        return await customerService.getCustomerAuctionBids(req.params.id, res);
    }
    catch(err){
        return res.status(400).json(err);
    }
});

/********************Auctions***************************/
app.get('/api/auctions', async function(req, res){
    try{
        const auctions = await auctionService.getAllAuctions(err => {
            throw(err);
        })
        return res.status(200).json(auctions);
    }
    catch(err){
        return res.status(400).json(err);
    }
})

app.get('/api/auctions/:id', async function(req, res){
    try{
        const auction = await auctionService.getAuctionById(req.params.id, err => {
            throw(err);
        })
        if(auction == null){
            return res.status(404).send("No item with the given id found");
        }
        return res.status(200).json(auction);
    }
    catch(err){
        return res.status(400).json(err);
    }
})

app.get('/api/auctions/:id/winner', async function(req, res){
    try{
        return await auctionService.getAuctionWinner(req.params.id, res);
    }
    catch(err){
        return res.status(400).json(err);
    }
})

app.post('/api/auctions', async function(req, res){
    try{
        return await auctionService.createAuction(req.body, res);
    }
    catch(err){
        return res.status(400).json(err);
    }
}); 

app.get('/api/auctions/:id/bids', async function(req, res){
    try{
        return await auctionService.getAuctionBidsWithinAuction(req.params.id, res)
    }
    catch(err){
        return res.status(400).json(err);
    }
})

app.post('/api/auctions/:id/bids', async function(req, res){
    try{
        return await auctionService.placeNewBid(req.params.id, req.body, res);
    }
    catch(err){
        return res.status(400).json(err);
    }
})


// http://localhost:3000
app.listen(3000, function() {
    console.log('Server is listening on port 3000');
});