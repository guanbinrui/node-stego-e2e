"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
exports.__esModule = true;
var createTypeormConn_1 = require("./helpers/createTypeormConn");
var Image_1 = require("./entities/Image");
var createSuite_1 = require("./helpers/createSuite");
var lib_1 = require("node-stego/lib");
var uploadImage_1 = require("img-poster/lib/fb/uploadImage");
var getUserInfo_1 = require("img-poster/lib/fb/getUserInfo");
var downloadImage_1 = require("img-poster/lib/helpers/downloadImage");
var Suite_1 = require("./entities/Suite");
function generateSuite(_a, stegoOptions) {
    var name = _a.name, pass = _a.pass;
    return __awaiter(this, void 0, void 0, function () {
        var images, payload, _i, images_1, image, suite, vendorImgBuf, stegoImgBuf, _b;
        return __generator(this, function (_c) {
            switch (_c.label) {
                case 0: return [4 /*yield*/, createTypeormConn_1.createTypeormConn()];
                case 1:
                    _c.sent();
                    return [4 /*yield*/, Image_1.Image.find({ relations: ['vendor'] })];
                case 2:
                    images = _c.sent();
                    return [4 /*yield*/, getUserInfo_1.getRequestPayload(name, pass)];
                case 3:
                    payload = _c.sent();
                    _i = 0, images_1 = images;
                    _c.label = 4;
                case 4:
                    if (!(_i < images_1.length)) return [3 /*break*/, 10];
                    image = images_1[_i];
                    suite = createSuite_1.createSuite(image, stegoOptions);
                    return [4 /*yield*/, downloadImage_1.downloadImage(suite.vendorUrl)];
                case 5:
                    vendorImgBuf = _c.sent();
                    return [4 /*yield*/, lib_1.encode(vendorImgBuf, suite)];
                case 6:
                    stegoImgBuf = _c.sent();
                    _b = suite;
                    return [4 /*yield*/, uploadImage_1.uploadImage(stegoImgBuf, payload)];
                case 7:
                    _b.fbUrl = _c.sent();
                    return [4 /*yield*/, suite.save()];
                case 8:
                    _c.sent();
                    _c.label = 9;
                case 9:
                    _i++;
                    return [3 /*break*/, 4];
                case 10: return [2 /*return*/];
            }
        });
    });
}
exports.generateSuite = generateSuite;
function validateSuite(stegoOptions) {
    return __awaiter(this, void 0, void 0, function () {
        var suites, _i, suites_1, suite, stegoImgBuf, text;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, createTypeormConn_1.createTypeormConn()];
                case 1:
                    _a.sent();
                    return [4 /*yield*/, Suite_1.Suite.find({
                            status: Suite_1.SuiteStatus.NOT_DEPEND
                        })];
                case 2:
                    suites = _a.sent();
                    _i = 0, suites_1 = suites;
                    _a.label = 3;
                case 3:
                    if (!(_i < suites_1.length)) return [3 /*break*/, 8];
                    suite = suites_1[_i];
                    return [4 /*yield*/, downloadImage_1.downloadImage(suite.fbUrl)];
                case 4:
                    stegoImgBuf = _a.sent();
                    return [4 /*yield*/, lib_1.decode(stegoImgBuf, suite)];
                case 5:
                    text = _a.sent();
                    suite.status = text === suite.text ? Suite_1.SuiteStatus.SUCCESS : Suite_1.SuiteStatus.FAIL;
                    return [4 /*yield*/, suite.save()];
                case 6:
                    _a.sent();
                    _a.label = 7;
                case 7:
                    _i++;
                    return [3 /*break*/, 3];
                case 8: return [2 /*return*/];
            }
        });
    });
}
exports.validateSuite = validateSuite;
