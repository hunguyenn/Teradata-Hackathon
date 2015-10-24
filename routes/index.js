var express = require('express');
var request = require('request');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/visualize', function(req, res, next) {
	// var urlz = 'http://dragon.teradata.ws:1080/tdrest/systems/xTD150/queries';

 //    request.post({
 //    	url: urlz,
 //    	headers: {
 //    		'Accept': "application/vnd.com.teradata.rest-v1.0+json",
 //    		'Authorization': 'Basic ' + new Buffer('hack_user07:tdhackathon').toString('base64'),
 //    		'Content-Type': 'application/json'
 //    	},
 //    	data: JSON.stringify({
 //    		'query': 'select * from health.life_expectancy_hivaids_countries',
 //    		// 'queryBands': {'applicationName': 'MyApp', 'version': '1.0'},
 //    	})
 //    	}, function(err, response, body) {
 //    	if (err) {
 //    		console.log(err);
 //    		// console.log(response);
 //    		throw err;
 //    	}
 //    	console.log(body);
        res.render('visualize');
    // });  
});

module.exports = router;
