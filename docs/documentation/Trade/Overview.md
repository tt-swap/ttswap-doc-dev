---
lang: en-US
title: Trading Overview
description: TTSWAP trading overview — CV-AMM, buyGood vs payGood, multicall, X402, and six-way fees.
keywords: [TTSWAP, trade, buyGood, payGood, CV-AMM, X402, multicall]
displayed_sidebar: guideSidebar
sidebar_position: 1
sidebar_class_name: hide-from-sidebar
createTime: 2025/05/20 23:47:01
---

# Trading Overview

All goods sit under one Singleton market. A cross-token swap is two algebraic steps — **quantity → transferred value $\Delta V$ → output quantity** — with dual coefficient hardcoded to **2**. Large trades iterate in ~1% depth slices and finish under `safeLine` checks.

## Two primary entries

| Function | Style | Typical use |
|:--|:--|:--|
| **`buyGood`** | Exact-in | “I spend X; require at least Y out” |
| **`payGood`** | Exact-out / same-token | “I need exactly Y; max spend X” or merchant collection |

Both support deadlines, slippage bounds, and X402 Relayer mode (`msg.sender != _trader` → EIP-712 verify + `executeFee`).

## Kernel intuition

**Input** (`buyGoodInput`):

$$
\Delta V = \frac{2 \cdot V \cdot \Delta q}{2 \cdot Q + \Delta q}
$$

**Output** (`buyGoodOutput`):

$$
\Delta q = \frac{2 \cdot Q \cdot \Delta V}{2 \cdot V + \Delta V}
$$

Properties: value conservation across the hop, bounded slippage, $O(1)$ arithmetic (no `exp`, no iterative invariant solver).

## Which function?

| Scenario | Use |
|:--|:--|
| Budget-fixed swap | [`buyGood`](./BuyGood) |
| Exact output amount | [`payGood`](./PayGood) (cross-token) |
| Exact same-token payment | [`payGood`](./PayGood) same-token fast path |
| Gasless user | X402 + Executor — see [Pay Good](./PayGood) |
| Batch approve/swap/collect | `multicall` (mind run-block slots) |

## Fees

Swap / invest / divest accumulate pool fees. On divest (and related paths), `allocateFee` splits profit across six roles. Collect with `collectCommission`.

## Safety rails

- **Slippage**: min out (`buyGood`) / max in (`payGood`)  
- **Deadline**: packed in `external_info`  
- **`safeLine`**: inventory bounds → `TTSwapError(55/56)`  
- **Run-block**: same good cannot be written twice in one block slot → `TTSwapError(46)`  

## In this section

- [Buy Good](./BuyGood)  
- [Pay Good](./PayGood)
