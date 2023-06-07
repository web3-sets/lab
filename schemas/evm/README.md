# EVM Schema | Web3 Sets

![CI](https://github.com/web3-sets/schema/actions/workflows/main.yml/badge.svg)
[![MIT license](https://img.shields.io/badge/License-MIT-blue.svg)](http://perso.crans.org/besson/LICENSE.html)

## 💾 Installation

```sh
pnpm add @web3-sets/schema
```

```sh
yarn add @web3-sets/schema
```

```sh
git clone https://github.com/web3-sets/schema
```

## 🔗 &nbsp;Entities

An Entity object in the smart contract sets schemas must be a reference to EVM smart contract identified via `chainId`, `address` and `ABI`.

**Core Fields**
- chainId
- address
- abi

## 🎛️ &nbsp;Conditions

Conditions are applied to the smart contract entity. Since a smart contract entity is a complex primitive it includes multiple compute states that can be defined and measured: transaction input, event logs and blockchain storage (archive/live).

### Condition Fields

**Core Fields**
- entityId
- type
- signature
- arguments

#### Entity ID
The `entityId` field references a set entity id.

*WARNING:* A future implementation may use an list of IDs instead of a single ID.

#### Type
Since it's possible to verify multiple forms of state, when constructing an entity condition a `type` must be defined. Multiple conditional types can be applied to a smart contract entity: function, event and state.

The `Function` condition validates transaction execution data.

The `Event` condition validates output of an contract emitted event.

The `State` condition validates state of blockchain at the current block.

The `ArchiveState` condition validates state of blockchain at a specific block.

#### Signature

The `signature` field can contain a method or event signature. If the `event` type is selected, the `signature` will map to a SmartContract Event signature. In all other circumstances the signature will reference a SmartContract Function signature.

#### Arguments

The `arguments` field contains the conditionals applied to the SmartContract compute states.

Multiple arguments can be created for each `condition` **but....** those arguments are only applied to that specific `signature` interface. In other words, multiple conditionals can be applied to a single ERC20 Transfer event, but you can't apply an argument from one conditional to another.

**Argument Fields**

- object
- index
- type
- condition
- value

```json
{
    "object": "condition.argument",
    "index": 1,
    "type": "bignumber",
    "condition": "gte",
    "value": "1e18"
}
```

**Type Options**
- address
- bignumber (uint, uint8, uin32, ... , uint256)
- bytes
- bytes32
- string

*NOTICE:*  A `struct` type might be introduced in the future. But as of now everything can be accomplished by defining multiple arguments each targeting a different index position of a specific struct compute state in a function or event signature.

**Condition Options**

- gt
- gte
- lt
- lte
- eq
- !eq
- contains
- match

Condition arguments are applied to the condition `signature` once constructed.

For example the ERC20 `transfer(address,uint256)` function signature has 2 arguments with `address` and `uint256` type respectively.

Therefore if we applied the condition above to the `transfer` function signature, the condition argument enforces a minimum of 1e18 tokens must be transferred to pass validation.

The argument states look at index 1, which is the `amount` field with the uint256 type and checks the bytes data is GREATER THAN OR EQUAL to 1e18 or 1 ETH.


## 📏 &nbsp;Rules

Rules enforce what `Conditions` are applied to the final validation state.

For example, a smart contract might have 2 function calls that will satisfy a final compute state. Using an OR rule, a conditional matching either 1 of the 2 function signatures could be used to pass set validation.

Rules enable a dynamic sets, focusing less on "how" to complete a task, instead simply prioritizing that a final compute state was achieved. In other words, it embodies the approach behind "We don't care how you did. Just that you did it."

### Rules Fields
**Core Fields**

- conditionIds: Array<string>
- range: Range
- apply: Array<string>
- inputs: Array<Array<string>>

#### Range Type
The `Range` field describes how to apply rules conditionally to a different range of condition ids.

- all = conditionTotal/conditionTotal
- any = 1/conditionTotal
- Number = N/conditionTotal
- [ Number , ... , Number ] = [N/conditionIndex, ..., N/conditionIndex]

### Examples

```
conditionsIds: ['example-1']
range: 'all'
apply: ['complete', 'beforeBlock', 'betweenTimestamps']
inputs: [ [true], [50505050], ['22222222', '333333333'] ]
```
