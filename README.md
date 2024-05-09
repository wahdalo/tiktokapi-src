<h1 align="center">
 Unofficial Tiktok API Scraper
</h1>

<div align="center">
  <a href="https://www.npmjs.com/package/tiktokapi-src" title="npm"><img src="https://nodei.co/npm/tiktokapi-src.png?downloads=true&downloadRank=true&stars=true"></img></a>
</div>

<br>

# Description

This project uses the Unofficial API from Tiktok.

- Can be used to download videos, images / slides and music from Tiktok
- No login or password are required

## Install From NPM

```
npm install tiktokapi-src
```

## Install From YARN

```
yarn add tiktokapi-src
```

# Examples

## Tiktok Downloader

- V1 uses the API from TiktokAPI
- V2 uses the API from [SSSTik](https://ssstik.io/)
- V3 uses the API from [MusicalDown](https://musicaldown.com/)

```js
const Tiktok = require("tiktokapi-src")

const tiktok_url = "https://vt.tiktok.com/ZS84BnrU9"

Tiktok.Downloader(tiktok_url, {
  version: "v1" //  version: "v1" | "v2" | "v3"
}).then((result) => {
  console.log(result)
})
```

# Response

<br>
<details>
  <summary><b>Tiktok Downloader V1</b></summary>
  <br>

```ts
{
  status: "success" | "error"
  message?: string
  result?: {
    type: "video" | "image"
    id: string
    createTime: number
    description: string
    isADS: boolean
    hashtag: string[]
    author: {
      uid: string
      username: string
      nickname: string
      signature: string
      region: string
      avatarLarger: string
      avatarThumb: string
      avatarMedium: string
      url: string
    }
    statistics: {
      playCount: number
      downloadCount: number
      shareCount: number
      commentCount: number
      diggCount: number
      collectCount: number
      forwardCount: number
      whatsappShareCount: number
      loseCount: number
      loseCommentCount: number
      whatsappShareCount: number
      repostCount: number
    }
    video?: {
      ratio: string
      duration: number
      playAddr: string
      downloadAddr: string
      cover: string
      originCover: string
      dynamicCover: string
    }
    images?: string[]
    music: {
      id: number
      title: string
      author: string
      album: string
      playUrl: string[]
      coverLarge: string[]
      coverMedium: string[]
      coverThumb: string[]
      duration: number
      isCommerceMusic: boolean
      isOriginalSound: boolean
      isAuthorArtist: boolean
    }
  }
}
```

</details>
<details>
  <summary><b>Tiktok Downloader V2</b></summary>
  <br>

```ts
{
  status: "success" | "error"
  message?: string
  result?: {
    type: "video" | "image"
    description: string
    author: {
      nickname: string
      avatr: string
    }
    statistics: {
      likeCount: string
      commentCount: string
      shareCount: string
    }
    video?: string
    images?: string[]
    music: string
  }
}
```

</details>
<details>
  <summary><b>Tiktok Downloader V3</b></summary>
  <br>

```ts
{
  status: "success" | "error"
  message?: string
  result?: {
    type: "video" | "image"
    desc?: string
    author: {
      avatar?: string
      nickname: string
    }
    music?: string
    images?: string[]
    video1?: string
    video2?: string
    video_hd?: string
    video_watermark?: string
  }
}
```

</details>
<br>