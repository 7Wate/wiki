---
title: urllib URL 处理模块
description: urllib URL 处理模块
keywords:
  - python
  - urllib
tags:
  - Python/标准库
  - 技术/程序语言
author: 7Wate
date: 2023-08-29
---

## 概述

`urllib` 是 Python 标准库中用于处理 URL（统一资源定位符）相关操作的模块，它提供了多个子模块，用于执行网络请求、解析 URL、处理错误以及解析 robots.txt 文件等。以下是 `urllib` 的子模块：

### 子模块

- **`urllib.request`**：提供打开和读取 URL 的功能。支持多种网络协议，如 HTTP、FTP 等。
- **`urllib.error`**：包含与网络请求相关的异常类，用于处理错误和异常情况。
- **`urllib.parse`**：用于解析和构建 URL，提供各种操作，如分割、组合、编码和解码。
- **`urllib.robotparser`**：用于解析网站的 `robots.txt` 文件，确定哪些页面可以被爬取。

### 优点

- **内置模块**：作为 Python 标准库的一部分，无需单独安装。
- **全面功能**：支持多种网络协议和操作，适用于多种网络操作需求。
- **高度可定制**：用于处理 URL 的多个方面，如打开、读取、解析等。

### 缺点

- **较低层次的 API**：与一些第三方库相比（如 `requests`），`urllib` 的 API 较为底层，可能需要编写更多的代码。
- **繁琐的错误处理**：错误处理需要额外的代码，相比使用像 `requests` 这样的库可能更复杂。

### 同类产品对比

| 产品     | 优点         | 缺点         | 适用背景           | 社区支持    |
| -------- | ------------ | ------------ | ------------------ | ----------- |
| urllib   | 标准库，全面 | API 较底层   | 网络请求，URL 操作 | Python 社区 |
| requests | API 简单     | 需要单独安装 | HTTP 请求          | Python 社区 |
| httplib2 | 功能丰富     | 使用复杂     | HTTP 请求          | Python 社区 |

## `urllib.request`

| 方法                     | 功能描述                             | 示例                                                         |
| ------------------------ | ------------------------------------ | ------------------------------------------------------------ |
| `urlopen()`              | 打开并读取一个 URL 的内容            | `urllib.request.urlopen(url)`                                |
| `urlretrieve()`          | 将 URL 指向的文件下载到本地          | `urllib.request.urlretrieve(url, filename)`                  |
| `build_opener()`         | 构建一个可自定义的 `Opener` 对象     | `opener = urllib.request.build_opener()`                     |
| `install_opener()`       | 安装全局的 `Opener`                  | `urllib.request.install_opener(opener)`                      |
| `HTTPBasicAuthHandler()` | HTTP 基础认证处理程序                | `handler = urllib.request.HTTPBasicAuthHandler()`            |
| `HTTPCookieProcessor()`  | 用于处理 HTTP cookies                | `handler = urllib.request.HTTPCookieProcessor()`             |
| `ProxyHandler()`         | 设置代理                             | `proxy = urllib.request.ProxyHandler({'http': 'http://www.example.com:8080'})` |
| `Request()`              | 创建一个请求对象，用于定制 HTTP 头等 | `req = urllib.request.Request(url, headers={...})`           |

### `urlopen()` 打开 URL

```python
import urllib.request

# 打开一个网页
response = urllib.request.urlopen('http://www.example.com')

# 读取网页内容
data = response.read()

# 输出网页内容
print(data)
```

### `urlretrieve()` 下载文件

```python
import urllib.request

# 从指定 URL 下载文件，并保存到本地
urllib.request.urlretrieve('http://www.example.com/file.txt', 'local_file.txt')
```

### `build_opener()` 和 `install_opener()`

`build_opener()` 传递一系列处理程序（handlers），这些处理程序用于定义如何处理各种 HTTP 功能，比如重定向、基础认证、cookies 等。一旦你使用 `build_opener()` 创建了一个 `Opener` 对象，你可以使用 `install_opener()` 来设置它作为默认的 `Opener`。

