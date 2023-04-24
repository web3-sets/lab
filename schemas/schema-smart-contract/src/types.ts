
export interface Version {
  major: number;
  minor: number;
  patch: number;
}

export interface Tags {
  [tagId: string]: {
    name: string;
    description: string;
  };
}

export interface Entity {
  id: string;
  name: string;
  object: string;
}

export interface Set {
  id: string;
  name: string;
  object: string;
  createdAt: string;
  version: Version;
  description?: string;
  keywords?: string[];
  tags?: Tags;
  contentUri?: string;
}

export enum VersionUpgrade {
  NONE,
  PATCH,
  MINOR,
  MAJOR,
}

/* =================================================== */
/* Smart Contract Set ================================ */
/* =================================================== */

export interface SmartContractSet extends Set {
  entities: SmartContractEntity[];
  conditions: SmartContractCondition[];
  rules: SmartContractRule[];
}

export interface SmartContractEntity {
  id: string;
  name: string;
  object: string;
  address: string;
  chainId: number;
  abi: any;
  meta?: any;
}

export type SmartContractCondition = {
  id: string;
  name: string;
  eid: string;
  type: SmartContractConditionType | string;
  signature: string;
  arguments: SmartContractConditionArgument[];
  inputs?: SmartContractConditionInput[];
};

export type SmartContractConditionArgument = {
  index: number;
  type: SmartContractConditionArgumentTypes;
  comparator: SmartContractConditionArgumentComparator;
  value: string;
};

export type SmartContractConditionInput = {
  index: number;
  object: string;
  type: SmartContractConditionArgumentTypes;
  value: string;
};

export interface SmartContractRule {
  id: string;
  name?: string;
  cids?: Array<string>;
  ranges: Range;
  methods?: Array<string>;
  inputs?: Array<Array<any>>;
}

export enum SmartContractConditionType {
  Transaction = 'transaction',
  Log = 'log',
  Read = 'read',
}

export type Range =
  | 'any'
  | 'all'
  | Number
  | Array<Number>
  | Array<Array<Number>>
  | string

export type SmartContractConditionArgumentTypes =
  | 'address'
  | 'bignumber'
  | 'bool'
  | 'bytes'
  | 'bytes32'
  | 'uint'
  | 'uint8'
  | 'uint256'
  | 'string'
  | string;

export type SmartContractConditionArgumentComparator =
  | 'eq'
  | 'gt'
  | 'gte'
  | 'lt'
  | 'lte'
  | 'neq'
  | 'checksum'
  | string;

export type SmartContracRuleValidation =
  | 'complete'
  | 'all'
  | 'minimumConfirmations'
  | 'beforeTimestamp'
  | 'afterTimestamp'
  | 'beforeBlock'
  | 'afterBlock'
  | 'minimumComplete'
  | 'percentageComplete'
  | 'container'
  | string;

/* =================================================== */
/* Meta Set ========================================== */
/* =================================================== */

export interface MetaSet extends Set {
  entities: MetaEntity[];
  conditions: MetaCondition[];
  rules: MetaRule[];
}

export interface MetaEntity {
  id: string;
  name: string;
  type: string;
  description?: string;
}

export interface MetaCondition {
  id: string;
  name: string;
  type: string;
  eid: string;
  arguments: MetaConditionArgument[];
}

export interface MetaConditionArgument {
  index: number;
  type: string;
  condition: SmartContractConditionArgumentComparator;
  value: string;
}

export interface MetaRule {
  id: string;
  name: string;
  type: string;
  condition: string;
}
