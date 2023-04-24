import { JsonRpcProvider } from '@ethersproject/providers';
import sortSmartContractSet from '../../src/utils/sortSmartContractSet';
import constructSortedSmartContractSet from '../../src/mutations/constructSortedSmartContractSet';
import injectStateInConstructedSmartContractSet from '../../src/mutations/injectStateInConstructedSmartContractSet';
import parseStateInConstructedSmartContractSet from '../../src/mutations/parseStateInConstructedSmartContractSet';
import fetchAdditionalStateForInjectedSmartContractSet from '../../src/fetching/fetchAdditionalStateForInjectedSmartContractSet';
import filterParsedStateMatchingSmartContractSetConditions from '../../src/mutations/filterParsedStateMatchingSmartContractSetConditions';

import logs from '../../data/state/erc20.logs.json';
import transactions from '../../data/state/erc20.transactions.json';
import set from '../../data/sets/set.smartcontract.ERC20.json';

describe('filterParsedStateMatchingSmartContractSetConditions', () => {
  it('should export injectStateInConstructedSmartContractSet from src', () => {
    expect(injectStateInConstructedSmartContractSet).toBeDefined();
  });

  it('should successfully construct a sorted smart contract set', async () => {
    const state = {
      logs,
      transactions,
      providers: {
        1: new JsonRpcProvider('http://localhost:8545'),
        31337: new JsonRpcProvider('http://localhost:8545'),
      },
      parsed: {
        transactions: [],
        logs: [],
        reads: []
      }
    };
    const sortedConstructedInjectedParsedFilteredSet = filterParsedStateMatchingSmartContractSetConditions(
      parseStateInConstructedSmartContractSet(
        await fetchAdditionalStateForInjectedSmartContractSet(
          injectStateInConstructedSmartContractSet(
            // @ts-ignore
            constructSortedSmartContractSet(sortSmartContractSet(set)),
            // @ts-ignore
            state
          )
        )
      )
    );

    const EXPECT_CONDITION_0 = [
      {
        id: 'erc20-function-transfer',
        matches: [
          {
            conditionId: 'erc20-function-transfer',
            conditions: [true],
            isComplete: true,
            object: 'match.transaction',
            stateId:
              '0xae80dce6fa0065ab8f9849f39782172cb3e4048533954c4ff90da3f3c8524e1e',
          },
        ],
      },
      {
        id: 'erc20-token-burn',
        matches: [
          {
            conditionId: 'erc20-token-burn',
            conditions: [false, true],
            isComplete: false,
            object: 'match.transaction',
            stateId:
              '0xae80dce6fa0065ab8f9849f39782172cb3e4048533954c4ff90da3f3c8524e1e',
          },
        ],
      },
    ];

    const EXPECT_CONDITION_1 = [
      {
        id: 'erc20-event-Transfer',
        matches: [
          {
            conditionId: 'erc20-event-Transfer',
            conditions: [false],
            isComplete: false,
            object: 'match.log',
            stateId:
              '0xae80dce6fa0065ab8f9849f39782172cb3e4048533954c4ff90da3f3c8524e1e|0',
          },
        ],
      },
    ];

    const EXPECT_CONDITION_2 = [
      {
        id: 'erc20-state-read',
        matches: [
          {
            conditionId: 'erc20-state-read',
            conditions: [true],
            isComplete: true,
            object: 'match.read',
            stateId:
              '0x70a08231000000000000000000000000f39fd6e51aad88f6f4ce6ab8827279cfffb92266',
          },
          {
            conditionId: 'erc20-state-read',
            conditions: [true],
            isComplete: true,
            object: 'match.read',
            stateId:
              '0x70a08231000000000000000000000000f39fd6e51aad88f6f4ce6ab8827279cfffb92266',
          },
        ],
      },
      {
        id: 'erc20-state-read-below',
        matches: [
          {
            conditionId: 'erc20-state-read-below',
            conditions: [false],
            isComplete: false,
            object: 'match.read',
            stateId:
              '0x70a08231000000000000000000000000f39fd6e51aad88f6f4ce6ab8827279cfffb92266',
          },
          {
            conditionId: 'erc20-state-read-below',
            conditions: [false],
            isComplete: false,
            object: 'match.read',
            stateId:
              '0x70a08231000000000000000000000000f39fd6e51aad88f6f4ce6ab8827279cfffb92266',
          },
        ],
      },
    ];

    expect(sortedConstructedInjectedParsedFilteredSet.status).toBe('filtered');
    expect(
      sortedConstructedInjectedParsedFilteredSet?.collections[0]?.computed
        .transactions
    ).toEqual(EXPECT_CONDITION_0);

    expect(
      sortedConstructedInjectedParsedFilteredSet?.collections[0]?.computed.logs
    ).toEqual(EXPECT_CONDITION_1);

    expect(
      sortedConstructedInjectedParsedFilteredSet?.collections[0]?.computed.reads
    ).toEqual(EXPECT_CONDITION_2);
  });
});
