"use strict";

module.exports = class Explore {
	constructor(data, player) {
		//this.data = data;
		var currentLocation = this.arrayRandom(data.locations);
		var currentScenario = this.getWithID(this.arrayRandom(currentLocation["scenario ids"]), data.scenarios);
		console.log(JSON.stringify(currentScenario));
	}
	arrayRandom(theArray) {
		return theArray[Math.floor(Math.random() * theArray.length)];
	}

	getWithID(id, scenario) {
		return scenario.filter(function(s) {
			return id === s.id;
		})[0]
	}
}

