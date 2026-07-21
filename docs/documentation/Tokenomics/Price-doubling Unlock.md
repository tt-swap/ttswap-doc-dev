---
lang: en-US
title: Price-doubling Unlock
description: TTS price-doubling unlock — on-chain ishigher checks, chips, metric, and anti-dump economics.
keywords: [TTS, shareMint, price-doubling unlock, chips, ishigher, anti-dump]
displayed_sidebar: guideSidebar
sidebar_position: 3
---

# Price-doubling Unlock

4C TTS is fully locked until market price validates each tranche:

> **Unlock only when TTS vs USDT clears the on-chain threshold. After each unlock, the threshold doubles.**

If price never rises to the next tier, that tranche **never unlocks**.

## On-chain path (`shareMint`)

```solidity
// simplified from TTSwap_Token.shareMint
if (!market.ishigher(TTS, USDT, 2**metric * 2**128 + 20_000_000))
    revert; // TTSwapError(68)
mintamount = leftamount / chips;
leftamount -= mintamount;
metric += 1;
_mint(msg.sender, mintamount);
```

Semantics:

- Price check via `TTSwap_Market.ishigher(TTS, USDT, threshold)`
- Threshold scales with $2^{\text{metric}}$ (doubles each successful unlock)
- Unlock size = `leftamount / chips`
- Failed price check → full revert; no partial mint

## Role chips & illustrative pace

| Role | Share | chips | Per unlock | Example cumulative |
|:--|:--:|:--:|:--:|:--|
| Founder | 20% | 20 | 5% | ~37% after ~1000× |
| Partner | 12% | 14 | ≈7.1% | ~45% after ~400× |
| Value | 44% | 12 | ≈8.3% | ~50% after ~200× |
| Capital | 24% | 8 | 12.5% | ~60% after ~100× |

(Examples are whitepaper illustrations; live unlocks follow `metric` + `ishigher`.)

## Why this design

### 1. Anti-dump by construction

No “list and unlock” cliff. Circulating float from 4C only expands after **realized** TTS/USDT appreciation.

### 2. Release tracks market validation

Feedback loop: stronger market activity → treasury buybacks → scarcer TTS → higher price → more unlock capacity. Supply does not need recurring “unlock vote” politics.

### 3. Mechanized governance

Thresholds and chips are code — reducing discretionary unlock proposals and whale gaming of emission calendars.

## Interaction with deflation

Unlocks move locked supply into circulation; protocol treasury fees simultaneously fund **buyback-and-burn**. Net float depends on real usage, not a fixed calendar alone. See [Tokenomics Overview](./Overview).

## Operator tips

- Call `shareMint` only after the price gate is likely met  
- Pricing references the in-market TTS and USDT (value) goods  
- Partial remaining `leftamount` continues under the next doubled threshold  

## Related

- [4C Allocation](./4C%20Allocation) · [Tokenomics Overview](./Overview)
