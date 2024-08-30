---
title: 文件和IO操作
description: Python 文件和IO操作，主要涉及基础的文件操作和拓展库，以及文件系统的操作。
keywords:
  - Python
  - 文件操作
  - IO操作
  - 文件系统
  - 性能优化
tags:
  - Python/进阶
  - 技术/程序语言
author: 仲平
date: 2023-11-14
---

## Python 文件操作基础

### 文件和 IO 的基本概念

在编程领域，文件和输入/输出（IO）操作是基本的组成部分。文件是存储在磁盘上的数据集合，可以包含文本、图片、音频等多种格式的数据。IO 操作则涉及到数据的读取（输入）和写入（输出）。在 Python 中，对文件的操作简单而强大，涵盖了从文本文件到复杂数据格式的处理。

理解文件的操作对于数据处理、日志记录、配置文件的读写等都至关重要。Python 提供了丰富的库来处理各种类型的文件，使得文件读写变得既简单又安全。

### 文件打开与关闭

文件在使用前必须先打开，并在操作完成后关闭。Python 通过内置的 `open()` 函数来打开文件，这个函数返回一个文件对象，然后可以对其进行读取或写入操作。文件操作完成后，应该使用 `close()` 方法关闭文件以释放系统资源。但更推荐的做法是使用 `with` 语句（[上下文管理器](Tech/programming-language/Python/进阶/资源管理.md)），它会在代码块执行完毕后自动关闭文件，即使在代码块中发生了异常。

### 文件读写操作

读取和写入是文件操作中最基础的部分。Python 提供了多种方法来读取文件（如 `read()`，`readline()`，`readlines()`）和写入文件（如 `write()`，`writelines()`）。这些方法可以灵活应用于不同的场景，如逐字符、逐行读取或写入整个文件。

### 文件模式

在打开文件时，可以指定不同的模式：

|模式|描述|
|---|---|
|`'r'`|只读模式。如果文件不存在，抛出异常。|
|`'w'`|写入模式。如果文件存在，覆盖原有内容；如果文件不存在，创建新文件。|
|`'a'`|附加模式。如果文件存在，将数据添加到文件末尾；如果文件不存在，创建新文件。|
|`'r+'`|读写模式。可以读取和写入文件，如果文件不存在，抛出异常。|
|`'w+'`|写读模式。打开文件进行读写，覆盖原有内容；如果文件不存在，则创建新文件。|
|`'a+'`|附加和读取模式。可以读取和在文件末尾附加内容；如果文件不存在，则创建新文件。|
|`'rb'`|以二进制格式打开文件进行只读。|
|`'wb'`|以二进制格式打开文件进行写入，覆盖原有内容；如果文件不存在，则创建新文件。|
|`'ab'`|以二进制格式打开文件进行附加，如果文件不存在，则创建新文件。|
|`'rb+'`|以二进制格式打开文件进行读写。|
|`'wb+'`|以二进制格式打开文件进行写读，覆盖原有内容；如果文件不存在，则创建新文件。|
|`'ab+'`|以二进制格式打开文件进行附加和读取。|

## 文件类型和数据格式处理

### 处理文本文件

文本文件存储的是可读字符，如 `.txt` 文件。Python 中处理文本文件非常直接，可以使用字符串方法对内容进行操作。

```python
# 读取文本文件
with open('example.txt', 'r') as file:
    content = file.read()
    print(content)
```

### 处理二进制文件

二进制文件存储的是字节数据，如图片、音频等。在 Python 中，通过在 `open()` 函数中使用 `'rb'` 或 `'wb'` 模式来读取或写入二进制文件。

```python
# 读取二进制文件
with open('image.png', 'rb') as file:
    content = file.read()
```

### CSV 文件处理

CSV（逗号分隔值）是一种常见的数据交换格式。Python 的 [ csv 模块](Tech/programming-language/Python/模块/数据处理/csv%20文件读写.md) 提供了读取和写入 CSV 文件的功能。

```python
import csv

# 读取 CSV 文件
with open('data.csv', 'r') as file:
    csv_reader = csv.reader(file)
    for row in csv_reader:
        print(row)

# 写入 CSV 文件
with open('output.csv', 'w', newline='') as file:
    csv_writer = csv.writer(file)
    csv_writer.writerow(['name', 'age'])
    csv_writer.writerow(['Alice', 30])
```

### JSON 文件处理

JSON（JavaScript Object Notation）是一种轻量级的数据交换格式。Python 的 [json 模块](Tech/programming-language/Python/模块/数据处理/json%20编码和解码器.md) 可以轻松处理 JSON 数据。

