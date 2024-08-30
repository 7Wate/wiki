---
title: requests HTTP 库
description: requests HTTP 库，基于 urllib 封装。
keywords:
  - requests
  - Python
  - 拓展模块
tags:
  - Python/PyPI
  - 技术/程序语言
author: 7Wate
date: 2023-10-19
---

Requests 是 Python 的一个非常流行和强大的 HTTP 库，使用 Requests 可以极其方便地发送 HTTP/HTTPS 请求，然后获取并解析响应。它的语法简洁而又优雅，出色地符合 Python 风格，相比起 Python 自带的 urllib 来说，Requests 无疑更加人性化和易用。

## 概述

**Requests 库的目标就是让 HTTP 请求变得简单而又 Pythonic。**它可以显著减少程序员发送 HTTP 请求的工作量。使用 Requests，你不必手动添加查询字符串到 URL 中，或 encode post 数据了。一切都自动完成。

### Requests Vs Urllib

Python 内置的 urllib 模块也可以发送网络请求，但其 API 不够优雅简洁。与 urllib 相比，Requests 更加 Pythonic，而且更简单易用。

```python
# 使用 urllib 获取一个网页的代码
import urllib.request
response = urllib.request.urlopen('https：//www.python.org')
html = response.read()

# 使用 Requests 获取同一个页面的代码
import requests
response = requests.get('https：//www.python.org')  
html = response.text


# Requests 允许使用 params 关键字传递参数，数据自动编码
payload = {'key1'： 'value1'， 'key2'： 'value2'}  
r = requests.get('https：//httpbin.org/get'， params=payload)

# 而通过 urllib 则要手动编码
import urllib.parse
import urllib.request
url = 'https：//httpbin.org/get' + '?' + urllib.parse.urlencode(payload)
resp = urllib.request.urlopen(url)
```

总之，Requests 相对于 urllib 更加简洁易用。

| 对比项       | requests                            | urllib                            |
| :----------- | :---------------------------------- | :-------------------------------- |
| 发送请求方法 | 简洁的 requests.get()/post()        | 较复杂的 urllib.request.urlopen() |
| 参数传递     | 自动编码，直接传 dict               | 需要手动 urlencode                |
| 请求头       | 直接传 dict 作为 headers            | 通过 Request 类设置               |
| 响应内容     | 多属性访问 text/content/json/raw 等 | 仅 response.read()                |
| 编码支持     | 自动编码                            | 需要手动编码                      |
| 连接池       | 支持连接池和会话                    | 不支持                            |
| 异常处理     | 提供多种请求相关异常                | 仅 urllib.error 异常              |
| 证书验证     | 通过 verify 参数验证 SSL 证书       | 通过 context 参数验证             |
| 代理设置     | 支持通过 proxies 参数               | 较复杂的 ProxyHandler             |
| Cookies      | 提供 cookie 参数                    | 通过 cookielib 模块管理           |
| 重定向       | 自动处理，可通过 max_redirects 配置 | 需要手动处理                      |
| 基本认证     | 通过 auth 参数                      | 通过 HTTPSHandler                 |
| 流请求       | 内置支持                            | 需要自定义                        |
| 异步请求     | 支持异步模式                        | 不支持异步                        |

### Requests 的关键特性

- 继承了 urllib 的所有特性
- 支持 HTTP 连接保持和连接池，提高效率
- 支持使用 cookie 跟踪会话
- 支持文件上传
- 支持自动解码内容
- 支持国际化的 URL 和 POST 数据自动编码
- 更加 Pythonic 的 API
- 连接超时设置
- 支持 HTTPS 请求，SSL 证书验证
- 自动解压
- 流下载
- 支持基本/摘要式的身份认证

## 基础用法

### 构造请求

```python
import requests

# requests.get 用于获取页面信息，
response = requests.get('https：//www.example.com') 

# requests.post 用于提交 POST 请求。
response = requests.post('https：//httpbin.org/post'， data = {'key'：'value'})
```

### 获取响应

```python

# 获取响应的内容使用 text 属性
html = response.text

# 获取二进制响应内容使用 content 属性
png_data = response.content

# 获取 JSON 响应使用 json() 方法
json_data = response.json()
```

### 获取响应状态码

获取响应状态码，可以检查 response.status_code：

