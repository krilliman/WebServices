const artDb = require('../data/db').Art;
const artistService = require('./artistService');
const artService = () => {

    const getAllArts = async errCb =>{
        try{
            return await artDb.find({});
        }
        catch(err){
            errCb(err);
        }
    }
    const getArtByIdAsync = async id =>{
        try{     
            return await artDb.findById(id);
        }catch(err){
            return err;
        }
    }

    const getArtById = async (id, errCb) =>{
        try{
            return await artDb.findById(id);
        }
        catch(err){
            errCb(err);
        }
    }

    const createArt = async (art, errCb) =>{
        try{
            if(art.artistId != null){
                const artist = await artistService.getArtistById(art.artistId, err =>{
                    errCb(err);
                });
                if(artist == null){
                    errCb("Invalid artistId");
                }
            }
            return await artDb.create(art);
        }
        catch(err){
            errCb(err);
        }
    }
    return {
        getAllArts,
        getArtById,
        createArt,
        getArtByIdAsync
    };
};

module.exports = artService();
