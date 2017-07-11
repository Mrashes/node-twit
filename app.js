const Twitter = require('twitter');
const config = require('./config.js')

let T = new Twitter(config)

var params = {
	q: '#msichicago',
	count: 10,
	result_type: 'recent',
	lang: 'en'
}

T.get('search/tweets', params, function(err, data, res) {
	if (!err) {
		// console.log(data)
		for (let i=0; i<data.statuses.length; i++) {
			let id = { id: data.statuses[i].id_str }
			T.post('favorites/create', id, function(err, response){
				if(err){
					console.log(err);
				}
				else {
					let username = response.user.screen_name;
					let tweetId = response.id_str;
					console.log('Favorited: ', `https://twitter.com/${username}/status/${tweetId}`)
				}
			});
		}
	}
	else {
		console.log(err)
	}
})