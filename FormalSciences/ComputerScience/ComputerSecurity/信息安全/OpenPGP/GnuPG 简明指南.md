---
title: GnuPG 简明指南
description: GnuPG 简明指南
keywords:
  - GnuPG
  - 简明指南
tags:
  - 计算机安全/信息安全
  - 技术/计算机安全
author: 7Wate
date: 2023-06-28
---

## 简介

[GnuPG](https://gnupg.org/)（GNU Privacy Guard，GPG）是一款开源软件，用于非对称加密。它是满足 GPL 协议的 PGP（Pretty Good Privacy）加密软件实现。GnuPG 依照由 IETF 制定的 OpenPGP 技术标准设计，用于加密、数字签章及产生非对称密钥对。GPG 与 PGP 功能兼容。

如果你想发送加密信息，首先你需要得到接收者的公钥，然后通过该公钥对信息进行加密传输，接收者使用私钥就可解密并读取文件。同时，你也可以在公共网络用数字签章表明身份和安全性。

## GPG

### 安装

在 Linux 系统中，GnuPG 通常已经被默认安装。在 Windows 和 macOS 系统中，你可以从 [GnuPG 官方网站](https://gnupg.org/) 下载安装。

### 配置

```shell
~/.gnupg - GPG 配置目录
~/.gnupg/gpg.conf – GPG 配置文件
~/.gnupg/trustdb.gpg – GPG 信任库，用于存储你信任的其他 GPG 密钥
~/.gnupg/pubring.gpg – GPG 公钥库，用于存储你的公钥和他人的公钥
~/.gnupg/secring.gpg – GPG 私钥库，用于存储你的私钥
```

### 生成密钥

```shell
# 正常模式
gpg --gen-key

# 专家模式
gpg --expert --full-gen-key
```

```shell
1.请选择您要使用的密钥种类：
   (1) RSA and RSA (default)
   (2) DSA and Elgamal
   (3) DSA (仅用于签名)
   (4) RSA (仅用于签名)
您的选择？ 1

2.RSA 密钥长度应在 1024 位与 4096 位之间。
您想要用多大的密钥尺寸？(2048)4096
您所要求的密钥尺寸是 4096 位
请设定这把密钥的有效期限。
         0 = 密钥永不过期
      <n>  = 密钥在 n 天后过期
      <n>w = 密钥在 n 周后过期
      <n>m = 密钥在 n 月后过期
      <n>y = 密钥在 n 年后过期
密钥的有效期限是？(0) 0
密钥永远不会过期
以上正确吗？(y/n)y


3. You need a user ID to identify your key; the software constructs the user ID
from the Real Name, Comment and Email Address in this form:
    "Heinrich Heine (Der Dichter) <heinrichh@duesseldorf.de>"

真实姓名：zhouzhongping
电子邮件地址：zhouzhongping@7wate.com
注释：测试使用
您正在使用‘utf-8’字符集。
您选定了这个用户标识：
    “zhouzhongping (测试使用) <zhouzhongping@7wate.com>”

4.更改姓名(N)、注释(C)、电子邮件地址(E)或确定(O)/退出(Q)？o

5.您需要一个密码来保护您的私钥。

我们需要生成大量的随机字节。这个时候您可以多做些琐事(像是敲打键盘、移动
鼠标、读写硬盘之类的)，这会让随机数字发生器有更好的机会获得足够的熵数。
```

## 常用命令

### 查看

```shell
# 查看公钥
gpg --list-keys
gpg -k

# 查看私钥
gpg --list-secret-keys
gpg -K
```

### 编辑

```shell
# 编辑密钥页面
gpg --edit-key [密钥ID]
```

**GPG 以下命令需要进入编辑密钥页面。**

| 命令     | 描述                                           | 示例                                             |
| -------- | ---------------------------------------------- | ------------------------------------------------ |
| quit     | 退出此菜单                                     | 无需示例，直接输入 `quit` 即可                   |
| save     | 保存并退出                                     | 无需示例，直接输入 `save` 即可                   |
| help     | 显示此帮助                                     | 无需示例，直接输入 `help` 即可                   |
| fpr      | 显示密钥指纹                                   | `fpr`                                            |
| list     | 列出密钥和用户标识                             | `list`                                           |
| uid      | 选择用户标识 N                                 | `uid 1`                                          |
| key      | 选择子密钥 N                                   | `key 1`                                          |
| check    | 检查签名                                       | `check`                                          |
| sign     | 为所选用户标识添加签名                         | `uid 1`, 然后 `sign`                             |
| lsign    | 为所选用户标识添加本地签名                     | `uid 1`, 然后 `lsign`                            |
| tsign    | 为所选用户标识添加信任签名                     | `uid 1`, 然后 `tsign`                            |
| adduid   | 增加一个用户标识                               | `adduid`, 然后按提示操作                         |
| deluid   | 删除选定的用户标识                             | `uid 1`, 然后 `deluid`                           |
| addkey   | 增加一个子密钥                                 | `addkey`, 然后按提示操作                         |
| delkey   | 删除选定的子密钥                               | `key 1`, 然后 `delkey`                           |
| expire   | 变更密钥或所选子密钥的使用期限                 | `key 1`, 然后 `expire`, 接着按提示输入新的到期日 |
| passwd   | 变更密码                                       | `passwd`, 然后按提示输入新密码                   |
| trust    | 变更信任度                                     | `trust`, 然后按提示选择新的信任级别              |
| revsig   | 吊销所选用户标识上的签名                       | `uid 1`, 然后 `revsig`                           |
| revuid   | 吊销选定的用户标识                             | `uid 1`, 然后 `revuid`                           |
| revkey   | 吊销密钥或选定的子密钥                         | `key 1`, 然后 `revkey`                           |
| enable   | 启用密钥                                       | `enable`                                         |
| disable  | 禁用密钥                                       | `disable`                                        |
| clean    | 压缩不可用的用户标识并从密钥上移除不可用的签名 | `clean`                                          |
| minimize | 压缩不可用的用户标识并从密钥上移除所有签名     | `minimize`                                       |

### 导出

```shell
# 导出公钥
gpg --armor --output public-key.txt --export [密钥ID]

# 导出私钥
gpg --armor --output private-key.txt --export-secret-keys [密钥ID]
```

在这里，`--armor` 选项会生成.asc 后缀的 ASCII 类型的文本文件，如果不使用该选项，则会生成.gpg 后缀的二进制文件。

### 导入

```shell
# 从本地文件导入密钥
gpg --import [密钥文件]

# 从服务器导入密钥
gpg --keyserver [服务器] --search-keys [用户ID]
```

### 公布

```shell
# 将密钥发布到公开服务器
gpg --send-keys [密钥ID] --keyserver [服务器]

# 发布用户指纹
gpg --fingerprint [密钥ID]
```

### 删除

```shell
# 删除指定公钥
gpg --delete-key [密钥ID]

# 删除指定私钥
gpg --delete-secret-keys [密钥ID]
```

## 常用选项

| 命令选项             | 描述                                                  | 示例                                        |
| -------------------- | ----------------------------------------------------- | ------------------------------------------- |
| \--list-keys         | 列出所有的密钥                                        | `gpg --list-keys`                           |
| \--gen-key           | 生成新的密钥对                                        | `gpg --gen-key`                             |
| \--delete-key        | 删除密钥                                              | `gpg --delete-key [key-id]`                 |
| \--import            | 导入密钥                                              | `gpg --import [key-file]`                   |
| \--export            | 导出公钥                                              | `gpg --export -a "User Name" > public.key`  |
| \--armor             | 创建 ASCII 字符格式的输出（用于在邮件等场合）         | `gpg --armor --export [key-id]`             |
| \--encrypt           | 加密文件                                              | `gpg --encrypt --recipient [key-id] [file]` |
| \--decrypt           | 解密文件                                              | `gpg --decrypt [file]`                      |
| \--sign              | 生成只有你自己可以识别的签名文件                      | `gpg --sign [file]`                         |
| \--verify            | 验证签名文件                                          | `gpg --verify [file]`                       |
| \--edit-key          | 编辑密钥的详细设置，例如添加/删除别名、设置过期时间等 | `gpg --edit-key [key-id]`                   |
| \--send-keys         | 将密钥发送到 keyserver                                | `gpg --send-keys [key-id]`                  |
| \--recv-keys         | 从 keyserver 接收密钥                                 | `gpg --recv-keys [key-id]`                  |
| \--refresh-keys      | 从 keyserver 更新所有密钥的信息                       | `gpg --refresh-keys`                        |
| \--full-generate-key | 使用全面设置来生成新的密钥对                          | `gpg --full-generate-key`                   |
| \--quick-add-uid     | 快速添加新的用户 ID 到现有的密钥                      | `gpg --quick-add-uid [key-id] [User ID]`    |
| \--change-passphrase | 改变密钥的保护密码                                    | `gpg --change-passphrase [key-id]`          |

## 加密和解密

```shell
# 加密文件
gpg --recipient [密钥ID] --output demo.en.txt --encrypt demo.txt

# 解密文件
gpg --decrypt demo.en.txt --output demo.de.txt
gpg demo.en.txt

# 签名文件（GPG格式）
gpg --sign test.txt

# 签名文件（ASCII格式）
gpg --clearsign test.txt

# 生成单独签名
# -a 选项会生成 ASCII 格式的签名
gpg -a --detach-sign test.txt

# 验证签名
gpg --verify test.txt.asc test.txt
```
