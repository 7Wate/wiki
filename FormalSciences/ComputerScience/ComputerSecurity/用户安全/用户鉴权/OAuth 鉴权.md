---
title: OAuth 鉴权
description: OAuth 鉴权
keywords:
  - OAuth
  - 鉴权
tags:
  - 计算机安全/用户安全
  - 技术/计算机安全
author: 7Wate
date: 2022-08-31
---

## OAuth 2.0

OAuth 协议又有 1.0 和 2.0 两个版本，2.0 版整个授权验证流程更简单更安全，也是目前最主要的用户身份验证和授权方式。

### OAuth 2.0 定义

**OAuth** 是一个开放标准，允许用户授权第三方网站（例如 CSDN、思否等）获取用户数据。而不需要将用户名和密码提供给第三方网站；常见的提供 OAuth 认证服务的厂商： **支付宝、QQ、微信、微博。**

简单说，**OAuth 就是一种授权机制。数据的所有者告诉系统，同意授权第三方应用进入系统并获取这些数据。系统从而产生一个短期的进入令牌（Token），用来代替密码，供第三方应用使用。**

#### 令牌与密码的差异

令牌（Token）与密码（Password）的作用是一样的，都可以进入系统，但是有三点差异。

1. **令牌是短期的，到期会自动失效，**用户自己无法修改。密码一般长期有效，用户不修改，就不会发生变化。
2. **令牌可以被数据所有者撤销，会立即失效。**
3. **令牌有权限范围（scope）：** 对于网络服务来说，只读令牌就比读写令牌更安全。密码一般是完整权限。

OAuth 2.0 对于如何颁发令牌的细节，规定得非常详细。具体来说，一共分成**四种授权**模式 **（Authorization Grant）** ，适用于不同的互联网场景。

- 授权码（authorization-code）
- 隐藏式（implicit）
- 密码式（password）：
- 客户端凭证（client credentials）

无论哪个模式都拥有三个必要角色：**客户端**、**授权服务器**、**资源服务器**，有的还有**用户（资源拥有者）**。

## 授权码模式

**授权码（Authorization Code Grant) 方式，指的是第三方应用先申请一个授权码，然后再用该码获取令牌。**

这种方式是最常用的流程，安全性也最高，它适用于那些有后端服务的 Web 应用。授权码通过前端传送，令牌则是储存在后端，而且所有与资源服务器的通信都在后端完成。这样的前后端分离，可以避免令牌泄漏。

一句话概括：**客户端换取授权码，客户端使用授权码换 Token，客户端使用 Token 访问资源**。

### 步骤详解

#### 1. 客户端

打开网站 A，点击登录按钮，请求 A 服务，A 服务重定向 (重定向地址如下) 至授权服务器（如 QQ、微信授权服务）。

```http
https://qq.com/oauth/authorize?
 response_type=code&
 client_id=CLIENT_ID&
 redirect_uri=CALLBACK_URL&
 scope=read
```

上面 URL 中，response_type 参数表示要求返回授权码（code），client_id 参数让 B 知道是谁在请求，redirect_uri 参数是 B 接受或拒绝请求后的跳转网址，scope 参数表示要求的授权范围（这里是只读）

