---
title: Virtualenv
description: Python Virtualenv 虚拟环境
keywords:
  - Python
  - Virtualenv
  - 虚拟环境
tags:
  - Python/虚拟环境
  - 技术/程序语言
author: 7Wate
date: 2023-01-17
---

## 简介

[Virtualenv](https://virtualenv.pypa.io/en/latest/) 是 Python 社区一款老牌、成熟的虚拟环境管理工具，经过多个版本迭代也具备丰富的功能。并且自从 Python 3.3 版本开始，它的部分功能已也被集成到了 venv 标准库中，足见其对于 Python 虚拟环境管理工作贡献的份量如何。

从某些程度上来说，Virtualenv 和 venv 的功能十分类似，但 Virtualenv 在其官方文档中也指出了 venv 的不足之处：

- is slower（创建速度慢）
- is not as extendable（可扩展性差）
- cannot create virtual environments for arbitrarily installed python versions（无法创建任意 Python 版本的虚拟环境）
- is not upgrade-able via pip（无法通过 pip 进行升级）
- does not have as rich programmatic API（没有丰富的 API 编程方法扩展）

而这些不足之处在 Virtualenv 里都有了比较完善的解决方案。

## 使用

virtualenv 是一个用于创建虚拟环境的库。它可以在其中安装 Python 包并运行 Python 程序。使用 virtualenv 创建虚拟环境的方法如下：

1. 安装 virtualenv：

```shell
pip install virtualenv
```

1. 创建虚拟环境：

```shell
virtualenv env_name
```

1. 激活虚拟环境：

| Shell      | 用于激活虚拟环境的命令                |
| :--------- | :------------------------------------ |
| bash/zsh   | `$ source <venv>/bin/activate`        |
| fish       | `$ source <venv>/bin/activate.fish`   |
| csh/tcsh   | `$ source <venv>/bin/activate.csh`    |
| PowerShell | `$ <venv>/bin/Activate.ps1`           |
| cmd.exe    | `C:\> <venv>\Scripts\activate.bat`    |
| PowerShell | `PS C:\> <venv>\Scripts\Activate.ps1` |

在激活虚拟环境后，可以使用 pip 安装包。可以使用 **deactivate 命令关闭虚拟环境**。