```python
import urllib.request

# 创建基础认证处理程序
auth_handler = urllib.request.HTTPBasicAuthHandler()
auth_handler.add_password('realm', 'host', 'username', 'password')

# 创建代理处理程序
proxy_handler = urllib.request.ProxyHandler({'http': 'http://www.proxy.com:8080'})

# 创建 Opener
opener = urllib.request.build_opener(auth_handler, proxy_handler)

# 安装 Opener
urllib.request.install_opener(opener)

# 使用 urlopen() 方法，这样会应用我们之前设置的所有处理程序
response = urllib.request.urlopen('http://www.example.com')
```

### HTTP 基础认证 (`HTTPBasicAuthHandler`)

```python
import urllib.request

# 创建一个 HTTPBasicAuthHandler 对象
auth_handler = urllib.request.HTTPBasicAuthHandler()

# 添加认证信息
auth_handler.add_password('realm', 'host', 'username', 'password')

# 创建并安装 opener
opener = urllib.request.build_opener(auth_handler)
urllib.request.install_opener(opener)
```

### `HTTPCookieProcessor` 处理 Cookies

```python
import urllib.request
import http.cookiejar

# 创建一个 CookieJar 对象
cookie_jar = http.cookiejar.CookieJar()

# 创建一个 HTTPCookieProcessor 对象
cookie_handler = urllib.request.HTTPCookieProcessor(cookie_jar)

# 构建和安装 opener
opener = urllib.request.build_opener(cookie_handler)
```

### `ProxyHandler` 设置代理

```python
import urllib.request

# 创建一个 ProxyHandler 对象
proxy_handler = urllib.request.ProxyHandler({'http': 'http://www.proxy.com:8080'})

# 构建并安装 opener
opener = urllib.request.build_opener(proxy_handler)
```

### `Request()` 自定义请求

```python
import urllib.request

# 创建一个 Request 对象
req = urllib.request.Request(url='http://www.example.com', headers={'User-Agent': 'MyApp/1.0'})

# 使用 urlopen 打开自定义的请求
response = urllib.request.urlopen(req)
```

## `urllib.error`

| 方法                   | 功能描述                              |
| ---------------------- | ------------------------------------- |
| `URLError`             | 所有 `urllib` 产生的异常的基类        |
| `HTTPError`            | 处理 HTTP 错误状态，继承自 `URLError` |
| `ContentTooShortError` | 在下载过程中，数据不足时抛出的异常    |

### `URLError`

当使用 `urllib.request` 打开一个 URL 失败时，通常会抛出 `URLError` 异常。

```python
import urllib.request
import urllib.error

try:
    response = urllib.request.urlopen('http://www.nonexistentwebsite.com')
except urllib.error.URLError as e:
    print(e.reason)
```

### `HTTPError`

当服务器返回 HTTP 错误状态码（如 404、500 等）时，会抛出 `HTTPError`。

```python
import urllib.request
import urllib.error

try:
    response = urllib.request.urlopen('http://www.example.com/404')
except urllib.error.HTTPError as e:
    print(f'HTTP Error Code: {e.code}')
    print(f'Reason: {e.reason}')
```

### `ContentTooShortError`

如果使用 `urlretrieve()` 函数，但获取的数据长度与 `Content-Length` 头中声明的长度不匹配时，会抛出 `ContentTooShortError`。

```python
import urllib.request
import urllib.error

try:
    urllib.request.urlretrieve('http://www.example.com/file', 'local_file.txt')
except urllib.error.ContentTooShortError as e:
    print('The downloaded data is less than expected.')
```

## `urllib.parse`

| 方法           | 功能描述                             | 示例                                    |
| -------------- | ------------------------------------ | --------------------------------------- |
| `urlparse()`   | 解析 URL，返回一个 ParseResult 对象  | `urllib.parse.urlparse(url)`            |
| `urlunparse()` | 将 ParseResult 对象转回 URL          | `urllib.parse.urlunparse(parse_result)` |
| `urlsplit()`   | 类似于 `urlparse()`，但不分割 params | `urllib.parse.urlsplit(url)`            |
| `urlunsplit()` | 将由 `urlsplit()` 返回的对象转回 URL | `urllib.parse.urlunsplit(split_result)` |
| `urljoin()`    | 合并两个 URL                         | `urllib.parse.urljoin(base, url)`       |
| `urlencode()`  | 将字典或序列转换为 URL 查询字符串    | `urllib.parse.urlencode(query_dict)`    |
| `quote()`      | 将字符串进行 URL 编码                | `urllib.parse.quote(string)`            |
| `unquote()`    | 对 URL 编码的字符串进行解码          | `urllib.parse.unquote(encoded_string)`  |

