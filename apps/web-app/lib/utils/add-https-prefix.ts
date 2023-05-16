export function addHttpsPrefix(url?: string | null) {
  if (!url) return ''
  if (!url.startsWith('http://') && !url.startsWith('https://')) {
    url = 'https://' + url
  }
  return url
}
