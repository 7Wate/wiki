---
title: Obsidian 使用 Templater 插件的个性化脚本
description: Obsidian 使用 Templater 插件的个性化脚本用来写子弹笔记
keywords:
  - obsidian
  - templater
  - 个性化脚本
tags:
  - Project/数字文具盒
  - Blog/开源
  - Personal/Blog
authors:
  - 7Wate
date: 2023-09-05
---

Templater 是 Obsidian 的一个模板插件，它定义了一种模板语言，可将变量和函数结果插入到笔记中。它还将允许执行 JavaScript 代码来操作这些变量和函数。

- [Templater 仓库](https://github.com/SilentVoid13/Templater)
- [Templater 文档](https://silentvoid13.github.io/Templater/)

Templater 插件允许执行用户个性化脚本，我基于 Templater 利用 ChatGPT 开发完善了三个脚本，简单分享一下，最终实现日志自动获取每日天气，月相，每日诗词开发的三个小脚本，实现效果如下：

![效果](https://static.7wate.com/img/2023/09/05/8801e91427264.png)

- [每日天气](https://wttr.in/)：基于 wttr 的天气获取，可自定义城市、参数。
- [每日诗词](https://www.jinrishici.com/)：根据时间、地点、天气、事件智能推荐诗词。
- [每日一言](https://hitokoto.cn/)：基于一言获取每日随机美句。

```javascript
/**
 * 获取指定城市的天气信息
 * @param {string} city - 城市名
 * @param {string} params - wttr.in 的查询参数
 * @returns {Promise<string>} 天气信息
 */

郑州 +31°C ⛅️ 


/**
 * 获取今日诗词并格式化输出
 * @returns {Promise<string>} 返回格式化后的诗词
 */

接天莲叶无穷碧，映日荷花别样红。——杨万里（宋代）

/**
 * 获取一言
 * @param {Object} options - 请求的参数
 * @returns {Promise<string>} 返回一言的句子
 */
 明明只是活着，哀伤却无处不在…

```

## 脚本地址

- [Wiki 仓库 src/js 目录下](https://github.com/7Wate/wiki/tree/main/src/js)

![脚本地址](https://static.7wate.com/img/2023/09/05/9cab1145cb09a.png)

## 使用方法

1. 前置条件：脚本载入成功，可以正常刷新出来。
2. 模板文件中使用脚本函数，可以参考我的 Wiki 项目目录下的 Templater 文件夹

![配置图](https://static.7wate.com/img/2023/09/05/d2b05b11ea715.png)

![示例图](https://static.7wate.com/img/2023/09/05/9db1e81eccec9.png)
