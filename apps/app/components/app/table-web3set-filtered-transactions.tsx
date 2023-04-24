import React from 'react'

import { Address } from '@turbo-eth/core-wagmi'

import { BranchColorMode } from '../shared/branch-color-mode'
import { LinkComponent } from '../shared/link-component'
import TableCore from '../shared/table/table-core'
import TimeFromEpoch from '../shared/time-from-epoch'

/*
{
    "id": "contract.mint.condition.0",
    "eid": "contract.zora1155",
    "original": {
        "blockNumber": "16953983",
        "timeStamp": "1680348263",
        "hash": "0x682f70e44edd57bdb373e1617b43772607bd70c63f3439499f93ca4a5a797c3f",
        "nonce": "186",
        "blockHash": "0x744b49b093d3e8e3f34d2357cc2839b380f2df8667ad16cf66785cc107ab2ad6",
        "transactionIndex": "101",
        "from": "0x761d584f1c2d43cbc3f42ecd739701a36dffaa31",
        "to": "0x0efdf6e0d0623e58c3a19d025462e2af8f8977d3",
        "value": "5554000000000000",
        "gas": "165055",
        "gasPrice": "18697336424",
        "isError": "0",
        "txreceipt_status": "1",
        "input": "0x731133e90000000000000000000000005ff5a77dd2214d863aca809c0168941052d9b1800000000000000000000000000000000000000000000000000000000000000001000000000000000000000000000000000000000000000000000000000000000200000000000000000000000000000000000000000000000000000000000000800000000000000000000000000000000000000000000000000000000000000020000000000000000000000000761d584f1c2d43cbc3f42ecd739701a36dffaa31",
        "contractAddress": "",
        "cumulativeGasUsed": "8999108",
        "gasUsed": "103774",
        "confirmations": "9832",
        "methodId": "0x731133e9",
        "functionName": "mint(address _to, uint256 _id, uint256 _quantity, bytes _data)"
    },
    "hash": "0x682f70e44edd57bdb373e1617b43772607bd70c63f3439499f93ca4a5a797c3f",
    "parsed": {
        "args": [
            "0x5Ff5a77dD2214d863aCA809C0168941052d9b180",
            {
                "type": "BigNumber",
                "hex": "0x01"
            },
            {
                "type": "BigNumber",
                "hex": "0x02"
            },
            "0x000000000000000000000000761d584f1c2d43cbc3f42ecd739701a36dffaa31"
        ],
        "functionFragment": {
            "type": "function",
            "name": "mint",
            "constant": false,
            "inputs": [
                {
                    "name": "minter",
                    "type": "address",
                    "indexed": null,
                    "components": null,
                    "arrayLength": null,
                    "arrayChildren": null,
                    "baseType": "address",
                    "_isParamType": true
                },
                {
                    "name": "tokenId",
                    "type": "uint256",
                    "indexed": null,
                    "components": null,
                    "arrayLength": null,
                    "arrayChildren": null,
                    "baseType": "uint256",
                    "_isParamType": true
                },
                {
                    "name": "quantity",
                    "type": "uint256",
                    "indexed": null,
                    "components": null,
                    "arrayLength": null,
                    "arrayChildren": null,
                    "baseType": "uint256",
                    "_isParamType": true
                },
                {
                    "name": "minterArguments",
                    "type": "bytes",
                    "indexed": null,
                    "components": null,
                    "arrayLength": null,
                    "arrayChildren": null,
                    "baseType": "bytes",
                    "_isParamType": true
                }
            ],
            "outputs": [],
            "payable": true,
            "stateMutability": "payable",
            "gas": null,
            "_isFragment": true
        },
        "name": "mint",
        "signature": "mint(address,uint256,uint256,bytes)",
        "sighash": "0x731133e9",
        "value": {
            "type": "BigNumber",
            "hex": "0x13bb5565152000"
        }
    },
    "conditions": [
        true
    ],
    "isComplete": true
}
*/

export function TableWeb3SetFilteredTransaction({ data, className }: any) {
  const columns = React.useMemo(
    () => [
      {
        Header: 'from',
        accessor: 'original.from',
        Cell: (props: any) => <Address address={props.value} truncate className="text-sm font-medium" />,
      },
      {
        Header: 'to',
        accessor: 'original.to',
        Cell: (props: any) => <Address address={props.value} truncate className="text-sm font-medium" />,
      },
      {
        Header: 'id',
        accessor: 'id',
        Cell: (props: any) => <Address address={props.value} truncate className="text-sm font-medium" />,
      },
      {
        Header: 'Entity',
        accessor: 'eid',
        Cell: (props: any) => <Address address={props.value} truncate className="text-sm font-medium" />,
      },
      {
        Header: 'Created',
        accessor: 'original.timeStamp',
        Cell: (props: any) => <TimeFromEpoch epoch={props.value || 0} />,
      },
      {
        Header: () => null,
        accessor: 'id-test',
        Cell: (props: any) => (
          <div className="">
            <LinkComponent href={`https://etherscan.io/tx/${props?.row?.original?.hash}`}>
              <BranchColorMode>
                <img src="/integrations/etherscan-dark.svg" className="h-6 w-6" />
                <img src="/integrations/etherscan-light.svg" className="h-6 w-6" />
              </BranchColorMode>
            </LinkComponent>
          </div>
        ),
      },
    ],
    []
  )
  if (!data) return null
  return <TableCore columns={columns} data={data} className={className} />
}
