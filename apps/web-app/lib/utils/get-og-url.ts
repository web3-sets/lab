import { addHttpsPrefix } from './add-https-prefix'

export function getOgUrl() {
  const url = process.env.NEXT_PUBLIC_APP_URL || process.env.VERCEL_URL || 'http://localhost:3000'
  return new URL(`${addHttpsPrefix(url)}/api/og`)
}
