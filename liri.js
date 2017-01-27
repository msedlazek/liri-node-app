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

		case "my-tweets":
			showTweets();
		break;
	};
};

function showTweets(){
	var params = {screen_name: 'KoiTiger'};
	client.get('statuses/user_timeline', params, function(error, tweets, response) {
  		if (!error) {
  			for(var i=0; i<20; i++)
  				console.log("Tweet " + (i+1) + ": " + tweets[i].text + " Created at: " + tweets[i].created_at);
  				appendLog("\nTweet " + (i+1) + ": " + tweets[i].text + " Created at: " + tweets[i].created_at);
  		};
	});
};


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
	    console.log("This track's Artist: " + data.tracks.items[0].artists[0].name);
	    console.log("This track's Title: " + data.tracks.items[0].name);
	    console.log("You can hear a preview at: " + data.tracks.items[0].preview_url);
	    console.log("The Album this track appears on: " + data.tracks.items[0].album.name);

	    console.log("Requested: " + operation + " for " + input);
		appendLog('\n-------------\n');
		appendLog("\nRequested: " + operation + " for " + input);
		appendLog("\nThis track's Artist: " + data.tracks.items[0].artists[0].name);
		appendLog("\nThis track's Title: " + data.tracks.items[0].name);
		appendLog("\nYou can hear a preview at: " + data.tracks.items[0].preview_url);
		appendLog("\nThe Album this track appears on: " + data.tracks.items[0].album.name);
	});
}

// For "do-what-it-says"
function doWhatItSays(){
	fs.readFile("random.txt", "utf8", function(error, data){
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

