import { TiktokDL } from './dist'

const url = "https://www.tiktok.com/@gorillatiks/video/7219701988232154374"
const result = await TiktokDL(url)
console.log(result)