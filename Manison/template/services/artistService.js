const artistConnection = require('../data/db').Artist;

const artistService = () => {
    const getAllArtists = (cb, errorCb) => {
        artistConnection.find({}, function(err, artists){
            if(err){throw new Error(errorCb);}
            cb(artists);
        })
    };

    const getArtistById = (id, cb, errorCb) => {
        // Your implementation goes here
        artistConnection.findById(id, function(err, artist){
            if(err){throw new Error(errorCb);}
            cb(artist);
        });
    };

    const createArtist = (artist, successCb, errorCb) => {
        // Your implementation goes here
        artistConnection.create(artist, function(err, result){
            if(err){errorCb(err);}
            else { successCb(result); }
        });
    };

    return {
        getAllArtists,
        getArtistById,
        createArtist
    };
};

module.exports = artistService();
