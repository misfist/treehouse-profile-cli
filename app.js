//Problem: We need a simple way to look up and display a user's badge count and JS points
//Solution: Use Node.js to connect to Treehouse's API to get profile information to print out
var profile = require("./profile");

//Get array of arguments starting from index 2
var users= process.argv.slice(2);

//Loop through each user name given as argument
users.forEach(profile.getProfile);