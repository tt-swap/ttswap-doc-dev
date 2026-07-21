---
lang: zh-CN
title: 购买与出售
description: buyGood（Exact-In）用法：指定付出数量、最小到手量、deadline 与滑点保护。
keywords: [TTSWAP, buyGood, Exact-In, 兑换, 滑点, deadline]
displayed_sidebar: guideSidebar
sidebar_position: 2
createTime: 2025/05/20 23:47:01
---

# 购买与出售（buyGood）

`buyGood` 是 **Exact-In** 下单：你固定「付出多少」，协议算出「最多能拿回多少」，并校验是否满足你设的最小下限。

## 适用场景

> 「我有 100 USDT，想换成 ETH。ETH 给我多少都行，但不能少于 0.025 ETH，否则就别成交。」

适合：

- 普通 swap / 套利路径清晰时的兑换；
- 你更关心**预算上限**（手里就这么多），而不是必须拿到固定件数。

若你需要「恰好拿到 N 件」或商家精确收款，请用 [payGood](./PayGood)。

## 合约执行步骤

1. 用付出的商品数量算出购买力 $\Delta V$；
2. 用 $\Delta V$ 在目标货架算出到手数量；
3. 验证到手量 ≥ 你的最小下限（滑点保护），否则回滚；
4. 扣款、转出目标商品；
5. 扣除交易费，记入六方分账池。

## 关键字段

| 字段 | 含义 | 示例 |
|:--|:--|:--|
| `amount0` | 你付出的数量（固定） | 100 USDT |
| `amount1` | 你接受的最小到手量 | 0.025 ETH |
| `deadline` | 截止时间戳 | 强烈建议设为非零 |

另需指定：付出商品 goodid、目标商品 goodid、可选推荐人等。

## 商场公式直觉（不必死记）

**数量 → 价值**（送进 $\Delta a$ 件 A）：

$$
\Delta V = \frac{2 \cdot V_A \cdot \Delta a}{2 \cdot Q_A + \Delta a}
$$

**价值 → 数量**（用 $\Delta V$ 换 B）：

$$
\Delta b = \frac{2 \cdot Q_B \cdot \Delta V}{2 \cdot V_B + \Delta V}
$$

送得越多，边际单价越差——这是有意设计的滑点曲线，防止单笔掏空货架。

## 与 payGood 的对比

| | `buyGood` | `payGood` |
|:--|:--|:--|
| 固定侧 | 输入（付出） | 输出（拿到） |
| 保护参数 | 最小到手量 | 最大愿付量 |
| 典型用户 | 「预算固定，尽量多换」 | 「件数固定，愿付有上限」 |
| 商家精确收款 | 不直接适用 | 同币快路径最优 |

## X402 商家代下单

顾客也可只签 EIP-712 买单，由商家（Executor）代付 Gas 上链；商场从结果中扣固定 `executeFee`（约 0.05 USDT）给商家。完整说明见 [支付](./PayGood)。

## 注意事项

- 务必设置合理的 `amount1` 下限与 `deadline`，降低被夹与过期成交风险；
- 大额交易可能触及 [安全线](../Invest&Devest/LP)，失败属保护行为，可拆单或等待深度恢复；
- 任意两已上架商品均可直达，无需中间路由。
