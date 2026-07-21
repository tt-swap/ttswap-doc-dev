---
lang: en-US
title: Invest
description: TTSWAP single-sided invest — initGood, investGood, enpower, invest fees, and promised TTS staking.
keywords: [TTSWAP, investGood, initGood, single-sided liquidity, enpower, isPromised]
displayed_sidebar: guideSidebar
sidebar_position: 2
createTime: 2025/05/20 23:47:01
---

# Invest

Unlike pair-based AMMs that require two balanced assets, TTSWAP lets you provide **one token**. Appends are always priced at the pool’s current rate.

## Two entry paths

| Function | Who | Use case |
|:--|:--|:--|
| **`initGood`** | Anyone | First listing of a token; set initial value & quantity |
| **`investGood`** | Anyone | Append liquidity to an existing good |

### `initGood` constraints (measured)

- Quantity `_initial.amount1` ∈ $[500{,}000,\ 2^{109}]$ → else `TTSwapError(36)`
- Value `_initial.amount0` ∈ $[5\times10^{14},\ 2^{109}]$ → else `TTSwapError(35)`
- Good must not already exist → else `TTSwapError(5)`
- Initial config is fixed via `setInitialConfig()` (not caller-custom at init)
- Caller becomes **Good Owner** and receives the first proof
- **`initGood` does not `stake` TTS** — hashrate starts only on later `investGood` when `isPromised`

You only need the listed token itself (no paired USDT inventory required).

### `investGood` flow

1. Read `enpower = getInvestPower()` (scaled by $Q/I$, capped by `power`)
2. Transfer in `_invest.amount1`
3. Deduct `investFee`; virtualize `(quantity - fee) × enpower / 100`
4. Compute `investValue` at pool price; mint proportional shares
5. Write back `currentState` / `investState` / virtual amount
6. Update proof; if `isPromised()`, `L_Proof.stake(TTS, msg.sender, investvalue)`

> v2 removed owner self-quote branches — appends are **always** auto-priced at the in-pool price.

## Why single-sided does not drain the protocol

“Dump junk tokens, extract USDT” is blocked by **`safeLine`**: when inventory hits the upper bound, further sell-ins revert (`TTSwapError(55)`). Buys that hit the lower bound revert (`TTSwapError(56)`). Details in [Triple Defense](./LP).

## Promised goods & TTS mining

| Action | TTS hashrate? |
|:--|:--|
| `initGood` | **No** |
| `investGood` | **Only if** `goodConfig.isPromised()` |
| `disinvestProof` | `unstake` if that proof accrued hashrate |

Hashrate tracks **invested value**, not raw token count. Daily emission and harvest timing: [Tokenomics](../Tokenomics/Overview) and [Divest](./Devest).

## Meta-tx note

`investGood` / `initGood` keep a `signature` ABI slot for compatibility but **do not verify** EIP-712. `_trader` must equal `msg.sender`.
