---
lang: en-US
title: Pay Good
description: payGood Exact-Out, same-token fast path, and X402 Relayer payments on TTSWAP.
keywords: [TTSWAP, payGood, Exact-Out, X402, same-token, executeFee, Relayer]
displayed_sidebar: guideSidebar
sidebar_position: 3
createTime: 2025/05/20 23:47:01
---

# Pay Good & X402

`payGood` covers **Exact-Out** cross-token payments and a **same-token fast path** for merchant collection / payroll. With X402, users sign intents; Executors pay gas.

## Cross-token Exact-Out

```solidity
payGood(
  T_GoodKey _goodKey1,   // pay with
  T_GoodKey _goodKey2,   // receive
  uint256 _swapQuantity, // amount0 = max in; amount1 = exact out
  address _recipient,    // required (zero → TTSwapError(32))
  bytes data,
  address _trader,
  bytes signature,
  uint256 external_info  // deadline in low 64 bits
)
```

Flow:

1. Update run-block on **good2** first  
2. `g2.payGoodOutput(amount1)` → required $\Delta V$  
3. `g1.payGoodInput(ΔV)` → actual input  
4. Actual in must not exceed `amount0`  
5. Relayer: `executeFee` from output (same pricing idea as `buyGood`)  

Expired deadline → `TTSwapError(53)`.

## Same-token fast path

When `_goodKey1 == _goodKey2`:

- **Bypass AMM** entirely  
- `transferFrom` → `safeTransfer` of `amount1` to `_recipient`  
- Relayer deducts `executeFee` from the **input** token into `commission[msg.sender]`  
- Ideal for “pay exactly 10 USDT in USDT” with no slippage  

`executeFee = 5e10` ≈ **0.05 USDT** (USDT 6-decimal intuition).

## Merchant UX: any-in, exact-out

Merchants specify **receive asset + exact amount**. Payers may spend any listed good as input. The protocol swaps internally and settles exact output in one call. Slippage is the payer’s max-in. If the payer already holds the receive asset, the same-token path applies.

## X402: sign / execute split

| Role | Action |
|:--|:--|
| **Trader** | EIP-712 sign `buyGood` / `payGood` intent (no gas) |
| **Executor** | Verify & submit; pay gas; earn `executeFee` |
| **Market** | Execute; debit fee to Executor commission |

Type hashes include trader, goods, quantity, data/external_info, and **nonce**. Users can `cancelNonce()` to void unused signatures. Tampering invalidates `ecrecover`.

### Meta-tx coverage

| Function | Relayer / EIP-712 |
|:--|:--|
| `buyGood` / `payGood` | ✅ |
| `investGood` / `disinvestProof` / `initGood` | ❌ (`_trader == msg.sender`) |

### Small ticket vs large ticket (ecosystem pattern)

Merchants may locally verify small EIP-712 payments and settle later via `multicall`, while large tickets wait for on-chain confirmation. Risk is capped by merchant threshold $T$, `deadline`, and auditable cancels — optional pattern, not a hard contract rule.

## Scenario cheat sheet

| Need | Path |
|:--|:--|
| Exact N units of token B | Cross-token `payGood` |
| Exact N USDT, payer holds USDT | Same-token fast path |
| Exact N USDT, payer holds ETH | Cross-token Exact-Out |
| User has no gas token | X402 + Executor |

## Related

- [Trading Overview](./Overview) · [Buy Good](./BuyGood) · [Invest & Divest](../Invest&Devest/Overview)
