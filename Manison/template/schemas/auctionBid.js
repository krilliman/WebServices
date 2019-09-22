const Schema = require('mongoose').Schema;

//AuctionBid - auctionId* (ObjectId), customerId* (ObjectId), price* (Number) 

module.exports = new Schema({
    auctionId: { type: Schema.Types.ObjectId, required: true},
    customerID: { type: Schema.Types.ObjectId, required: true},
    price: {type: Number, required: true}
});
