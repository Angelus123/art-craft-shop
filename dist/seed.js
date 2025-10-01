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
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g = Object.create((typeof Iterator === "function" ? Iterator : Object).prototype);
    return g.next = verb(0), g["throw"] = verb(1), g["return"] = verb(2), typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
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
Object.defineProperty(exports, "__esModule", { value: true });
var client_1 = require("@prisma/client");
var prisma = new client_1.PrismaClient();
var categories = [
    {
        name: 'jewelry',
        displayName: 'Jewelry',
        description: 'Exquisite handmade jewelry with traditional designs',
        image: '/images/categories/jewelry.jpg',
        icon: '💍',
        productCount: 4
    },
    {
        name: 'home-decor',
        displayName: 'Home Decor',
        description: 'Beautiful handcrafted items for your living space',
        image: '/images/categories/home-decor.jpg',
        icon: '🏺',
        productCount: 2
    },
    {
        name: 'ceramics',
        displayName: 'Ceramics',
        description: 'Handcrafted pottery and ceramic art pieces',
        image: '/images/categories/ceramics.jpg',
        icon: '🍶',
        productCount: 2
    },
    {
        name: 'textiles',
        displayName: 'Textiles',
        description: 'Woven and embroidered fabrics with traditional patterns',
        image: '/images/categories/textiles.jpg',
        icon: '🧵',
        productCount: 2
    },
    {
        name: 'woodwork',
        displayName: 'Woodwork',
        description: 'Exquisite wooden sculptures and functional items',
        image: '/images/categories/woodwork.jpg',
        icon: '🪵',
        productCount: 1
    },
    {
        name: 'fashion',
        displayName: 'Fashion',
        description: 'Traditional and contemporary fashion accessories',
        image: '/images/categories/fashion.jpg',
        icon: '👘',
        productCount: 1
    }
];
var products = [
    {
        name: 'Handwoven Basket',
        description: 'Intricately woven from natural fibers, perfect for storage or decor.',
        price: 45.99,
        image: '/images/products/basket.jpg',
        category: 'home-decor',
        rating: 4.5,
        reviews: 128,
        isNew: true
    },
    {
        name: 'Ceramic Vase',
        description: 'Hand-painted with traditional motifs, adds elegance to any space.',
        price: 59.99,
        image: '/images/products/TKX00217.jpg',
        category: 'ceramics',
        rating: 4.8,
        reviews: 89,
        isNew: false
    },
    {
        name: 'Wooden Sculpture',
        description: 'Carved from sustainable wood, depicting cultural symbols.',
        price: 89.99,
        image: '/images/products/TKX00247.jpg',
        category: 'woodwork',
        rating: 4.3,
        reviews: 67,
        isNew: true
    },
    {
        name: 'Embroidered Textile',
        description: 'Vibrant patterns hand-stitched by artisans.',
        price: 34.99,
        image: '/images/products/textiles.jpg',
        category: 'textiles',
        rating: 4.6,
        reviews: 203,
        isNew: false
    },
    {
        name: 'Beaded Jewelry Set',
        description: 'Colorful beads in traditional designs, includes necklace and earrings.',
        price: 29.99,
        image: '/images/products/jewelry.jpg',
        category: 'jewelry',
        rating: 4.9,
        reviews: 156,
        isNew: true
    },
    {
        name: 'Silver Tribal Necklace',
        description: 'Handcrafted silver necklace with traditional motifs.',
        price: 89.99,
        image: '/images/products/jewelry-2.jpg',
        category: 'jewelry',
        rating: 4.7,
        reviews: 92,
        isNew: false
    },
    {
        name: 'Gold Plated Earrings',
        description: 'Elegant gold plated earrings with gemstone accents.',
        price: 45.50,
        image: '/images/products/jewelry-3.jpg',
        category: 'jewelry',
        rating: 4.8,
        reviews: 134,
        isNew: true
    },
    {
        name: 'Traditional Bracelet Set',
        description: 'Set of three bracelets with cultural patterns.',
        price: 67.00,
        image: '/images/products/jewelry-4.jpg',
        category: 'jewelry',
        rating: 4.6,
        reviews: 78,
        isNew: false
    },
    {
        name: 'Handwoven Wall Hanging',
        description: 'Beautiful textile art for your walls.',
        price: 75.99,
        image: '/images/products/textiles-2.jpg',
        category: 'home-decor',
        rating: 4.4,
        reviews: 56,
        isNew: false
    },
    {
        name: 'Decorative Ceramic Plates',
        description: 'Set of hand-painted decorative plates.',
        price: 52.99,
        image: '/images/products/ceramics-2.jpg',
        category: 'home-decor',
        rating: 4.7,
        reviews: 89,
        isNew: true
    }
];
function main() {
    return __awaiter(this, void 0, void 0, function () {
        var _i, categories_1, category, _a, products_1, product;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    console.log("🌱 Seeding database...");
                    _i = 0, categories_1 = categories;
                    _b.label = 1;
                case 1:
                    if (!(_i < categories_1.length)) return [3 /*break*/, 4];
                    category = categories_1[_i];
                    return [4 /*yield*/, prisma.category.upsert({
                            where: { name: category.name },
                            update: {},
                            create: category,
                        })];
                case 2:
                    _b.sent();
                    _b.label = 3;
                case 3:
                    _i++;
                    return [3 /*break*/, 1];
                case 4:
                    _a = 0, products_1 = products;
                    _b.label = 5;
                case 5:
                    if (!(_a < products_1.length)) return [3 /*break*/, 8];
                    product = products_1[_a];
                    return [4 /*yield*/, prisma.product.create({
                            data: {
                                name: product.name,
                                description: product.description,
                                price: product.price,
                                image: product.image,
                                category: product.category,
                                rating: product.rating,
                                reviews: product.reviews,
                            },
                        })];
                case 6:
                    _b.sent();
                    _b.label = 7;
                case 7:
                    _a++;
                    return [3 /*break*/, 5];
                case 8:
                    console.log("✅ Seeding finished!");
                    return [2 /*return*/];
            }
        });
    });
}
main()
    .then(function () { return __awaiter(void 0, void 0, void 0, function () {
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, prisma.$disconnect()];
            case 1:
                _a.sent();
                return [2 /*return*/];
        }
    });
}); })
    .catch(function (e) { return __awaiter(void 0, void 0, void 0, function () {
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                console.error(e);
                return [4 /*yield*/, prisma.$disconnect()];
            case 1:
                _a.sent();
                process.exit(1);
                return [2 /*return*/];
        }
    });
}); });
