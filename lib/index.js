"use strict";
const musicalDown_1 = require("./utils/downloader/musicalDown");
const ssstik_1 = require("./utils/downloader/ssstik");
const tiktokApi_1 = require("./utils/downloader/tiktokApi");
const stalker_1 = require("./utils/search/stalker");
const userSearch_1 = require("./utils/search/userSearch");
module.exports = {
    Downloader: async (url, options) => {
        switch (options?.version) {
            case "v1": {
                const response = await (0, tiktokApi_1.TiktokAPI)(url);
                return response;
            }
            case "v2": {
                const response = await (0, ssstik_1.SSSTik)(url);
                return response;
            }
            case "v3": {
                const response = await (0, musicalDown_1.MusicalDown)(url);
                return response;
            }
            default: {
                const response = await (0, tiktokApi_1.TiktokAPI)(url);
                return response;
            }
        }
    },
    Search: async (query, options) => {
        switch (options?.type) {
            case "user": {
                const response = await (0, userSearch_1.SearchUser)(query, options?.cookie, options?.page);
                return response;
            }
            default: {
                const response = await (0, userSearch_1.SearchUser)(query, options?.cookie, options?.page);
                return response;
            }
        }
    },
    StalkUser: async (username, options) => {
        const response = await (0, stalker_1.StalkUser)(username, options?.cookie, options?.postLimit);
        return response;
    }
};
