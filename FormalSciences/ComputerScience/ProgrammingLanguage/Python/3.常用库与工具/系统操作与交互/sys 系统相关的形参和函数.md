---
title: sys 系统相关的形参和函数
description: sys 系统相关的形参和函数
keywords:
  - Python
  - 拓展模块
  - sys
tags:
  - Python/标准库
  - 技术/程序语言
author: 7Wate
date: 2023-09-07
---

## 概述

`sys` 模块是 Python 标准库中的一部分，它**提供了与 Python 解释器及其环境交互的功能**。这包括对命令行参数、标准输入/输出、异常处理、解释器配置等的访问。

`sys` 模块是 Python 的标准库之一，自 Python 诞生以来一直存在，并随着 Python 的发展不断更新和改进。

`sys` 模块用于各种用例，包括：

- 访问和操作命令行参数。
- 控制 Python 解释器的运行时行为。
- 处理异常和退出程序。
- 访问与 Python 解释器相关的信息。
- 执行与系统交互的任务。

**优点**：

- 内置模块，无需安装。
- 提供了许多与 Python 解释器及其环境交互的功能。
- 可以用于处理系统级任务。

**缺点**：

- 有些功能可能是平台相关的，不一定在所有系统上表现一致。
- 高级功能需要一定的 Python 知识。

## 基础操作

`sys` 是 Python 的标准库之一，无需额外安装。

### 基本功能

```python
import sys

# 获取 Python 解释器版本
print("Python版本:", sys.version)

# 获取命令行参数
print("命令行参数:", sys.argv)

# 获取系统平台信息
print("系统平台:", sys.platform)
```

### 常用示例代码

以下是一些 `sys` 模块的常用示例代码：

```python
import sys

# 假设脚本名为 script.py，运行时传递参数：python script.py arg1 arg2
script_name = sys.argv[0]
arguments = sys.argv[1:]

print("脚本名称:", script_name)
print("命令行参数:", arguments)


# 设置 Python 解释器的输出编码为UTF-8
sys.stdout.encoding = 'utf-8'

# 退出程序，可选参数为退出状态码（通常0表示成功，非0表示错误）
sys.exit(0)
```

## 深入探索

### `sys.path` 包含用于查找模块的目录列表

```python
import sys

# 获取当前模块搜索路径
module_search_paths = sys.path
print("模块搜索路径:", module_search_paths)

# 添加自定义路径到模块搜索路径
custom_path = "/path/to/custom/modules"
sys.path.append(custom_path)

# 输出自定义路径
print(sys.path)
```

### `sys.stdin`、`sys.stdout` 和 `sys.stderr` 用于标准输入、标准输出和标准错误流的对象

```python
import sys

# 重定向标准输出到文件
with open('output.txt', 'w') as f:
    sys.stdout = f
    print("这个文本将被写入output.txt")
    sys.stdout = sys.__stdout__  # 恢复标准输出
```

### `sys.exc_info()` 用于获取当前异常信息的元组

```python
import sys
import traceback

try:
    # 产生一个异常
    1 / 0
except:
    # 获取当前异常信息
    exc_type, exc_value, exc_traceback = sys.exc_info()
    print("异常类型:", exc_type)
    print("异常值:", exc_value)
    print("异常跟踪信息:")
    traceback.print_tb(exc_traceback)
```
