// For Twitter
var Twitter = require("twitter");
var keys = require("./keys.js");
// This creates a new version of the Twitter variable with the keys passed in as parameters.
var client = new Twitter(keys.twitterKeys)
// For reading, writing, and appending files.
var fs = require("fs");
// To enact request for spotify and omdb.
var request = require("request");
// For spotify.
var spotify = require("spotify");
// To grab the twitterKey object, write keys.twitterKey
console.log(client);
// For inputs on the command line in node.
var operation = process.argv[2];
var query = process.argv[3];

// For "do-what-it-says"
function doWhatItSays(){
	fs.readFile("random.txt", "utf8", function(error, data){
	// for the random.txt to spotify the song.
		console.log(data);
	// This will split the data into an array.
		var dataArr = data.split(",");
		operation = dataArr[0];
		query = dataArr[1];
	// This will log the 0 index of the array "spotify-this-song". 
		console.log("Requested: " + operation + " and " + query);
	});	
}	

doWhatItSays();

// request('http://www.google.com', function (error, response, body) {
//   if (!error && response.statusCode == 200) {
//     console.log(body) // Show the HTML for the Google homepage. 
//   }
// })


