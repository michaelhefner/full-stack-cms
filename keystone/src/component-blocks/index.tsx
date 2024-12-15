/** @jsxRuntime classic */
/** @jsx jsx */

// import { carousel } from './carousel'
import { media } from './media'
import { callout } from './callout'
import { hero } from './hero'
// import { tweet } from './tweet'
import { youtubeVideo } from './youtube-video'

// it's important that this file has a named export called componentBlocks
// schema.Post.ui.views import looks for a named export `componentBlocks`
export const componentBlocks = {
//   carousel,
  media,
  callout,
  hero,
//   tweet,
  youtubeVideo,
}