```python
print(response.status_code)

200
```

Requests 还提供了一个内置的状态码查询对象 requests.codes。例如：

```python
print(requests.codes.ok) 

200
```

### 请求参数

向请求中传入参数，有以下几种方法：

1. 通过 params 参数传入键值对

```python
payload = {'key1'： 'value1'， 'key2'： 'value2'}
r = requests.get('https：//httpbin.org/get'， params=payload) 
```

1. 通过字典直接作为 params 参数传入

```python
params = {'key1'： 'value1'， 'key2'： 'value2'}
r = requests.get('https：//httpbin.org/get'， params)
```

1. 通过 url 中的查询字符串传递参数

```python
url = 'https：//httpbin.org/get?key1=val1&key2=val2'
r = requests.get(url)
```

### 设置请求头

可以通过 headers 参数设置 HTTP 请求头，例如：

```python
url = 'https：//httpbin.org/get'
headers = {'user-agent'： 'my-app/0.0.1'}

r = requests.get(url， headers=headers)
```

### 响应内容

对于响应内容，有多种属性供访问：

| 属性          | 说明                           |
| :------------ | :----------------------------- |
| r.text        | 字符串形式的响应体，会自动解码 |
| r.content     | 字节形式的响应体，可迭代       |
| r.json()      | 将 JSON 响应转换为字典         |
| r.raw         | 原始响应体，需要自行解码       |
| r.encoding    | 响应体编码方式                 |
| r.status_code | HTTP 响应状态码                |
| r.headers     | 响应头部的字典                 |
| r.request     | 请求的 Request 对象            |
| r.url         | 请求的 URL                     |
| r.history     | 请求的重定向信息               |

例如：

```python
r = requests.get('https：//api.github.com')

print(r.text) # 字符串形式的响应体
print(r.content) # 字节形式的响应体，可迭代  
print(r.json()) # JSON格式转换为字典  
print(r.raw) # 返回原始响应体
```

## 高级用法

Requests 还提供了很多高级功能，极大地丰富了这一模块的使用场景。

### 会话维持

Requests 提供了 session 对象，用于实现会话维持：

```python
s = requests.Session()
s.get('http：//httpbin.org/cookies/set/sessioncookie/123456789')
r = s.get("http：//httpbin.org/cookies")

print(r.text)
# '{"cookies"： {"sessioncookie"： "123456789"}}'
```

**默认的 requests 函数并不会在同一个 session 中保持 cookie**，所以它不会在跨请求保持状态。要保持会话，就需要使用 session 对象。

### SSL 证书验证

Requests 可以验证 SSL 证书，你可以指定一个本地证书用作客户端证书，以完成客户端验证：

```python
import requests

resp = requests.get('https：//example.com'， verify='path/to/certfile')
```

或者你也可以指定一个本地证书作为 CA 证书 BUNDLE，来验证请求的 TLS 服务端证书：

```python
import requests

resp = requests.get('https：//example.com'， verify='path/to/cacert.pem')
```

### 代理设置

使用代理也很简单：

```python
import requests

proxies = {
  "http"： "http：//10.10.1.10：3128"，
  "https"： "http：//10.10.1.10：1080"，
}

requests.get("http：//example.org"， proxies=proxies)
```

你也可以通过环境变量 HTTP_PROXY 和 HTTPS_PROXY 配置代理。

### 超时设置

通过 timeout 参数，可以告诉 requests 等待服务器响应的超时时间，以秒为单位：

```python
requests.get('https：//github.com'， timeout=0.001)
```

分别为连接超时 connect timeou t 和读取超时 read timeout：

```python
requests.get('https：//github.com'， timeout=(3.05， 10))
```

好的，文章继续：

### 异常处理

Requests 的异常类型主要分为以下几类：

- **连接异常**：包括 RequestsConnectionError 和 ConnectTimeout，表示与远程服务器的连接发生错误。
- **超时异常**：RequestsTimeout 表示请求超时。可以分为连接超时和读取超时。
- **TooManyRedirects**：表示重定向次数超过了最大限制（默认为 30 次）。
- **HTTP 错误**：HTTPError 表示 HTTP 错误响应，例如 404 或者 500 等。Requests 会自动为其封装异常。
- **请求异常**：RequestException 是 Requests 库自身的异常基类。
- **SSL 错误**：SSLError 表示 SSL 证书验证错误。
- **代理错误**：ProxyError 表示代理连接失败。
- **数据解析错误**：JSONDecodeError 和 DecodeError 表示响应数据解析错误。
- **其他**：ConnectionError、InvalidURL 等其他异常。

