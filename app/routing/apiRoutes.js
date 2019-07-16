var matchList = require('../data/friends.js');

var bodyParser = require('body-parser');
var path = require('path');


//Routes
module.exports = function(app) {

	app.get('/api/matches', function(req, res){
		res.json(matchList);
	});

	app.post('/api/matches', function(req, res){

		var bestMatch = {
			'name': 'none',
			'photo': 'none'
		};

		//comparative number for user's array total
		var userTotal = sum(req.body.scores);
		//confirms sum of user's array
		//console.log(userTotal);

		//set outside of loops to be mutable and resetable
		var friendTotal = 0;
		// //functions to return exact match
		// for (var i = 0; i < matchList.length; i++) {
		// 	friendTotal = sum(matchList[i].scores);
		// 	//console.log(friendTotal);
		// 	if (friendTotal == userTotal) {
		// 		bestMatch.name = matchList[i].name;
		// 		bestMatch.photo = matchList[i].photo;
		// 	}
		// };

		//runs if exact match is not found
		// if (bestMatch.name == 'none') {
			//highest possible amount score array can equal
			var closest = 50;
			// match sum with sum of other user loop function
			// update bestMatch when closest sum is found
			for (var i = 0; i < matchList.length; i++) {
				friendTotal = sum(matchList[i].scores);
				var difference = Math.abs(friendTotal - userTotal);
				if ( difference <= closest ){
					closest = difference;
					bestMatch.name = matchList[i].name;
					bestMatch.photo = matchList[i].photo;
				};
			};
		// };

		//sum function for array object scores
		function sum (array) {
			var total = 0;
			for (var n = 0; n < array.length; n++) {
				total += parseInt(array[n]);
			}
			return total;
		}

		//test answer
		console.log(bestMatch);
		//return bestMatch back to webpage
		res.json(bestMatch);

	});

};