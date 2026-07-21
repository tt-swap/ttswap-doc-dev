---
lang: en-US
title: Overview
description: Invest and divest on TTSWAP — single-sided liquidity, Proof of Investment, zero-IL returns, and stacked LP yields.
keywords: [TTSWAP, invest, divest, Proof of Investment, zero IL, LP]
displayed_sidebar: guideSidebar
sidebar_position: 1
sidebar_class_name: hide-from-sidebar
createTime: 2025/05/20 23:47:01
---

# Invest & Divest Overview

Liquidity on TTSWAP is **single-token**. You list or top up one asset; the protocol prices appends at the in-pool rate. On exit, principal is returned by the proof’s **historical quantity ratio** — the foundation of protocol-level zero impermanent loss.

## What you can do

| Action | Function | Notes |
|:--|:--|:--|
| **List a new good** | `initGood` | Custom $V_0/Q_0$; you become Good Owner; creates first proof (**no** TTS stake) |
| **Append liquidity** | `investGood` | Single-sided; auto-priced at pool price; TTS stake only if `isPromised` |
| **Exit & settle** | `disinvestProof` | Historical quantity return + fee share + conditional TTS `unstake` |

## Core ideas

### Proof of Investment

Each LP position is stored in `proofs[proofid]`:

- `proofid = keccak256(owner, currentgood)` — **one proof per (owner, good)**; repeats accumulate
- Fields: shares, virtual/actual value, virtual/actual invest quantity
- Not a tradable NFT — a ledger entry bound to identity + good

### Single-sided invest

`investGood` always prices at the current in-pool price (`V/Q`). Minimum invest value applies. Virtual amplification (`enpower`) scales displayed depth. See [Invest](./Invest).

### Zero-IL divest

`disinvestGood` returns  
`actualDisinvestQuantity = proofInvest × shares / proofShares`  
independent of the live pool price. Fees and welfare show up as net-value profit, then six-way `allocateFee`. See [Divest](./Devest) and [Triple Defense](./LP).

## Three stacked LP yields

| Yield | When | Denomination |
|:--|:--|:--|
| ① Principal | On divest (historical ratio) | The invested token |
| ② Trading-fee share | On divest / `collectCommission` | Pool token |
| ③ TTS mining | On divest via `unstake` (if staked) | TTS |

## In this section

- [Invest](./Invest) — `initGood` / `investGood`, enpower, promised mining  
- [Divest](./Devest) — historical return, chips, TTS harvest  
- [Triple Defense](./LP) — `safeLine`, zero IL, attack surface
