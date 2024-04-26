---
title: 注释（Comments）
description: Git 协作注释
keywords:
  - Git
  - 协作
  - 注释
tags:
  - 软件工程/Git协作
  - 技术/软件工程
author: 7Wate
date: 2023-06-26
---

**代码**应视为**最好的注释**，因此应尽量使用**英文注释**，并坚决**避免滥用**注释。不必在代码中标明**作者、时间、或改动记录**，这些信息应放在 **Git** 的**提交日志**中！

## 行注释

行注释应放在相应代码行**之前**，而不是代码行之后。

```javascript
// 注释文字
代码
```

示例：

```javascript
// 启用便携式支持
const portable = bootstrapNode.configurePortable(product);
```

## 关键字注释

在注释块的**尾部**，关键字前添加 `@` 符号。

```javascript
/* 
 * 注释
 * @type{变量} 注释
 * @param{变量} 注释
 * @returns{变量} 注释
 */
```

示例：

```javascript
/*
 * @param {string} dir
 * @returns {Promise<string>}
 */
function mkdirp(dir) {
 return new Promise((resolve, reject) => {
  fs.mkdir(dir, { recursive: true }, err => (err && err.code !== 'EEXIST') ? reject(err) : resolve(dir));
 });
}
```

## 版权注释

版权注释应位于**代码文件首行**。

```javascript
/*----------------
 * 版权归 XX 所有
 * 遵循 XX 开源协议
 *----------------*/

代码···
```

上下分割线的长度应为描述文字长度的 1.1 倍。`/* */` 不应与注释内容放在同一行，且描述文字前应保持 1 个空格。

示例：

```javascript
/*---------------------------------------------------------------------------------------
 * Copyright (c) Microsoft Corporation. All rights reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 *---------------------------------------------------------------------------------------*/
 
const perf = require('./vs/base/common/performance');
perf.mark('code/didStartMain');
```
