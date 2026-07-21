---
lang: en-US
title: Overview
description: TTS tokenomics overview — 200M supply, LP mining, 4C allocation, price-doubling unlock, public sale, and buyback-and-burn.
keywords: [TTS, tokenomics, LP mining, 4C, price-doubling unlock, buyback]
displayed_sidebar: guideSidebar
sidebar_position: 1
sidebar_class_name: hide-from-sidebar
---

# Tokenomics Overview

TTS is not a vote-only gas token. It combines **governance weight**, **LP mining rewards**, and **market-validated unlocks**.

## Basics (`TTSwap_Token`)

| Item | Value |
|:--|:--|
| Name / Symbol | TTSwap Token / **TTS** |
| Decimals | **12** |
| Max supply | **200 million TTS** = `2e20` wei |
| Initial `left_share` | **45,000,000 TTS** (4C pool) |
| Public-sale hard cap | **250,000 USDT** |
| `executeFee` | `5e10` ≈ **0.05 USDT** |

## LP mining (inflation)

When a good is `isPromised`, each `investGood` calls `L_Proof.stake`. Once per day (`86400s`):

```text
daily_mint ≈ (2e20 - totalSupply) / 18250 × chainRatio / 10000
(floor at 1 TTS = 1e12 wei if computed amount is smaller)
```

Roughly **50-year linear** release to active LP hashrate. Harvest typically lands on `disinvestProof` → `unstake`. See [Invest](../Invest&Devest/Invest) / [Divest](../Invest&Devest/Devest).

## 4C initial allocation

45M TTS reserved for Founder / Partner / Value / Capital. Design skews toward **Value (44%)** over Capital (24%). Details: [4C Allocation](./4C%20Allocation).

## Price-doubling unlock

Locked 4C shares unlock via `shareMint` only when `ishigher(TTS, USDT, threshold)` passes. Threshold **doubles** each unlock (`metric++`). No price rise → no unlock. Details: [Price-doubling Unlock](./Price-doubling%20Unlock).

## Public sale (tiered)

| Tier | Raised USDT | Rate |
|:--:|:--:|:--:|
| 1 | ≤ 87,500 | **25 TTS / USDT** |
| 2 | 87,500 – 162,500 | **20 TTS / USDT** |
| 3 | 162,500 – 250,000 | **16 TTS / USDT** |

Above 250k USDT → `TTSwapError(70)`. Proceeds withdrawn via `withdrawPublicSell` under Token Admin / budget governance.

## `permitShare`

Token Admin signs EIP-712 share grants offline; recipients claim on-chain — suited for airdrops and partner quotas (async, signer-side zero gas).

## Inflation vs deflation

| Engine | Direction | Mechanism |
|:--|:--|:--|
| **Inflation** | Mint to LPs | Daily `_stakeFee` emission |
| **Deflation** | Burn | Protocol treasury (`commission[address(0)]`) → secondary buyback & burn |

Early: inflate to bootstrap LPs. Growth: volume → treasury → burn dominates. Mature: scarcity rises with real usage.

## In this section

- [4C Allocation](./4C%20Allocation)  
- [Price-doubling Unlock](./Price-doubling%20Unlock)
