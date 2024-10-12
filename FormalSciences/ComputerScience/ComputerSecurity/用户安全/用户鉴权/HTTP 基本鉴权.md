---
title: HTTP 基本鉴权
description: HTTP 基本鉴权
keywords:
  - HTTP
  - 鉴权
tags:
  - 计算机安全/用户安全
  - 技术/计算机安全
author: 7Wate
date: 2022-08-31
---

## HTTP 基本鉴权

在 HTTP 中，**基本认证方案（Basic Access Authentication）**是允许客户端（通常指的就是网页浏览器）在请求时，通过用户提供用户名和密码的方式，实现对用户身份的验证。

### 流程图

![认证流程图](https://static.7wate.com/img/2022/08/30/298b4e5cd922d.png)

### 步骤解析

1. **客户端：** 向服务器请求一个**受限的列表数据或资源**。

```http
    GET /list/ HTTP/1.1  
    Host: www.baidu.com  
    Authorization: Basic aHR0cHdhdGNoOmY=
```

1. **服务器**：客户端你好，这个资源在安全区 baidu.com 里是受限资源，需要基本认证。并且向客户端返回 401 状态码 Unauthorized（未授权）以及附带提供了一个认证域 `www-Authenticate: Basic realm="baidu.com"` 要求进行身份验证；其中 Basic 就是验证的模式，而 `realm="baidu.com"` 说明客户端需要输入这个安全域的用户名和密码，而不是其他域的。

```http
    HTTP/1.1 401 Unauthorized  
    www-Authenticate: Basic realm= "baidu.com"
```

1. **客户端：** 服务器，我已经携带了用户名和密码给你了，你看一下（如果客户端是浏览器，那么此时会自动弹出一个弹窗，让用户输入用户名和密码）；

    输入完用户名和密码后，则客户端将用户名及密码以 Base64 加密方式发送给服务器

    传送的格式如下（其中 Basic 内容为：**用户名 + 密码的 AES 64 形式**）：

```http
    GET /list/ HTTP/1.1
    Authorization: Basic Ksid2FuZzp3YW5n==
```

1. **服务器：** 客户端你好，我已经校验了 `Authorization` 字段你的用户名和密码，是正确的，这是你要的资源。

```http
    HTTP/1.1 200 OK  
    ...
```

### 优点

简单易用，基本所有流行的浏览器都支持。

### 缺点

#### 不安全

- 由于是基于 HTTP 传输，所以它在网络上几乎是裸奔的，虽然它使用了 Base64 来编码，但这个编码很容易就可以解码出来。

- 即使认证内容无法被解码为原始的用户名和密码也是不安全的，恶意用户可以再获取了认证内容后使用其不断的享服务器发起请求，这就是所谓的重放攻击。

#### 无法主动注销

- 由于 HTTP 协议没有提供机制清除浏览器中的 Basic 认证信息，除非标签页或浏览器关闭、或用户清除历史记录。

### 使用场景

内部网络，或者对安全要求不是很高的网络。
