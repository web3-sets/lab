import { ConditionParser, RuleParser } from './core'
import { z } from 'zod'

export const TransactionParsedParser = z.object({
  hash: z.string(),
  functionName: z.string(),
  args: z.array(z.any()),
})

export type TransactionParsed = z.infer<typeof TransactionParsedParser>

export const TransactionMatchedParser = z.object({
  isSuccess: z.boolean(),
  cid: z.string(), // Transaction hash
  object: z.string(), // Transaction
  hash: z.string(), // Transaction function name
  data: z.object({
    matched: z.number(),
    total: z.number(),
    conditions: z.array(z.boolean()),
  }),
})

export type TransactionMatched = z.infer<typeof TransactionMatchedParser>

export const EntityHydratedParser = z.object({
  name: z.string(),
  address: z.string(),
  chainId: z.number(),
  abi: z.any(), // TODO: Use https://abitype.dev/
  conditions: z.array(ConditionParser),
  state: z.object({
    raw: z.object({
      transactions: z.array(z.any()),
      // TODO: Implment logs, receipts, storage proofs
    }),
    parsed: z.object({
      transactions: z.array(TransactionParsedParser).nullable(),
    }),
  }),
  matches: z.object({
    transactions: z.array(TransactionMatchedParser).nullable(),
  }),
})

export type EntityHydrated = z.infer<typeof EntityHydratedParser>

const SmartContractSetHydratedParser = z.object({
  entities: z.array(EntityHydratedParser),
  clients: z.array(z.any()), // Client[]
  rules: z.array(RuleParser),
})

export type SmartContractSetHydrated = z.infer<
  typeof SmartContractSetHydratedParser
>
