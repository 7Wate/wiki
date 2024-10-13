---
title: poetry
description: Python poetry 虚拟环境
keywords:
  - Python
  - poetry
  - 虚拟环境
tags:
  - Python/虚拟环境
  - 技术/程序语言
author: 7Wate
date: 2023-01-18
---

## 简介

[Poetry](https://python-poetry.org/) 是一个面向未来的 Python 依赖管理和打包工具，它支持了 Python 社区的 [PEP 518](https://www.python.org/dev/peps/pep-0518/) 提案里的 pyproject.toml 新标准文件，用以管理我们与 Python 项目有关的内容。它的目的是简化 Python 包管理的过程，使其变得更容易和更可靠。

Poetry 主要由两部分组成：

- 一个命令行工具，用于管理依赖关系和发布包。
- 一个配置文件（pyproject.toml），用于描述项目的元数据和依赖关系。

Poetry 的一个重要特点是它支持自动生成和维护项目的锁定文件（Pipfile.lock），锁定文件用于跟踪项目依赖关系的版本号。这样可以保证项目在不同环境中使用相同的依赖关系版本。

Poetry 也支持创建和发布 Python 包，使用 poetry build 命令可以生成可发布的包，使用 poetry publish 命令可以将包发布到 PyPI 上。

总之 poetry 是一个功能强大，简单易用，支持创建和发布包的工具，适合于开发和维护 Python 项目的开发人员使用。它提供了一组简单易用的命令来管理项目的依赖关系，并且支持自动生成和维护项目的锁定文件，保证项目在不同环境中使用相同的依赖关系版本。并且它还支持创建和发布 Python 包,使得开发者可以更加方便地管理项目和发布自己的包。

## 使用

### 1. 安装

Poetry 为了避免版本控制混乱，**不推荐使用 pip 安装 poetry。**

#### Linux, macOS, Windows (WSL)

```shell
curl -sSL https://install.python-poetry.org | python3 -
```

#### Windows (Powershell)

如果是通过 Microsoft Store 安装的 Python，请将命令中的 py 替换为 python。

```shell
(Invoke-WebRequest -Uri https://install.python-poetry.org -UseBasicParsing).Content | py -
```

### 2. 设置

Poetry 会基于平台安装在特定的目录，如果此目录不在 Path 中需要手动添加路径：

- MacOS：`~/Library/Application Support/pypoetry/venv/bin/poetry`
- Linux/Unix：`~/.local/share/pypoetry/venv/bin/poetry`
- Windows：`%APPDATA%\pypoetry\venv\Scripts\poetry`

设置完成后，可以使用 `poetry --version` 命令验证版本。

### 3. 使用

#### 3.1 项目管理

##### 新建项目

```shell
# 新建 poetry-demo 项目
poetry new poetry-demo

# 项目目录
poetry-demo
├── pyproject.toml
├── README.md
├── poetry_demo
│   └── __init__.py
└── tests
    └── __init__.py

# pyproject.toml
[tool.poetry]
name = "poetry-demo"
version = "0.1.0"
description = ""
authors = ["Sébastien Eustace <sebastien@eustace.io>"]
readme = "README.md"
packages = [{include = "poetry_demo"}]

[tool.poetry.dependencies]
python = "^3.7"


[build-system]
requires = ["poetry-core"]
build-backend = "poetry.core.masonry.api"

```

##### 初始化项目

```shell
# 初始化
cd pre-existing-project
poetry init

# 引导创建项目配置
······
```

#### 3.2 虚拟环境

```shell
# 激活虚拟环境
poetry shell

# 关闭虚拟环境
exit
deactivate

# 设置 Python 版本
poetry env use /full/path/to/python
poetry env use python3.7
poetry env use 3.7

# 环境信息
poetry env info
poetry env list

# 删除环境
poetry env remove /full/path/to/python
poetry env remove python3.7
poetry env remove 3.7

# 删除所有虚拟环境
poetry env remove --all
```

#### 3.3 安装依赖

```shell
# 安装依赖
poetry install

# 添加依赖包
poetry add django

# 安装依赖指定版本
poetry add django@^4.0.0
poetry add django@latest

# 移除依赖
poetry remove django

# 更新依赖
poetry update
```

#### 3.4 依赖组别

Poetry 提供了一种按组织依赖项的方法。例如，您可能拥有仅用于测试项目或构建文档所需的依赖项。

```shell
# -D 选项添加到开发组依赖
poetry add -D black flake8 mypy

# -D 选项移除开发组依赖
poetry remove -D black flake8 mypy

# --group 选项添加到指定组
poetry add pytest --group test
```

#### 3.5 打包发布

```shell
# 打包
poetry build

# 发布 PyPI
poetry publish

# 设置包源
poetry config repositories.foo https://pypi.example.org/legacy/

# 发布指定包源
poetry publish --build --repository foo-pub

# 导出 requirements.txt
poetry export -o requirements.txt

# 不导出 Hash 值
poetry export --without-hashes

# 导出开发依赖
poetry export --without-hashes --dev
```

#### 3.6 依赖包源

```shell
# --default 选项配置默认包源
poetry source add --default foo https://foo.bar/simple/

# --secondary 选项配置辅助包源
poetry source add --secondary foo https://pypi.example.org/simple/

# 配置辅助包源凭证
poetry config http-basic.foo <username> <password>

# 指定包源添加依赖
poetry add --source foo private-package
```

### 4. 命令

poetry 的 [常用命令](https://python-poetry.org/docs/cli)，完整的命令可以在终端执行 poetry --help 查看。

| 命令    | 作用           |
| ------- | -------------- |
| new     | 创建新项目     |
| install | 安装项目依赖   |
| add     | 添加项目依赖   |
| remove  | 删除项目依赖   |
| update  | 更新项目依赖   |
| lock    | 生成锁定文件   |
| build   | 构建项目包     |
| publish | 发布项目包     |
| env     | 管理虚拟环境   |
| run     | 运行项目       |
| shell   | 进入项目环境   |
| config  | 查看或修改配置 |
| info    | 显示项目信息   |
| check   | 检查项目状态   |

### 5. 更新

```shell
# 自动更新
poetry self update
# 安装预发布版本
poetry self update --preview
# 安装特定版本
poetry self update 1.3.0
```

### 6. 卸载

Poetry 可以通过使用 `--uninstall` 选项再次运行安装程序，或 `POETRY_UNINSTALL` 在执行安装程序之前设置环境变量来将它从系统中完全删除。

```shell
curl -sSL https://install.python-poetry.org | python3 - --uninstall
curl -sSL https://install.python-poetry.org | POETRY_UNINSTALL=1 python3 -
```
