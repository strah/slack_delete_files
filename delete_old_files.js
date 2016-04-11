//inspired by Santiago L. Valdarrama.
//https://www.shiftedup.com/2014/11/13/how-to-bulk-remove-files-from-slack

var request = require('request');
var async = require('async');

var token = "YOUR_TOKEN";
var domain = "YOUR_DOMAIN_NAME";
var apiURL = "https://" + domain + ".slack.com/api/";
var dateLimit = new Date().getTime() - 30 * (1000 * 60 * 60 * 24); //30 days in milliseconds

function getFiles(page, files) {
	files = files || [];
	page = page || 1;
	console.log("Getting files. Page:", page);
	request.post({url: apiURL + "files.list", form:{token: token, to_ts: dateLimit, page: page, count: 100}}, function(err, resp, body) {
		var res = JSON.parse(resp.body);
		var pages = res.paging.pages;
		var currPage = res.paging.page;
		var list = res.files;
		if (list) {
			files = files.concat(list);
		}

		if (currPage < pages) {
			getFiles(currPage + 1, files);
		} else {
			deleteFiles(files);
		}
	});
}

function deleteFiles(arr) {
	console.log("Deleting %s files", arr.length);
	arr = arr.map(function(item) {
		return function(callback) {
			console.log("Deleting a file:", item.name);
			request.post({url: apiURL + "files.delete", form:{token: token, file: item.id}}, function(err, resp, body) {
				callback();
			});
		}
	});
	async.parallel(arr, function(err) {
		console.log("Done");
	})
}

getFiles();