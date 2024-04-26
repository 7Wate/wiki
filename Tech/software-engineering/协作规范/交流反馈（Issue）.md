---
title: 交流反馈（Issue）
description: Git 协作交流反馈（Issue）
keywords:
  - Git
  - 协作规范
  - 交流反馈
tags:
  - 软件工程/Git协作
  - 技术/软件工程
author: 7Wate
date: 2023-06-26
---

文件命名：**ISSUE.md**。

## 新需求（Pull Request）

规范：使用 `Pr<scope>:title` 来命名。`<scope>` 表示需求涉及的模块或功能，`title` 则表示具体需求的主题。

示例：`Pr(auth):role-based authorization`

提交新需求时，请遵循以下格式：

规范：`Pr<scope>:title`

示例：`Pr(auth):role-based authorization`

```markdown
## 背景

- 描述你希望解决的问题
- 如果相关的 issue 或社区帖子已存在，请附上链接

## 思路

描述解决思路，可以包含 API 设计和伪代码等。

## 实现

附上对应的 Pull Request 地址。如果还未实现，可以描述你打算如何实现此需求。

```

## 反馈缺陷（Bug）

在提交 Bug 前，请务必先阅读**提问的智慧！**

规范：使用 `Bug<scope>:title` 来命名。`<scope>` 表示 Bug 涉及的模块或功能，`title` 则表示 Bug 的主要问题。

示例：`Bug(login):Admin password cannot be reset`

提交 Bug 反馈时，请遵循以下格式：

```markdown
## 运行环境

- 系统（Linux、Mac、Windows）
- 环境（运行版本、配套软件版本）

## 该问题是怎么引起的？

- 简述可能引起的原因和操作步骤

## 重现步骤

- 陈述可以复现 Bug 的详细步骤

## 报错信息

- 附上具体的报错信息、日志等。如果可能，截图也会非常有用。

```

## 答疑交流（Usage）

一般来说，我们更推荐使用社区自助交流方式。

规范：使用 `Usage<scope>:title` 来命名。`<scope>` 表示问题涉及的模块或功能，`title` 则表示问题的主要内容。

示例：`Usage(update):1.2.3 version update failed`

提交问题或请求帮助时，请遵循以下格式：

```markdown
## 运行环境

- 系统（Linux、Mac、Windows）
- 环境（运行版本、配套软件版本）

## 报错信息

- 提供详细的报错信息、日志等。截图，如果可能，也是非常有用的。

```
