---
title: pyenv
description: pyenv是一个流行的Python版本管理工具，它允许你在同一系统上安装和使用多个Python版本。
keywords:
  - pyenv
  - 虚拟环境
  - Python
tags:
  - Python/虚拟环境
  - 技术/程序语言
author: 仲平
date: 2023-12-22
---

## 概述

Python 是一种广泛使用的高级编程语言，以其易读性和强大的库支持而闻名。然而，随着项目数量和复杂性的增加，管理不同项目所需的不同 Python 版本和依赖成为了一个挑战。`pyenv` 和 `pipenv` 是两个解决这些问题的强大工具，能够帮助开发者有效地管理多个 Python 版本和项目环境。

`pyenv` 是一个流行的 Python 版本管理工具，它允许你在同一系统上安装和使用多个 Python 版本。它提供了一个干净的方式来切换全局 Python 版本，也可以在项目级别设置特定的 Python 版本。

## 实现

`pyenv` 实现多版本 Python 管理的核心是通过拦截 Python 命令，选择并使用特定的 Python 版本。这是通过几个关键步骤和机制实现的：

### 1. 改变 PATH 环境变量

`pyenv` 在你的 `PATH` 环境变量前面插入一个 `shims` 目录。当你运行 `python` 或 Python 包的任何命令时，实际上你首先运行的是一个 `shim`。

### 2. 使用 Shims

**Shims**是一种轻量级的转发脚本，它们决定实际调用哪个 Python 版本。当你运行 `python` 时，`shim` 会查询 `pyenv` 以确定使用哪个版本的 Python。

### 3. 版本选择

`pyenv` 根据多个因素确定使用哪个 Python 版本，包括：

- 全局版本：你通过 `pyenv global` 设置的系统范围的默认版本。
- 项目级别版本：通过 `pyenv local` 在特定项目目录下设置的版本。
- Shell 临时版本：通过 `pyenv shell` 为当前会话设置的版本。
- 版本继承：如果你在一个没有本地版本设置的目录中，`pyenv` 会向上查找父目录直到找到一个版本或达到全局版本。

### 4. 构建和安装 Python

当你要求安装新的 Python 版本时，`pyenv` 会下载源代码，然后根据你的系统配置编译它。完成后，该特定版本的 Python 将被安装在 `~/.pyenv/versions` 目录下。

### 5. 灵活性和可扩展性

- `pyenv` 可以通过插件来扩展，如 `pyenv-virtualenv`，提供对虚拟环境的支持。
- 它不会覆盖系统 Python 版本，而是允许你在系统 Python 和任意数量的不同版本之间切换。

## 使用

### 1. 安装 Python 版本

确定项目需要哪个 Python 版本。使用 `pyenv install <version>` 来安装该版本（如 `3.8.5`）。

### 2. 创建项目目录

为你的项目创建一个新目录，或者导航到现有项目的目录。

### 3. 设置项目的 Python 版本

在项目目录中，使用 `pyenv local <version>` 设置项目使用的 Python 版本。这将在当前目录创建一个 `.python-version` 文件，指定该目录下所有命令应使用的 Python 版本。

### 4. 验证 Python 版本

在项目目录中运行 `python --version` 确保正确的 Python 版本被激活。

### 5. （可选）集成虚拟环境

虽然 `pyenv` 本身不直接处理虚拟环境，但它与 `pipenv`、`virtualenv` 等工具兼容。如果需要，可以现在设置虚拟环境：

- 使用 `pipenv`：运行 `pipenv install` 来创建虚拟环境并生成 `Pipfile`。
- 使用 `virtualenv`：首先安装 `pyenv-virtualenv` 插件，然后使用 `pyenv virtualenv <version> <env-name>` 创建一个新的虚拟环境。

### 6. 激活虚拟环境（如果使用）

如果你使用了虚拟环境工具：

- 对于 `pipenv`：使用 `pipenv shell` 来激活虚拟环境。
- 对于 `pyenv-virtualenv`：虚拟环境将根据 `.python-version` 或 `pyenv local <env-name>` 自动激活。

### 7. 安装依赖

在激活的虚拟环境中，使用 `pip` 或 `pipenv` 安装项目所需的所有依赖。

### 8. 开发和测试

进行你的正常开发工作。只要你在项目目录中，`pyenv` 和虚拟环境都会确保使用正确的 Python 版本和依赖。

### 9. 提交和共享

在项目的版本控制系统（如 Git）中提交 `.python-version` 文件（不要提交虚拟环境）。这样，其他开发者可以了解并使用相同的 Python 版本。

## 命令

| 命令                                    | 描述                                  | 示例/注释                                                    |
| --------------------------------------- | ------------------------------------- | ------------------------------------------------------------ |
| `pyenv install <version>`               | 安装指定的 Python 版本                  | `pyenv install 3.8.5` 安装 Python 3.8.5                       |
| `pyenv uninstall <version>`             | 卸载指定的 Python 版本                  | `pyenv uninstall 3.8.5` 卸载 Python 3.8.5                     |
| `pyenv versions`                        | 列出所有已安装的 Python 版本            | 列出系统中所有可用的 Python 版本                               |
| `pyenv version`                         | 显示当前激活的 Python 版本              | 显示当前会话或全局设置的 Python 版本                           |
| `pyenv global <version>`                | 设置全局默认的 Python 版本              | `pyenv global 3.8.5` 设置全局版本为 3.8.5                     |
| `pyenv local <version>`                 | 设置当前目录的 Python 版本              | `pyenv local 3.7.7` 设置当前目录的 Python 版本                 |
| `pyenv shell <version>`                 | 设置当前会话的 Python 版本              | `pyenv shell 3.6.9` 临时更改会话的 Python 版本                 |
| `pyenv rehash`                          | 重新计算并安装 shim                    | 在安装新版本或卸载后更新 shim                                 |
| `pyenv which <command>`                 | 显示特定命令的路径                    | `pyenv which pip` 显示 `pip` 命令的路径                        |
| `pyenv exec <command>`                  | 在选定的 Python 环境中执行命令          | `pyenv exec pip list` 在当前环境中运行 `pip list`             |
| `pyenv init`                            | 用于配置 shell 环境                     | 通常添加到 `.bashrc` 或 `.zshrc`                                |
| `pyenv virtualenvs`                     | 列出所有已创建的虚拟环境              | 列出系统中所有已创建的虚拟环境                               |
| `pyenv virtualenv <version> <env-name>` | 创建一个新的虚拟环境                  | `pyenv virtualenv 3.8.5 myenv` 创建名为 `myenv` 的虚拟环境     |
| `pyenv virtualenv-delete <env-name>`    | 删除指定虚拟环境                      | `pyenv virtualenv-delete myenv` 删除名为 `myenv` 的虚拟环境    |
| `pyenv local --unset`                   | 取消项目级别的 Python 版本设置          | `pyenv local --unset` 取消项目目录下的 Python 版本设置         |
| `pyenv shell --unset`                   | 取消会话级别的 Python 版本设置          | `pyenv shell --unset` 取消会话中的 Python 版本设置             |
| `pyenv local --unset-all`               | 取消所有项目级别的 Python 版本设置      | `pyenv local --unset-all` 取消所有项目目录下的 Python 版本设置 |
| `pyenv version-file`                    | 查找当前目录下的 `.python-version` 文件 | `pyenv version-file` 查找并显示当前目录下的 `.python-version` 文件路径 |
