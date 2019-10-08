"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
exports.__esModule = true;
var typeorm_1 = require("typeorm");
var Image_1 = require("./Image");
var transform_1 = require("node-stego/lib/transform");
var grayscale_1 = require("node-stego/lib/grayscale");
var constant_1 = require("node-stego/lib/constant");
var SuiteStatus;
(function (SuiteStatus) {
    SuiteStatus["SUCCESS"] = "SUCCESS";
    SuiteStatus["FAIL"] = "FAIL";
    SuiteStatus["NOT_DEPEND"] = "NOT_DEPEND";
})(SuiteStatus = exports.SuiteStatus || (exports.SuiteStatus = {}));
var Suite = /** @class */ (function (_super) {
    __extends(Suite, _super);
    function Suite() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    __decorate([
        typeorm_1.PrimaryGeneratedColumn(),
        __metadata("design:type", Number)
    ], Suite.prototype, "id");
    __decorate([
        typeorm_1.Column({ type: 'varchar', "default": SuiteStatus.NOT_DEPEND }),
        __metadata("design:type", String)
    ], Suite.prototype, "status");
    __decorate([
        typeorm_1.Column(),
        __metadata("design:type", String)
    ], Suite.prototype, "fbUrl");
    __decorate([
        typeorm_1.Column(),
        __metadata("design:type", String)
    ], Suite.prototype, "vendorUrl");
    __decorate([
        typeorm_1.Column(),
        __metadata("design:type", String)
    ], Suite.prototype, "text");
    __decorate([
        typeorm_1.Column(),
        __metadata("design:type", String)
    ], Suite.prototype, "pass");
    __decorate([
        typeorm_1.Column({ "default": constant_1.DEFAULT_CLIP }),
        __metadata("design:type", Number)
    ], Suite.prototype, "clip");
    __decorate([
        typeorm_1.Column({ "default": constant_1.DEFAULT_COPIES }),
        __metadata("design:type", Number)
    ], Suite.prototype, "copies");
    __decorate([
        typeorm_1.Column({ "default": constant_1.DEFAULT_SIZE }),
        __metadata("design:type", Number)
    ], Suite.prototype, "size");
    __decorate([
        typeorm_1.Column({ "default": constant_1.DEFAULT_TOLERANCE }),
        __metadata("design:type", Number)
    ], Suite.prototype, "tolerance");
    __decorate([
        typeorm_1.Column({ "default": '' }),
        __metadata("design:type", String)
    ], Suite.prototype, "version");
    __decorate([
        typeorm_1.Column({ type: 'varchar' }),
        __metadata("design:type", String)
    ], Suite.prototype, "transformAlgorithm");
    __decorate([
        typeorm_1.Column({ type: 'varchar', "default": grayscale_1.GrayscaleAlgorithm.NONE }),
        __metadata("design:type", String)
    ], Suite.prototype, "grayscaleAlgorithm");
    __decorate([
        typeorm_1.OneToOne(function () { return Image_1.Image; }),
        typeorm_1.JoinColumn(),
        __metadata("design:type", Image_1.Image)
    ], Suite.prototype, "image");
    Suite = __decorate([
        typeorm_1.Entity()
    ], Suite);
    return Suite;
}(typeorm_1.BaseEntity));
exports.Suite = Suite;
