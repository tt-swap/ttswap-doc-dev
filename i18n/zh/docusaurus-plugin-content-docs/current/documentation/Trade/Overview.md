---
lang: zh-CN
title: 交易概览
description: TTSWAP 交易总览：中央收银台、buyGood / payGood 两种下单方式、同币快路径与 X402 商家支付。
keywords: [TTSWAP, 交易, buyGood, payGood, X402, 中央收银台, Exact-In, Exact-Out]
displayed_sidebar: guideSidebar
sidebar_position: 1
sidebar_class_name: hide-from-sidebar
createTime: 2025/05/20 23:47:01
---

# 交易概览

TTSWAP 全场共用**一个中央收银台**：任意两条货架之间可以直接换货，无需为每对商品单独开 pair。顾客走进商场只做一件事——「把这个商品换成那个商品」，一次合约调用结算完成。

## 两种下单方式

| 方式 | 叫法 | 典型场景 |
|:--|:--|:--|
| **`buyGood`** | Exact-In（指定付出） | 「我有 100 USDT，能买多少 ETH？」 |
| **`payGood`** | Exact-Out（指定拿回） | 「我要恰好 10 个面包，最多付 50 USDT」 |

两种方式都支持：

- **任意两商品直达**（A → B，不必先有 A-B 专营小店）；
- **deadline** 过期作废（防陈旧订单）；
- **最小 / 最大限额**（防滑点失控）；
- **商家模式**（X402 代付 Gas，见 [支付](./PayGood)）。

## 收银台背后的直觉

1. 用你付出的商品 A，算出商场内部购买力 $\Delta V$；
2. 再用 $\Delta V$ 去货架 B 换出数量 $\Delta b$。

特点：

- **价值守恒**：送进 A 的总价值等于拿走 B 的总价值；
- **滑点有界**：送得越多，单价越差，抑制巨鲸扫空；
- **O(1) 计算**：加减乘除，无指数迭代，Gas 友好。

## 怎么选函数

| 场景 | 推荐 | 指定谁 |
|:--|:--|:--|
| 普通 swap（有预算，尽量多换） | [`buyGood`](./BuyGood) | 指定输入 |
| 精确支付（要恰好 N 件） | [`payGood`](./PayGood) 异币 | 指定输出 |
| 商家精确收款（例如恰好 10 USDT） | [`payGood`](./PayGood) 同币快路径 | 指定输出 |
| Web2 订单号 + 链上支付 | `payGood` + `external_info` | 指定输出 |
| 顾客无 Gas、商家代上链 | X402 签名模式 | 见 [支付](./PayGood) |

## 手续费与六方分账

每笔交易会扣一小笔费用，按货架配置的六方比例自动记账：供货商 / 品牌方 / 门店 / 推荐人 / 顾客 / 商场。各方可随后 `collectCommission` 领取。六方之和必须严格等于 100%。

## 库存安全带

大额买卖会受 `safeLine` 约束：卖压触上界或买盘触下界时交易失败，保护货架不被恶意掏空。详见 [三重防护](../Invest&Devest/LP)。

## 本章导航

- [购买与出售（buyGood）](./BuyGood)
- [支付（payGood 与 X402）](./PayGood)
