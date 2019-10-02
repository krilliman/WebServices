var fs = require("fs")
var data = JSON.parse(fs.readFileSync())

module.exports = {
    candies: data["candies"],
    offers: data["offers"],
    pinatas: data["piantas"]
}