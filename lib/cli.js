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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
var meow_1 = __importDefault(require("meow"));
var constant_1 = require("node-stego/lib/constant");
var flag_1 = require("node-stego/lib/flag");
var grayscale_1 = require("node-stego/lib/grayscale");
var transform_1 = require("node-stego/lib/transform");
var flag_2 = require("./flag");
var _1 = require(".");
var CLI_NAME = 'e2e';
var cli = meow_1["default"]("Usage\n  $ " + CLI_NAME + " [options...]\n\nOptions\n  -h, --help       Print help message\n  -v, --version    Print version message\n      --generate   Generate suites from image database\n      --validate   Validate suites and update status for each one\n\nFB Options\n  -n, --name       FB account name\n  -p, --pass       FB account password\n\nStego Options\n  -t, --tolerance  Specify the number to be added into wave amplitude: " + constant_1.DEFAULT_TOLERANCE + " (default).\n  -s, --size       Size of encoding block with radix-2 required: " + constant_1.DEFAULT_SIZE + " (default).\n  -c, --copies     Size of duplications with odd numbers required: " + constant_1.DEFAULT_COPIES + " (default).\n  -g, --grayscale  Specify grayscale algorithm: 'NONE' (default), 'AVG', 'LUMA', 'LUMA_II', 'DESATURATION', 'MAX_DE', 'MIN_DE', 'MID_DE', 'R', 'G', 'B'.\n  -f, --transform  Specify transform algorithm: 'FFT1D' (default), 'FFT2D', 'DCT'.\n\nExamples\n  $ " + CLI_NAME + " -c # create test suites\n  $ " + CLI_NAME + " -v # validate test suites\n", {
    flags: {
        help: {
            type: 'boolean',
            "default": false,
            alias: 'h'
        },
        version: {
            type: 'boolean',
            "default": false,
            alias: 'v'
        },
        generate: {
            type: 'boolean',
            "default": false
        },
        validate: {
            type: 'boolean',
            "default": false
        },
        name: {
            type: 'string',
            "default": '',
            alias: 'n'
        },
        pass: {
            type: 'string',
            "default": '',
            alias: 'p'
        },
        clip: {
            type: 'string',
            "default": constant_1.DEFAULT_CLIP,
            alias: 'i'
        },
        size: {
            type: 'string',
            "default": constant_1.DEFAULT_SIZE,
            alias: 's'
        },
        copies: {
            type: 'string',
            "default": constant_1.DEFAULT_COPIES,
            alias: 'c'
        },
        tolerance: {
            type: 'string',
            "default": constant_1.DEFAULT_TOLERANCE,
            alias: 't'
        },
        grayscale: {
            type: 'string',
            "default": grayscale_1.GrayscaleAlgorithm.NONE,
            alias: 'g'
        },
        transform: {
            type: 'string',
            "default": transform_1.TransformAlgorithm.FFT1D,
            alias: 'f'
        }
    },
    inferType: true
});
function run() {
    return __awaiter(this, void 0, void 0, function () {
        var stegoFlags, e2eFlags, errMsg, stegoOptions, e2eOptions;
        return __generator(this, function (_a) {
            stegoFlags = flag_1.normalizeFlags(cli.flags);
            e2eFlags = flag_2.normalizeFlags(cli.flags);
            if (stegoFlags.help || (!e2eFlags.generate && !e2eFlags.validate)) {
                process.stdout.write(cli.help);
                process.exit(0);
            }
            else if (stegoFlags.version) {
                process.stdout.write(exports.version + "\n");
                process.exit(0);
            }
            errMsg = flag_1.validateFlags(stegoFlags) || flag_2.validateFlags(e2eFlags);
            if (errMsg) {
                process.stderr.write(errMsg + "\n");
                process.exit(1);
            }
            stegoOptions = flag_1.flags2Options(stegoFlags);
            e2eOptions = flag_2.flags2Options(e2eFlags);
            if (e2eFlags.generate) {
                _1.generateSuite(e2eOptions, stegoOptions);
            }
            else if (e2eFlags.validate) {
                _1.validateSuite(stegoOptions);
            }
            return [2 /*return*/];
        });
    });
}
exports.run = run;
exports.version = process.env.npm_package_version;
