---
title: csv 文件读写
description: Python 标准库 csv 文件读写
keywords:
  - Python
  - csv
tags:
  - Python/标准库
  - 技术/程序语言
author: 7Wate
date: 2023-10-20
---

## CSV

### CSV 文件是什么

CSV（Comma Separated Values，字符分隔值）是一种简单的文件格式，用来存储表格数据，如电子表格或数据库。CSV 文件由任意数量的记录组成，记录间以某种换行符分隔。每条记录由字段组成，字段间的分隔符是其他字符或字符串，最常见的是逗号或制表符。

### 用途和优点

CSV 文件常用于数据的导入导出，可以被大多数类型的软件包括文本编辑器和电子表格程序读取。其优点包括**简单、易于阅读、跨平台和语言兼容。**

### 基本结构

CSV 文件由行和列组成。每一行代表一个数据记录，而列则代表该记录的字段。字段的值由逗号分隔，不同的行则由换行符分隔。

```text
name,age,job
John,25,Engineer
Alice,30,Doctor
```

## Python Csv 模块

Python 的 `csv` 模块提供了一种方便的方式来操作 CSV 文件。它包括了用于读取和写入 CSV 数据的函数，以及用于处理 CSV 数据的类。

在 Python 中导入 `csv` 模块只需要简单的 `import` 语句：

```python
import csv
```

### 主要函数和类

`csv` 模块的主要函数和类有：

- `csv.reader()`：生成一个读取器对象，用于迭代读取 CSV 文件的每一行。
- `csv.writer()`：生成一个写入器对象，用于将数据写入 CSV 文件。
- `csv.DictReader()`：生成一个读取器对象，用于以字典形式读取 CSV 文件的每一行。
- `csv.DictWriter()`：生成一个写入器对象，用于将字典数据写入 CSV 文件。

## 读取 CSV 文件

### 使用 csv.reader() 函数读取 CSV 文件

使用 `csv.reader()` 函数读取 CSV 文件的步骤如下：

1. 打开你想要读取的 CSV 文件。
2. 创建一个 `csv.reader` 对象，传入该文件对象作为参数。
3. 迭代 `csv.reader` 对象，读取文件的每一行。

```python
import csv

with open('example.csv', 'r') as file:
    reader = csv.reader(file)
    for row in reader:
        print(row)
```

**读取 CSV 文件时可能遇到的问题包括编码问题、字段格式问题等。**常见解决方法包括指定文件的编码方式、使用 `try-except` 块处理可能出现的错误等。

### CSV 文件的读取实例

假设我们有一个名为 `employees.csv` 的 CSV 文件，内容如下：

```plaintext
name,age,department
John Doe,30,Engineering
Jane Smith,40,Marketing
```

我们可以使用以下代码来读取这个文件：

```python
import csv

with open('employees.csv', 'r') as file:
    reader = csv.reader(file)
    for row in reader:
        print(f'Name: {row[0]}, Age: {row[1]}, Department: {row[2]}')
```

## 写入 CSV 文件

### 使用 csv.writer() 函数写入 CSV 文件

使用 `csv.writer()` 函数写入 CSV 文件的步骤如下：

1. 打开你想要写入的 CSV 文件。
2. 创建一个 `csv.writer` 对象，传入该文件对象作为参数。
3. 使用 `writerow()` 或 `writerows()` 方法，将数据写入文件。

```python
import csv

with open('example.csv', 'w', newline='') as file:
    writer = csv.writer(file)
    writer.writerow(['name', 'age', 'job'])
    writer.writerow(['John', '25', 'Engineer'])
    writer.writerow(['Alice', '30', 'Doctor'])
```

**写入 CSV 文件可能遇到的问题包括权限问题、磁盘空间问题等。**常见解决方法包括检查文件写入权限、确保磁盘有足够空间等。

### CSV 文件的写入实例

假设我们需要将以下数据写入一个名为 `employees.csv` 的 CSV 文件：

```python
employees = [
    ['name', 'age', 'department'],
    ['John Doe', '30', 'Engineering'],
    ['Jane Smith', '40', 'Marketing']
]
```

我们可以使用以下代码来写入这个文件：

```python
import csv

with open('employees.csv', 'w', newline='') as file:
    writer = csv.writer(file)
    writer.writerows(employees)
```

## CSV 数据使用字典处理

### 使用 csv.DictReader() 函数读取 CSV 文件并返回字典

`csv.DictReader()` 函数可以将 CSV 文件的每行读取为一个字典，其中列名为键，列值为值。

```python
import csv

with open('example.csv', 'r') as file:
    reader = csv.DictReader(file)
    for row in reader:
        print(row)
```

### 使用 csv.DictWriter() 函数将字典写入 CSV 文件

`csv.DictWriter()` 函数可以将字典数据写入 CSV 文件。需要先指定列名，然后调用 `writeheader()` 方法写入列名，最后调用 `writerow()` 或 `writerows()` 方法写入字典数据。

```python
import csv

with open('example.csv', 'w', newline='') as file:
    fieldnames = ['name', 'age', 'job']
    writer = csv.DictWriter(file, fieldnames=fieldnames)
    
    writer.writeheader()
    writer.writerow({'name': 'John', 'age': '25', 'job': 'Engineer'})
    writer.writerow({'name': 'Alice', 'age': '30', 'job': 'Doctor'})
```

### 字典和 CSV 数据的交互

假设我们有一个名为 `employees.csv` 的 CSV 文件，内容如下：

```plaintext
name,age,department
John Doe,30,Engineering
Jane Smith,40,Marketing
```

我们可以使用以下代码来读取这个文件，并打印出每个员工的名字和部门：

```python
import csv

with open('employees.csv', 'r') as file:
    reader = csv.DictReader(file)
    for row in reader:
        print(f"Name: {row['name']}, Department: {row['department']}")
```

## CSV 文件中的错误和异常

读取和写入 CSV 文件时可能遇到的错误和异常包括文件不存在、文件不可读写、磁盘空间不足等。可以使用 try-except 结构来捕获和处理这些异常。

```python
import csv

try:
    with open('example.csv', 'r') as file:
        reader = csv.reader(file)
        for row in reader:
            print(row)
except FileNotFoundError:
    print('File not found.')
```

| 错误类型             | 错误描述                           | 解决方案                                        |
| :------------------- | :--------------------------------- | :---------------------------------------------- |
| `FileNotFoundError`  | 找不到指定的文件。                 | 确保文件的路径和名称正确，且文件确实存在。      |
| `PermissionError`    | 没有足够的权限打开文件。           | 确保你有足够的权限访问和修改文件。              |
| `IsADirectoryError`  | 尝试打开的是一个目录，而不是文件。 | 确保指定的路径是文件，而非目录。                |
| `IOError`            | 文件读写出错，例如磁盘空间不足。   | 确保磁盘有足够的空间，文件没有被其他程序锁定。  |
| `csv.Error`          | CSV 文件格式错误。                 | 确保 CSV 文件的格式正确，例如字段是否正确分隔。 |
| `UnicodeDecodeError` | 文件编码问题。                     | 确保文件的编码和你在 Python 中指定的编码一致。  |
