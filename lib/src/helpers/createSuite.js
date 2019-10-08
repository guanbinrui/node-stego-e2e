"use strict";
exports.__esModule = true;
var package_json_1 = require("node-stego/package.json");
var Suite_1 = require("../entities/Suite");
var createImageUrl_1 = require("./createImageUrl");
var createRandomIdentifier_1 = require("./createRandomIdentifier");
function createSuite(image, options) {
    var suite = new Suite_1.Suite();
    // apply stego options
    Object.assign(suite, options);
    suite.fbUrl = '';
    suite.vendorUrl = createImageUrl_1.createImageUrl(image);
    suite.text = createRandomIdentifier_1.createRandomIdentifier(50);
    suite.pass = createRandomIdentifier_1.createRandomIdentifier(10);
    suite.version = package_json_1.version;
    suite.status = Suite_1.SuiteStatus.NOT_DEPEND;
    return suite;
}
exports.createSuite = createSuite;
