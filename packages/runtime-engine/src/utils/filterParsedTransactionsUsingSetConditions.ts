// @ts-nocheck
import { TransactionDescription } from '@ethersproject/abi';
import { SmartContractCondition } from '@web3-sets/smart-contract-schema';

export async function filterParsedTransactionsUsingSetConditions(
  parsedTransactions: TransactionDescription[],
  conditions: SmartContractCondition[]
): Promise<any> {
  // Find conditions that are met using parsed transactions
  const functionConditions = conditions.filter(
    condition => condition.accesor === 'input'
  );

  // Using the parsed transactions, find the conditions that are met.
  let filtered = [];
  functionConditions.forEach(condition => {
    const { operations: conditionArguments } = condition;
    filtered = parsedTransactions.filter(tx => {
      const isMatch = tx.name === condition.name;
      const answer = conditionArguments.filter(arg => {
        const { index, value, type, condition } = arg;
        const txInputValue = tx.args[index];
      });
      return isMatch && answer;
    });
  });
  return filtered;
}

export default filterParsedTransactionsUsingSetConditions;
