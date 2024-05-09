import { MusicalDownResponse } from "./types/downloader/musicaldown";
import { SSSTikResponse } from "./types/downloader/ssstik";
import { TiktokAPIResponse } from "./types/downloader/tiktokApi";
import { TiktokUserSearchResponse } from "./types/search/userSearch";
import { StalkResult } from "./types/search/stalker";
type TiktokDownloaderResponse<T extends "v1" | "v2" | "v3"> = T extends "v1" ? TiktokAPIResponse : T extends "v2" ? SSSTikResponse : T extends "v3" ? MusicalDownResponse : TiktokAPIResponse;
type TiktokSearchResponse<T extends "user" | "video"> = T extends "user" ? TiktokUserSearchResponse : T extends "video" ? any : TiktokUserSearchResponse;
declare const _default: {
    Downloader: <T extends "v1" | "v2" | "v3">(url: string, options?: {
        version: T;
    }) => Promise<TiktokDownloaderResponse<T>>;
    Search: <T_1 extends "video" | "user">(query: string, options: {
        type: T_1;
        cookie?: string;
        page?: number;
    }) => Promise<TiktokSearchResponse<T_1>>;
    StalkUser: (username: string, options?: {
        cookie?: string;
        postLimit?: number;
    }) => Promise<StalkResult>;
};
export = _default;
