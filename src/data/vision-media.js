/**
 * Vision ページのメディア設定。
 * public/vision/ にファイルを置くか、Cloudinary 等の URL を指定してください。
 *
 * type: 'image' | 'video'
 * src が空の場合はそのブロックは表示されません。
 */
export const visionMedia = {
  intro: {
    type: 'video',
    src: '',
    poster: ''
  },
  nexus: {
    type: 'image',
    src: ''
  },
  skyhook: {
    type: 'video',
    src: '',
    poster: ''
  },
  fusion: {
    type: 'image',
    src: ''
  },
  marsColonization: {
    type: 'image',
    src: ''
  },
  mars: {
    type: 'image',
    src: ''
  },
  blackhole: {
    type: 'image',
    src: ''
  }
}

export function hasVisionMedia(key) {
  const media = visionMedia[key]
  return Boolean(media?.src)
}
