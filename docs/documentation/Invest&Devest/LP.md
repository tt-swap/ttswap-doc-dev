---
lang: en-US
title: Triple Defense  & Zero IL
description: How TTSWAP protects LPs — safeLine inventory bounds, historical principal return, and the triple defense against IL.
keywords: [TTSWAP, safeLine, zero impermanent loss, triple defense, LP protection]
displayed_sidebar: guideSidebar
sidebar_position: 4
createTime: 2025/05/20 23:47:01
---

# Triple Defense & Zero IL

LPs care about two failures: **price-path IL** and **pool drainage**. TTSWAP addresses both with `safeLine`, historical accounting, and layered buffers.

## 1. Inventory seatbelt (`safeLine`)

After each swap’s slice loop, the pool must satisfy:

$$
Q_{\text{lower}} \;\le\; Q \;\le\; Q_{\text{upper}}
$$

Bounds come from `getSafeLineLower/Upper(I + virtual)`. Crossing upper → `TTSwapError(55)`; lower → `TTSwapError(56)`.

### Without a seatbelt

An attacker could list `$JUNK`, sell into the market, and pull USDT/ETH until the protocol’s real inventory is gone. `safeLine` closes that path at the contract layer.

### Behavioral consequences

1. Heavy sell pressure stops at the upper bound until buys or LP exits free room  
2. New listings need real demand before absorbing endless sells  
3. External crashes cannot empty a pool in one shot — discovery happens in smaller steps  

| Dimension | Value Good | Normal Good |
|:--|:--|:--|
| Elevation | Market Admin sets bit 255 | Default |
| Trade bounds | Same `safeLine` mechanism | Same |
| Typical depth | Deeper after elevation | Tighter risk posture |

## 2. Historical principal return (protocol zero IL)

`disinvestGood` computes strictly from proof history. Principal quantity is **decoupled from spot**. IL risk is externalized into “last-exit / residual shortfall” space, then constrained by the defenses below.

## 3. Triple defense stack

| Layer | Mechanism | Role |
|:--|:--|:--|
| **1. Protocol anchoring** | Historical proof return path | Code-level quantity guarantee |
| **2. Issuer subordinated buffer** | Initial / owner liquidity absorbs gaps first | Capital cushion |
| **3. TTS compensation fund** | DAO `mint`/`burn` / auction backstop under extreme shortfall | Governance last resort |

## Supporting defenses (attack surface)

| Attack | Defense |
|:--|:--|
| Low-liquidity manipulation | Min init value / quantity bounds |
| Sandwich | Deadline + minOut / maxIn |
| Inventory drainage | `safeLine` 55/56 |
| Reentrancy | EIP-1153 `guardedEntry` / `multicallEntry` |
| Same-block double write | Run-block slot `TTSwapError(46)` |
| Owner exit during promise | `TTSwapError(40)` |

## Slice iteration

Large swaps are applied in ~**1% of pool depth** steps with the same algebraic kernel (coefficient **2**). Combined with `safeLine`, this limits instantaneous depth shock without abandoning $O(1)$ per-step math.

## Related

- [Invest](./Invest) · [Divest](./Devest) · [Trade Overview](../Trade/Overview)
