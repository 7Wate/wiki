---
title: subprocess 子进程管理
description: subprocess 子进程管理
keywords:
  - Python
  - subprocess
tags:
  - Python/标准库
  - 技术/程序语言
author: 7Wate
date: 2023-09-07
---

## 概念

`subprocess` 是 Python 中的一个重要模块，自 Python 2.4 版本开始引入，用于管理和与外部进程进行交互。一个“进程”是一个运行中的程序实例，它有自己的内存空间和系统资源。我们需要管理进程以便在 Python 脚本中执行外部命令，或者与其他进程交互。

`subprocess` 提供了一个强大而灵活的接口，允许你启动新的进程、连接到它们的输入、输出和错误管道，并获取它们的返回代码。它旨在替代一些旧的进程管理方法，如 `os.system` 和 `os.spawn*`，并为进程管理提供了一个现代化的解决方案。

## 基础操作

`subprocess` 是 Python 的标准库，所以不需要单独安装。

### 基本功能

使用 `run()` 函数可以运行外部命令。例如：

```python
import subprocess

# 运行命令并捕获输出
result = subprocess.run(["ls", "-l"], capture_output=True, text=True)
print(result.stdout)
```

### 常用示例

```python
# 运行命令并捕获输出
result = subprocess.run(["ls", "-l"], capture_output=True, text=True)
print(result.stdout)

# 运行命令并检查返回代码
try:
    subprocess.run(["false"], check=True)
except subprocess.CalledProcessError:
    print("命令执行失败!")

# 使用 shell 执行命令
subprocess.run("echo Hello, World!", shell=True)
```

## 深入探索

### Run 函数

`run` 函数是 `subprocess` 模块中的核心函数，它提供了丰富的参数来控制子进程的行为。以下是一些示例和参数的详细描述：

```python
import subprocess

# 示例 1: 运行基本的外部命令，捕获输出
result = subprocess.run(["ls", "-l"], capture_output=True, text=True)
print("示例 1 输出:")
print(result.stdout)

# 示例 2: 运行命令并检查返回代码
try:
    subprocess.run(["false"], check=True)
except subprocess.CalledProcessError:
    print("示例 2: 命令执行失败!")

# 示例 3: 使用 shell 执行命令
subprocess.run("echo Hello, World!", shell=True)

# 示例 4: 指定工作目录和自定义环境变量
custom_env = {"MY_VARIABLE": "some_value"}
result = subprocess.run(["echo", "$MY_VARIABLE"], env=custom_env, shell=True, text=True)
print("示例 4 输出:")
print(result.stdout)

# 示例 5: 设置超时
try:
    subprocess.run(["sleep", "10"], timeout=5)
except subprocess.TimeoutExpired:
    print("示例 5: 命令超时!")

# 示例 6: 重定向错误输出
result = subprocess.run(["ls", "nonexistent"], stderr=subprocess.PIPE, text=True)
print("示例 6 输出:")
print(result.stderr)

```

| 参数                 | 描述                                                         |
| -------------------- | ------------------------------------------------------------ |
| `args`               | 要运行的命令以及命令的参数，通常作为一个字符串列表传递。     |
| `stdin`              | 用于指定子进程的标准输入流。可以是文件对象、`subprocess.PIPE`、`subprocess.DEVNULL`、或一个打开的文件描述符。 |
| `stdout`             | 用于指定子进程的标准输出流。可以是文件对象、`subprocess.PIPE`、`subprocess.DEVNULL`、或一个打开的文件描述符。 |
| `stderr`             | 用于指定子进程的标准错误流。可以是文件对象、`subprocess.PIPE`、`subprocess.DEVNULL`、或一个打开的文件描述符。 |
| `shell`              | 如果为 `True`，则将命令传递给系统的 shell 执行，可以使用 shell 语法。默认为 `False`。 |
| `cwd`                | 子进程的工作目录，用于指定命令在哪个目录下执行。             |
| `env`                | 一个字典，包含自定义的环境变量。子进程将在这个环境中执行。   |
| `universal_newlines` | 如果为 `True`，则标准输入和输出以文本模式打开，可以使用字符串而不是字节进行通信。默认为 `False`。 |
| `encoding`           | 指定编码，用于将标准输出和标准错误流解码为文本。通常与 `universal_newlines=True` 配合使用。默认为 `None`。 |
| `errors`             | 用于指定编码错误处理策略，通常与 `encoding` 参数一起使用。默认为 `None`。 |
| `text`               | 与 `universal_newlines` 相同，如果为 `True`，则将标准输入和输出以文本模式打开。已在 Python 3.7 中引入。默认为 `False`。 |
| `capture_output`     | 如果为 `True`，则会捕获子进程的标准输出和标准错误流，并将其包含在返回的 `CompletedProcess` 对象中。已在 Python 3.5 中引入。 |
| `timeout`            | 设置命令的超时时间，如果命令在指定的时间内未完成，将引发 `TimeoutExpired` 异常。 |
| `check`              | 如果为 `True`，则会检查命令的返回代码，如果不为零则引发 `CalledProcessError` 异常。默认为 `False`。 |

### Popen

`subprocess.Popen` 是 `subprocess` 模块中的一个类，用于创建和管理子进程，允许更高级和灵活的进程交互。通过 `Popen`，你可以控制子进程的输入、输出和错误流，以及其他进程相关的属性。

```python
import subprocess

# 使用 Popen 接口
with subprocess.Popen(["ls", "-l"], stdout=subprocess.PIPE, text=True) as proc:
    output = proc.stdout.read()
    print(output)
```

#### 方法和属性

- `communicate()`: 与子进程交互，发送输入数据和读取输出数据。
- `poll()`: 检查子进程是否已结束。
- `wait()`: 等待子进程结束。
- `returncode`: 子进程的返回代码。
