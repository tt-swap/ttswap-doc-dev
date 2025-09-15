---
pageLayout: 'home'
title: Home
config:
  -
    type: hero
    # banner: https://api.pengzhanbo.cn/wallpaper/bing
    # background: tint-plate
    bannerMask:
      light: 0.1
      dark: 0.3
    hero:
      name: TTSWAP
      tagline: Next Generation Decentralized Exchange
      text: No Intermediary • Low Slippage • No Impermanent Loss • Role-Based Commission • Low Gas
      actions:
        -
          text: Start Trading
          theme: brand
          link: https://app.ttswap.io
  -
    type: features
    features:
      -
        title: All Tokens Share Liquidity, Trading is More Free
        icon: 💧
        details: You no longer need to establish trading pairs one by one, nor worry about "pool too small, insufficient liquidity". TTSWAP allows all trading pairs to share a super pool for the same token, making trading faster and smoother.
      -
        title: No Principal Loss, LPs Feel More Secure
        icon: 🌐
        details: On other platforms, when you provide liquidity, you easily lose money due to price fluctuations, which is called principal loss, also known as "impermanent loss". TTSWAP protocal can effectively avoid this problem, and your investment won't decrease.
      -
        title: Ultra-Low Trading Loss, Reduced by Over 70%
        icon: 🌱
        details: The protocol enhances liquidity by allowing one investment to provide multiple times the liquidity, and eliminates trading pairs to concentrate liquidity distributed across various pairs into one pool, ultimately reducing trading loss by over 70%.
      -
        title: Gas Fee Savings of 50%-90%
        icon: ⛽️
        details: Streamlined smart contract structure and optimized computational logic make every transaction cheaper than on traditional platforms—Gas savings you can see.
      -
        title: Native ETH Support
        icon: 🔁
        details: Trading supports Native ETH, no wrapping needed, more convenient and direct, while saving over 20,000 gwei in fees.
      -
        title: Everyone Participates, Fees Automatically Distributed by Role
        icon: 📊
        link: document_en/community/introduce.html
        details: Everyone can participate. Users, referrers, gateways, liquidity providers, token operators, and ecosystem contributors can all receive a certain percentage of fee commissions.
      -
        title: Every Investment Can Mint (TTS)
        icon: 💰
        details: When you invest tokens, the system automatically calculates based on your investment value and starts "secondary mining", earning additional TTS rewards.
      -
        title: MEV Attack Protection, Ensuring Trading Security
        icon: 🪖
        details: Users can enable MEV attack protection to ensure trading security.
      -
        title: TTS Tokens Are Frozen, Price Must Double to Unfreeze Proportionally
        icon: 👥
        link: document_en/token/Token.html
        details: TTS tokens adopt an innovative goal-oriented deflationary model, ensuring token value is tightly bound to project development through price unlocking mechanisms and community profit burning. Meanwhile, through differentiated unlocking rules, different roles are incentivized to contribute to the ecosystem, achieving win-win for all parties.

  -
    type: custom
---

## Constant Value Trading Protocol Introduction

$$
\text{Value before commodity exchange} = \text{Value after commodity exchange} \\
$$
>The reason for exchange is the mismatch between quantity and value, automatically matched through market mechanisms

### 🔹 Step 1: Definition Introduction
Let:
* $V_a$: Current total value of Token A (unit: e.g., USD)
* $Q_a$: Current total quantity of Token A
* $V_b$, $Q_b$: Total value and quantity of Token B
* $Δa$: Quantity of A that the user wants to invest
* $ΔV$: Value transferred in this exchange (from A to B)
* $Δb$: Quantity of B exchanged from the pool based on value transfer

---

### 🔹 Step 2: Formula Under Equal Value Conditions

$$
Δb = \frac{Q_b}{Q_a + Δa} \cdot  Δa
$$
>Split commodity b according to the quantity of a, then exchange Δa portions

---

### 🔹 Step 3: Derivation of Exchange Formula Under Unequal Value Conditions

$$
ΔV = \frac{V_a}{Q_a + {{Δa}\over 2}} \cdot Δa \\
$$
$$
Δb = \frac{Q_b}{V_b + {{ΔV}\over 2}} \cdot ΔV \\
$$

---

### 🔹 Step 4: Update Token A and B Values and Quantities After Trading

|    | Token A          | Token B          |
| -- | ---------------- | ---------------- |
| Value | $V_a$ | $V_b$ |
| Quantity | $Q_a + Δa$ | $Q_b - Δb$ |

---

### 🔹 Step 5: New Exchange Ratio After Trading

* After trading completion, new marginal values:

$$
P_a^{\text{new}} = \frac{V_a}{Q_a + Δa}
\quad , \quad
P_b^{\text{new}} = \frac{V_b}{Q_b - Δb}
$$

* New exchange ratio:

$$
R_{a \to b} = \frac{P_a^{\text{new}}}{P_b^{\text{new}}}
$$


## Contact Information

Twitter:[@ttswapfinance](https://x.com/ttswapfinance)  
Telegram:[@ttswapfinance](https://t.me/ttswapfinance)  
Email:[bussiness@ttswap.io](mailto:bussiness@ttswap.io)  
Discord:[ttswap](https://discord.gg/XygqnmQgX3)  
Github:[ttswap](http://github.com/ttswap)  
Website:[ttswap.io](https://ttswap.io)


Welcome everyone to join our community
