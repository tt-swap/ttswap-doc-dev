---
lang: en-US
title: 4C Allocation
description: TTS 4C model — Founder, Partner, Value, and Capital shares, chips, and on-chain allocation paths.
keywords: [TTS, 4C, Founder, Partner, Value, Capital, chips]
displayed_sidebar: guideSidebar
sidebar_position: 2
---

# 4C Allocation

Initial **`left_share` ≈ 45,000,000 TTS** is reserved for four contributor classes (**4C**):

| Role | Share | Role of capital |
|:--|:--:|:--|
| **Founder** | **20%** | Protocol founders |
| **Partner** | **12%** | Core team / partners |
| **Value** | **44%** | Builders, ops, technical contributors |
| **Capital** | **24%** | Early investors, airdrops, sale-related grants |

## Design intent: labor over capital

Value gets the largest slice on purpose — long-term builders outrank pure capital in the initial equity pool. Capital still participates, but does not dominate the float that eventually unlocks.

## Link to unlock mechanics

All 4C amounts are **locked** in `s_share { leftamount, chips, metric }` until price-triggered `shareMint`. Different roles receive different `chips` (per-unlock denominator):

| Role | Allocation | chips | Per-unlock cap |
|:--|:--:|:--:|:--:|
| Founder | 20% | 20 | **5%** (1/20) |
| Partner | 12% | 14 | ≈ **7.1%** |
| Value | 44% | 12 | ≈ **8.3%** |
| Capital | 24% | 8 | **12.5%** |

Founders/partners unlock slowest (longest alignment). Capital unlocks in larger slices but owns less of the pool. Full trigger logic: [Price-doubling Unlock](./Price-doubling%20Unlock).

## On-chain allocation paths

| Path | Use |
|:--|:--|
| `addShare` | Admin writes locked share records |
| `permitShare` | EIP-712 offline grant; recipient claims |

Budget-scale allocations typically require Class-III community proposals. Events make grants auditable.

## Boundaries

| Source | Part of 4C `left_share`? | Notes |
|:--|:--|:--|
| 4C grants | Yes | Locked + doubling unlock |
| `publicSell` | Separate | Tiered price + hard cap |
| LP daily emission | No | From remaining `2e20 - totalSupply` |

## Related

- [Tokenomics Overview](./Overview)  
- [Price-doubling Unlock](./Price-doubling%20Unlock)
