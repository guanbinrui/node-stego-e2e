"use strict";
exports.__esModule = true;
function normalizeFlags(flags) {
    return flags;
}
exports.normalizeFlags = normalizeFlags;
function validateFlags(_a) {
    var name = _a.name, pass = _a.pass;
    if (!name) {
        return '-n, --name is required';
    }
    if (!pass) {
        return '-n, --pass is required';
    }
    return '';
}
exports.validateFlags = validateFlags;
function flags2Options(_a) {
    var _b = _a.name, name = _b === void 0 ? '' : _b, _c = _a.pass, pass = _c === void 0 ? '' : _c, generate = _a.generate, validate = _a.validate;
    return {
        name: name,
        pass: pass,
        generate: generate,
        validate: generate ? false : validate
    };
}
exports.flags2Options = flags2Options;
