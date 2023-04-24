export const zora1155PoolyForThePeople = {
  id: 'set.zora1155.poolyForThePeople.mint',
  object: 'set',
  name: 'Pooly For the People Mint',
  description: 'Mint a Pooly For the People NFT',
  keywords: ['pooly', 'zora', 'nft', 'erc1155', 'digital collectible'],
  tags: {
    defi: {
      name: 'DeFi',
      description: 'Decentralized finance on the Ethereum blockchain',
    },
  },
  version: {
    major: 0,
    minor: 0,
    patch: 0,
  },
  entities: [
    {
      id: 'contract.zora1155',
      name: 'Zora 1155 : Pooly For the People',
      type: 'entity.smartcontract',
      chainId: 1,
      address: '0x0efdf6e0d0623e58c3a19d025462e2af8f8977d3',
      abi: [
        {
          inputs: [
            {
              internalType: 'address',
              name: 'minter',
              type: 'address',
            },
            {
              internalType: 'uint256',
              name: 'tokenId',
              type: 'uint256',
            },
            {
              internalType: 'uint256',
              name: 'quantity',
              type: 'uint256',
            },
            {
              internalType: 'bytes',
              name: 'minterArguments',
              type: 'bytes',
            },
          ],
          name: 'mint',
          outputs: [],
          stateMutability: 'payable',
          type: 'function',
        },
      ],
    },
  ],
  conditions: [
    {
      id: 'contract.mint.condition.0',
      eid: 'contract.zora1155',
      name: 'Zora 1155 | Pooly For the People | Mint Condition GTE 1',
      type: 'transaction',
      target: 'contract.zora1155',
      signature: 'mint(address,uint256,uint256,bytes)',
      arguments: [
        {
          index: 2,
          type: 'bignumber',
          condition: 'gte',
          value: '1',
        },
      ],
    },
  ],
  rules: [
    {
      id: 'contract.zora1155.mint.rule.0',
      type: 'rule.smartcontract',
      condition: 'complete',
      targets: ['contract.mint.condition.0'],
    },
  ],
}
