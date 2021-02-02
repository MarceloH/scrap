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
Object.defineProperty(exports, "__esModule", { value: true });
var date_fns_1 = require("date-fns");
var typeorm_1 = require("typeorm");
var axios_1 = __importDefault(require("axios"));
var cheerio_1 = __importDefault(require("cheerio"));
var ProductsRepository_1 = __importDefault(require("../repositories/ProductsRepository"));
var CreateProductService = /** @class */ (function () {
    function CreateProductService() {
    }
    CreateProductService.prototype.execute = function (_a) {
        var url = _a.url, date = _a.date;
        return __awaiter(this, void 0, void 0, function () {
            var productsRepository, findProductInSameURL, productDate, title, description, image, price, res, html, $, tempPrice, newPrice, product, _b;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        _c.trys.push([0, 5, , 6]);
                        productsRepository = typeorm_1.getCustomRepository(ProductsRepository_1.default);
                        return [4 /*yield*/, productsRepository.findByURL(url)];
                    case 1:
                        findProductInSameURL = _c.sent();
                        if (findProductInSameURL && date_fns_1.getHours(findProductInSameURL.date) == date_fns_1.getHours(date)) {
                            return [2 /*return*/, findProductInSameURL];
                        }
                        productDate = date_fns_1.startOfHour(date);
                        title = void 0;
                        description = void 0;
                        image = void 0;
                        price = void 0;
                        return [4 /*yield*/, axios_1.default.get(url)];
                    case 2:
                        res = _c.sent();
                        html = res.data;
                        return [4 /*yield*/, cheerio_1.default.load(html)];
                    case 3:
                        $ = _c.sent();
                        if (url.indexOf("saraiva") != -1) {
                            title = $('meta[property="og:title"]').attr('content');
                            description = $('meta[property="og:title"]').attr('content');
                            image = $('meta[itemprop="image"]').attr('content');
                            price = $('meta[property="product:price:amount"]').attr('content');
                        }
                        if (url.indexOf("americanas") != -1) {
                            //console.log($('span[id="priceblock_ourprice"]').text().trim());
                            //console.log($('div .a-dynamic-image').attr('src'));
                            //console.log($('div .product-title-word-break').text().trim());
                            title = $('meta[name="description"]').attr('content');
                            description = $('meta[name="description"]').attr('content');
                            image = $('picture img').attr('src');
                            price = $('div.priceSales').text();
                        }
                        if (url.indexOf("amazon") != -1) {
                            tempPrice = $('span[id="priceblock_ourprice"]').text().trim();
                            newPrice = tempPrice.replace('R$', '').replace(',', '.');
                            title = $('div .product-title-word-break').text();
                            description = $('div .product-title-word-break').text();
                            image = $('div .a-dynamic-image').attr('src');
                            price = newPrice;
                        }
                        product = productsRepository.create({
                            title: title,
                            description: description,
                            image: image,
                            url: url,
                            price: price,
                            date: productDate,
                        });
                        return [4 /*yield*/, productsRepository.save(product)];
                    case 4:
                        _c.sent();
                        return [2 /*return*/, product];
                    case 5:
                        _b = _c.sent();
                        console.error("ERROR: Ocorreu um erro ao tentar buscar a URL: " + url);
                        return [3 /*break*/, 6];
                    case 6: return [2 /*return*/];
                }
            });
        });
    };
    return CreateProductService;
}());
exports.default = CreateProductService;
