import { createPublicClient, http } from 'viem'
import { mainnet } from 'viem/chains'

export const clientMainnet = createPublicClient({
  chain: mainnet,
  transport: http(),
})
