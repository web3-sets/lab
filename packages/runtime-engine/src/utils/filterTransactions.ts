import _ from 'lodash';
import { TransactionResponse } from '@ethersproject/providers';

export function filterTransactions(
  transactions: TransactionResponse[],
  filter: any
) {
  return _.filter(transactions, filter);
}

export default filterTransactions;
