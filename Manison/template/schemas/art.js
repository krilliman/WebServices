const Schema = require('mongoose').Schema;

// Art - title* (String), 
//artistId* (ObjectId), 
//date* (Date, defaults to now),
// images (A list of String), 
//description (String), 
//isAuctionItem (Boolean, defaults to false)

module.exports = new Schema({
    title: {type: String, required: true},
    artistId: {type: Schema.Types.ObjectId, required: true},
    date: {type: Date, required: true},
    images: { type: [String]},
    description: { type: String},
    isAuctionItem: { type: Boolean, default: true}
});
