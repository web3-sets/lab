import { BigNumberish } from '@ethersproject/bignumber';
import { Interface, TransactionDescription } from '@ethersproject/abi';
import { AccessListish } from '@ethersproject/transactions';
import { Provider } from '@ethersproject/providers';
import {
  SmartContractCondition,
  SmartContractEntity,
  SmartContractRule,
} from '@web3-sets/smart-contract-schema';

export interface Log {
  blockNumber: number;
  blockHash: string;
  transactionIndex: number;
  removed?: boolean;
  address: string;
  data: string;
  topics: Array<string>;
  transactionHash: string;
  logIndex: number;
}

export interface URIObject {
  schema: string;
  path: string;
}

export interface ValidationContext {
  object: 'smartcontract' | 'did' | 'meta';
  value: string;
}

export interface ValidationSmartContract {
  address: string;
  transactions?: Array<any>;
}

interface Condition {
  type: 'address' | 'bytes' | 'string' | 'bignumber';
  condition: string;
  value: string;
  index: number;
  valueFormatted?: any;
}

export interface ConditionStatus {
  conditions: Condition[];
  isComplete: boolean;
}

export interface TransactionDescriptionAndConditionsStatus {
  id: string;
  target: string;
  hash: string;
  parsed: TransactionDescription;
  conditions: Condition[];
  isComplete: boolean;
  address: string;
}

export interface TransactionAndReceipt {
  hash?: string;
  to?: string;
  from?: string;
  nonce: number;
  gasLimit: BigNumberish | object;
  gasPrice?: BigNumberish | object;
  data: string;
  value: BigNumberish | object;
  chainId: number;
  r?: string;
  s?: string;
  v?: number;
  type?: number | null;
  accessList?: AccessListish;
  maxPriorityFeePerGas?: BigNumberish | object;
  maxFeePerGas?: BigNumberish | object;
  contractAddress: string;
  transactionIndex: number;
  root?: string;
  gasUsed: BigNumberish | object;
  logsBloom: string;
  blockHash: string;
  transactionHash: string;
  logs: Array<Log>;
  blockNumber?: number;
  confirmations?: number;
  cumulativeGasUsed?: BigNumberish | object;
  effectiveGasPrice?: BigNumberish | object;
  byzantium: boolean;
  status?: number;
}

export interface ProvidersList {
  [key: number]: Provider;
}

export interface ContractRead {
  conditionId: string;
  value: any;
  inputs: any[];
  encoded: string;
}

export interface EVMState {
  transactions: TransactionAndReceipt[];
  logs: ParsedLog[];
  providers: ProvidersList;
  parsed: {
    reads: ContractRead[];
    transactions: any;
    logs: any;
  };
}

export interface ParsedLog {
  name: string;
  signature: string;
  topic: string;
  args: any;
  blockNumber: number;
  blockHash: string;
  transactionIndex: number;
  removed?: boolean;
  address: string;
  data: string;
  topics: Array<string>;
  transactionHash: string;
  logIndex: number;
}

type ConstructedStatus =
  | 'sorted' // Sort the Set JSON object for better functional application of set modifiers
  | 'constructed' // Constructs JSON entity object into JS class instances
  | 'injected' // Injects EVM state (transactions, logs and providers) into constructed set
  | 'fetched' // Fetch stateful conditions data from an EVM RPCProvider URI
  | 'parsed' // Parse transaction/log/state bytecode into qualitative entity JS objects/instances
  | 'filtered' // Apply conditionals to computed Entity/State collections
  | string;

export interface ConstructedSmartContractSet {
  collections: EntityCollection[];
  status: ConstructedStatus;
  rules: SmartContractRule[];
}

export interface ConditionMatch {
  conditionId: string;
  stateId: any; // hash/address/etc...
  isComplete: boolean;
  conditions: Array<boolean>;
}

export enum ConditionStateMatchObject {
  Transaction = 'match.transaction',
  Log = 'match.log',
  Read = 'match.read',
}

export interface ConditionStateMatch {
  id: string;
  matches: Array<{
    object: ConditionStateMatchObject;
    conditionId: string;
    stateId: string;
    isComplete: boolean;
    conditions: Array<boolean>;
  }>;
}

export interface EntityCollection {
  entity: SmartContractEntity;
  conditions: SmartContractCondition[];
  interface?: Interface;
  state: EVMState;
  computed: {
    transactions: ConditionStateMatch[];
    logs: ConditionStateMatch[];
    reads: ConditionStateMatch[];
  };
  progress: any;
  metadata: any;
}

export interface SmartContractSetValidationResult {
  setId: string;
  ruleId: string;
  conditionIds: string[];
  eidsWithAttachedConditionIds: Array<{
    eid: string;
    conditionIds: string[];
  }>;
  conditionsTotal: number;
  conditionsPassed: number;
  isComplete: boolean;
  state: EVMState;
}

export interface RuleValidation {
  ruleId: string;
  isPassing: boolean;
  ranges: Array<RuleRangeValidation>;
}

export interface RuleRangeValidation {
  isPassing: boolean;
  matches: Array<string>;
}
