const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const candiesService = require('./Services/candiesService')
const offerService = require('./Services/offersService')
const pinatasService = require('./Services/pinatasService')
app.use(bodyParser.json());

/**
 * In this project i used async await as we would do if we were working with a database 
 * but since all the data is in memory we can just access it directly.
 * but i thought it maked more sence to have it async / await like would be done in practice.
 */
app.get('/api/candies', async (req, res) =>{
    try{
        const candies = await candiesService.getAllCandies( err =>{
            return res.status(400).json(err);
        })
        return res.status(200).json(candies);
    }
    catch(err){
        return res.status(400).json(err);
    }
})

app.post('/api/candies', async(req, res) =>{
    try{
        const newCandy = await candiesService.createCandy(req.body, err=>{
            return res.status(400).send(err);
        })
        return res.status(200).json(newCandy);
    }   
    catch(err){
        return res.status(400).send(err);
    }
})

app.get('/api/candies/:id', async(req, res) =>{
    try{
        const candy = await candiesService.getCandyById(req.params.id,err =>{
            return res.status(400).json(err);
        })
        if(candy == undefined){
            return res.status(404).json("Candy with the given id was not found");
        }
        return res.status(200).json(candy);
    }
    catch(err){
        return res.status(400).json(err);
    }
})


app.get('/api/offers', async(req, res) =>{
    try{
        const offers = await offerService.getOffers(err =>{
            return res.status(400).send(err);
        })
        return res.status(200).json(offers);
    }
    catch(err){
        return res.status(400).send(err);
    }
})

app.get('/api/pinatas', async(req, res) =>{
    try{
        const pinatas = await pinatasService.getPinatas(err =>{
            return res.status(400).send(err);
        });
        return res.status(200).json(pinatas);
    }
    catch(err){
        return res.status(400).send(err);
    };
})

app.get('/api/pinatas/:id', async(req, res) =>{
    try{
        const pinata = await pinatasService.getPinataById(req.params.id, err =>{
            return res.status(400).send(err)
        })
        if(pinata == undefined){
            return res.status(404).json("Pinata with the given ID was not found");
        }
        return res.status(200).json(pinata);
    }
    catch (err){
        return res.status(400).send(err);
    }
})
app.post('/api/pinatas', async(req, res) =>{
    try{
        const pinata = await pinatasService.createPinata(req.body, err =>{
            return res.status(400).send(err);
        });
        return res.status(200).json(pinata)
    }
    catch(err){
        return res.status(400).send(err);
    }
})

app.patch('/api/pinatas/:id/hit', async(req, res) =>{
    try{
        return await pinatasService.hitPinataById(req.params.id, res);
    }
    catch(err){
        return res.status(400).send(err);
    }
})

app.listen("3000", function(){
    console.log("Server is listening on port 3000");
})