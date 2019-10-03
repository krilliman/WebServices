const db = require("../Data/db")

const candiesService = () =>{
    const getAllCandies = async errCb=>{
        try{
            return await db.candies;
        }
        catch(err){
            errCb(err);
        }
    };

    const createCandy = async (model, errCb) =>{
        try{
            const newModel = {id: db.candies.length + 1, name: model.name, description: model.description}
            await db.candies.push(newModel)
            return newModel;
        }
        catch(err){
            errCb(err)
        }
    };

    const getCandyById = async (cId, errCb) =>{
        try{
            return await db.candies.filter(element => element.id == cId)[0];
        }
        catch(err){
            errCb(err);
        }
    };

    return {
        getAllCandies,
        createCandy,
        getCandyById
    };
}

module.exports = candiesService();