---
lang: en-US
title: Quick Start
description: Get started with TTSWAP — connect, swap, provide single-sided liquidity, list a token, or accept X402 payments.
keywords: [TTSWAP, quick start, buyGood, payGood, investGood, X402, initGood]
displayed_sidebar: guideSidebar
sidebar_position: 3
createTime: 2025/05/20 23:47:01
---

# Quick Start

TTSWAP is a Singleton **Constant Value AMM**: one pool per token, any-to-any swaps in one contract call, and **single-sided** liquidity with principal returned by proof history (protocol-level zero-IL foundation).

This page is the shortest path by role. New terms → [Concepts](./Concept). Big picture → [Overview](./Overview).

## 1. Mental model (1 minute)

| Typical DEX | TTSWAP |
|:--|:--|
| Many A↔B pair contracts | One market + one pool per asset |
| Long-tail tokens often untradeable without a pair | List once → swappable against the whole market |
| LP usually needs two balanced assets | **One token** is enough to invest |
| Divest can suffer impermanent loss | Exit by **historical proof quantity** |

Narrative version: [Supermarket whitepaper](./SuperMarket). Technical depth: [Whitepaper](./WhitePaper).

## 2. Prepare

1. Use a compatible wallet (e.g. MetaMask).
2. Open [ttswap.io](https://ttswap.io) (or your deployed frontend).
3. Connect and switch to a network where TTSWAP is live.
4. Fund the account with:
   - a little native gas (or use X402 so an Executor pays gas), and
   - the ERC20s you will trade or invest (plus approvals as needed).

Integrate against **Proxy** addresses (`TTSwap_Market_Proxy` / `TTSwap_Token_Proxy`), not raw logic contracts.

## 3. Pick a path by role

### A. Trader — buy / sell

1. Choose input good and output good.
2. Pick an entry:
   - **Fixed budget** → `buyGood` (Exact-In): set a **min out** floor.
   - **Exact amount / merchant settlement** → `payGood` (Exact-Out): set a **max in** ceiling.
3. Set a non-zero **deadline**, review, sign, submit.

Details: [Trade Overview](../Trade/Overview) · [Buy Good](../Trade/BuyGood) · [Pay Good](../Trade/PayGood)

**Same-token tip**: merchant wants exactly 10 USDT and the payer holds USDT → `payGood` same-token fast path (no AMM, only ~**0.05 USDT** `executeFee`).

### B. LP — provide liquidity

1. Pick an existing good (or list one via path C).
2. Call `investGood` with a single-token amount — priced at the in-pool `V/Q`.
3. Receive / accumulate a **Proof of Investment** (one proof per owner+good).
4. If the good is **`isPromised`**, TTS mining hashrate starts accruing.
5. Exit later with `disinvestProof` to reclaim principal + fee share (+ TTS if staked).

Details: [Invest](../Invest&Devest/Invest) · [Divest](../Invest&Devest/Devest) · [Triple Defense](../Invest&Devest/LP)

LPs typically stack three yields: historical principal + fee commission + conditional TTS.

### C. Issuer — list a new token

1. Prepare initial quantity $Q_0$ and initial value $V_0$ (only that token; no paired USDT inventory required).
2. Call `initGood` → you become **Good Owner**.
3. Traders can immediately buy your good against value goods (e.g. USDT) via the Singleton market.
4. Tune user-section fees / power via `modifyGoodByGoodOwner`; earn `operatorFee` while you operate the good.

Note: **`initGood` does not stake TTS**. Mining starts on later `investGood` when the good is promised.

### D. Merchant / Executor — collect or relay

1. Fix **receive asset** and **exact amount** in the order.
2. Customer signs an EIP-712 intent (no gas token required on their side).
3. You submit on-chain as Executor and earn fixed `executeFee`.
4. Optional ops pattern: verify small tickets locally, batch-settle later with `multicall`; wait for confirmation on large tickets.

Details: [Pay Good & X402](../Trade/PayGood)

## 4. Scenario cheat sheet

| I want to… | Use | Read |
|:--|:--|:--|
| Swap with a fixed budget | `buyGood` | [Buy Good](../Trade/BuyGood) |
| Get / collect an exact amount | `payGood` | [Pay Good](../Trade/PayGood) |
| Let a gasless user trade | X402 signature | [Pay Good](../Trade/PayGood) |
| Add single-sided LP | `investGood` | [Invest](../Invest&Devest/Invest) |
| Exit LP + harvest | `disinvestProof` | [Divest](../Invest&Devest/Devest) |
| Claim accrued commissions | `collectCommission` | Fee section / Community docs |
| Understand TTS / 4C / unlocks | — | [Tokenomics](../Tokenomics/Overview) |

## 5. Safety & UX checklist

- **Slippage**: min out on `buyGood`; max in on `payGood`; always set `deadline`
- **Approvals**: grant only what you need; never sign unknown spenders
- **`safeLine`**: large trades may revert near inventory bounds — protect the pool; split size or wait for depth
- **Divest**: only the proof owner; size capped by disinvest chips
- **Run-block**: avoid writing the same good twice in one block slot (`TTSwapError(46)`)
- **Risk**: not investment advice; review contract and market risk yourself

## 6. Suggested reading order

1. [Concepts](./Concept)  
2. Walk one path on this page  
3. [Trade](../Trade/Overview) → [Invest & Divest](../Invest&Devest/Overview) → [Tokenomics](../Tokenomics/Overview)  
4. [Supermarket](./SuperMarket) / [Technical whitepaper](./WhitePaper)  

Site & community: [ttswap.io](https://ttswap.io) · [@ttswapfinance](https://x.com/ttswapfinance)
