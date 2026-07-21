---
lang: en-US
title: Overview
description: TTSWAP documentation overview — Constant Value AMM, one-token-one-pool, zero-IL LP returns, six-way fees, and TTS tokenomics.
keywords: [TTSWAP, overview, Constant Value AMM, Singleton, zero IL, X402]
displayed_sidebar: guideSidebar
sidebar_position: 1
sidebar_class_name: hide-from-sidebar
createTime: 2025/05/20 23:47:01
---

# Documentation Overview

TTSWAP (Token-Token Swap) is a decentralized market-making protocol on EVM-compatible chains. Its core is a **Constant Value AMM (CV-AMM)**: one set of $O(1)$ algebraic formulas that covers CPMM, weighted-pool, and StableSwap-like behavior — with **no exponentiation and no numerical iteration**.

## What makes TTSWAP different

| Capability | What it means |
|:--|:--|
| **Zero-IL LP returns** | Divestment returns token amounts by the proof’s historical principal ratio, independent of the current pool price, plus a protocol-level triple defense |
| **Any-to-any in O(1)** | All goods live under one Singleton contract; `buyGoodInput → buyGoodOutput` (or the `payGood` reverse path) completes a cross-token swap in two steps |
| **Six-way fee split** | LP / Operator / Gate / Referral / Customer / Platform — `checkGoodConfig` enforces shares sum to 100% |
| **X402 intent trading** | User signs EIP-712; Executor pays gas and earns a fixed `executeFee` (~0.05 USDT) |
| **Price-doubling unlock** | 4C allocation unlocks only when TTS/USDT price hits on-chain thresholds; community treasury fees fund 100% buyback-and-burn |

## Architecture in one glance

- **Singleton + one-token-one-pool**: each asset has exactly one global pool (`goods[goodid]`), addressed by `T_GoodKey`
- **Proxy deployment**: integrate against `TTSwap_Market_Proxy` / `TTSwap_Token_Proxy`; logic is upgradeable until DAO `disableUpgrade`
- **Native ETH**: `L_Currency.NATIVE = address(1)` — no WETH wrap required
- **EIP-1153 locks**: transient reentrancy guard + shared ETH budget under `multicall`

## How to read this docs set

1. [Concepts](./Concept) — glossary aligned with the technical whitepaper  
2. [Trade](../Trade/Overview) — `buyGood` / `payGood` / X402  
3. [Invest & Divest](../Invest&Devest/Overview) — single-sided LP, proofs, safe line  
4. [Tokenomics](../Tokenomics/Overview) — TTS supply, 4C, doubling unlock  
5. [Whitepaper](./WhitePaper) / [Supermarket narrative](./SuperMarket) — full protocol deep-dives  

## Typical entry points

| Goal | Function | Section |
|:--|:--|:--|
| Exact-in swap | `buyGood` | [Buy Good](../Trade/BuyGood) |
| Exact-out / same-token pay | `payGood` | [Pay Good](../Trade/PayGood) |
| List a new token | `initGood` | [Invest](../Invest&Devest/Invest) |
| Append LP | `investGood` | [Invest](../Invest&Devest/Invest) |
| Exit LP + harvest | `disinvestProof` | [Divest](../Invest&Devest/Devest) |
| Unlock 4C TTS | `shareMint` | [Price-doubling Unlock](../Tokenomics/Price-doubling%20Unlock) |

Website: [ttswap.io](https://ttswap.io) · Contracts: Market / Token **v2.0.0** baseline (Token symbol TTS, precision 12).
