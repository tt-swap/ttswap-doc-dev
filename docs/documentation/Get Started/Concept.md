---
lang: en-US
title: Concepts
description: TTSWAP glossary — goods state, T_GoodKey, proofs, value vs normal goods, six-way fees, TTS, and X402 terms.
keywords: [TTSWAP, concepts, glossary, T_GoodKey, Proof, safeLine, CV-AMM, X402]
displayed_sidebar: guideSidebar
sidebar_position: 2
createTime: 2025/05/20 23:47:01
---

# Concepts

Terms used throughout the docs, aligned with the technical whitepaper (Market v2.0.0 / Token v1.16.0+).

## Protocol building blocks

| Term | Meaning | Code / location |
|:--|:--|:--|
| **TTSWAP** | Token-Token Swap AMM protocol | — |
| **Singleton market** | One contract holds all pools | `TTSwap_Market_Proxy` |
| **Good / pool** | Per-asset liquidity state | `goods[goodid]` → `S_GoodState` |
| **`T_GoodKey`** | Asset id: `(ercType, contractAddress, id)` | `toId()` → `goodid` |
| **LP** | Liquidity provider | `investGood` / `disinvestProof` |
| **Trader** | Swap / payment user | `buyGood` / `payGood` |
| **Good Owner** | First `initGood` caller; receives `operatorFee` | `goods[goodid].owner` |
| **Gate** | Frontend / aggregator in the fee split | six-way `gateFee` |
| **Executor** | X402 relayer that submits signed intents | earns `executeFee` |
| **TTS** | Protocol token (governance + mining) | `TTSwap_Token` |

## Six-dimensional good state

| Symbol | Meaning | Field |
|:--|:--|:--|
| **V** | Invested / market value weight | `investState.amount1()` |
| **Q** | Current quantity (fees + virtual) | `currentState.amount1()` |
| **I** | Cumulative actual inflow | `currentState.amount0()` |
| **S** | Total LP shares | `investState.amount0()` |
| **Virtual amount** | Leveraged display depth | `goodConfig.amount1()` (low 128) |
| **Config** | Fees, split, flags, safeLine, power | `goodConfig` (high 128) |

**Rule**: each asset has exactly one global pool (`owner != 0` blocks re-init).

## Value Good vs Normal Good

| Class | Flag | Notes |
|:--|:--|:--|
| **Value Good** | `isvaluegood()` bit 255 | Anchors (USDT / ETH / WBTC…). Set by Market Admin via `modifyGoodByAdmin` |
| **Normal Good** | default | Long-tail assets; trades bounded by `safeLine` (`TTSwapError(55/56)`) |

All goods launch through unified `initGood`; elevation to Value Good is governance-gated, not automatic.

## Liquidity terms

| Term | Meaning |
|:--|:--|
| **`initGood`** | Create a single-token pool with custom $V_0/Q_0$; caller becomes Owner; **no** TTS stake on init |
| **`investGood`** | Append single-sided liquidity, always priced at in-pool price |
| **Proof of Investment** | Ledger entry keyed by `keccak256(owner, goodid)` — not a tradable NFT; one proof per (owner, good) |
| **enpower / power** | Virtual amplification of appended depth |
| **`isPromised`** | Only promised goods accrue TTS hashrate on `investGood` |
| **`disinvestProof`** | Exit by **historical invest quantity** × share ratio (price-independent principal) |
| **Disinvest chips** | Per-tx divest size cap (`TTSwapError(26/27)`) |
| **`safeLine`** | Inventory upper/lower bounds after swap slices |

## Trading terms

| Term | Meaning |
|:--|:--|
| **CV-AMM** | Constant Value AMM; dual coefficient hardcoded to **2** |
| **`buyGood`** | Exact-in: fixed input, min output |
| **`payGood`** | Exact-out, or same-token fast path when keys match |
| **Same-token fast path** | Skip AMM; transfer + fixed `executeFee` only |
| **`executeFee`** | `5e10` ≈ **0.05 USDT** Relayer compensation |
| **X402** | EIP-712 signed intent; Executor pays gas |
| **Run-block slot** | Same good cannot be state-written twice in the same `block.number % 4095` slot (`TTSwapError(46)`) |
| **Slice iteration** | Large swaps priced in ~1% depth steps |

## Six-way fee split

On profit allocation, shares must sum to **100%**:

| Role | Typical share |
|:--|:--|
| LP (`liquidFee`) | 50%–80% |
| Operator (`operatorFee`) | 1%–3% |
| Gate | 5%–25% |
| Referral | 5%–10% |
| Customer | 5%–10% (rebate path) |
| Platform | 2%–8% → `commission[address(0)]` |

Collect with `collectCommission` (≤ 100 goods / call; 1-unit sentinel reserved).

## TTS & governance (short)

| Term | Meaning |
|:--|:--|
| **TTS** | 12 decimals; max supply **200M** (`2e20` wei) |
| **LP mining** | Daily emission ≈ `(2e20 - totalSupply) / 18250 × chainRatio / 10000` |
| **4C** | Founder / Partner / Value / Capital (20 / 12 / 44 / 24%) locked shares |
| **Price-doubling unlock** | `shareMint` only if `ishigher(TTS, USDT, …)`; threshold doubles per unlock |
| **Community / CEO / Board** | Decision / execution / supervision; keys map to UserConfig bits |

## Next

- [Overview](./Overview) · [Trade](../Trade/Overview) · [Invest & Divest](../Invest&Devest/Overview) · [Tokenomics](../Tokenomics/Overview)
