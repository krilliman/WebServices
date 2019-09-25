const Schema = require('mongoose').Schema;
//Auction - artId* (ObjectId),
// minimumPrice (Number, defaults to 1000), 
//endDate* (Date),
// auctionWinner (ObjectId, which should be a valid id of a customer, which holds the highest bid) 

module.exports = new Schema({
    artId: {type: Schema.Types.ObjectId, required: true},
    minimumPrice: {type: Number, default: 1000},
    endDate: {type: Date, required: true },
    auctionWinner: Schema.Types.ObjectId
});
