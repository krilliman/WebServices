const artDb = require('../data/db').Art;

const artService = () => {
    const getAllArts = (cb, errorCb) => {
        // Your implementation goes here
        artDb.find({}, function(err, artists){
            if(err){throw new Error(errorCb);}
            cb(artists);
        });
    };

    const getArtById = (id, cb, errorCb) => {
        artDb.findById(id, function(err, art){
            if(err){throw new Error(errorCb);}
            cb(art);
        });
    };

    const createArt = (art, successCb, errorCb) => {
        artDb.create(art, function(err, result){
            if(err){errorCb(err);}
            else{successCb(result);}
        });
    };

    return {
        getAllArts,
        getArtById,
        createArt
    };
};

module.exports = artService();
