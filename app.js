const Twitter = require('twitter');
const config = require('./config.js')

let T = new Twitter(config)

var params = {
	q: '#nodejs',
	count: 10,
	result_type: 'recent',
	lang: 'en'
}

t.get('search/tweets', params, function(err, data, res) {
	if (!err) {
		console.log(data)
	}
	else {
		console.log(err)
	}
})