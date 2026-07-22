---
lang: zh-CN
title: 文档概览 · 恒定价值 AMM 与协议总览
description: TTSWAP 文档概览 — 恒定价值 AMM、一币一池、零无常损失 LP 返还、六方分佣与 TTS 代币经济。
keywords: [TTSWAP, 概览, 恒定价值 AMM, Singleton, 一币一池, 零无常损失, X402]
displayed_sidebar: guideSidebar
sidebar_position: 1
sidebar_class_name: hide-from-sidebar
createTime: 2025/05/20 23:47:01
---

# 文档概览

TTSWAP（Token-Token Swap）是运行在 EVM 兼容链上的去中心化做市协议（AMM）。协议通过智能合约自动撮合交易，不依赖任何中心化机构。其核心创新是**恒定价值 AMM（Constant Value AMM, CV-AMM）**：用一套 $O(1)$ 代数公式同时覆盖 CPMM、加权池与 StableSwap 类低滑点行为，且**无指数运算、无数值迭代**。

## TTSWAP 有何不同

| 能力 | 含义 |
|:--|:--|
| **零无常损失的 LP 返还** | 撤资按 proof 记录的历史本金比例返还代币数量，与池内当下价格无关；叠加协议级三重防御 |
| **任意两币 O(1) 直达** | 所有 good 挂在同一 Singleton 合约下；`buyGoodInput → buyGoodOutput`（或 `payGood` 反向路径）两步完成跨币互换 |
| **六方分佣** | LP / Operator / Gate / Referral / Customer / Platform；`checkGoodConfig` 强制占比之和 = 100% |
| **X402 意图交易** | 用户签 EIP-712；Executor 代付 gas，获得固定 `executeFee`（约 0.05 USDT） |
| **价格翻倍解锁** | 4C 分配仅在 TTS/USDT 价格触及链上阈值时解锁；社区金库手续费 100% 用于回购并销毁 |

## 架构一眼看懂

- **Singleton + 一币一池**：每种资产全局唯一池（`goods[goodid]`），由 `T_GoodKey` 寻址
- **Proxy 部署**：集成请对接 `TTSwap_Market_Proxy` / `TTSwap_Token_Proxy`；逻辑可升级，直至 DAO 调用 `disableUpgrade`
- **原生 ETH**：`L_Currency.NATIVE = address(1)`，无需 WETH 包装
- **EIP-1153 锁**：瞬态重入防护 + `multicall` 下共享的 ETH 预算

## 如何阅读本套文档

1. [专用名词](./Concept) — 与技术白皮书对齐的术语表  
2. [交易](../Trade/Overview) — `buyGood` / `payGood` / X402  
3. [投资与撤资](../Invest&Devest/Overview) — 单边 LP、投资证明、安全线  
4. [代币经济](../Tokenomics/Overview) — TTS 供应、4C、价格翻倍解锁  
5. [白皮书](./WhitePaper) / [商场叙事](./SuperMarket) — 完整协议深读  

## 常用入口

| 目标 | 函数 | 章节 |
|:--|:--|:--|
| Exact-in 兑换 | `buyGood` | [买入商品](../Trade/BuyGood) |
| Exact-out / 同币支付 | `payGood` | [支付商品](../Trade/PayGood) |
| 上架新币 | `initGood` | [投资](../Invest&Devest/Invest) |
| 追加流动性 | `investGood` | [投资](../Invest&Devest/Invest) |
| 退出 LP + 收息 | `disinvestProof` | [撤资](../Invest&Devest/Devest) |
| 解锁 4C TTS | `shareMint` | [价格翻倍解锁](../Tokenomics/Price-doubling%20Unlock) |

官网：[ttswap.io](https://ttswap.io) · 合约基准：Market / Token **v2.0.0**（代币符号 TTS，精度 12）。
