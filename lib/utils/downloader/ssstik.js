"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SSSTik = void 0;
const axios_1 = __importDefault(require("axios"));
const cheerio_1 = require("cheerio");
const api_1 = require("../../constants/api");
const TiktokURLregex = /https:\/\/(?:m|www|vm|vt)?\.?tiktok\.com\/((?:.*\b(?:(?:usr|v|embed|user|video)\/|\?shareId=|\&item_id=)(\d+))|\w+)/;
const fetchTT = () => new Promise(async (resolve, reject) => {
    axios_1.default.get(api_1._ssstikurl, {
        headers: {
            "User-Agent": "Mozilla/5.0 (X11; Linux x86_64; rv:109.0) Gecko/20100101 Firefox/111.0"
        }
    })
        .then(({ data }) => {
        const regex = /s_tt\s*=\s*["']([^"']+)["']/;
        const match = data.match(regex);
        if (match) {
            const value = match[1];
            resolve({ status: "success", result: value });
        }
        else {
            resolve({ status: "error", message: "Failed to get the request form!" });
        }
    })
        .catch((e) => resolve({ status: "error", message: e.message }));
});
const SSSTik = (url) => new Promise(async (resolve, reject) => {
    if (!TiktokURLregex.test(url)) {
        return resolve({
            status: "error",
            message: "Invalid Tiktok URL. Make sure your url is correct!"
        });
    }
    const tt = await fetchTT();
    if (tt.status !== "success")
        return resolve({ status: "error", message: tt.message });
    (0, axios_1.default)(api_1._ssstikapi, {
        method: "POST",
        headers: {
            "Content-Type": "application/x-www-form-urlencoded; charset=UTF-8",
            Origin: api_1._ssstikurl,
            Referer: api_1._ssstikurl + "/en",
            "User-Agent": "Mozilla/5.0 (X11; Linux x86_64; rv:109.0) Gecko/20100101 Firefox/111.0"
        },
        data: new URLSearchParams(Object.entries({
            id: url,
            locale: "en",
            tt: tt.result
        }))
    })
        .then(({ data }) => {
        const $ = (0, cheerio_1.load)(data);
        const desc = $("p.maintext").text().trim();
        const author = {
            avatar: $("img.result_author").attr("src"),
            nickname: $("h2").text().trim()
        };
        const statistics = {
            likeCount: $("#trending-actions > .justify-content-start").text().trim(),
            commentCount: $("#trending-actions > .justify-content-center").text().trim(),
            shareCount: $("#trending-actions > .justify-content-end").text().trim()
        };
        const images = [];
        $("ul.splide__list > li")
            .get()
            .map((img) => {
            images.push($(img).find("a").attr("href"));
        });
        if (images.length !== 0) {
            resolve({
                status: "success",
                result: {
                    type: "image",
                    desc,
                    author,
                    statistics,
                    images,
                    music: $("a.music").attr("href")
                }
            });
        }
        else {
            resolve({
                status: "success",
                result: {
                    type: "video",
                    desc,
                    author,
                    statistics,
                    video: $("a.without_watermark").attr("href"),
                    music: $("a.music").attr("href")
                }
            });
        }
    })
        .catch((e) => resolve({ status: "error", message: e.message }));
});
exports.SSSTik = SSSTik;
