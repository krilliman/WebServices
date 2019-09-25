const auctionDB = require('../data/db').Auction;
const auctionBidDB = require('../data/db').AuctionBid;
const artService = require('./artService');
const globalTryCatch = async cb => {
    try {
      return await cb();
    } catch(err) {
      return err;
    }
  }

const auctionService = () => {
    const getAllAuctions = (cb, errorCb) => {
        auctionDB.find({}, function(err, auctions){
            if(err){throw new Error(err);}
            cb(auctions);
        });
        // Your implementation goes here
    };

    const getAuctionById = (id, cb, errorCb) => {
        auctionDB.findById(id, function(err, auction){
            if(err){throw new Error(err);}
            cb(auction);
        });
        // Your implementation goes here
    };

    const getAuctionWinner = (auctionId, cb, errorCb) => {
        // Your implementation goes here
    };

    /*
    breyta öllu í acync await 
    ná síðan í artið sem er með áhveðið id og tekka hvort það sé action item
    const createAuctionAsync = async () =>{
        return await globalTryCatch(async () =>{
            const 
        })
    }
    */
	const createAuction = (auction, successCb, errorCb) => {
        // Your implementation goes here
        auctionDB.create(auction, function(err, result){
            if(err){errorCb(err);}
            else{ successCb(result);}
        });
    };

	const getAuctionBidsWithinAuction = (auctionId, cb, errorCb) => {
        // Your implementation goes here
    };

	const placeNewBid = (auctionId, customerId, price, cb, errorCb) => {
		// Your implementation goes here
	}

    return {
        getAllAuctions,
        getAuctionById,
        getAuctionWinner,
		createAuction,
		getAuctionBidsWithinAuction,
		placeNewBid
    };
};

module.exports = auctionService();
