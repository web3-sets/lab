export async function fetchAbiFromUri(uri: string): Promise<any | void> {
  if (typeof uri === 'string') {
    const protocol = uri.split(':')[0]
    switch (protocol) {
      case 'http':
      case 'https': {
        const res = await fetch(uri)
        if (res.status === 200) {
          return res.json()
        } else {
          throw new Error(`Could not fetch resource from ${uri}`)
        }
      }
      case 'ipfs': {
        const hash = uri.split('://')[1]
        const res = await fetch(
          `https://red-effective-snake-988.mypinata.cloud/ipfs/${hash}`,
        )
        if (res.status === 200) {
          return res.json()
        } else {
          throw new Error(`Could not fetch resource from ${uri}`)
        }
      }
      default:
        throw new Error(`Unsupported protocol: ${protocol}`)
    }
  } else {
    throw new Error('Invalid ABI URI reference')
  }
}
