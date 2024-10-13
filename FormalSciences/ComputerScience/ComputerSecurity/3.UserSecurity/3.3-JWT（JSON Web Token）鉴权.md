---
title: JWT 鉴权
description: JWT 鉴权
keywords:
  - JWT
  - Java
  - 鉴权
tags:
  - 计算机安全/用户安全
  - 技术/计算机安全
author: 7Wate
date: 2022-08-31
---

## JWT（JSON Web Token）鉴权

通过第三节，我们知道了 Token 的使用方式以及组成，我们不难发现，服务端验证客户端发送过来的 Token 时，还需要查询数据库获取用户基本信息，然后验证 Token 是否有效；这样每次请求验证都要查询数据库，增加了查库带来的延迟等性能消耗。

**那么这时候业界常用的 JWT 就应运而生了！！！**

### JWT 的定义

JWT 是 Auth0 提出的通过对 JSON 进行加密签名来实现授权验证的方案。

就是登录成功后将相关用户信息组成 JSON 对象，然后对这个对象进行某种方式的加密，返回给客户端； 客户端在下次请求时带上这个 Token； 服务端再收到请求时校验 token 合法性，其实也就是在校验请求的合法性。

### JWT 的组成

JWT 由三部分组成：**Header 头部**、**Payload 负载**和 **Signature 签名**。它是一个很长的字符串，中间用（ . ）分隔成三个部分。

```text
eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c
```

#### Header 头部

在 Header 中通常包含了两部分：

- typ：代表 Token 的类型，这里使用的是 JWT 类型。
- alg：使用的 Hash 算法，例如 HMAC SHA256 或 RSA。

```json
{
   "alg": "HS256",
   "typ": "JWT"
}
```

#### Payload 负载

它包含一些声明 Claim（实体的描述，通常是一个 User 信息，还包括一些其他的元数据），用来存放实际需要传递的数据，JWT 规定了 7 个官方字段：

- iss（issuer）：签发人
- exp（expiration time）：过期时间
- sub（subject）：主题
- aud（audience）：受众
- nbf（Not Before）：生效时间
- iat（Issued At）：签发时间
- jti（JWT ID）：编号

除了官方字段，你还可以在这个部分定义私有字段，下面就是一个例子。

```json
{
   "sub": "1234567890",
   "name": "John Doe",
   "admin": true
}
```

#### Signature 签名

Signature 部分是对前两部分的签名，防止数据篡改。

首先，需要指定一个密钥（secret）。这个密钥只有服务器才知道，不能泄露给用户。然后，使用 Header 里面指定的签名算法（默认是 HMAC SHA256），按照下面的公式产生签名。

```java
HMACSHA256(
   base64UrlEncode(header) + "." +
   base64UrlEncode(payload),
   secret)
```

### JWT 的使用方式

客户端收到服务器返回的 JWT，可以储存在 Cookie 里面，也可以储存在 localStorage。

此后，客户端每次与服务器通信，都要带上这个 JWT。你可以把它放在 Cookie 里面自动发送，但是这样不能跨域，所以更好的做法是放在 HTTP 请求的头信息 Authorization 字段里面。

```http
 Authorization: Bearer <token>
```

### JWT 的认证流程图

![JWT 的认证流程图](https://static.7wate.com/img/2022/08/30/d6666d37094db.png)

### JWT 的优点

- 不需要在服务端保存会话信息（RESTful API 的原则之一就是无状态），所以易于应用的扩展，即信息不保存在服务端，不会存在 Session 扩展不方便的情况。
- JWT 中的 Payload 负载可以存储常用信息，用于信息交换，有效地使用 JWT，可以降低服务端查询数据库的次数。

### JWT 的缺点

- **加密问题：** JWT 默认是不加密，但也是可以加密的；生成原始 Token 以后，可以用密钥再加密一次。
- **到期问题：** 由于服务器不保存 Session 状态，因此无法在使用过程中废止某个 Token，或者更改 Token 的权限。一旦 JWT 签发了，在到期之前就会始终有效，除非服务器部署额外的逻辑。
