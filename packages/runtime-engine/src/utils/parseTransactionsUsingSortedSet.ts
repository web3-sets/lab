import { ConstructedSmartContractSet, TransactionAndReceipt } from '../types';

function parseTransactionsUsingConstructedSet(
  transactions: TransactionAndReceipt[],
  entityAndConditionsCollection: ConstructedSmartContractSet
) {
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
        const txp = interfaces[index].parseTransaction(_tx);
        return {
          hash: tx.hash,
          parsed: txp,
        };
      }
    })
    .filter((tx: any) => tx);
}

export default parseTransactionsUsingConstructedSet;
