---
title: YubiKey 历险记
description: YubiKey 历险记
keywords:
- YubiKey 
- 历险记
tags: 
- YubiKey
authors:
- 7Wate
date: 2023-01-10
---

2022 年 9 月 29 日 [CloudFlare](https://www.cloudflare.com/) 与 [Yubico](https://www.yubico.com/) 开展了周年活动合作，可以为用户提供最低 10 美元购买 YubiKey 5 的机会。 YubiKey 活动力度这么大，啥也不说了赶紧上车。

YubiKey 是一种小巧安全的令牌，主要用于两步验证和数据加密。对于 YubiKey 从功能上简单来说就是类似于银行的 U盾，但是 YubiKey 相较于 U盾拥有更多的功能。YubiKey 支持多种验证协议：FIDO U2F 和 FIDO2 协议可以用来登录网站和应用程序；而 Yubico OTP 协议可以用来生成一次性密码；OpenPGP 和 PIV 协议可以用来加密数据和电子邮件。

虽然 YubiKey 适用的场景非常广泛，但是在国内却是非常小众的产品，只有相关的技术爱好者才有所了解。国内目前清华大学技术团队推出了 YubiKey 的替代品 [CanoKey](https://www.canokeys.org/)，CanoKey 的目标是从零开始再造一个 YubiKey，即支持 OpenPGP、PIV、TOTP、FIDO 等多种功能的安全密钥。目前 CanoKey 的实现和文档都在 GitHub 上公开，并已经经过了小规模的生产测试。

我呢说实话听都不想听到这些乱七八糟的协议，更不用提给各位科普这些乱七八糟的协议了。但是这次 Yubico 的活动实在是太具有诱惑力了，没有需求也要创造需求！简单记录分享一下顺丰转运的过程。领取优惠码什么的都不唠叨了，主要就是关于电子产品的转运。

![image-20230110192337989](https://static.7wate.com/img/2023/01/10/d2dea801aec94.png)

总之因为各种各样的原因，YubiKey 属于对华禁运产品，主要的坑在于 AES 申报，有可能会被拒单，然后就很恶心了。我也是在阅读了很多经验帖后，优惠码马上到期的时候选择顺丰国际上车的。总的来说大部分**常用的转运都可以运回，但是时效特别长**，甚至有的需要两个月才可以。**顺丰国际转运有概率被 AES，而且运费偏高一定被收税。**

- 12 月 10 日：Yubico 提交订单。
- 12 月 21 日：Yubico 订单发货。
- 12 月 23 日：到达顺丰国际美国仓，收货处理中。
- 12 月 24 日：出库资料审核中。
- 12 月 28 日：顺丰出库。
- 12 月 31 日：美国纽约分部航班起飞。
- 1 月 9 日：抵达口岸，清关完成。
- 1 月 10 日：收到 YubiKey 

![YubiKey](https://static.7wate.com/img/2023/01/11/b79cf671c52ae.jpg)

刚刚好花费了一个月的时间，也算是正常的速度。关于是否会被 AES 的问题，**只能说有概率**。全程顺丰转运快递费 83 元，税费 63 元（**共产主义好**）；算下来总共花费 458 元，平均每个 115 元。咸鱼包邮 190 元一个，还是嘎嘎的香呀。目前 YubiKey 相较于 CanoKey 产品成熟度更高，淘宝上 CanoKey 是 169 元包邮，想要了解的可以尝试一下。

> 转运经验帖：[Yubikey 5C NFC SFBUY 顺丰转运 全流程体验分享 - 问谛居](https://www.wd-ljt.com/post/1106/938.html)；仅引用，著作权归作者所有。
