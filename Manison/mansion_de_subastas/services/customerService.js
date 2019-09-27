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
        try{
            const customer =  await customerDb.findById(id);
            return customer;
        }
        catch(err){
            errorCb(err);
        }
    }
    
    const getCustomerAuctionBids = async (customerId, res) =>{
        try{
            const idObject = Schema.Types.ObjectId(customerId);
            const bids = await auctionService.getAuctionByCustmerId(idObject, err =>{
                throw(err);
            });
    
            if(bids.length == 0){
                return res.status(404).send("No bits found for the given id");
            }
            return res.status(200).json(bids);
        }
        catch(err){
            return res.status(400).json(err);
        }
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
