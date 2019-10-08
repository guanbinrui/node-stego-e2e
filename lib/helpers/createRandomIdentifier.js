"use strict";
exports.__esModule = true;
exports.SEED = '0123456789abcdefghijklmnopqrstuvwxyz-+';
function createRandomIdentifier(size) {
    var chars = new Array(size).fill(0);
    for (var i = 0; i < size; i += 1) {
        chars[i] = exports.SEED[Math.round(Math.random() * exports.SEED.length)];
    }
    return chars.join('');
}
exports.createRandomIdentifier = createRandomIdentifier;
