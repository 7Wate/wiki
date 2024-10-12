---
title: Token 鉴权
description: Token 鉴权
keywords:
  - Token
  - 鉴权
tags:
  - 计算机安全/用户安全
  - 技术/计算机安全
author: 7Wate
date: 2022-08-31
---

## Token 鉴权

现在我们已经得知，Session-Cookie 的一些缺点，以及 Session 的维护给服务端造成很大困扰，我们必须找地方存放它，又要考虑分布式的问题，甚至要单独为了它启用一套 Redis 集群。那有没有更好的办法？

于是 Token 就应运而生了

### Token（令牌）

Token 是一个令牌，客户端访问服务器时，验证通过后服务端会为其签发一张令牌，之后，客户端就可以携带令牌访问服务器，服务端只需要验证令牌的有效性即可。一句话概括：**访问资源接口（API）时所需要的资源凭证**

#### Token 的组成

一般 Token 的组成由 **uid** （用户唯一的身份标识）+ **time**（当前时间的时间戳) + **sign** （签名，Token 的前几位以哈希算法压缩成的一定长度的十六进制字符串）

#### Token 的认证流程图

![Token 的认证流程图](https://static.7wate.com/img/2022/08/30/40b2dbfe8f84a.png)

#### Token 认证步骤解析

1. **客户端：** 输入用户名和密码请求登录校验。
2. **服务器：** 收到请求验证用户名与密码；验证成功后，服务端会签发一个 Token，并把这个 Token 发送给客户端。
3. **客户端：** 收到 Token 以后需要把它存储起来，Web 端一般会放在 localStorage 或 Cookie 中，移动端原生 APP 一般存储在本地缓存中。
4. **客户端：** 再次向服务端请求 API 资源的时候，将 Token 通过 HTTP 请求头 Authorization 字段或者其它方式发送给服务端。
5. **服务器：** 收到请求，然后去验证客户端请求里面带着的 Token ，如果验证成功，就向客户端返回请求的数据，否则拒绝返还（401）。

#### Token 的优点

- **服务端无状态化、可扩展性好：** Token 机制在服务端不需要存储会话（Session）信息，因为 Token 自身包含了其所标识用户的相关信息，这有利于在多个服务间共享用户状态。
- **支持 APP 移动端设备。**
- **安全性好：** 有效避免 CSRF 攻击（因为不需要 Cookie）。
- **支持跨程序调用：** 因为 Cookie 是不允许跨域访问的，而 Token 则不存在这个问题。

#### Token 的缺点

- **配合：** 需要前后端配合处理。
- **占带宽：** 正常情况下比 sid 更大，消耗更多流量，挤占更多宽带。
- **性能问题：** 虽说验证 Token 时不用再去访问数据库或远程服务进行权限校验，但是需要对 Token 加解密等操作，所以会更耗性能。
- **有效期短：** 为了避免 Token 被盗用，一般 Token 的有效期会设置的较短，所以就有了 Refresh Token。

### Refresh Token（刷新 Token）

业务接口用来鉴权的 Token，我们称之为 Access Token。为了安全，我们的 Access Token 有效期一般设置较短，以避免被盗用。但过短的有效期会造成 Access Token 经常过期，过期后怎么办呢？

一种办法是**刷新 Access Token**，让用户重新登录获取新 Token，会很麻烦。另一种办法是再来一个 Token，一个专门生成 Access Token 的 Token，我们称为 **Refresh Token**。

- **Access Token：** 用来访问业务接口，由于有效期足够短，盗用风险小，也可以使请求方式更宽松灵活；
- **Refresh Token：** 用来获取 Access Token，有效期可以长一些，通过独立服务和严格的请求方式增加安全性；由于不常验证，也可以如前面的 Session 一样处理；

#### Refresh Token 的认证流程图

![Refresh Token 的认证流程图](https://static.7wate.com/img/2022/08/30/0f634bdff18ca.png)

#### Refresh Token 认证步骤解析

1. **客户端：** 输入用户名和密码请求登录校验。
2. **服务端：** 收到请求，验证用户名与密码；验证成功后，服务端会签发一个 Access Token 和 Refresh Token 并返回给客户端；
3. **客户端：** 把 Access Token 和 Refresh Token 存储在本地；
4. **客户端：** 请求数据时，携带 Access Token 传输给服务端；
5. **服务端**：
    - 验证 Access Token 有效：正常返回数据
    - 验证 Access Token 过期：拒绝请求
6. **客户端** ( Access Token 已过期) **：** 则重新传输 Refresh Token 给服务端；
7. **服务端** ( Access Token 已过期) **：** 验证 Refresh Token ，验证成功后返回新的 Access Token 给客户端；
8. **客户端：** 重新携带新的 Access Token 请求接口；

### Token 和 Session-Cookie 的区别

Session-Cookie 和 Token 有很多类似的地方，但是 Token 更像是 Session-Cookie 的升级改良版。

- **存储地不同：** Session 一般是存储在服务端；Token 是无状态的，一般由前端存储。
- **安全性不同：** Session 和 Token 并不矛盾，作为身份认证 Token 安全性比 Session 好，因为每一个请求都有签名还能防止监听以及重放攻击。
- **支持性不同：** Session-Cookie 认证需要靠浏览器的 Cookie 机制实现，如果遇到原生 NativeAPP 时这种机制就不起作用了，或是浏览器的 Cookie 存储功能被禁用，也是无法使用该认证机制实现鉴权的；而 Token 验证机制丰富了客户端类型。
