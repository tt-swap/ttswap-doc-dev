---
lang: en-US
title: Documentation
description: TTSWAP documentation hub — Constant Value AMM, one-token-one-pool, zero-IL LP returns, six-way fees, X402, and TTS tokenomics.
keywords: [TTSWAP, documentation, Constant Value AMM, Singleton, zero IL, X402, tokenomics]
slug: /documentation
displayed_sidebar: guideSidebar
sidebar_position: 1
---

# Documentation

TTSWAP (Token-Token Swap) is a decentralized market-making protocol on EVM-compatible chains. Its core is a **Constant Value AMM (CV-AMM)**: one set of $O(1)$ algebraic formulas that covers CPMM, weighted-pool, and StableSwap-like behavior — with **no exponentiation and no numerical iteration**.

This hub is the entry to the official docs. For the full technical deep-dive, open the [Whitepaper](./Get%20Started/WhitePaper).

## Core value propositions

| Capability | What it means |
|:--|:--|
| **Zero-IL LP returns** | Divestment returns token amounts by the proof’s historical principal ratio, independent of the current pool price, plus a protocol-level triple defense |
| **Any-to-any in O(1)** | All goods live under one Singleton contract; a cross-token swap is two algebraic steps — quantity → transferred value $\Delta V$ → output quantity |
| **Six-way fee split** | LP / Operator / Gate / Referral / Customer / Platform — `checkGoodConfig` enforces shares sum to 100% |
| **X402 intent trading** | User signs EIP-712; Executor pays gas and earns a fixed `executeFee` (~0.05 USDT) |
| **Price-doubling unlock** | 4C allocation unlocks only when TTS/USDT price hits on-chain thresholds; community treasury fees fund 100% buyback-and-burn |

## Protocol features at a glance

1. **Constant Value AMM** — $\Delta V$ and $\Delta b$ solved algebraically; via the harmonic duality of $K$, one framework switches among CPMM, Weighted, and StableSwap-like curves.
2. **Singleton + one-token-one-pool** — each ERC20 has exactly one global pool; cross-token swaps route through the value hub, avoiding $N^2$ pair fragmentation.
3. **Liquidity amplification (enpower)** — `power` up to 31× virtual depth for higher capital efficiency on long-tail and stable assets.
4. **Protocol-level zero-IL** — exit by historical invest quantity × share ratio; value anchoring + subordinated buffer + TTS fund as backstop.
5. **Native ETH** — `L_Currency.NATIVE = address(1)`; no WETH wrap; unused ETH refunded at trade end.
6. **EIP-1153 locks** — transient reentrancy guard + shared ETH budget under `multicall`.
7. **Proof of Investment + LP mining** — one invest = trade proof + TTS hashrate + yield certificate.
8. **X402 payments** — signing decoupled from execution; same-token fast path skips the AMM and deducts only `executeFee`.

## How to read this docs set

| Section | Start here | What you get |
|:--|:--|:--|
| **Get Started** | [Overview](./Get%20Started/Overview) · [Quick Start](./Get%20Started/Quick%20Start) · [Concepts](./Get%20Started/Concept) | Mental model, first steps, glossary |
| **Trade** | [Trading Overview](./Trade/Overview) | `buyGood` / `payGood` / X402 / multicall |
| **Invest & Divest** | [Invest & Divest Overview](./Invest&Devest/Overview) | Single-sided LP, proofs, safe line, exit |
| **Tokenomics** | [Tokenomics Overview](./Tokenomics/Overview) | TTS supply, 4C allocation, doubling unlock |
| **Community** | [Fee sharing](./Community/Overview) | Roles: LP, Gate, Operator, Referral, Builder… |
| **Deep dives** | [Whitepaper](./Get%20Started/WhitePaper) · [Supermarket narrative](./Get%20Started/SuperMarket) | Full math & product story |

## Typical entry points

| Goal | Function | Section |
|:--|:--|:--|
| Exact-in swap | `buyGood` | [Buy Good](./Trade/BuyGood) |
| Exact-out / same-token pay | `payGood` | [Pay Good](./Trade/PayGood) |
| List a new token | `initGood` | [Invest](./Invest&Devest/Invest) |
| Append LP | `investGood` | [Invest](./Invest&Devest/Invest) |
| Exit LP + harvest | `disinvestProof` | [Divest](./Invest&Devest/Devest) |
| Unlock 4C TTS | `shareMint` | [Price-doubling Unlock](./Tokenomics/Price-doubling%20Unlock) |

## Architecture snapshot

- **Singleton + one-token-one-pool** — each asset has exactly one global pool (`goods[goodid]`), addressed by `T_GoodKey`
- **Proxy deployment** — integrate against `TTSwap_Market_Proxy` / `TTSwap_Token_Proxy`; logic is upgradeable until DAO `disableUpgrade`
- **CV-AMM dual coefficient** — hardcoded to **2** in the live kernel (CPMM equivalence point when pools are balanced)
- **Native ETH + EIP-1153** — no WETH wrap; transient locks for reentrancy and shared `msg.value` under `multicall`

Website: [ttswap.io](https://ttswap.io) · Contracts: Market / Token **v2.0.0** baseline (Token symbol TTS, precision 12).
