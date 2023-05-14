import { z } from 'zod'

export enum ConditionStateMatchObject {
  Transaction = 'transaction',
  Log = 'log',
  Read = 'read',
}

export const EntityParser = z.object({
  address: z.string(),
  chainId: z.number(),
  name: z.string(),
  abi: z.any(), // TODO: Use https://abitype.dev/
})

export type Entity = z.infer<typeof EntityParser>

export const ConditionArgumentParser = z.object({
  index: z.number(),
  type: z.string(),
  condition: z.string(),
  value: z.string(),
})

export type ConditionArgument = z.infer<typeof ConditionArgumentParser>

const ConditionInputParser = z.object({
  index: z.string(),
  object: z.string(),
  type: z.string(),
  value: z.string(),
})

export type ConditionInput = z.infer<typeof ConditionInputParser>

export const ConditionParser = z.object({
  id: z.string(),
  name: z.string(),
  eid: z.string(),
  type: z.string(),
  signature: z.string(),
  args: z.array(ConditionArgumentParser),
})

export type Condition = z.infer<typeof ConditionParser>

export const RuleParser = z.object({
  id: z.string(),
  cid: z.array(z.string()),
  operations: z.array(
    z.enum([
      'isComplete',
      'beforeTimestamp',
      'afterTimestamp',
      'beforeBlock',
      'afterBlock',
    ]),
  ),
  args: z.array(z.array(z.any())),
  range: z.array(z.number().min(0).max(100)),
})

export type Rule = z.infer<typeof RuleParser>

export const SmartContractSetParser = z.object({
  name: z.string(),
  description: z.string(),
  entities: z.array(EntityParser),
  conditions: z.array(ConditionParser),
  rules: z.array(RuleParser),
})

export type SmartContractSet = z.infer<typeof SmartContractSetParser>

export const ActionObserverParser = z.object({
  id: z.string(),
  cid: z.string(),
  rid: z.string(),
  isSuccess: z.boolean(),
  object: z.enum(['transaction']),
  data: z.object({
    matched: z.number(),
    total: z.number(),
    conditions: z.array(z.any()),
  }),
  reference: z.any(),
})

export type ActionObserver = z.infer<typeof ActionObserverParser>

export const ConditionWithMatchesParser = z.object({
  id: z.string(),
  cid: z.string(),
  isSuccess: z.boolean(),
  matches: z.array(ActionObserverParser),
})

export type ConditionWithMatches = z.infer<typeof ConditionWithMatchesParser>

export const AnalysisParser = z.object({
  isSuccess: z.boolean(),
  data: z.array(ConditionWithMatchesParser),
})

export type Analysis = z.infer<typeof AnalysisParser>
