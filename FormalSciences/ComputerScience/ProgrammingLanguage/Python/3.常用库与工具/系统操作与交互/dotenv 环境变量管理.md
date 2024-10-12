---
title: dotenv 环境变量管理
description: 在现代软件开发中，理解和正确使用环境变量是提高项目灵活性和安全性的关键。
keywords:
  - 环境变量
  - 环境配置
  - dotenv
tags:
  - Python/PyPI
  - 技术/程序语言
author: 仲平
date: 2023-12-12
---

在现代软件开发中，理解和正确使用环境变量是提高项目灵活性和安全性的关键。本文将全面介绍如何在 Python 项目中利用 `dotenv` 库高效管理环境变量，内容将由浅入深，适合各层次开发者阅读。

## 环境变量

环境变量是操作系统中用来指定操作系统运行环境的一些参数。在 Python 项目中，环境变量常用于存储配置信息，如数据库连接字符串、API 密钥等。这样做的好处是可以将配置与代码分离，使得应用更安全，同时也便于在不同环境（开发、测试、生产）中切换配置。

## Dotenv

Python 的 `dotenv` 库允许我们从一个文件中加载环境变量，而不是将它们硬编码在代码中。这使得管理私密和环境特定的数据更加安全和方便。

### 安装

开始之前，需要确保 Python 环境已经搭建好。安装 `dotenv` 只需一条简单的命令：

```shell
pip install python-dotenv
```

### 创建 .env

`.env` 文件是一个文本文件，其中包含了键值对形式的环境变量。例如：

```
DB_HOST=localhost
DB_USER=root
DB_PASS=s1mpl3
```

这个**文件应该放在项目的根目录下**，同时记得将 `.env` 添加到 `.gitignore` 文件中，避免敏感信息泄露到公共代码库。

### 方法

| 方法              | 描述                                                         | 示例代码                          |
| ----------------- | ------------------------------------------------------------ | --------------------------------- |
| `load_dotenv()`   | 加载 `.env` 文件中的环境变量。默认情况下，加载当前目录下的 `.env` 文件。 | `load_dotenv()`                   |
| `dotenv_values()` | 读取 `.env` 文件并返回一个包含所有环境变量的字典。           | `config = dotenv_values(".env")`  |
| `find_dotenv()`   | 在文件系统中查找 `.env` 文件。默认从当前目录开始递归搜索，直到找到为止。 | `dotenv_path = find_dotenv()`     |
| `set_key()`       | 将一个新的键值对添加到 `.env` 文件中。                       | `set_key(".env", "KEY", "value")` |
| `unset_key()`     | 从 `.env` 文件中删除一个键值对。                             | `unset_key(".env", "KEY")`        |
| `get_key()`       | 从 `.env` 文件中读取指定的键的值。                           | `value = get_key(".env", "KEY")`  |

### 使用

一旦 `.env` 文件准备好，就可以在 Python 代码中使用 `dotenv` 来加载这些变量了。以下是一个简单的示例：

```
from dotenv import load_dotenv
import os

# 加载.env文件
load_dotenv()

# 使用环境变量
db_host = os.getenv("DB_HOST")
db_user = os.getenv("DB_USER")
db_pass = os.getenv("DB_PASS")

print(f"Database host: {db_host}")
```

在这个示例中，`load_dotenv()` 会查找并加载 `.env` 文件，然后可以通过 `os.getenv` 来访问这些变量。

### 优先级

`dotenv` 库在处理环境变量时，遵循一定的优先级规则，首先考虑的是系统环境变量，它们在操作系统中已设定，拥有最高优先级，并且不会被 `.env` 文件中的设置覆盖。接着是 `.env` 文件中定义的变量，仅在系统环境变量未定义相同变量时生效。

| 优先级 | 来源                 | 描述                                                         |
| ------ | -------------------- | ------------------------------------------------------------ |
| 1      | 系统环境变量         | 在操作系统中已经设置的环境变量，具有最高优先级。             |
| 2      | `.env` 文件          | `dotenv` 读取的项目根目录下的 `.env` 文件中定义的环境变量。  |
| 3      | 其他 dotenv 配置文件 | 如 `.env.development`、`.env.test` 等，根据项目配置或命令行参数加载。 |
| 4      | 程序内部设置         | 在程序运行时直接设置的环境变量（例如使用 `os.environ`）。这些设置只在当前程序运行期间有效。 |

## 最佳实践和安全性

使用环境变量的一个主要目的是提高应用程序的安全性。遵循以下最佳实践可以帮助您达到这一目的：

- **不要将 `.env` 文件提交到版本控制系统**：确保 `.env` 文件在 `.gitignore` 中，以防止敏感信息泄露。
- **在不同环境中使用不同的 `.env` 文件**：例如，您可能会有 `.env.development`、`.env.test` 和 `.env.production` 文件，根据环境加载不同的配置。

## 与框架集成

`dotenv` 可以轻松地与各种 Python 框架（如 Flask 或 Django）集成。例如，在 Flask 应用中，可以在应用启动时加载 `.env` 文件：

```
from flask import Flask
from dotenv import load_dotenv

load_dotenv()  # 加载.env文件
app = Flask(__name__)

# 应用配置
app.config['SECRET_KEY'] = os.getenv('SECRET_KEY')
```

在这个例子中，Flask 应用将从 `.env` 文件加载秘钥等配置。

## 高级功能

`dotenv` 库也支持一些高级功能，如类型转换和默认值。例如，您可以这样设置默认值：

```
from dotenv import load_dotenv
import os

load_dotenv()

# 获取环境变量，如果不存在则返回默认值
debug_mode = os.getenv('DEBUG', 'False').lower() == 'true'
```

在这个例子中，如果 `DEBUG` 环境变量不存在，`debug_mode` 将默认为 `False`。

## 错误处理和调试

当环境变量不存在或出现其他问题时，合理的错误处理和调试非常重要。例如，您可以检查变量是否被正确加载：

```
db_user = os.getenv("DB_USER")
if db_user is None:
    raise ValueError("未找到DB_USER环境变量。")
```

这段代码将验证 `DB_USER` 是否被正确设置，如果没有，将抛出一个异常。
