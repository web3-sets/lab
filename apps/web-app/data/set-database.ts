import { PoolTogetherOptimismDepositSet, StandWithCryptoSet } from '@web3-sets/smart-contract-sets'

export const setDatabase = [
  {
    id: 'pooltogether-v4',
    version: 'v4',
    name: 'PoolTogether USDC Deposit',
    description: 'Deposit a minimum of 10 USDC into the Optimism PrizePool.',
    // image: '/covers/set-cover-pooltogether.png',
    model: PoolTogetherOptimismDepositSet,
  },
  {
    id: 'stand-with-crypto',
    version: 'v1',
    name: 'Stand With Crypto Shield Mint',
    description: 'Mint Stand with Crypto Shield from Coinbase on the Zora platform.',
    // image: '/covers/set-cover-pooltogether.png',
    model: StandWithCryptoSet,
  },
]
