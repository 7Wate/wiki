---
title: json 编码和解码器
description: python 内置标准库 json 编码和解码器
keywords:
  - Python
  - json
tags:
  - Python/标准库
  - 技术/程序语言
author: 7Wate
date: 2023-10-20
---

## JSON 是什么

JSON (JavaScript Object Notation) 是一种轻量级的数据交换格式，它基于 JavaScript 的一个子集。数据格式简洁和明了，具有易于读写的特性，常用于数据的存储和网络数据的交换。

### 基本数据类型

JSON 支持以下数据类型：

- 数字（整数或浮点数）
- 字符串（在双引号中）
- 布尔值（true 或 false）
- 数组（在方括号中）
- 对象（在大括号中）
- null

一个简单的 JSON 对象示例：

```json
{
    "name": "John",
    "age": 30,
    "is_student": false,
    "cars": ["Ford", "BMW", "Fiat"],
    "pets": null
}
```

### JSON 使用场景

JSON 的主要用途是在服务器和 web 应用之间传输数据。由于其简洁明了的特性，JSON 也被广泛用于配置文件、数据存储等场景。

### JSON 与 XML 的比较

JSON 和 XML 都是数据存储和传输的格式。与 XML 相比，JSON 更小、更快、更易解析。JSON 是语言无关的，它支持的数据结构在所有现代编程语言中都有对应的类型。而 XML 则更多地被用于文档的存储和传输。

## Python 对 JSON 的支持

Python 标准库中的 `json` 模块提供了 JSON 数据的编码和解码功能。它可以将 Python 对象转换为 JSON 字符串，也可以将 JSON 字符串解码为 Python 对象。

### Json 模块的主要函数和对象

`json` 模块的主要函数包括：

- `json.dumps()`：将 Python 对象编码成 JSON 字符串。
- `json.loads()`：将 JSON 字符串解码为 Python 对象。
- `json.dump()`：将 Python 对象编码成 JSON 字符串并写入文件。
- `json.load()`：读取文件中的 JSON 字符串并解码为 Python 对象。

`json` 模块的主要对象包括：

- `json.JSONEncoder`：用于自定义编码。
- `json.JSONDecoder`：用于自定义解码。

## JSON 编码

将 Python 对象转换为 JSON 格式。

### json.dumps() 函数

**将 Python 对象编码成 JSON 字符串。**

`json.dumps()` 函数接受一个 Python 对象，并返回一个 JSON 格式的字符串。例如：

```python
import json

person = {
    "name": "John",
    "age": 30,
    "is_student": False,
    "cars": ["Ford", "BMW", "Fiat"],
    "pets": None
}

person_json = json.dumps(person)
print(person_json)
```

### json.dump() 函数

**将 Python 对象编码成 JSON 字符串并写入文件。**

`json.dump()` 函数与 `json.dumps()` 功能相同，但它不返回结果，而是直接将 JSON 字符串写入一个文件对象。例如：

```python
import json

person = {
    "name": "John",
    "age": 30,
    "is_student": False,
    "cars": ["Ford", "BMW", "Fiat"],
    "pets": None
}

with open('person.json', 'w') as f:
    json.dump(person, f)
```

## JSON 解码

将 JSON 格式转换为 Python 对象。

### json.loads() 函数

**将 JSON 字符串解码为 Python 对象。**

`json.loads()` 函数接受一个 JSON 格式的字符串，并返回一个 Python 对象。例如：

```python
import json

person_json = '{"name": "John", "age": 30, "is_student": false, "cars": ["Ford", "BMW", "Fiat"], "pets": null}'

person = json.loads(person_json)
print(person)
```

### json.load() 函数

**读取文件中的 JSON 字符串并解码为 Python 对象。**

`json.load()` 函数与 `json.loads()` 功能相同，但它读取一个文件对象中的 JSON 字符串，而不是直接解码字符串。例如：

```python
import json

with open('person.json', 'r') as f:
    person = json.load(f)
print(person)
```

## 自定义 JSON 编码和解码

### json.JSONEncoder 类进行自定义编码

如果你想对默认行为进行更多的控制，例如改变日期时间的格式，你可以自定义 `json.JSONEncoder` 类。例如：

```python
import json
from datetime import datetime

class DateTimeEncoder(json.JSONEncoder):
    def default(self, o):
        if isinstance(o, datetime):
            return o.isoformat()

        return super().default(o)

now = datetime.now()
json.dumps(now, cls=DateTimeEncoder)
```

### json.JSONDecoder 类进行自定义解码

同样，你可以自定义 `json.JSONDecoder` 类来对 JSON 字符串进行特殊的解码。例如，你可以解析特定的日期时间格式：

```python
import json
from datetime import datetime

class DateTimeDecoder(json.JSONDecoder):
    def object_hook(self, dict_):
        for key, value in dict_.items():
            try:
                dict_[key] = datetime.strptime(value, "%Y-%m-%dT%H:%M:%S")
            except (TypeError, ValueError):
                pass
        return dict_

json_string = '{"name": "John", "birthday": "2000-01-01T00:00:00"}'
json.loads(json_string, cls=DateTimeDecoder)
```

## 处理复杂的 JSON 数据

### 使用嵌套的数据结构处理复杂的 JSON 数据

JSON 可以表示复杂的嵌套数据结构，包括嵌套的对象和数组。你可以使用 Python 的字典、列表、元组等数据结构来处理这些复杂的 JSON 数据。

### 如何处理 JSON 数据中的日期和时间

JSON 格式本身并不支持日期和时间类型，一般以字符串形式表示。你可以在编码和解码时使用自定义的 `json.JSONEncoder` 和 `json.JSONDecoder` 类来处理日期和时间。

### 如何处理 JSON 数据中的自定义对象

你可以重写 `json.JSONEncoder` 的 `default()` 方法和 `json.JSONDecoder` 的 `object_hook()` 方法来处理自定义对象。

## 错误和异常处理

在使用 `json` 模块时，你可能会遇到以下几种错误和异常：

- `json.JSONDecodeError`：在解码 JSON 数据时发生的错误。
- `TypeError`：当你试图将不可序列化的对象（如函数）编码为 JSON 时，`json.dumps()` 和 `json.dump()` 会抛出这个错误。

### 处理错误和异常

你可以使用 Python 的异常处理机制来处理这些错误和异常，例如：

```python
import json

try:
    person_json = '{"name": "John", "age": 30, "is_student": false, "cars": ["Ford", "BMW", "Fiat"], "pets": null,'
    person = json.loads(person_json)
except json.JSONDecodeError as e:
    print(f"Invalid JSON: {e}")
except TypeError as e:
    print(f"Type Error: {e}")
```