```python
import json

# 读取 JSON 文件
with open('data.json', 'r') as file:
    data = json.load(file)
    print(data)

# 写入 JSON 文件
with open('output.json', 'w') as file:
    json.dump({'name': 'Alice', 'age': 30}, file, indent=4)

```

## 文件系统操作

### 文件和目录的基本操作

Python 的 `os` 和 `shutil` 模块提供了丰富的文件和目录管理功能，包括创建、删除、移动、复制等。

```python
import os
import shutil

# 创建目录
os.mkdir('new_directory')

# 移动文件
shutil.move('example.txt', 'new_directory/example.txt')

# 复制文件
shutil.copy('new_directory/example.txt', 'example_copy.txt')

# 删除文件
os.remove('example_copy.txt')

```

### 路径操作

Python 提供了 `os.path` 和 `pathlib` 模块来处理文件路径的各种需求。

```python
from pathlib import Path

# 创建 Path 对象
path = Path('example.txt')

# 检查文件是否存在
print(path.exists())

# 获取文件扩展名
print(path.suffix)

```

### 使用临时文件

`tempfile` 模块用于创建临时文件和目录，这在需要临时存储数据时非常有用。

```python
import tempfile

# 创建临时文件
temp_file = tempfile.TemporaryFile()

# 写入临时文件
temp_file.write(b'Temporary data')
temp_file.seek(0)

# 读取临时文件
print(temp_file.read())

# 关闭临时文件
temp_file.close()
```

## 高级文件操作技巧

### 文件迭代与遍历

文件内容可以逐行或按特定条件迭代，这对于处理大型文件尤为重要。

```python
# 逐行读取文件
with open('large_file.txt', 'r') as file:
    for line in file:
        process(line)  # 自定义的处理函数

```

### 内存映射文件操作

使用 `mmap` 模块可以将文件内容映射到内存，这样可以提高读写大文件的效率。

```python
import mmap

# 内存映射一个大文件
with open('large_file.txt', 'r+b') as f:
    mm = mmap.mmap(f.fileno(), 0)
    print(mm.readline())  # 读取一行内容
    mm.close()

```

### 异步 IO 操作

Python 的 `asyncio` 库允许进行异步 IO 操作，这对于提高 IO 密集型应用的性能很有帮助。

```python
import asyncio

async def read_file_async(file_name):
    with open(file_name, 'r') as file:
        return await file.read()

# 在异步函数中调用
async def main():
    content = await read_file_async('example.txt')
    print(content)

asyncio.run(main())

```

## 编码和错误处理

### 字符编码

理解字符编码（如 UTF-8, ASCII）对于正确处理文本文件至关重要，特别是在处理国际化内容时。

```python
# 指定文件的编码
with open('example.txt', 'r', encoding='utf-8') as file:
    content = file.read()

```

### 文件操作中的错误处理

文件操作可能会引发各种 [异常](Tech/programming-language/Python/进阶/异常处理.md)，例如 `FileNotFoundError` 或 `PermissionError`。正确处理这些异常是编写健壮代码的关键。

```python
try:
    with open('nonexistent_file.txt', 'r') as file:
        content = file.read()
except FileNotFoundError:
    print("文件不存在")
```

## 性能优化和最佳实践

处理文件和 IO 操作时，性能优化和资源管理是两个关键的方面。正确处理这些问题不仅可以提高程序的效率，还能避免常见的资源泄露和同步问题。

### 性能优化

在处理大型文件时，性能成为一个重要的考虑因素。以下是一些优化文件操作性能的策略：

#### 逐行处理而非一次性读取整个文件

对于非常大的文件，一次性读取整个文件到内存中可能会导致内存溢出。逐行读取文件是一个更好的选择。

```python
with open('large_file.txt', 'r') as file:
    for line in file:
        process(line)  # 对每行进行处理
```

#### 使用生成器进行延迟计算

如果处理文件的过程涉及到复杂的数据处理，可以**使用生成器来进行延迟计算**，这样可以避免不必要的内存使用。

```python
def read_large_file(file_obj):
    """逐行读取大文件的生成器"""
    for line in file_obj:
        yield line.strip()

with open('large_file.txt', 'r') as file:
    for line in read_large_file(file):
        process(line)
```

#### 内存映射文件

对于非常大的文件，使用内存映射的方式可以提高读写效率。这种方法适用于二进制文件，可以让你像访问数组一样访问文件内容。

```python
import mmap

with open('large_file.bin', 'r+b') as f:
    mm = mmap.mmap(f.fileno(), 0)
    # 访问文件内容
    mm.close()
```

### 资源管理最佳实践

在文件和 IO 操作中，正确的资源管理至关重要。以下是一些资源管理的最佳实践：[资源管理](Tech/programming-language/Python/进阶/资源管理.md)。
