var vmModule = require("./main-view-model");
var https = require("https");
var observableModule = require("data/observable");
var device = require("platform").device();
var pageData = new observableModule.Observable();
var time = 0;

https.get("https://exuberant-authority.glitch.me/database?user="+device.uuid, res => {
  let rawData = '';
  res.on('data', (chunk) => { rawData += chunk; });
  res.on('end', () => {
	try {
		const parsedData = JSON.parse(rawData);
		console.log(parsedData);
		time = parsedData.time;
	} catch (e) {
		console.error(e.message);
	}
  });
})

function pageLoaded(args) {
    var page = args.object;
    page.bindingContext = pageData;
}
exports.pageLoaded = pageLoaded;

// Sets up goal
exports.signin = function() {
	https.post("https://exuberant-authority.glitch.me/database?user="+device.uuid+"&goal="+pageData.get('txtKeyword'));
};

// Listen for events
app.android.registerBroadcastReceiver(android.content.Intent.ACTION_SCREEN_ON,
	function onReceiveCallback(context: android.content.Context, intent: android.content.Intent) {
		var temptime = new Date().getTime();
		app.android.registerBroadcastReceiver(android.content.Intent.ACTION_SCREEN_OFF,
			function onReceiveCallback(context: android.content.Context, intent: android.content.Intent) {
				time += new Date().getTime() - temptime; // ms
			});
	});

exports.getTime = function() {
	pageData.set("time", time);
}
