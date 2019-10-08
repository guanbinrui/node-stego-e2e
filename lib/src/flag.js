"use strict";
exports.__esModule = true;
var ActionType;
(function (ActionType) {
    ActionType["GENERATE"] = "GENERATE";
    ActionType["VALIDATE"] = "VALIDATE";
    ActionType["CENSOR"] = "CENSOR";
})(ActionType = exports.ActionType || (exports.ActionType = {}));
function normalizeFlags(flags) {
    return flags;
}
exports.normalizeFlags = normalizeFlags;
function validateFlags(_a) {
    var name = _a.name, pass = _a.pass, action = _a.action;
    if (!name && action === ActionType.GENERATE) {
        return '-n, --name is required';
    }
    if (!pass && action === ActionType.GENERATE) {
        return '-p, --pass is required';
    }
    if (!Object.values(ActionType).includes(action)) {
        return 'unknown action type';
    }
    return '';
}
exports.validateFlags = validateFlags;
function flags2Options(_a) {
    var _b = _a.name, name = _b === void 0 ? '' : _b, _c = _a.pass, pass = _c === void 0 ? '' : _c, _d = _a.action, action = _d === void 0 ? ActionType.GENERATE : _d;
    return {
        name: name,
        pass: pass,
        generate: action === ActionType.GENERATE,
        validate: action === ActionType.VALIDATE,
        censor: action === ActionType.CENSOR
    };
}
exports.flags2Options = flags2Options;
