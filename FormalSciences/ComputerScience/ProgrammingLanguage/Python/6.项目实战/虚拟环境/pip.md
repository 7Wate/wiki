---
title: pip
description: Python 标准 PIP 包管理器
keywords:
  - Python
  - pip
  - 软件包管理器
tags:
  - Python/虚拟环境
  - 技术/程序语言
author: 7Wate
date: 2023-10-26
---

pip 是 Python 的包管理工具，用于安装和管理 Python 软件包。它从 Python 包索引（PyPI）获取包并安装。通过 pip，我们可以方便地使用已经编写好的 Python 库和框架，避免重复造轮子，提升开发效率。

## 安装和升级

现在在安装 Python 时已经包含了 pip，因此一般不需要单独安装。但是，我们需要定期更新 pip 以保持其版本的新旧。升级 pip 的命令如下：

```shell
pip3 install --upgrade pip
```

## 使用 Pip 安装包

使用 pip 安装包非常简单，基本命令如下：

```shell
pip install package_name
```

比如，我们想要安装著名的数据处理库 Pandas，只需输入：

```shell
pip install pandas
```

有时，我们需要安装特定版本的包，可以在包名后面添加 `==` 和版本号，如安装版本为 1.2.3 的 Pandas：

```shell
pip install pandas==1.2.3
```

## 升级和卸载包

我们可以用 pip 来升级已经安装的包，命令如下：

```shell
pip install --upgrade package_name
```

如果我们不再需要某个包，可以用 pip 来卸载它，命令如下：

```shell
pip uninstall package_name
```

## requirements.txt

在 Python 项目中，我们通常会有很多依赖，这些依赖会被写在一个名为 `requirements.txt` 的文件中。这个文件是一个文本文件，列出了项目所需的所有 Python 包及其对应的版本号。比如，一个 `requirements.txt` 可能是这样的：

```text
numpy==1.18.5
pandas==1.2.3
scikit-learn==0.23.2
```

我们可以通过以下命令来安装 `requirements.txt` 中的所有包：

```shell
pip install -r requirements.txt
```

pip 并不是 Python 的唯一包管理工具。比如，conda 是一个同时处理 Python 和非 Python 包的工具，适合于科学计算和数据分析；pipenv 和 poetry 则集成了包管理和虚拟环境管理，适合于开发 Python 应用。

## Venv 虚拟环境

venv 是 Python3 中自带的虚拟环境工具。它可以在单独的目录中创建独立的 Python 运行环境，使得项目所需的包和版本与其他项目隔离开来，避免版本冲突。

使用 venv 创建虚拟环境的方法如下：

1. 在终端中运行下面的命令创建虚拟环境：

``` shell
python3 -m venv /path/to/new/virtual/env_name
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
