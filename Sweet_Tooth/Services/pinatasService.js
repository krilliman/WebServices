const db = require('../Data/db')
const fs = require('fs');
const request = require('request');
const imageFolder = './Images';
const surpriseFile = fs.createWriteStream('surprise.txt');
if (!fs.existsSync(imageFolder)){
    fs.mkdirSync(imageFolder);
}
    
const pinatasService = () =>{
    const getPinatas = async (errCb) =>{
        try{
            return await db.pinatas.filter(x => delete x.surprise);
        }
        catch(err){
            errCb(err);
        }

    };

    const getPinataById = async (pId, errCb) =>{
        try{
            return await db.pinatas.filter(x => x.id == pId).filter( x => delete x.surprise)[0];
        }
        catch(err){
            errCb(err);
        }

    };

    const createPinata = async (model, errCb) => {
        try{
            const newModel = {id: db.pinatas.length + 1, name: model.name, surprise: model.surprise, maximumHits: model.maximumHits}
            await db.pinatas.push(newModel);
            return newModel
        }
        catch(err){
            errCb(err);
        }

    };

    const hitPinataById = async (pId, res) => {
        try{
            const item = await db.pinatas.filter(x => x.id == pId)[0];
            if(item.maximumHits == 0){
                return res.status(423).json("This item is locked")
            }
            item.maximumHits -= 1;
            if(item.maximumHits == 0){
                if(!checkURL(item.surprise)){
                    surpriseFile.write(item.surprise + "\n");
                }
                else{
                    var split = item.surprise.split('.')
                    request.get(item.surprise).pipe(fs.createWriteStream(imageFolder + '/' + item.name + '.' + split[split.length -1]))
                }
                return res.status(200).json(item.surprise);
            }
            return res.status(204).json();

        }
        catch(err){
            return res.status(400).send(err)
        }

    };

    function checkURL(url) {
        return(url.match(/\.(jpeg|jpg|gif|png)$/) != null);
    }

    return{
        getPinatas,
        getPinataById,
        createPinata,
        hitPinataById
    };
}

module.exports = pinatasService();