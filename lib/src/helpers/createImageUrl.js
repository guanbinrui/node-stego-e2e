"use strict";
exports.__esModule = true;
var Vendor_1 = require("img-crawler/src/entities/Vendor");
function createImageUrl(image) {
    var vid = image.vid, vendor = image.vendor;
    switch (vendor.name) {
        case Vendor_1.VendorType.PEXELS:
            return "https://images.pexels.com/photos/" + vid + "/pexels-photo-" + vid + ".jpeg?auto=compress&cs=tinysrgb&h=650&w=940";
        case Vendor_1.VendorType.UNSPLASH:
            return "https://images.unsplash.com/photo-" + vid + "?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=700&q=80";
        case Vendor_1.VendorType.INS:
            break;
        default:
            throw new Error('unknown vendor type');
    }
}
exports.createImageUrl = createImageUrl;
