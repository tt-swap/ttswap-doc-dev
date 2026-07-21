---
lang: zh-CN
title: 文档中心
description: TTSWAP 官方文档入口 — 恒定价值 AMM、一币一池、零无常损失、六方分佣、X402 与 TTS 代币经济。
keywords: [TTSWAP, 文档, 恒定价值 AMM, Singleton, 零无常损失, X402, 代币经济]
slug: /documentation
displayed_sidebar: guideSidebar
sidebar_position: 1
---

# 文档中心

TTSWAP（Token-Token Swap）是运行在 EVM 兼容链上的去中心化做市协议（AMM）。协议通过智能合约自动撮合交易，不依赖任何中心化机构。其核心创新是**恒定价值 AMM（Constant Value AMM, CV-AMM）**：用一套 $O(1)$ 代数公式同时覆盖 Uniswap 的 CPMM、Balancer 的加权池以及 Curve 的 StableSwap 低滑点特性，且**无指数运算、无数值迭代**。

本页是官方文档入口。完整技术细节请阅读 [白皮书](./Get%20Started/WhitePaper)。

## 核心价值主张

| 能力 | 含义 |
|:--|:--|
| **零无常损失的 LP 返还** | 撤资按 proof 记录的历史本金比例返还代币数量，与池内当下价格无关；叠加协议级三重防御（价值锚定 + 项目方劣后缓冲 + TTS 基金） |
| **任意两币 O(1) 直达** | 所有 good 挂在同一 Singleton 合约下；跨币互换两步完成 — 数量 → 转移价值 $\Delta V$ → 输出数量 |
| **协议原生六方分佣** | LP / Operator / Gate / Referral / Customer / Platform；合约级 `checkGoodConfig` 强制占比之和 = 100% |
| **X402 意图导向支付** | 用户签 EIP-712；Executor 代付 gas，获得固定 `executeFee`（约 0.05 USDT） |
| **价格翻倍解锁** | 4C 分配仅在 TTS/USDT 价格触及链上阈值时解锁；社区金库手续费 100% 用于二级市场回购并销毁 |

## 协议特性速览

1. **恒定价值 AMM** — $\Delta V$ 与 $\Delta b$ 全部用代数公式求解；通过 $K$ 的调和对偶，在同一数学框架里切换 CPMM、Weighted、StableSwap 类曲线。
2. **Singleton + 一币一池** — 每个 ERC20 全局只有一个池；跨币互换走价值枢纽，避免 $N^2$ 的 pair 碎片化。
3. **流动性放大（enpower）** — `power` 最高 31× 虚拟深度，提升长尾资产与稳定币场景的资金效率。
4. **零 IL 协议级保障** — 按历史投资数量 × 份额比例退出；价值锚定 + 劣后缓冲 + TTS 基金兜底。
5. **原生 ETH** — `L_Currency.NATIVE = address(1)`，无需 WETH 包装；未用完的 ETH 在交易结束自动退回。
6. **EIP-1153 锁** — 瞬态重入防护 + `multicall` 下共享的 ETH 预算计数。
7. **Proof of Investment + LP 挖矿** — 一份投资 = 交易凭证 + TTS 算力 + 收益凭证。
8. **X402 支付** — 签名与执行分离；同币种快路径跳过 AMM，仅扣 `executeFee`。

## 如何阅读本套文档

| 章节 | 从这里开始 | 你会得到 |
|:--|:--|:--|
| **快速开始** | [概览](./Get%20Started/Overview) · [快速上手](./Get%20Started/Quick%20Start) · [专用名词](./Get%20Started/Concept) | 心智模型、上手路径、术语表 |
| **交易** | [交易概览](./Trade/Overview) | `buyGood` / `payGood` / X402 / multicall |
| **投资与撤资** | [投资与撤资概览](./Invest&Devest/Overview) | 单边 LP、投资证明、安全线、退出 |
| **代币经济** | [代币经济概览](./Tokenomics/Overview) | TTS 供应、4C 分配、价格翻倍解锁 |
| **社区** | [手续费分润](./Community/Overview) | LP、Gate、Operator、推荐人、建设者等角色 |
| **深度阅读** | [白皮书](./Get%20Started/WhitePaper) · [商场叙事](./Get%20Started/SuperMarket) | 完整数学与产品故事 |

## 常用入口

| 目标 | 函数 | 章节 |
|:--|:--|:--|
| Exact-in 兑换 | `buyGood` | [买入商品](./Trade/BuyGood) |
| Exact-out / 同币支付 | `payGood` | [支付商品](./Trade/PayGood) |
| 上架新币 | `initGood` | [投资](./Invest&Devest/Invest) |
| 追加流动性 | `investGood` | [投资](./Invest&Devest/Invest) |
| 退出 LP + 收息 | `disinvestProof` | [撤资](./Invest&Devest/Devest) |
| 解锁 4C TTS | `shareMint` | [价格翻倍解锁](./Tokenomics/Price-doubling%20Unlock) |

## 架构快照

- **Singleton + 一币一池** — 每种资产全局唯一池（`goods[goodid]`），由 `T_GoodKey` 寻址
- **Proxy 部署** — 集成请对接 `TTSwap_Market_Proxy` / `TTSwap_Token_Proxy`；逻辑可升级，直至 DAO 调用 `disableUpgrade`
- **CV-AMM 对偶系数** — 线上内核硬编码为 **2**（池子平衡时等价 CPMM）
- **原生 ETH + EIP-1153** — 无需 WETH；瞬态锁负责重入防护与 `multicall` 下共享的 `msg.value`

官网：[ttswap.io](https://ttswap.io) · 合约基准：Market / Token **v2.0.0**（代币符号 TTS，精度 12）。