![授权码模式](https://static.7wate.com/img/2022/08/30/cd507ff3bb9b9.png)

#### 2. 授权服务器

授权服务网站会要求用户登录，然后询问是否同意给予 A 网站授权。用户表示同意，这时授权服务网站就会跳回 redirect_uri 参数指定的网址。跳转时，会传回一个授权码，就像下面这样，code 参数就是授权码。

```http
https://a.com/callback?code=AUTHORIZATION_CODE
```

![授权服务器](https://static.7wate.com/img/2022/08/30/e8a2a515684a0.png)

#### 3. 网站 A 服务器

拿到授权码以后，就可以向 授权服务器 (qq.com) 请求令牌。

```http
https://qq.com/oauth/token?
 client_id=CLIENT_ID&
 client_secret=CLIENT_SECRET&
 grant_type=authorization_code&
 code=AUTHORIZATION_CODE&
 redirect_uri=CALLBACK_URL
```

上面 URL 中，client_id 参数和 client_secret 参数用来让授权服务器 确认 A 的身份（client_secret 参数是保密的，因此只能在后端发请求），grant_type 参数的值是 AUTHORIZATION_CODE，表示采用的授权方式是授权码，code 参数是上一步拿到的授权码，redirect_uri 参数是令牌颁发后的回调网址。

![网站 A 服务器](https://static.7wate.com/img/2022/08/30/f75bff03879bd.png)

#### 4. 授权服务器

收到请求以后，验证通过，就会颁发令牌；具体做法是向 redirect_uri 指定的网址，发送一段 JSON 数据。

```json
{    
   "access_token":"ACCESS_TOKEN",
   "token_type":"bearer",
   "expires_in":2592000,
   "refresh_token":"REFRESH_TOKEN",
   "scope":"read",
   "uid":100101,
   "info":{...}
}
```

上面 JSON 数据中，access_token 字段就是令牌，A 网站在后端拿到了，然后返回给客户端即可。

![授权服务器](https://static.7wate.com/img/2022/08/30/e8a7b64693d3c.png)

## 隐藏式模式（Implicit Grant）

有些 Web 应用是纯前端应用，没有后端；这时就不能用上面的方式了，必须将令牌储存在前端。

OAuth2.0 就规定了**第二种方式，允许直接向前端颁发令牌。这种方式没有授权码这个中间步骤，所以称为（授权码）" 隐藏式 "（implicit）**。

一句话概括：**客户端让用户登录授权服务器换 Token，客户端使用 Token 访问资源。**

### 步骤详解

#### 1. 客户端

打开网站 A，然后 A 网站提供一个链接，要求用户跳转到授权服务器，授权用户数据给 A 网站使用。

```http
https://qq.com/oauth/authorize?
 response_type=token&
 client_id=CLIENT_ID&
 redirect_uri=CALLBACK_URL&
 scope=read
```

上面 URL 中，response_type 参数为 token，表示要求直接返回令牌。

#### 2. 授权服务器

用户跳转到授权服务器，登录后同意给予 A 网站授权。这时，授权服务器就会跳回 redirect_uri 参数指定的跳转网址，并且把令牌作为 URL 参数，传给 A 网站。

```http
https://a.com/callback#token=ACCESS_TOKEN
```

上面 URL 中，token 参数就是令牌，A 网站因此直接在前端拿到令牌。

![授权服务器](https://static.7wate.com/img/2022/08/30/0e02abdb53ae8.png)

还有需要**注意**的地方如下：

1. 令牌的位置是 URL 锚点（fragment），而不是查询字符串（querystring），这是因为 OAuth 2.0 允许跳转网址是 HTTP 协议，因此存在 " 中间人攻击 " 的风险，而浏览器跳转时，锚点不会发到服务器，就减少了泄漏令牌的风险。
2. 这种方式把令牌直接传给前端，是很不安全的。因此，只能用于一些安全要求不高的场景，并且令牌的有效期必须非常短，通常就是会话期间（session）有效，浏览器关掉，令牌就失效了。

## 用户名密码式模式（Password Credentials Grant）

如果你高度信任某个应用，OAuth 2.0 也允许用户把用户名和密码，直接告诉该应用。该应用就使用你的密码，申请令牌，这种方式称为 " 密码式 "（password）。

一句话概括：**用户在客户端提交账号密码换 Token，客户端使用 Token 访问资源。**

### 步骤详解

#### 1. 客户端

A 网站要求用户提供 授权服务器（qq.com）的用户名和密码。拿到以后，A 就直接向授权服务器请求令牌。

```http
https://oauth.b.com/token?
 grant_type=password&
 username=USERNAME&
 password=PASSWORD&
 client_id=CLIENT_ID
```

上面 URL 中，grant_type 参数是授权方式，这里的 password 表示 " 密码式 "，username 和 password 是授权服务器的用户名和密码。

#### 2. 授权服务器

授权服务器验证身份通过后，直接给出令牌。注意，这时不需要跳转，而是把令牌放在 JSON 数据里面，作为 HTTP 回应，A 网站因此拿到令牌。

这种方式需要用户给出自己的用户名/密码，显然风险很大，因此只适用于其他授权方式都无法采用的情况，而且必须是用户高度信任的应用。

## 客户端模式（Client Credentials Grant）

客户端模式指客户端以自己的名义，而不是以用户的名义，向授权服务器进行认证。主要适用于没有前端的命令行应用。

一句话概括：**客户端使用自己的标识换 token，客户端使用 token 访问资源**。

### 步骤详解

#### 1. 客户端

客户端向授权服务器进行身份认证，并要求一个访问令牌。

```http
https://oauth.b.com/token?
 grant_type=client_credentials&
 client_id=CLIENT_ID&
 client_secret=CLIENT_SECRET
```

上面 URL 中，grant_type 参数等于 client_credentials 表示采用凭证式，client_id 和 client_secret 用来让授权服务器确认 A 的身份。

#### 2. 授权服务器

授权服务器验证通过以后，直接返回令牌。这种方式给出的令牌，是针对第三方应用的，而不是针对用户的，即有可能多个用户共享同一个令牌。

## 授权模式对比

按授权需要的多端情况：

| 模式                              | 需要前端 | 需要后端 | 需要用户响应 | 需要客户端密钥 |
| --------------------------------- | -------- | -------- | ------------ | -------------- |
| 授权码模式 Authorization Code     | ✅        | ✅        | ✅            | ✅              |
| 隐式授权模式 Implicit Grant       | ✅        | ❌        | ✅            | ❌              |
| 密码授权模式 Password Grant       | ✅        | ✅        | ✅            | ✅              |
| 客户端授权模式 Client Credentials | ❌        | ✅        | ❌            | ✅              |

## 授权模式分类

![按照客户端类型与访问令牌所有者分类](https://static.7wate.com/img/2022/08/30/aa101efbae0a2.png)
