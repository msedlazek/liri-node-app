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
var input = process.argv[3];

liriGo(operation, input);

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
	var song = input;
	if (song == undefined){
		console.log("Please enter a song after request.");
		return;
	}

	spotify.search({ type: 'track', query: song}, function(error, data) {
	    if (error){
	        console.log(error);
	        return;
	    }
	    console.log(data.tracks.items[0].preview_url);
	});
	// Will log what was requested in both bash and the log.txt 
	console.log("Requested: " + operation + " for " + input);
	appendLog('\n-------------\n');
	appendLog("Requested: " + operation + " for " + input);
}

// For "do-what-it-says"
function doWhatItSays(){
	fs.readFile("random.txt", "utf8", function(error, data){
	// for the random.txt to spotify the song.
		console.log(data);
	// This will split the data into an array.
		var dataArr = data.split(",");
		operation = dataArr[0];
		input = dataArr[1];
		liriGo(operation, input);
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

