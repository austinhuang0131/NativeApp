
var vmModule = require("./main-view-model");
var https = require("https");
var observableModule = require("data/observable");
var device = require("platform").device();
var observableArray = require("data/observable-array");
var images = new observableArray.ObservableArray([]);
var pageData = new observableModule.Observable();

function pageLoaded(args) {
    var page = args.object;
    pageData.set("images", images);
    page.bindingContext = pageData;
}
exports.pageLoaded = pageLoaded;

exports.signin = function() {
	https.post("https://exuberant-authority.glitch.me/database?user="+device.uuid+"&goal="+pageData.get('txtKeyword'));
};
