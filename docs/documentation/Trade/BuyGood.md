---
lang: en-US
title: Buy Good
description: buyGood Exact-In swaps on TTSWAP — parameters, slippage, Relayer mode, and CV-AMM path.
keywords: [TTSWAP, buyGood, Exact-In, slippage, Relayer, CV-AMM]
displayed_sidebar: guideSidebar
sidebar_position: 2
createTime: 2025/05/20 23:47:01
---

# Buy Good (`buyGood`)

`buyGood` is **Exact-In**: you fix the input amount; the protocol computes output and enforces your minimum.

## Signature (conceptual)

```solidity
buyGood(
  T_GoodKey _goodKey1,   // sell / input
  T_GoodKey _goodKey2,   // buy / output
  uint256 _swapQuantity, // amount0 = input; amount1 = min gross output
  address _recipient,    // referrer when set
  bytes data,
  address _trader,
  bytes signature,
  uint256 external_info  // low 64 bits: deadline
)
```

## Behavior

1. `g1.buyGoodInput(amount0)` → transferred value $\Delta V$  
2. `g2.buyGoodOutput(ΔV)` → output quantity  
3. Require `good2change.amount1() >= amount1` (if amount1 > 0) else `TTSwapError(15)`  
4. Min transfer value: `good1change.amount1() < 1e8` → `TTSwapError(14)`  
5. **Same-token keys revert** with `TTSwapError(9)` — use `payGood` for same-token payments  
6. Relayer path: verify EIP-712 when `msg.sender != _trader`; deduct `executeFee` from **output** into `commission[msg.sender]`  
7. Only **good2** updates the run-block slot  

## Field cheat sheet

| Field | Meaning |
|:--|:--|
| `amount0` | Exact input |
| `amount1` | Minimum acceptable output (slippage floor) |
| `external_info` deadline | Expired → `TTSwapError(49)` |

## Formulas (single slice)

$$
\Delta V = \frac{2 \cdot V_A \cdot \Delta a}{2 \cdot Q_A + \Delta a},\quad
\Delta b = \frac{2 \cdot Q_B \cdot \Delta V}{2 \cdot V_B + \Delta V}
$$

Large swaps loop in ~1% depth slices, then apply `safeLine`.

## vs `payGood`

| | `buyGood` | `payGood` |
|:--|:--|:--|
| Fixed side | Input | Output (or same-token amount) |
| Protection | Min out | Max in |
| Same-token | Reverts | Fast path |

## Tips

- Always set a realistic min out and non-zero deadline  
- Aggregators: avoid double-writing the same output good in one block; `vm.roll` or split txs  
- Gasless users: sign X402 buy intents; Executor submits — see [Pay Good](./PayGood)
