var Discord = require("discord.js");
var colors = require('colors');
var fs = require('fs');

var AuthDetails = require("./auth.json");

var Explore = require("./explore.js");

var places = require("./places.json");
var saves = require("./players.json");
var data = require("./data.json");

var pandaBot = new Discord.Client();

var isSaving = false;

var savePlayers = function() {
	if (isSaving) return;
	isSaving = true;
	fs.writeFile("./players.json", JSON.stringify(saves, null, 2), function(){
		console.log(colors.blue("File Saved"));
		isSaving = false;
	});
}

pandaBot.on("message", function(msg) {
	
	if (msg.content === "!players!") {
		console.log(colors.gray(JSON.stringify(saves, null, 4)));
	}

	var userID = msg.author; 
	
	if (typeof saves[userID] !== 'undefined') {

		var player = saves[userID];

		if (msg.content === "!stats") {
			console.log(colors.cyan(msg.author));
			pandaBot.reply( msg, " your stats are:\n" + JSON.stringify(saves[userID], null, 4));
		} 

		if (msg.content === "!register") {
			pandaBot.reply( msg, "\nYou are already registered" );
			console.log(colors.magenta(userID.username + " Attempted To Register, But was already Registered"));
		}

		if (msg.content == "!stresstest") {
			console.log("stresstest");
			savePlayers();
			savePlayers();
		}



		if (msg.content == "!explore") {
			player.state = new Explore(data, player);
		}




	} else {

		if (msg.content == "!stats") {
			pandaBot.reply(msg, "\nYou cannot run stats because you do not have any registered.")
		}

		if (msg.content === "!register") {
			console.log(colors.magenta(userID.username + " Registered"));
			saves[userID] = {};
			saves[userID].Health = saves["Default"].Health;
			saves[userID].Medical = saves["Default"].Medical;
			saves[userID].Ammunition = saves["Default"].Ammunition;
			saves[userID].Karma = saves["Default"].Karma;
			savePlayers();
		}
	}
	

});

pandaBot.loginWithToken("MTcyNDkyNjg2Njg1NzY1NjMz.ChUj7w.F-WJdFRv3nmD9XSPGuu3ysTpaZg");
