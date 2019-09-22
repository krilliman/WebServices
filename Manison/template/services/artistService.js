const artist = require('../data/db').Artist;

const artistService = () => {
    const getAllArtists = (cb, errorCb) => {
        artist.find({}, function(err, artists){
            if(err){throw new Error(errerrorCb);}
            cb(artists);
        })
    };

    const getArtistById = (id, cb, errorCb) => {
        // Your implementation goes here
    };

    const createArtist = (artist, cb, errorCb) => {
        // Your implementation goes here
    };

    return {
        getAllArtists,
        getArtistById,
        createArtist
    };
};

module.exports = artistService();
