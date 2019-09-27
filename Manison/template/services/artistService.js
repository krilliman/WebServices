const artistConnection = require('../data/db').Artist;

const artistService = () => {
    const getAllArtists = async errCb =>{
        try{
            return await artistConnection.find({});
        }
        catch(err){
            errCb(err);
        }
    }
    const getArtistById = async (id , errCb) =>{
        try{
            return await artistConnection.findById(id);
        }
        catch(err){
            errCb(err);
        }
    }
    const createArtist = async (artist, errCb) =>{
        try{
            return await artistConnection.create(artist);
        }
        catch(err){
            errCb(err);
        }
    }
    return {
        getAllArtists,
        getArtistById,
        createArtist
    };
};

module.exports = artistService();
