"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SearchUser = void 0;
const axios_1 = __importDefault(require("axios"));
const api_1 = require("../../constants/api");
const params_1 = require("../../constants/params");
const SearchUser = (username, cookie, page) => new Promise(async (resolve, reject) => {
    (0, axios_1.default)((0, api_1._tiktokSearchUserFull)((0, params_1._userSearchParams)(username, page)), {
        method: "GET",
        headers: {
            "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/122.0.0.0 Safari/537.36 Edg/122.0.0.0",
            cookie: typeof cookie === "object" ? cookie.map((v) => `${v.name}=${v.value}`).join("; ") : cookie
        }
    })
        .then(({ data }) => {
        if (data.status_code !== 0)
            return resolve({ status: "error", message: "Failed to find user. Make sure the keywords you are looking for are correct..." });
        const result = [];
        for (let i = 0; i < data.user_list.length; i++) {
            const user = data.user_list[i];
            result.push({
                uid: user.user_info.uid,
                username: user.user_info.unique_id,
                nickname: user.user_info.nickname,
                signature: user.user_info.signature,
                followerCount: user.user_info.follower_count,
                avatarThumb: user.user_info.avatar_thumb,
                isVerified: user.custom_verify !== "",
                secUid: user.user_info.sec_uid,
                url: `${api_1._tiktokurl}/@${user.user_info.unique_id}`
            });
        }
        resolve({ status: "success", result });
    })
        .catch((e) => {
        resolve({ status: "error", message: e.message });
    });
});
exports.SearchUser = SearchUser;
