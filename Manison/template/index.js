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
    const arts = await artService.getAllArts(err =>{
        return res.status(400).json(err);
    });
    return res.status(200).json(arts);
});

app.get('/api/arts/:id', async function(req, res){
    const art = await artService.getArtById(req.params.id, err=>{
        return res.status(400).json(err);
    });
    if(art == null){
        return res.status(404).send("No item with the given id found");
    }
    return res.status(200).json(art);
});

app.post('/api/arts', async function(req, res){
    const art = await artService.createArt(req.body, err=>{
        return res.status(400).json(err);
    });
    return res.status(201).json(art);
});

/********************Artist***************************/

app.get('/api/artists', async function(req, res){
    const artists = await artistService.getAllArtists(err =>{
        return res.status(400).json(err);
    })
    return res.status(200).json(artists);
})

app.get('/api/artists/:id', async function(req, res){
    const artist = await artistService.getArtistById(req.params.id, err=>{
        return res.status(400).json(err);
    });
    if(artist == null){
        return res.status(404).send("No item with the given id found");
    }
    return res.status(200).json(artist);
})

app.post('/api/artists', async function(req, res){
    const artist = await artistService.createArtist(req.body, err => {
        return res.status(400).json(err);
    })
    return res.status(201).json(artist);
})

/********************Customer***************************/
app.get('/api/customers', async function(req, res){
    const customers = await customerService.getAllCustomers(err=>{
        return res.status(400).json(err);
    });
    return res.status(200).json(customers);
})
app.get('/api/customers/:id', async function(req, res){
    console.log("test inc");
    console.log(customerService);
    const customer = await customerService.getCustomerById(req.params.id, err => {
        return res.status(400).json(err);
    })
    if(customer == null){
        return res.status(404).send("No item with the given id found");
    }
    return res.status(200).json(customer);
});

app.post('/api/customers', async function(req, res){
    return customerService.createCustomer(req.body, res);
});

app.get('/api/customers/:id/auction-bids', async function(req, res){
    return await customerService.getCustomerAuctionBids(req.params.id, res);
});

/********************Auctions***************************/
app.get('/api/auctions', async function(req, res){
    const auctions = await auctionService.getAllAuctions(err => {
        return res.status(400).json(err);
    })
    return res.status(200).json(auctions);
})

app.get('/api/auctions/:id', async function(req, res){
    const auction = await auctionService.getAuctionById(req.params.id, err => {
        return res.status(400).json(err);
    })
    if(auction == null){
        return res.status(404).send("No item with the given id found");
    }
    return res.status(200).json(auction);
})

app.get('/api/auctions/:id/winner', async function(req, res){
    try{
        return await auctionService.getAuctionWinner(req.params.id, res);
    }
    catch(err){
        console.log(err);
        return res.status(400).json(err);
    }
})

app.post('/api/auctions', async function(req, res){
    return await auctionService.createAuction(req.body, res);
}); 

app.get('/api/auctions/:id/bids', async function(req, res){
    return await auctionService.getAuctionBidsWithinAuction(req.params.id, res)
})

app.post('/api/auctions/:id/bids', async function(req, res){
    return await auctionService.placeNewBid(req.params.id, req.body, res);
})


// http://localhost:3000
app.listen(3000, function() {
    console.log('Server is listening on port 3000');
});