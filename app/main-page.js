var vmModule = require("./main-view-model");
var https = require("https");
var observableModule = require("data/observable");
var device = require("platform").device();
var pageData = new observableModule.Observable();
var time = 0;
var goal = 0;

https.get("https://exuberant-authority.glitch.me/database?user="+device.uuid, res => {
  let rawData = '';
  res.on('data', (chunk) => { rawData += chunk; });
  res.on('end', () => {
	try {
		const parsedData = JSON.parse(rawData);
		console.log(parsedData);
		time = parsedData.time;
		goal = parsedData.goal;
	} catch (e) {
		console.error(e.message);
	}
  });
})

function pageLoaded(args) {
    var page = args.object;
    page.bindingContext = pageData;
	pageData.set("time", time);
	pageData.set("goal", goal);
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

// Gets image
exports.pet = function() {
	// Happy-SemiHappy-Neutral-SemiSad-Sad
	if (parseInt(pageData.get("time")) <= parseInt(pageData.get("goal")) * 0.25) pageData.set("pet", "https://github.com/HarshdipD/Doggie/blob/master/Graphics/happydog.gif");
	else if (parseInt(pageData.get("time")) <= parseInt(pageData.get("goal")) * 0.5) pageData.set("pet", "https://raw.githubusercontent.com/HarshdipD/Doggie/master/Graphics/semi-happy-dog.gif?token=AP4pMdS7J-CncZKyzwyEbI9Xbs1LBhnRks5af7-pwA%3D%3D");
	else if (parseInt(pageData.get("time")) <= parseInt(pageData.get("goal")) * 0.75) pageData.set("pet", "https://raw.githubusercontent.com/HarshdipD/Doggie/master/Graphics/neutral-dog.gif?token=AP4pMcCmAogRkOqZ-Zq_dmKL_7X2fMoCks5af7_CwA%3D%3D");
	else if (parseInt(pageData.get("time")) <= parseInt(pageData.get("goal"))) pageData.set("pet", "https://raw.githubusercontent.com/HarshdipD/Doggie/master/Graphics/semi-sad%3Ddog.gif?token=AP4pMfIrdxzHhiYiw4ahQu3jYhfIoNuXks5af79owA%3D%3D");
	else pageData.set("pet", "https://raw.githubusercontent.com/HarshdipD/Doggie/master/Graphics/sad-dog.gif?token=AP4pMRTwKXmEYj1Jbhhz1OtgX44hQjhWks5af7_pwA%3D%3D");
}
