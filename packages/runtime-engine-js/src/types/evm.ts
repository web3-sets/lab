import { TransactionDescription } from '@ethersproject/abi'
import { BigNumberish } from '@ethersproject/bignumber'
import { Provider } from '@ethersproject/providers'
import { AccessListish } from '@ethersproject/transactions'

interface Condition {
  type: 'address' | 'bytes' | 'string' | 'bignumber'
  condition: string
  value: string
  index: number
  valueFormatted?: any
}

export interface ParsedLog {
  name: string
  signature: string
  topic: string
  args: any
  blockNumber: number
  blockHash: string
  transactionIndex: number
  removed?: boolean
  address: string
  data: string
  topics: string[]
  transactionHash: string
  logIndex: number
}

export interface ConditionStatus {
  conditions: Condition[]
  isComplete: boolean
}

export interface Log {
  blockNumber: number
  blockHash: string
  transactionIndex: number
  removed?: boolean
  address: string
  data: string
  topics: string[]
  transactionHash: string
  logIndex: number
}

export interface TransactionDescriptionAndConditionsStatus {
  id: string
  target: string
  hash: string
  parsed: TransactionDescription
  conditions: Condition[]
  isComplete: boolean
  address: string
}

export interface TransactionAndReceipt {
  hash?: string
  to?: string
  from?: string
  nonce: number
  gasLimit: BigNumberish | object
  gasPrice?: BigNumberish | object
  data: string
  value: BigNumberish | object
  chainId: number
  r?: string
  s?: string
  v?: number
  type?: number | null
  accessList?: AccessListish
  maxPriorityFeePerGas?: BigNumberish | object
  maxFeePerGas?: BigNumberish | object
  contractAddress: string
  transactionIndex: number
  root?: string
  gasUsed: BigNumberish | object
  logsBloom: string
  blockHash: string
  transactionHash: string
  logs: Log[]
  blockNumber?: number
  confirmations?: number
  cumulativeGasUsed?: BigNumberish | object
  effectiveGasPrice?: BigNumberish | object
  byzantium: boolean
  status?: number
}

export interface ProvidersList {
  [key: number]: Provider
}

export interface ContractRead {
  conditionId: string
  value: any
  inputs: any[]
  encoded: string
}

export interface EVMState {
  transactions: TransactionAndReceipt[]
  logs: ParsedLog[]
  receipts: TransactionAndReceipt[]
  proofs: any[]
}
