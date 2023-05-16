import { DiscoDistrictSet, PoolTogetherOptimismDepositSet, RainbowFiniliarSet, StandWithCryptoSet } from '@web3-sets/smart-contract-sets'

export const setDatabase = [
  {
    id: 'pooltogether-v4',
    version: 'v4',
    name: 'PoolTogether USDC Deposit',
    description: 'Deposit a minimum of 10 USDC into the Optimism PrizePool.',
    image: '/images/preview-pooltogether.png',
    model: PoolTogetherOptimismDepositSet,
  },
  {
    id: 'stand-with-crypto',
    version: 'v1',
    name: 'Stand With Crypto Shield Mint',
    description: 'Mint Stand with Crypto Shield by Coinbase.',
    image: '/images/preview-stand-with-crypto.png',
    model: StandWithCryptoSet,
  },
  {
    id: 'finiliar-rainbow',
    version: 'v1',
    name: RainbowFiniliarSet.name,
    description: RainbowFiniliarSet.description,
    image: '/images/preview-rainbow-finiliar.png',
    model: RainbowFiniliarSet,
  },
  {
    id: 'disco-district',
    version: 'v1',
    name: DiscoDistrictSet.name,
    description: DiscoDistrictSet.description,
    image: '/images/preview-disco-district.png',
    model: DiscoDistrictSet,
  },
]
