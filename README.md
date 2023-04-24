# ⏣ Web3 Sets - Distributed Resource Mapping

Web3 Sets is JSON Draft 7 schema for mapping resources across distributed systems.

Web3 Sets is a simple approach to managing a complex system.

Designed to be light-weight and flexible, Web3 Sets is a JSON Draft 7 schema for mapping and connecting resources across distributed and decentralized ecosystems.

**The approach is simple.**

Everything is Entity. Entities always have predictable behaviors. Entities can be grouped into Sets. Sets can be grouped into Sets.

**The approach is powerful.**

The only focus is mapping inputs and outputs across distributed systems. It does not concern itself with the underlying technology or implementation details. It only cares about Entities and how to organize them.

**Web3 Sets draws inspiration from naive set theory.**

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
