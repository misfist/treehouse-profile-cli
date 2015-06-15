// Require the node http module
var http = require("http");

// Print out message
function printMessage(username, badgeCount, points) {
  var message = username + ' has ' + badgeCount + ' badges and ' + points + ' JavaScript points';
  console.log(message);
}

//Print out error
function printError(error) {
  console.error(error.message);
}

// Connect to the API URL (http://teamtreehouse.com/username.json)
function getProfile(username) {

  var request = http.get("http://teamtreehouse.com/" + username + ".json", function(response) {
  //console.log('Response Status: ', response.statusCode);
  var body = "";
  
  // Read data
  response.on('data', function(chunk) {
    body += chunk;
  });
  
  response.on('end', function() {
    if(response.statusCode === 200) {
      try {
        // Parse data
        var profile = JSON.parse(body);
        // Print data
        printMessage(username, profile.badges.length, profile.points.JavaScript);
      } catch(error) {
        //Parsing Error
        printError(error);
      }
    } else {
        printError({message: "There was an error getting the profile for " + username + " (" + http.STATUS_CODES[response.statusCode] + ")"});
      }
    });
  });
  //Connection Error
  request.on("error", printError);

}

// Make function available when require is used
module.exports.getProfile = getProfile;