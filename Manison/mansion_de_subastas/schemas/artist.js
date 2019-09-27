const Schema = require('mongoose').Schema;

//Artist - name* (String), nickname* (String), address* (String), memberSince* (Date, defaults to now

module.exports = new Schema({
    name: { type: String, required: true},
    nickname: { type: String, required: true},
    address: {type: String, required: true},
    memberSince: {type: Date, required: true, default: new Date()}
});
