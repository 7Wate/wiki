---
title: SSO 单点登录
description: SSO 单点登录
keywords:
  - 单点登录
  - SSO
  - Single Sign On
tags:
  - 计算机安全/用户安全
  - 技术/计算机安全
author: 7Wate
date: 2022-08-31
---

## 单点登录（Single Sign On）

现在随着企业的发展，一个大型系统里可能包含 n 多子系统，用户在操作不同的系统时，需要多次登录，很麻烦，那么**单点登录（SSO）**就可以很好的解决这个问题的，在**多个应用系统中，只需要登录一次，就可以访问其他相互信任的应用系统**。

例如登录天猫，淘宝也会自动登录；登录百度贴吧，百度网盘也会自动登录。

### 同域下的 SSO（主域名相同）

当百度网站存在两个相同主域名下的贴吧子系统 tieba.baidu.com 和网盘子系统 pan.baidu.com 时，以下为它们实现 SSO 的步骤：

1. **客户端：** 用户访问某个子系统时（例如 tieba.baidu.com），如果没有登录，则跳转至 SSO 认证中心提供的登录页面进行登录。
2. **服务端：** 登录认证后，服务端把登录用户的信息存储于 Session 中，并且附加在响应头的 Set-Cookie 字段中，设置 Cookie 的 Domain 为 .baidu.com ；
3. 客户端：再次发送请求时，携带主域名 Domain 下的 Cookie 给服务器，此时服务端就可以通过该 Cookie 来验证登录状态了；

### 跨域下的 SSO（主域名不同）

在我们常见的购物网站天猫（tmall.com）和 淘宝（taobao.com）中，我们只需要登录其中某一个系统，另外一个系统打开后就会默认登录，那么这是怎么做的呢？

那么就有了 **CAS（Central Authentication Service）中央授权服务**，那么我们先主要说下 CAS 的流程。

#### 单点登录下的 CAS 认证流程图

![单点登录下的 CAS 认证流程图](https://static.7wate.com/img/2022/08/30/227748c758a02.png)

#### 单点登录下的 CAS 认证步骤详解

1. **客户端：** 访问系统 A。
2. **系统 A：** 发现用户未登录，重定向至 CAS 认证服务（sso.com），同时 URL 地址参数携带登录成功后回跳到系统 A 的页面链接 `sso.com/login?redir…`
3. **CAS 认证服务：** 发现请求 Cookie 中没有携带登录的票据凭证（TGC），所以 CAS 认证服务判定用户处于**未登录状态**，重定向用户页面至 CAS 的登录界面，用户在 CAS 的登录页面上进行登录操作。
4. **客户端：** 输入用户名密码进行 CAS 系统认证；
5. **CAS 认证服务：** 校验用户信息，并且生成 TGC 放入自己的 Session 中，同时以 Set-Cookie 形式写入 Domain 为 sso.com 的域下 ；同时生成一个授权令牌 ST (Service Ticket)，然后重定向至系统 A 的地址，重定向的地址中包含生成的 ST，重定向地址 `www.taobao.com?token=ST-345678`
6. **系统 A：** 拿着 ST 向 CAS 认证服务发送请求，CAS 认证服务验证票据 (ST) 的有效性。验证成功后，系统 A 知道用户已经在 CAS 登录了（其中的 ST 可以保存到 Cookie 或者本地中），系统 A 服务器使用该票据 (ST) 创建与用户的会话，称为局部会话，返回受保护资源。

***到这里客户端就可以跟系统 A 愉快的交往啦 ~***

1. **客户端：** 开始访问系统 B。
2. **系统 B：** 发现用户未登录，重定向至 SSO 认证服务，并将自己的地址作为参数传递，并附上在 sso.com 域下的 cookie 值是第五步生成的 TGC。
3. **CAS 认证服务：** CAS 认证服务中心发现用户已登录，跳转回系统 B 的地址，并附上票据 (ST) ;
4. **系统 B：** 拿到票据 (ST)，去 CAS 认证服务验证票据 (ST) 的有效性。验证成功后，客户端也可以跟系统 B 交往了 ~

#### 单点登录下需要注意的地方

如图中流程所示，我们发现 CAS 认证服务在签发的授权令牌 ST 后，直接重定向，这样其实是比较容易容易被窃取，那么我们需要在系统 A 或者系统 B 在向 CAS 验证成功 (如图中的第 14 步和第 11 步) 后，再生成另一个新的验证 Token 返回给客户端保存。

#### CAS 常用接口

- **login**：登录接口，用于登录到中央授权服务
- **logout**：登出接口，用于从中央授权服务中登出
- **validate**：用于验证用户是否登录中央授权服务
- **serviceValidate**：用于让各个 Service 验证用户是否登录中央授权服务

#### CAS 生成的票据

- **TGT（Ticket Grangting Ticket）** ：TGT 是 CAS 为用户签发的登录票据，拥有了 TGT，用户就可以证明自己在 CAS 成功登录过。
- **TGC：Ticket Granting Cookie：** CAS Server 生成 TGT 放入自己的 Session 中，而 TGC 就是这个 Session 的唯一标识（SessionId），以 Cookie 形式放到浏览器端，是 CAS Server 用来明确用户身份的凭证。
- **ST（Service Ticket）** ：ST 是 CAS 为用户签发的访问某个 Service 的票据。
