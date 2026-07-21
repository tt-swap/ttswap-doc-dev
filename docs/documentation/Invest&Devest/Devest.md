---
lang: en-US
title: Divest
description: TTSWAP divestment — historical quantity return, disinvest chips, six-way fee allocation, and TTS unstake.
keywords: [TTSWAP, disinvestProof, divest, zero IL, disinvest chips, unstake]
displayed_sidebar: guideSidebar
sidebar_position: 3
createTime: 2025/05/20 23:47:01
---

# Divest

Exit liquidity with:

```text
disinvestProof(_proofid, _goodshares, _gate, _trader, signature)
```

## Core rules

1. **Ownership**: `S_ProofKey(_trader, currentgood).toId() == _proofid`
2. **Promise lock**: if `isPromised() && owner == _trader`, revert `TTSwapError(40)` (owner cannot exit during the promise period)
3. **`L_Good.disinvestGood`**:
   - `actualDisinvestQuantity = proofInvest1 × _goodshares / proofShares0` (**historical ratio**)
   - compute profit, `disinvestFee`, then `allocateFee` six-way split
4. **Transfer** principal + accrued commission to the LP
5. **TTS `unstake`**: only when `disinvestTTSValue > 0`

> `signature` is **not verified**; `_trader` must be `msg.sender` (no proxy divest).

## Why this is zero impermanent loss (principal quantity)

Classic XYK exits warp both sides of a pair as price moves. TTSWAP returns the **same token** by proof history:

- deposited 10,000 units → proof records historical invest = 10,000
- regardless of spot moves, exiting 50% returns ~5,000 units of that token
- accumulated fees / welfare appear as **extra net value**, not as a deformed dual-asset bag

See [Triple Defense](./LP) for the layered backstops around residual risk.

## Disinvest chips

`getDisinvestChips` caps how large a single exit can be relative to pool value. Oversized exits revert with `TTSwapError(26)` / `TTSwapError(27)` — smooths whale impact on remaining LPs.

## Worked sketch

Bob holds `shares = 10000`, `invest = 10000`, and exits 50%:

1. Principal: `10000 × 5000 / 10000 = 5000` tokens  
2. Profit Δ from current vs historical net value  
3. Deduct `disinvestFee` (stays in pool → compounds for others)  
4. Six-way allocate remaining profit  
5. Optional TTS mint via `unstake`  
6. Proof left: `shares = 5000`, `invest = 5000`

## When TTS is paid

| Action | Hashrate | TTS minted now? |
|:--|:--|:--|
| `investGood` (promised) | Accrues immediately | No (daily emission accumulates) |
| Hold proof | Participates in daily mint share | No |
| `disinvestProof` | Pro-rata release | **Yes**, via `unstake` |

Partial exit cashes hashrate proportionally; remainder keeps mining.

## Collecting commissions

Fee shares also sit in `commission[addr]`. Use `collectCommission(goodIds[], …)` (≤ 100 goods). Market Admin can clear `commission[address(0)]` (protocol treasury) for buyback budgets.
