const auctionDB = require('../data/db').Auction;
const auctionBidDB = require('../data/db').AuctionBid;
//const customerService = require('./customerService'); used this first for checking the customerId for winner, always returned {}
const customerDb = require('../data/db').Customer;
const artService = require('./artService');



const auctionService = () => {
    const getAllAuctions = async errCb =>{
        try{
            return await auctionDB.find({});
        }
        catch(err){
            errCb(err);
        }
    }
    const getAuctionById = async (id, errCb) =>{
        try{
            return await auctionDB.findById(id);
        }
        catch(err){
            errCb(err);
        }
    }

    const getAuctionBidByAuctionId = async (id, errorCb) =>{
        try{
            return await auctionBidDB.find({auctionId: id});
        }
        catch(err){
            errorCb(err);
        }
    }

    const getAuctionWinner = async (id, res) =>{
        try{
            const auction = await auctionDB.findById(id);
            if(auction.endDate > new Date()){
                return res.status(409).send("This auction is still up for graps");
            }
            const bids = await getAuctionBidByAuctionId(id, err=>{
                return res.status(400).json(err);
            });
    
            if(bids.length == 0){
                return res.status(200).send("This auction had no bids.");
            }
            var element = 0;
            if(bids.length != 1){
                const prices = bids.map(bid => bid.price);
                element = prices.indexOf(Math.max(...prices));
            }
    
            const userId = bids[element].customerId;
            // had to do this rather then use the customer service because of the strange error i got when i tried to require customerService
            const user = await customerDb.findById(userId);
            /*
            used this first but customerService was always empty object for some reason
            const user = await customerService.getCustomerById(userId, err => {
                return res.status(400).json(err);
            });
            */
            return res.status(200).json(user);
        }
        catch (err){
            console.log(err);
            return res.status(400).json(err);
        }
    }

    const getAuctionAfterArtId = async artId =>{
        return await auctionDB.find({artId: artId});
    }

    const createAuction = async (newAuction, res) =>{
        try{
            if(newAuction.artId != null){
                var artCheck = await artService.getArtByIdAsync(newAuction.artId);
                console.log(artCheck);
                if(artCheck == null){
                    return res.status(404).send("No art with the given id found");
                }
                var auctionCheck = await getAuctionAfterArtId(newAuction.artId);
                if(!artCheck.isAuctionItem){
                    return res.status(412).send("sorry this item is not and auction item");
                }
                else if (auctionCheck.length > 0){
                    return res.status(400).send("sorry an auction for this item already exists");
                }
            }
            console.log(newAuction);
            const auction = await auctionDB.create(newAuction);
            console.log(auction);
            return res.status(200).json(auction);
        } catch(err){
                return res.status(400).json(err);
        }
    }

    const getAuctionByCustmerId = async (id, errCb) =>{
        try{
            return await auctionBidDB.find({customerId: id});
        }
        catch(err){
            errCb(err);
        }
    }

    const getAuctionBidsWithinAuction = async (id, res) =>{
        try{
            const auction = await auctionDB.findById(id);
            if(auction == null){
                return res.status(404).send("This Auction was not found");
            }
            const bids = await auctionBidDB.find({auctionId: id});
            return res.status(200).json(bids);
        }
        catch(err){
            return res.status(400).json(err);
        }
    }

    const placeNewBid = async (id, body, res) =>{
        try{
            const auction = await auctionDB.findById(id);
            if(auction == null){
                return res.status(404).send("This auction was not found");
            }
            if(auction.endDate < Date.now){
                return res.status(403).send("The auction end date has passed");
            }
            const bids = await auctionBidDB.find({auctionId: id});
            const maxBid = Math.max.apply(Math, bids.map( x => x.price));
            if(body.price != null){
                if(body.price > maxBid && body.price > auction.minimumPrice){
                    const newBid = await auctionBidDB.create(body);
                    return res.status(200).json(newBid);
                }
                else{
                    return res.status(412).send("the price needs to be higher than the min price and higher than the highest current bid");
                }
            }
            else{
                return res.status(400).send("Price is missing");
            }
        }
        catch(err){
            return res.status(400).json(err);
        }
    }

    return {
        getAllAuctions,
        getAuctionById,
        getAuctionWinner,
        createAuction,
		getAuctionBidsWithinAuction,
        placeNewBid,
        getAuctionByCustmerId
    };
};

module.exports = auctionService();
