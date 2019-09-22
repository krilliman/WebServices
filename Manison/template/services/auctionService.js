const auctionDB = require('../data/db').Auction;
const auctionBidDB = require('../data/db').AuctionBid;

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

	const createAuction = (auction, cb, errorCb) => {
        // Your implementation goes here
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
