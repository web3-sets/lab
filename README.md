# ⏣ Web3 Sets - Distributed Object Resource Mapping

Web3 Sets is JSON Draft 7 schema for mapping resources across distributed systems.

Designed to be light-weight and flexible, Web3 Sets is a JSON Draft 7 schema for mapping and connecting resources across distributed and decentralized ecosystems.

Web3 Sets is a simple approach to managing a complex system.

**The approach is simple.**

Everything is Entity. Entities have predictable behaviors. Entities can be grouped into Sets.

**Web3 Sets draws inspiration from naive set theory.**

The only focus for the Web3 Sets schema is mapping Entity objects across distributed systems. It does not concern itself with the underlying technology or implementation details. It only cares about Entity objects and how to organize them using rules and conditionals.

[Naive set theory is a way of thinking about collections of objects, called sets, and the relationships between them.](https://en.wikipedia.org/wiki/Naive_set_theory)

# Getting Started

*SSH*
```bash
git clone git@github.com:web3-sets/lab.git
```

*HTTPS*
```bash
git clone https://github.com/web3-sets/lab.git
```

The `pnpm` CLI is the recommended package manager but `npm` and `yarn` should work too.

```bash
pnpm install
```

#### Development
```bash
pnpm dev
```

#### Build
```bash
pnpm build
```

## Architecture

Web3 Sets is CI is managed via Turborepo - an incremental bundler and build system optimized for JavaScript and TypeScript.

# Status (Updated on May 13, 2023)

The [smart contract sets schema](https://github.com/web3-sets/lab/tree/main/schemas/schema-smart-contract) is in alpha status.

In other words it can be tested and likely won't have any major architecture changes.

**Remaining work before beta launch:**
- [ ] EVM Runtime Engine
    - [ ] Complete

**Roadmap**
- [ ] Verifiable Credential Sets Schema
- [ ] Sets of Sets Schema