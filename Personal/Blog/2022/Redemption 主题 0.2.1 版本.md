---
title: Redemption 主题 0.2.1 版本
description: Redemption 主题 0.2.1 版本
keywords:
  - Halo
  - 主题
  - Redemption
tags:
  - 开源项目/Redemption
  - 博客/原创
authors:
  - 7Wate
date: 2022-09-14
---

这次 0.2.1 版本是基于博友的发现，简单处理了以下两个问题、并添加适配了文章页 Markdown 渲染 CSS 样式。

[点击打开 Git 仓库下载主题](https://git.7wate.com/zhouzhongping/Redemption)

## 自适应媒体查询无法正确适配屏幕

基于 870px 作为阈值，划分了移动端和桌面端；移动端暂未发现明显问题，未修改 ~

桌面端现在 8K 分辨率以下的无障碍阅读（可能存在未知错误），5K 分辨率及以下完美阅读；同时支持任意百分比缩放不失真。

评论区适配存在部分问题，因为需要调用 Halo 官方的评论组件，所以简单适配了一下。

如果存在问题请告诉我 ~

## 适配了文章页 Markdown 样式

基于开源的 Github CSS 样式，二次修改得到 Redemption 原生文章样式，根据系统自适应浅色 / 暗色模式。

## 关于 Redemption

Redemption 比较符合个人审美，核心理念是回归阅读；来日方长期待日后更加精进。
