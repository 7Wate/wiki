---
title: loguru 日志库
description: 一个非常简单但功能强大的Python日志库
keywords:
  - Python
  - loguru
  - 日志
tags:
  - Python/PyPI
  - 技术/程序语言
sidebar_position: 5
date: 2023-10-20
---

**简单而强大的 Python 日志库**

Loguru 是一个非常简单但功能强大的 Python 日志库，它可以让你用极少的代码就实现强大的日志功能。

## 安装

```shell
pip install loguru
```

## 基本用法

### 创建 Logger 对象

```python
from loguru import logger

logger.info("Hello， World!")
```

### 设置日志级别

使用 logger 的 level() 方法可以设置日志级别，级别从低到高为：TRACE、DEBUG、INFO、SUCCESS、WARNING、ERROR、CRITICAL。**值得注意的是，Loguru 还提供了一个额外的 SUCCESS 级别。**

```python
logger.level("INFO") # 设置日志级别为INFO
```

默认级别为 DEBUG，低于设置级别的日志不会被显示。

### 输出到控制台

默认 Loguru 会将日志输出到 sys.stderr，你可以通过 add() 指定其他输出方式：

```python
logger.add(sys.stdout) # 日志输出到stdout
```

### 输出到文件

输出日志到文件只需要提供文件名，Loguru 会自动处理后续的文件创建及回滚等操作：

```python
logger.add("file.log") # 日志输出到file.log文件
```

**Loguru 还提供了“热重载”功能，如果日志文件被删除或移动，将自动创建新的日志文件。**

## 格式化日志

Loguru 支持非常丰富的参数格式设置，可以完全自定义日志内容和格式。一些常用的参数包括：

| 格式化对象 | 格式化语法             | 示例                                   |
| :--------- | :--------------------- | :------------------------------------- |
| 时间       | `{time}` `{time:格式}` | `{time}`, `{time:YYYY-MM-DD HH:mm:ss}` |
| 级别       | `{level}`              | `{level}`                              |
| 消息       | `{message}`            | `{message}`                            |
| 模块       | `{module}`             | `{module}`                             |
| 函数       | `{function}`           | `{function}`                           |
| 行号       | `{line}`               | `{line}`                               |
| 进程       | `{process}`            | `{process}`                            |
| 线程       | `{thread}`             | `{thread}`                             |
| 文件名     | `{file}`               | `{file}`                               |
| Logger 名   | `{name}`               | `{name}`                               |
| 异常       | `{exception}`          | `{exception}`                          |
| 嵌套       | `{time:{hour}}`        | `{time:{hour}}`                        |
| 条件表达式 | `{level:样式 if 条件}` | `{level:红色 if level=="ERROR"}`       |
| 设置宽度   | `{参数:<宽度}`         | `{level:<8}`                           |
| 设置精度   | `{参数:.精度}`         | `{level:.2f}`                          |
| 设置颜色   | `{参数:<颜色>}`        | `{level:<red>}`                        |
| 设置样式   | `{参数:<样式>}`        | `{message:<bold>}`                     |

例如：

```python
logger.info("{time:<12} - {level:<8} - {message}", "Hello， World!")

# 输出
# 2022-07-14 20：14：32.199 - INFO - Hello， World!
```

## 日志文件管理

Loguru 可以方便地对日志文件进行管理。

### 设置日志文件大小

通过 `rotation` 参数可以设置每个日志文件的最大大小：

```python
logger.add("file.log", rotation="500 MB") # 设置日志文件最大500MB
```

### 设置回滚日志文件个数

通过 `retention` 参数可以设置保留的历史日志文件个数：

```python
logger.add("file.log", rotation="500 MB", retention="10") # 保留最近10个日志文件
```

### 滚动日志文件

日志文件到达最大大小后会自动滚动，新的日志写入到新的文件。可以通过 `rotate()` 主动触发滚动。

```python
logger.rotate("file.log") # 手动滚动日志文件
```

## 异常捕获

Loguru 可以非常方便地记录异常信息。

### 记录异常信息

在 `try except` 中使用 logger.exception() 可以记录异常堆栈：

```python
try:
    1/0
except:
    logger.exception("Catch an exception.")
```

它会打印出完整的异常信息，像正常的 traceback 模块。

### 格式化异常显示

可以使用 `format_exc` 参数来格式化显示异常：

```python
try:
    1/0  
except Exception as e:
    logger.error("Error： {e}", e=logger.format_exc())
```

## 过滤日志

可以通过添加或删除过滤器来过滤日志。

### 添加过滤器

例如只记录 warning 及以上级别的日志：

```python
logger.add(lambda msg: msg.level > 20)
```

### 删除过滤器

```python
logger.remove() # 移除所有过滤器
```

## 异步日志

Loguru 原生支持异步日志，可以通过 `queue_size` 参数开启。

```python
logger.add("file.log", enqueue=True) # 异步队列大小为1万
```

这可以大大提升日志写入速度。

## 结构化日志

可以在日志中插入字典、JSON 等结构化数据：

```python
logger.info({"timestamp": 1234, "values": [1,2,3]})
```

非常方便后续日志分析。

## 最佳实践

在项目中，我建议以下最佳实践：

1. 创建一个全局的 Loguru 对象 logger，作为日志的入口。

2. 根据应用设置合理的日志级别，如 info 或 warning。

3. 主要输出日志到文件，同时输出重要的日志到 console。

4. 使用日志文件回滚，保证不会增大无限。

5. 格式化日志，包含关键信息如时间、函数、行数等。

6. 在必要时开启异步日志。

7. 在 exception 中使用 logger.exception() 打印堆栈。

8. 根据需要添加日志过滤器。

9. 直接使用 Loguru，不需要标准 logging 模块。

```python
from loguru import logger
import sys

# 设置日志级别
logger.level("INFO")

# 输出日志到文件，并设置文件回滚策略
logger.add("file_{time}.log", rotation="1 day")  # 每天回滚

# 同时输出重要的日志到 console
logger.add(sys.stderr, level="WARNING")

# 格式化日志，包含关键信息
fmt = "<green>{time:YYYY-MM-DD HH:mm:ss}</green> | <level>{level: <8}</level> | <cyan>{name}</cyan>:<cyan>{function}</cyan>:<cyan>{line}</cyan> - <level>{message}</level>"
logger.remove()
logger.add(sys.stderr, format=fmt)

# 在必要时开启异步日志
logger.add("async_{time}.log", rotation="1 day", enqueue=True)  # 每天回滚，启用异步日志

try:
    # 做一些可能会抛出异常的操作
    1 / 0
except Exception as e:
    # 在 exception 中使用 logger.exception() 打印堆栈
    logger.exception("An error occurred: {}", e)

# 根据需要添加日志过滤器
def debug_or_higher(record):
    return record["level"].no >= logger.level("DEBUG").no

logger.add("debug_or_higher.log", filter=debug_or_higher)

# 使用 logger
logger.info("This is a normal message.")
logger.warning("This is a warning message.")
logger.error("This is an error message.")
```
