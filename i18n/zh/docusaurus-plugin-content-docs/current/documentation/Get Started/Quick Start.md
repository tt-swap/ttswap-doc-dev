---
lang: zh-CN
title: 从零开始
description: TTSWAP 快速上手：连接商场、上架、补货、买卖、支付与撤货的最短路径。
keywords: [TTSWAP, 快速开始, 上手, 交易, 补货, X402, 上架]
displayed_sidebar: guideSidebar
sidebar_position: 1
createTime: 2025/05/20 23:47:01
---

# 从零开始

TTSWAP 是一间开在链上的**去中心化商场**：每种商品一条货架，全场共用一个**中央收银台**，任意两商品可直接兑换；供货商可**单币补货**，撤货按历史数量返还。

本页按「你想先做什么」给出最短路径。遇到生词可先查 [专用名词](./Concept)。

## 1. 先建立心智模型（1 分钟）

| 传统 DEX | TTSWAP |
|:--|:--|
| 商业街上大量「只卖 A↔B」的小店（pair） | 一间大商场 + 一个收银台 |
| 新币往往没人开 pair，无法交易 | 挂上货架即可被全场兑换 |
| 补货常要两种等值资产 | **一种商品**也能补货 |
| 撤流动性常有无常损失 | 按凭证历史数量返还（协议级零 IL 基础） |

更完整的故事见 [商场版白皮书](./SuperMarket)。

## 2. 准备环境

1. 准备兼容的钱包（如 MetaMask 等）；
2. 进入 [TTSWAP 官网 / App](https://ttswap.io)（以实际部署网络为准）；
3. 连接钱包，切换到协议已部署的网络；
4. 账户中备好：
   - 少量原生币支付 Gas（或使用下方 X402，由商家代付）；
   - 你要交易 / 补货的 ERC20（及必要授权）。

## 3. 按角色选一条路径

### A. 我是顾客：买 / 卖商品

1. 在商场中选择「付出商品」与「目标商品」；
2. 二选一：
   - **有固定预算** → 用 `buyGood`（Exact-In）：设最小到手量防滑点；
   - **要恰好 N 件 / 商家精确收款** → 用 `payGood`（Exact-Out）：设愿付上限；
3. 设置 **deadline**，确认后签名提交。

详解：[交易概览](../Trade/Overview) · [购买与出售](../Trade/BuyGood) · [支付](../Trade/PayGood)

**同币收款小技巧**：商家要收恰好 10 USDT、顾客也付 USDT 时，走同币快路径——跳过 AMM，只扣约 **0.05 USDT** 执行费。

### B. 我是供货商：给货架补货赚钱

1. 找到已上架的目标货架（或先走路径 C 自己开架）；
2. 调用 **单币补货** `investGood`，协议按当前价 `V/Q` 计价；
3. 获得 / 累加**供货凭证**（同人同架一张）；
4. 若货架为**承诺型（`isPromised`）**，同时开始记 TTS 挖矿算力；
5. 之后可随时按规则**撤货**取回本金与利润。

详解：[投资](../Invest&Devest/Invest) · [撤资](../Invest&Devest/Devest) · [三重防护](../Invest&Devest/LP)

供货商通常同时拿到：本金返还 + 手续费分佣 +（条件满足时）TTS。

### C. 我是创业者：上架新商品

1. 准备初始库存 $Q_0$ 与你认为合理的初始总价值 $V_0$（只需**该商品本身**，不必备齐对手资产）；
2. 调用 `initGood` 开新货架 → 你成为**品牌方（Owner）**；
3. 顾客立刻可用硬通货（如 USDT）通过收银台买你的商品；
4. 运营期内可调整费率等参数，并享有操作人分佣等权益（见白皮书商品上架章）。

注意：开架本身**不自动挖 TTS**；后续在承诺型货架上补货才会记算力。

### D. 我是商家：扫码收款 / 代用户上链

1. 在订单里写死**收款币种**与**精确金额**；
2. 顾客用 EIP-712 签支付意图（可不持有 Gas 币）；
3. 你作为 Executor 验签后上链，赚固定 `executeFee`；
4. 小额可「本地验签先履约，下班前批量上链」；大额建议等链上确认再发货。

详解：[支付（payGood 与 X402）](../Trade/PayGood)

## 4. 场景速查表

| 我想… | 用什么 | 去哪读 |
|:--|:--|:--|
| 普通兑换（预算固定） | `buyGood` | [BuyGood](../Trade/BuyGood) |
| 精确买 N 件 / 精确收款 | `payGood` | [PayGood](../Trade/PayGood) |
| 无 Gas 用户下单 | X402 签名 | [PayGood](../Trade/PayGood) |
| 给货架补货 | `investGood` | [Invest](../Invest&Devest/Invest) |
| 取回本金与利润 | `disinvestProof` | [Devest](../Invest&Devest/Devest) |
| 领取累积佣金 | `collectCommission` | 社区 / 分佣说明 |
| 了解 TTS、4C、解锁 | — | [代币经济](../Tokenomics/Overview) |

## 5. 安全与体验提示

- **滑点**：`buyGood` 设最小到手；`payGood` 设最大愿付；务必设 `deadline`；
- **授权**：仅授权必要额度；不明合约勿签；
- **安全线**：大额买卖可能因 `safeLine` 失败——这是保护货架，可拆单或等深度恢复；
- **撤货**：仅凭证所有者本人可撤，且受撤货切片限制；
- **风险**：本文不构成投资建议；参与前请自行评估智能合约与市场风险。

## 6. 推荐阅读顺序

1. [专用名词](./Concept)  
2. 本页走通与你相关的一条路径  
3. [交易](../Trade/Overview) → [投资与撤资](../Invest&Devest/Overview) → [代币经济](../Tokenomics/Overview)  
4. [商场版白皮书](./SuperMarket) / [技术白皮书](./WhitePaper) 深入机制  

官网与社区：[ttswap.io](https://ttswap.io) · [@ttswapfinance](https://x.com/ttswapfinance)
