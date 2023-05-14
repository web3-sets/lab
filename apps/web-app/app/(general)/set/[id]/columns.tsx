'use client'
import { ColumnDef } from '@tanstack/react-table'
import etherscanLink from '@web3-sets/etherscan-link'
import { ActionObserver } from '@web3-sets/runtime-engine-js'

export const columnsActionObservers: ColumnDef<ActionObserver>[] = [
  {
    accessorKey: 'isSuccess',
    header: 'Status',
  },
  {
    accessorKey: 'reference.timeStamp',
    header: 'Timestamp',
  },
  {
    accessorKey: 'rid',
    header: 'Rule ID',
  },
  {
    accessorKey: 'cid',
    header: 'Condition ID',
  },
  {
    accessorKey: 'reference.hash',
    header: 'Actions',
    cell: ({ getValue, row }: any) => {
      const value = getValue()
      const txtLinkForChain = etherscanLink.createExplorerLink(value, row?.original?.chainId)
      return (
        <a href={txtLinkForChain} target="_blank" rel="noreferrer">
          <button className="inline-flex items-center rounded bg-gray-200 py-2 px-4 font-bold text-gray-800 hover:bg-gray-300">
            <span>View on Etherscan</span>
          </button>
        </a>
      )
    },
  },
]
