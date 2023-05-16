import { DiscoDistrictSet, PoolTogetherOptimismDepositSet, RainbowFiniliarSet, StandWithCryptoSet } from '@web3-sets/smart-contract-sets'

export const setDatabase = [
  {
    id: 'pooltogether-v4',
    version: 'v4',
    name: 'PoolTogether $10 USDC Deposit',
    description: 'Deposit a minimum of 10 USDC into the Optimism network PrizePool.',
    image: '/images/preview-pooltogether.png',
    model: PoolTogetherOptimismDepositSet,
    url: 'https://app.pooltogether.com',
  },
  {
    id: 'stand-with-crypto',
    version: 'v1',
    name: 'Stand With Crypto Shield Mint',
    description: 'Mint Stand with Crypto Shield by Coinbase.',
    image: '/images/preview-stand-with-crypto.png',
    model: StandWithCryptoSet,
    url: 'https://zora.co/collect/0x9d90669665607f08005cae4a7098143f554c59ef',
  },
  {
    id: 'finiliar-rainbow',
    version: 'v1',
    name: RainbowFiniliarSet.name,
    description: RainbowFiniliarSet.description,
    image: '/images/preview-rainbow-finiliar.png',
    model: RainbowFiniliarSet,
    url: 'https://zora.co/collect/0xc5f18a7bf825c2b0433102da5bc79c9edfc3fa89',
  },
  {
    id: 'disco-district',
    version: 'v1',
    name: DiscoDistrictSet.name,
    description: DiscoDistrictSet.description,
    image: '/images/preview-disco-district.png',
    model: DiscoDistrictSet,
    url: 'https://disco.districtlabs.com',
  },
]