可以通过 try except 语句捕获这些 [异常](Tech/programming-language/Python/进阶/异常处理.md)：

```python
import requests

try：
    response = requests.get('https：//httpbin.org/delay/10'， timeout=2)
except requests.ConnectTimeout：
    print('Connection timed out')  
except requests.ConnectionError：
    print('Connection error')
```

如果不捕获异常，程序会中断并抛出异常。

| 异常类型                | 说明            |
| :---------------------- | :-------------- |
| RequestsConnectionError | 网络连接错误    |
| ConnectTimeout          | 连接超时错误    |
| RequestsTimeout         | 请求超时错误    |
| TooManyRedirects        | 重定向次数超限  |
| HTTPError               | HTTP 错误响应    |
| RequestException        | 请求异常基类    |
| SSLError                | SSL 证书验证错误 |
| ProxyError              | 代理连接错误    |
| JSONDecodeError         | JSON 解析错误    |
| ConnectionError         | 连接错误        |

### 流式下载

对于大文件下载，可以使用流模式节省内存：

```python
with requests.get('http：//httpbin.org/stream/100'， stream=True) as r：
    for chunk in r.iter_content(chunk_size=1024)： 
        print(chunk)
```

该模式仅当你在迭代时才会持续下载响应体部分，如果你要多次读取响应，必须使用 r.content 访问内容。

### 连接重试

可以通过设置 retries 参数，让请求在遇到连接错误时自动重试指定次数：

```python
from requests.adapters import HTTPAdapter

s = requests.Session()
retries = Retry(total=5， backoff_factor=1， status_forcelist=[502， 503， 504])
s.mount('http：//'， HTTPAdapter(max_retries=retries)) 
```

如果响应状态码是 502/503/504，该请求会重试最多 5 次。

## 实践技巧

### 文件上传

Requests 使得文件上传变得极其简单：

```python
url = 'https：//httpbin.org/post'
files = {'file'： open('report.pdf'， 'rb')}

r = requests.post(url， files=files)
```

我们只需要在传递的字典中设置好文件名和文件对象即可，Requests 会帮你正确编码并发送。

### 获取图片

由于图片也是一种二进制数据，所以获取图片可以这么写：

```python
url = 'https：//images.pexels.com/photos/1562477/pexels-photo-1562477.jpeg'
r = requests.get(url)

with open('image.jpeg'， 'wb') as f：
    f.write(r.content)
```

图片内容保存在 r.content 中，我们可以直接 write 到文件。

### Prepared Request

如果要一次构造同一个请求发送多次，可以使用 Prepared Request：

```python
url = 'https：//httpbin.org/post'
data = {'key'：'value'}
headers = {'User-Agent'： 'my-app'}

request = requests.Request('POST'， url， data=data， headers=headers)
prepared_request = request.prepare()

s = requests.Session()
response = s.send(prepared_request)
```

## 异步 Requests

### 基于 Gevent 的异步

```python
import requests
import gevent
from gevent import monkey

monkey.patch_all()

urls = [
  'https：//www.python.org'，
  'https：//www.mi.com'，
  'https：//www.baidu.com'
]

jobs = [gevent.spawn(requests.get， url) for url in urls]
gevent.joinall(jobs)
print([job.value.text for job in jobs])
```

### 基于 Asyncio 的异步

```python
import asyncio
import requests

async def download_site(url， session)：
    async with session.get(url) as response：
        print(f"Read {len(response.content)} from {url}")
        
async def download_all_sites(sites)：
    async with requests.Session() as session：
        tasks = []
        for url in sites：
            task = asyncio.ensure_future(download_site(url， session))
            tasks.append(task)
        await asyncio.gather(*tasks)
        
if __name__ == "__main__"：
    sites = [
        "https：//www.jython.org"，
        "http：//olympus.realpython.org/dice"，
    ] * 80
    asyncio.run(download_all_sites(sites))
```
