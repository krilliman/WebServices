const customerDb = require('../data/db').Customer;
const auctionService = require('./auctionService');
const Schema = require('mongoose');

const customerService = () => {

    const getAllCustomers = async errCb =>{
        try{
            return await customerDb.find({});
        }
        catch(err){
            return errCb(err)
        }
    }
    const getCustomerById = async (id, errorCb) =>{
        console.log("before try");
        try{
            console.log("before const customer=");
            const customer =  await customerDb.findById(id);
            console.log(customer);
            return customer;
        }
        catch(err){
            console.log("error occured");
            errorCb(err);
        }
    }
    
    const getCustomerAuctionBids = async (customerId, res) =>{
        const idObject = Schema.Types.ObjectId(customerId);
        const bids = await auctionService.getAuctionByCustmerId(idObject, err =>{
            return res.status(400).json(err);
        });

        if(bids.length == 0){
            return res.status(404).send("No bits found for the given id");
        }
        return res.status(200).json(bids);
    }

    const createCustomer = async (customer, res) =>{
        try{
            const newCustomer = await customerDb.create(customer);
            return res.status(201).json(newCustomer);
        }
        catch(err){
            return res.status(400).json(err);
        }

    }
    return {
        getAllCustomers,
        getCustomerById,
        getCustomerAuctionBids,
        createCustomer
    };
};

module.exports = customerService();
