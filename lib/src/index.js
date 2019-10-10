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
var __values = (this && this.__values) || function(o) {
    var s = typeof Symbol === "function" && Symbol.iterator, m = s && o[s], i = 0;
    if (m) return m.call(o);
    if (o && typeof o.length === "number") return {
        next: function () {
            if (o && i >= o.length) o = void 0;
            return { value: o && o[i++], done: !o };
        }
    };
    throw new TypeError(s ? "Object is not iterable." : "Symbol.iterator is not defined.");
};
exports.__esModule = true;
var typeorm_1 = require("typeorm");
var src_1 = require("node-stego/src");
var downloadImage_1 = require("img-poster/src/helpers/downloadImage");
var getUserInfo_1 = require("img-poster/src/fb/getUserInfo");
var uploadImage_1 = require("img-poster/src/fb/uploadImage");
var Image_1 = require("img-crawler/src/entities/Image");
var createSuite_1 = require("./helpers/createSuite");
var createTypeormConn_1 = require("./helpers/createTypeormConn");
var createImageUrl_1 = require("./helpers/createImageUrl");
var Suite_1 = require("./entities/Suite");
function generateSuite(_a, stegoOptions) {
    var name = _a.name, pass = _a.pass;
    return __awaiter(this, void 0, void 0, function () {
        var images, payload, images_1, images_1_1, image, clip, copies, size, tolerance, grayscaleAlgorithm, transformAlgorithm, suite, err_1, vendorImgBuf, stegoImgBuf, _b, err_2, e_1_1;
        var e_1, _c;
        return __generator(this, function (_d) {
            switch (_d.label) {
                case 0: return [4 /*yield*/, createTypeormConn_1.createTypeormConn()];
                case 1:
                    _d.sent();
                    return [4 /*yield*/, Image_1.Image.find({ relations: ['vendor'] })];
                case 2:
                    images = _d.sent();
                    return [4 /*yield*/, getUserInfo_1.getRequestPayload(name, pass)];
                case 3:
                    payload = _d.sent();
                    _d.label = 4;
                case 4:
                    _d.trys.push([4, 18, 19, 20]);
                    images_1 = __values(images), images_1_1 = images_1.next();
                    _d.label = 5;
                case 5:
                    if (!!images_1_1.done) return [3 /*break*/, 17];
                    image = images_1_1.value;
                    clip = stegoOptions.clip, copies = stegoOptions.copies, size = stegoOptions.size, tolerance = stegoOptions.tolerance, grayscaleAlgorithm = stegoOptions.grayscaleAlgorithm, transformAlgorithm = stegoOptions.transformAlgorithm;
                    return [4 /*yield*/, Suite_1.Suite.findOne({
                            clip: clip,
                            copies: copies,
                            size: size,
                            tolerance: tolerance,
                            grayscaleAlgorithm: grayscaleAlgorithm,
                            transformAlgorithm: transformAlgorithm,
                            vendorUrl: createImageUrl_1.createImageUrl(image)
                        })];
                case 6:
                    suite = (_d.sent()) || createSuite_1.createSuite(image, stegoOptions);
                    if (suite.id) {
                        process.stderr.write('suite has been created:\n');
                        process.stderr.write(JSON.stringify(suite) + "\n");
                        return [3 /*break*/, 16];
                    }
                    _d.label = 7;
                case 7:
                    _d.trys.push([7, 9, , 10]);
                    return [4 /*yield*/, suite.save()];
                case 8:
                    _d.sent();
                    return [3 /*break*/, 10];
                case 9:
                    err_1 = _d.sent();
                    process.stderr.write(suite.vendorUrl + ": " + err_1.message + "\n");
                    return [3 /*break*/, 10];
                case 10:
                    _d.trys.push([10, 15, , 16]);
                    return [4 /*yield*/, downloadImage_1.downloadImage(suite.vendorUrl)];
                case 11:
                    vendorImgBuf = _d.sent();
                    return [4 /*yield*/, src_1.encode(vendorImgBuf, suite)];
                case 12:
                    stegoImgBuf = _d.sent();
                    _b = suite;
                    return [4 /*yield*/, uploadImage_1.uploadImage(stegoImgBuf, payload)];
                case 13:
                    _b.fbUrl = _d.sent();
                    return [4 /*yield*/, suite.save()];
                case 14:
                    _d.sent();
                    return [3 /*break*/, 16];
                case 15:
                    err_2 = _d.sent();
                    process.stderr.write(suite.vendorUrl + ": " + err_2.message + "\n");
                    return [3 /*break*/, 16];
                case 16:
                    images_1_1 = images_1.next();
                    return [3 /*break*/, 5];
                case 17: return [3 /*break*/, 20];
                case 18:
                    e_1_1 = _d.sent();
                    e_1 = { error: e_1_1 };
                    return [3 /*break*/, 20];
                case 19:
                    try {
                        if (images_1_1 && !images_1_1.done && (_c = images_1["return"])) _c.call(images_1);
                    }
                    finally { if (e_1) throw e_1.error; }
                    return [7 /*endfinally*/];
                case 20: return [2 /*return*/];
            }
        });
    });
}
exports.generateSuite = generateSuite;
function censorSuite() {
    return __awaiter(this, void 0, void 0, function () {
        var suites, suites_1, suites_1_1, suite, vendorImgBuf, stegoImgBuf, _a, e_2_1;
        var e_2, _b;
        return __generator(this, function (_c) {
            switch (_c.label) {
                case 0: return [4 /*yield*/, createTypeormConn_1.createTypeormConn()];
                case 1:
                    _c.sent();
                    return [4 /*yield*/, Suite_1.Suite.find({
                            status: Suite_1.SuiteStatus.NOT_DEPEND
                        })];
                case 2:
                    suites = _c.sent();
                    _c.label = 3;
                case 3:
                    _c.trys.push([3, 11, 12, 13]);
                    suites_1 = __values(suites), suites_1_1 = suites_1.next();
                    _c.label = 4;
                case 4:
                    if (!!suites_1_1.done) return [3 /*break*/, 10];
                    suite = suites_1_1.value;
                    return [4 /*yield*/, downloadImage_1.downloadImage(suite.vendorUrl)];
                case 5:
                    vendorImgBuf = _c.sent();
                    return [4 /*yield*/, src_1.encode(vendorImgBuf, suite)];
                case 6:
                    stegoImgBuf = _c.sent();
                    _a = suite;
                    return [4 /*yield*/, src_1.decode(stegoImgBuf, suite)];
                case 7:
                    _a.status =
                        (_c.sent()) === suite.text
                            ? Suite_1.SuiteStatus.QUALIFIED
                            : Suite_1.SuiteStatus.MALFORMED;
                    return [4 /*yield*/, suite.save()];
                case 8:
                    _c.sent();
                    _c.label = 9;
                case 9:
                    suites_1_1 = suites_1.next();
                    return [3 /*break*/, 4];
                case 10: return [3 /*break*/, 13];
                case 11:
                    e_2_1 = _c.sent();
                    e_2 = { error: e_2_1 };
                    return [3 /*break*/, 13];
                case 12:
                    try {
                        if (suites_1_1 && !suites_1_1.done && (_b = suites_1["return"])) _b.call(suites_1);
                    }
                    finally { if (e_2) throw e_2.error; }
                    return [7 /*endfinally*/];
                case 13: return [2 /*return*/];
            }
        });
    });
}
exports.censorSuite = censorSuite;
function validateSuite() {
    return __awaiter(this, void 0, void 0, function () {
        var suites, suites_2, suites_2_1, suite, stegoImgBuf, text, e_3_1;
        var e_3, _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0: return [4 /*yield*/, createTypeormConn_1.createTypeormConn()];
                case 1:
                    _b.sent();
                    return [4 /*yield*/, Suite_1.Suite.find({
                            status: typeorm_1.In([Suite_1.SuiteStatus.NOT_DEPEND, Suite_1.SuiteStatus.QUALIFIED])
                        })];
                case 2:
                    suites = _b.sent();
                    _b.label = 3;
                case 3:
                    _b.trys.push([3, 10, 11, 12]);
                    suites_2 = __values(suites), suites_2_1 = suites_2.next();
                    _b.label = 4;
                case 4:
                    if (!!suites_2_1.done) return [3 /*break*/, 9];
                    suite = suites_2_1.value;
                    return [4 /*yield*/, downloadImage_1.downloadImage(suite.fbUrl)];
                case 5:
                    stegoImgBuf = _b.sent();
                    return [4 /*yield*/, src_1.decode(stegoImgBuf, suite)];
                case 6:
                    text = _b.sent();
                    suite.status = text === suite.text ? Suite_1.SuiteStatus.SUCCESS : Suite_1.SuiteStatus.FAIL;
                    return [4 /*yield*/, suite.save()];
                case 7:
                    _b.sent();
                    _b.label = 8;
                case 8:
                    suites_2_1 = suites_2.next();
                    return [3 /*break*/, 4];
                case 9: return [3 /*break*/, 12];
                case 10:
                    e_3_1 = _b.sent();
                    e_3 = { error: e_3_1 };
                    return [3 /*break*/, 12];
                case 11:
                    try {
                        if (suites_2_1 && !suites_2_1.done && (_a = suites_2["return"])) _a.call(suites_2);
                    }
                    finally { if (e_3) throw e_3.error; }
                    return [7 /*endfinally*/];
                case 12: return [2 /*return*/];
            }
        });
    });
}
exports.validateSuite = validateSuite;