### 解析和构建 URL

```python
from urllib.parse import urlparse, urlunparse, urlsplit, urlunsplit, urljoin

# 解析URL并返回ParseResult对象
parsed_url = urlparse('http://www.example.com/path?query=arg')

# 将ParseResult对象转换回URL
new_url = urlunparse(parsed_url)

# 类似于urlparse()，但不分割params
split_result = urlsplit('http://www.example.com/path?query=arg')

# 将由urlsplit()返回的对象转换回URL
original_url = urlunsplit(split_result)

# 合并两个URL
new_url = urljoin('http://www.example.com/path/', '/anotherpath.html')

```

### 转换查询字符串

```python
from urllib.parse import urlencode

# 将字典或序列转换为URL查询字符串
query_dict = {'key1': 'value1', 'key2': 'value2'}
query_string = urlencode(query_dict)

```

### URL 编码和解码

```python
from urllib.parse import quote, unquote

# 将字符串进行URL编码
encoded = quote('a string with / and ?')

# 对URL编码的字符串进行解码
decoded = unquote(encoded)
```

## `urllib.robotparser`

通过使用 `urllib.robotparser`，你可以确保你的网络爬虫**尊重网站的抓取策略，这是一种负责任的爬虫行为。**

| 方法                | 功能描述                                               | 示例                                               |
| ------------------- | ------------------------------------------------------ | -------------------------------------------------- |
| `RobotFileParser()` | 创建一个 `RobotFileParser` 对象                        | `rp = urllib.robotparser.RobotFileParser()`        |
| `set_url()`         | 设置 `robots.txt` 文件的 URL                           | `rp.set_url('http://www.example.com/robots.txt')`  |
| `read()`            | 从设置的 URL 读取 `robots.txt` 文件                    | `rp.read()`                                        |
| `parse()`           | 用于手动解析 `robots.txt` 文件的行                     | `rp.parse(robots_txt_body.split("\n"))`            |
| `can_fetch()`       | 检查指定的 User-Agent 是否可以访问某个路径             | `rp.can_fetch('*', 'http://www.example.com/page')` |
| `mtime()`           | 获取最后一次获取 `robots.txt` 文件的时间（Unix 时间戳） | `rp.mtime()`                                       |
| `modified()`        | 设置最后一次获取 `robots.txt` 文件的时间               | `rp.modified()`                                    |

### 创建和设置 RobotFileParser

首先，你需要创建一个 `RobotFileParser` 对象，并设置要解析的 `robots.txt` 文件的 URL。

```python
import urllib.robotparser

# 创建 RobotFileParser 对象
rp = urllib.robotparser.RobotFileParser()

# 设置 robots.txt 文件的 URL
rp.set_url('http://www.example.com/robots.txt')

# 从 URL 读取 robots.txt 文件
rp.read()
```

### 检查爬虫是否可以访问特定页面

使用 `can_fetch()` 方法，您可以检查指定的 User-Agent 是否被允许抓取特定的网页路径。

```python
# 检查 '*'（所有 User-Agents）是否允许访问 '/page'
allowed = rp.can_fetch('*', 'http://www.example.com/page')

if allowed:
    print("I can crawl this page.")
else:
    print("I cannot crawl this page.")
```

### 手动解析 robots.txt

如果你需要手动解析 `robots.txt` 文件的内容，可以使用 `parse()` 方法。

```python
# 假设 robots_txt_body 包含了 robots.txt 的文本内容
robots_txt_body = '''
User-agent: *
Disallow: /private/
'''

# 手动解析这些规则
rp.parse(robots_txt_body.split("\n"))
```
