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
// For inputs on the command line in node.
var operation = process.argv[2];
var query = process.argv[3];

liriGo(operation, query);

function liriGo(command, subject){
	switch(command){
		case "do-what-it-says":
			doWhatItSays();
		break;

		case "spotify-this-song":
			spotifyThis(subject);
		break;
	};
}


function spotifyThis(){
	console.log("music is rad.")
	console.log("Requested: " + operation + " for " + query);
	appendLog('\n-------------\n');
	appendLog("Requested: " + operation + " for " + query);
	appendLog('\n-------------\n');
}

// For "do-what-it-says"
function doWhatItSays(){
	fs.readFile("random.txt", "utf8", function(error, data){
	// for the random.txt to spotify the song.
		console.log(data);
	// This will split the data into an array.
		var dataArr = data.split(",");
		operation = dataArr[0];
		query = dataArr[1];
		liriGo(operation, query);
	// Will log what was requested in both bash and the log.txt 
		console.log("Requested: " + operation + " for " + query);
		appendLog('\n-------------\n');
		appendLog("Requested: " + operation + " for " + query);
		appendLog('\n-------------\n');
	});	
}	

// When called at the end of other functions, this will update the log with what happened.
function appendLog(data){
	// Need to specify file, what arguement is going in, and if there is an error.
	fs.appendFile("log.txt", data, function(error){
		if (error){
			// Need to use return to stop the code here.
			return console.log(error);
		}
	})
}

