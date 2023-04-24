export const uniswapV2SwapForEth = {
  id: 'set.uniswapv2.swapForEth',
  object: 'set',
  name: 'UniswapV2: Swap for ETH',
  description: 'Swap any token for minimum 1 ETH using Uniswap',
  keywords: ['defi', 'uniswap'],
  timestamp: '2018-11-13T20:20:39+00:00',
  tags: {
    defi: {
      name: 'DeFi',
      description: 'Decentralized finance on the Ethereum blockchain',
    },
  },
  version: {
    major: 0,
    minor: 1,
    patch: 0,
  },
  entities: [
    {
      id: 'contract.uniswap.v2.swapRouter',
      name: 'Uniswap V2 SwapRouter',
      type: 'entity.smartcontract',
      chainId: 1,
      address: '0x7a250d5630B4cF539739dF2C5dAcb4c659F2488D',
      abi: [
        {
          inputs: [
            {
              internalType: 'uint256',
              name: 'amountIn',
              type: 'uint256',
            },
            {
              internalType: 'uint256',
              name: 'amountOutMin',
              type: 'uint256',
            },
            {
              internalType: 'address[]',
              name: 'path',
              type: 'address[]',
            },
            {
              internalType: 'address',
              name: 'to',
              type: 'address',
            },
            {
              internalType: 'uint256',
              name: 'deadline',
              type: 'uint256',
            },
          ],
          name: 'swapExactTokensForETH',
          outputs: [
            {
              internalType: 'uint256[]',
              name: 'amounts',
              type: 'uint256[]',
            },
          ],
          stateMutability: 'nonpayable',
          type: 'function',
        },
      ],
    },
  ],
  conditions: [
    {
      id: 'contract.uniswap.v2.swapRouter.condition.0',
      name: 'Uniswap.exactOutput: Swap for 0.001 ETH (gte)',
      type: 'condition.smartcontract.function',
      target: 'contract.uniswap.v2.swapRouter',
      signature: 'swapExactTokensForETH(uint256,uint256,address[],address,uint256)',
      arguments: [
        {
          index: 1,
          type: 'bignumber',
          condition: 'gte',
          value: '100000000000000000',
        },
      ],
    },
  ],
  rules: [
    {
      id: 'contract.uniswap.routerv2.swap.rule.0',
      type: 'rule.smartcontract',
      condition: 'complete',
      targets: ['contract.uniswap.v2.swapRouter.condition.0'],
    },
  ],
}
