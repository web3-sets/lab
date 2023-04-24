import _ from 'lodash';
import { Interface } from '@ethersproject/abi';
import { SmartContractSet } from '@web3-sets/smart-contract-schema';
import { TransactionDescriptionAndConditionsStatus } from './types';
import {
  compareConditionArgumentToTransactionArgument,
  filterTransactions,
} from './utils';
import { TransactionResponse } from '@ethersproject/providers';
import { SmartContractCondition } from '@web3-sets/smart-contract-schema';

export async function filterTransactionsUsingSmartContractSet(
  set: SmartContractSet,
  transactions: TransactionResponse[],
  filter?: any
): Promise<TransactionDescriptionAndConditionsStatus[] | void> {
  // @ts-ignore
  const { entities, rules, conditions } = set;
  const interfaces: Array<any> = [];
  const filtered: Array<any> = [];
  const parsed: Array<Array<any>> = [];

  /**
   * Entity/Transaction Transformation
   * Using the set entity metadata the contract interface is constructed
   * and used to initialize an Interface object to validate transaction data.
   */
  for (let index = 0; index < entities.length; index++) {
    const _entity = entities[index];
    // @ts-ignore
    interfaces[index] = new Interface(_entity.abi);
    filtered[index] = filterTransactions(transactions, {
      to: _entity.address.toLowerCase(),
    });
    const _filtered = filtered[index];
    /**
     * Parse Transactions
     * The transactions are parsed into structured data objects and attached
     * to the parent transaction hash. The parsed data can easily be compared
     * to the condition(s) argument(s) to determine if the transaction is valid.
     * @dev Transactions with empty data fields are automatically removed.
     */
    parsed[index] = _filtered
      .map((tx: any): any => {
        /**
         * Skip transactions NOT calling a smart contract function.
         * @todo: Handle failure case(s)
         */
        if (tx && tx.data != '0x') {
          const _tx = {
            ...tx,
            data: tx.input || tx.data,
          };
          try {
            const txp = interfaces[index].parseTransaction(_tx);
            return {
              original: tx,
              hash: tx.hash,
              parsed: txp,
            };
            
          } catch (error) {
            return {
              original: tx,
              hash: tx.hash,
            };
          }
        }
      })
      .filter((tx: any) => tx);
  }

  for (let index = 0; index < entities.length; index++) {
    const _entities = entities[index];

    // Filter Conditions targeting the Entity id
    const conditionsForEntity = conditions.filter(
      // @ts-ignore
      condition => condition.eid === _entities.id
    );
    const parsedEntityTxList = parsed[index];
    /**
     * Go through each Entity condition object and filter for transactions
     * that match the condition arguments.
     * @return MatchedConditionState
     */
    const matched = conditionsForEntity.map(
      (condition: SmartContractCondition) => {
        const conditionsMatched = parsedEntityTxList.map((tx: any) => {
          if (
            tx?.parsed &&
            condition?.arguments &&
            tx.parsed.signature === condition.signature
          ) {
            const status = compareConditionArgumentToTransactionArgument(
              tx.parsed,
              condition.arguments
            );
            return {
              id: condition.id,
              eid: condition?.eid || '',
              original: tx.original,
              hash: tx.hash,
              parsed: tx.parsed,
              conditions: status.conditions,
              isComplete: status.isComplete,
            };
          } else {
            return null;
          }
        });
        return _.filter(conditionsMatched, filter);
      }
    );

    // Flatten each Entity condition list into a single list.
    // @ts-ignore
    return _.flatMap(matched, match => _.map(match, cond => cond));
  }
}

export default filterTransactionsUsingSmartContractSet;
