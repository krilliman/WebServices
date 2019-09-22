const customerDb = require('../data/db').Customer;

const customerService = () => {
    const getAllCustomers = (cb, errorCb) => {
        // Your implementation goes here
        customerDb.find({}, function(err, customers){
            if(err){throw new Error(err);}
            cb(customers);
        })
    };

    const getCustomerById = (id, cb, errorCb) => {
        customerDb.findById(id, function(err, customer){
            if(err){throw new Error(err);}
            cb(customer);
        })
        // Your implementation goes here
    };

    const getCustomerAuctionBids = (customerId, cb, errorCb) => {
        // Your implementation goes here
    };

	const createCustomer = (customer, successCb, errorCb) => {
        customerDb.create(customer, function(err, success){
            if(err){errorCb(err);}
            else{successCb(success);}
        });
        // Your implementation goes here
    };

    return {
        getAllCustomers,
        getCustomerById,
        getCustomerAuctionBids,
		createCustomer
    };
};

module.exports = customerService();
