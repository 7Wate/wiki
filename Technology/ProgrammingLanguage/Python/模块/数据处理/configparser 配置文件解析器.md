---
title: configparser 配置文件解析器
description: python 内置标准库 configparser 配置文件解析器
keywords:
  - python
  - configparser
tags:
  - Python/标准库
  - 技术/程序语言
author: 7Wate
date: 2023-10-20
---

`configparser` 是 Python 的标准库之一，主要用于处理配置文件，格式通常为 `.ini` 文件。

## 配置文件

首先要理解 `.ini` 文件的基本构成。`.ini` 文件是一种配置文件格式，它由多个 section 组成，每个 section 下面有多个 option，每个 option 对应一个 value。例如：

```ini
[DEFAULT]
ServerAliveInterval = 45
Compression = yes
CompressionLevel = 9
ForwardX11 = yes

[bitbucket.org]
User = hg

[topsecret.server.com]
Port = 50022
ForwardX11 = no
```

## 读取配置文件

要使用 `configparser` 读取配置文件，首先需要创建一个 `ConfigParser` 对象，然后使用 `read()` 方法读取配置文件。在读取了配置文件之后，我们可以像操作字典一样操作配置文件中的数据。如下例：

```python
import configparser

# 创建一个新的配置解析器
config = configparser.ConfigParser()

# 读取配置文件
config.read('example.ini')

# 获取配置文件中的信息
section = config['DEFAULT']
print(section['ServerAliveInterval'])  # 输出：45
```

## 创建和编辑配置文件

`configparser` 也可以用来创建和编辑配置文件。如果我们想添加一个新的 section，可以使用 `add_section()` 方法。如果我们想在特定的 section 下添加或修改 option 和 value，可以使用 `set()` 方法。最后，我们可以使用 `write()` 方法将更改保存到文件。如下例：

```python
import configparser

config = configparser.ConfigParser()

# 添加新的 section
config.add_section('new_section')

# 在新的 section 下添加 option 和 value
config.set('new_section', 'new_option', 'new_value')

# 写入文件
with open('example.ini', 'w') as configfile:
    config.write(configfile)
```

## 深入理解 Configparser

`configparser` 还有一些更高级的用法。例如，每个 `ConfigParser` 对象都有一个默认的 section，名为 `DEFAULT`。`DEFAULT` section 中的值会作为其他 section 的默认值。这意味着，如果其他 section 中没有定义某个 option，那么 `configparser` 就会在 `DEFAULT` section 中寻找这个 option。

此外，`configparser` 还提供了 `options()` 和 `items()` 方法，可以用来获取一个 section 中所有的 options 和 items。`has_section()` 和 `has_option()` 方法可以用来检查特定的 section 或 option 是否存在。

```python
import configparser

config = configparser.ConfigParser()
config.read('example.ini')

# 检查 section 或 option 是否存在
print(config.has_section('new_section'))  # True
print(config.has_option('new_section', 'new_option'))  # True

# 获取所有的 options 和 items
print(config.options('new_section'))  # ['new_option']
print(config.items('new_section'))  # [('new_option', 'new_value')]
```

## 错误处理

在使用 `configparser` 时，可能会遇到各种错误和异常。例如，如果尝试获取不存在的 section 或 option，`configparser` 就会抛出 `NoSectionError` 或 `NoOptionError`。为了使程序更加健壮，我们需要学会处理这些错误和异常。

```python
import configparser

config = configparser.ConfigParser()
try:
    config.read('example.ini')
    print(config['nonexistent_section'])
except configparser.NoSectionError:
    print('Section does not exist.')
```

## 高级特性

`configparser` 还支持值插值。这意味着你可以在配置文件的一个值中引用另一个值。例如：

```ini
[Paths]
home_dir: //Users
my_dir: %(home_dir)s/lumberjack
my_pictures: %(my_dir)s/Pictures
```

在这个例子中，`my_dir` 的值是 `/Users/lumberjack`，`my_pictures` 的值是 `/Users/lumberjack/Pictures`。

要使用插值，你需要在 `get()` 方法中传入 `raw=False`。默认情况下，`raw` 参数为 `False`。

```python
import configparser

config = configparser.ConfigParser()
config.read('example.ini')

# 使用插值
print(config.get('Paths', 'my_pictures', raw=False))  # 输出：/Users/lumberjack/Pictures
```
