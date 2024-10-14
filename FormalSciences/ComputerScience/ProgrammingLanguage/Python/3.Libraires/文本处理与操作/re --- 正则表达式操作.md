---
title: re --- 正则表达式操作
description: re --- 正则表达式操作
keywords:
  - Python
  - re
  - 正则表达式
tags:
  - FormalSciences/ComputerScience
  - ProgrammingLanguage/Python
  - Python/Libraires
author: 7Wate
date: 2023-11-14
---

Python 的 `re` 库是一个非常强大的工具，用于执行正则表达式操作。这意味着它可以帮助你在文本中执行复杂的模式匹配、搜索、替换和解析任务。

## 正则表达式

正则表达式是一种特殊的文本字符串，用于描述搜索或匹配文本的一个模式。例如，你可以用它来查找所有的电子邮件地址、电话号码或特定单词的出现。

编写正则表达式需要学习其特殊的语法，其中一些常用的元素包括：

- **字面字符**：大多数字符在正则表达式中表示它们自己。
- **元字符**：如 `.`（匹配任何单个字符）、`^`（匹配字符串的开始）、`$`（匹配字符串的结尾）。
- **字符类**：用方括号定义，如 `[a-z]` 匹配任何小写字母。
- **特殊序列**：如 `\d` 匹配任何数字，`\s` 匹配任何空白字符。

## Python 中的 `re` 模块

在 Python 中，`re` 模块提供了一系列函数和语法用于在字符串中应用正则表达式。首先，你需要导入模块：

```python
import re
```

## 基本函数

`re` 模块提供了几个基本函数来处理正则表达式：

- **`re.search(pattern, string)`**：在字符串中搜索第一个与模式匹配的部分。如果找到匹配，它返回一个匹配对象；否则返回 `None`。
- **`re.match(pattern, string)`**：如果字符串的开始处匹配模式，返回一个匹配对象。
- **`re.findall(pattern, string)`**：返回字符串中所有与模式匹配的部分的列表。
- **`re.sub(pattern, repl, string)`**：替换字符串中的模式匹配项。

## 分组捕获

使用圆括号可以在正则表达式中创建“组”。组可以帮助你提取正则表达式匹配的部分。例如：

```python
pattern = r'(\b\w+)@(\w+\.\w+)'
match = re.search(pattern, "username@example.com")
if match:
    print(match.group())   # 整个匹配
    print(match.group(1))  # 第一个括号内的匹配
    print(match.group(2))  # 第二个括号内的匹配
```
