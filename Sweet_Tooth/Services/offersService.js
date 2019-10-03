const db = require('../Data/db')

const offersService = () =>{
    
    const getOffers = async errCb =>{
        try{
            var offers = await db.offers;
            for(i in offers){
                var allCandies = db.candies;
                allCandies = allCandies.filter( x => offers[i].candies.includes(x.id))
                offers[i].candies = allCandies
            }
            return offers;
        }
        catch(err){
            errCb(err);
        }
    }
    return {getOffers};
}

module.exports = offersService();