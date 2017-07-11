//Twitter, config is the token, yargs is for command lines
const Twitter = require('twitter');
const config = require('./config.js');
const argv = require('yargs').argv;

//this creates the instance of it working
let T = new Twitter(config)

//using -q will search for a # on your input
let query = '#'+argv.q || '#dogs';

//parameters for the api call
var params = {
	q: query,
	count: 10,
	result_type: 'recent',
	lang: 'en'
}

//this get call is from Twitter
T.get('search/tweets', params, function(err, data, res) {
	if (!err) {
		// console.log(data)
		console.log(`looking for ${params.q}`)
		//for all the returns
		for (let i=0; i<data.statuses.length; i++) {
			//find the tweets ID
			let id = { id: data.statuses[i].id_str }
			//this function favorites tweets from twitter docs
			T.post('favorites/create', id, function(err, response){
				if(err){
					console.log(err);
				}
				else {
					let username = response.user.screen_name;
					let tweetId = response.id_str;
					//shows the favorited tweek
					console.log('Favorited: ', `https://twitter.com/${username}/status/${tweetId}`)
				}
			});
		}
	}
	else {
		console.log(err)
	}
})