---
title: Linux 下源代码编译与安装实战指南
description: Linux 下源代码编译与安装实战指南
keywords:
  - Linux
  - 源代码编译
tags:
  - Linux
  - 高级
sidebar_position: 1
author: 7Wate
date: 2023-09-09
---

## 概述

编译和安装源代码是 Unix 和 Unix-like 系统中一个非常重要且基本的技能。通过这种方法，你不仅可以获得软件的最新版本，而且还可以根据自己的需求和偏好定制软件。在本指南中，我们将通过一个具体实例（Nginx软件包）来详细讲解源代码编译和安装的全过程。

```mermaid
graph LR;
    A[开始] --> B[获取源代码];
    B --> C[安装编译依赖];
    C --> D[解压源代码];
    D --> E[配置];
    E --> F[编译];
    F --> G[安装];
    G --> H[测试];
    H --> I[运行和管理];
    I --> J[清理];
    J --> K[配置 Systemd 服务];
    K --> L[结束];

```

## 第一步：准备工作

### 1. 获取源代码

在开始编译和安装过程之前，首先需要获取软件的源代码。这可以通过多种途径实现，例如直接从官方网站下载源代码压缩包，或使用版本控制系统（如git）来克隆源代码仓库。

```shell
# 使用 wget 命令下载源代码压缩包
wget http://example.com/software-x.y.z.tar.gz

# 或使用 git 克隆源代码仓库
git clone https://github.com/example/software.git
```

### 2. 安装编译依赖

在编译源代码之前，通常需要安装一些依赖库和工具。这些依赖包括编译器（如gcc）和其他必要的库。

```shell
sudo apt update
sudo apt install build-essential libpcre3 libpcre3-dev zlib1g zlib1g-dev openssl libssl-dev
```

## **第二步：配置与编译**

### 1. 解压源代码

如果源代码是压缩包形式，你需要解压它以访问源代码文件。

```shell
# 使用 tar 命令解压源代码压缩包
tar xvf software-x.y.z.tar.gz

# 进入源代码目录
cd software-x.y.z
```

### 2. configure 配置

配置是准备编译的重要步骤，通常通过运行`configure`脚本来完成。这个脚本会检测你的系统环境和参数，并准备好编译过程。

```shell
# 运行 configure 脚本来配置软件包
./configure --prefix=/usr/local
```

常用的 `configure` 选项及其描述：

| 选项                     | 描述                                     |
| ------------------------ | ---------------------------------------- |
| `--prefix=PREFIX`        | 指定安装路径，例如 `/usr/local`          |
| `--enable-FEATURE`       | 启用某个特性                             |
| `--disable-FEATURE`      | 禁用某个特性                             |
| `--with-PACKAGE`         | 包含某个包的支持                         |
| `--without-PACKAGE`      | 不包含某个包的支持                       |
| `--help`                 | 显示所有可用的 `configure` 选项          |
| `--version`              | 显示程序版本和 `configure` 脚本信息      |
| `--quiet`, `--silent`    | 禁止显示多余的输出                       |
| `--libdir=DIR`           | 指定库文件的安装目录                     |
| `--includedir=DIR`       | 指定头文件的安装目录                     |
| `--mandir=DIR`           | 指定man手册页面的安装目录                |
| `--sysconfdir=DIR`       | 指定系统配置文件的安装目录               |
| `--localstatedir=DIR`    | 指定本地状态数据（如日志文件）的安装目录 |
| `--enable-shared`        | 启用或禁用共享库的构建                   |
| `--enable-static`        | 启用或禁用静态库的构建                   |
| `--enable-debug`         | 启用调试模式                             |
| `--enable-optimizations` | 启用代码优化                             |
| `--host=HOST`            | 指定主机类型（用于交叉编译）             |
| `--build=BUILD`          | 指定构建系统类型                         |

### 3. make 编译

配置完成后，我们可以开始编译源代码了。这一步通常通过`make`命令来完成，它根据Makefile文件中的指令进行源代码编译。

```shell
# 使用 make 命令来编译源代码
make
```

#### 常用目标

| 目标              | 描述                                                 |
| ----------------- | ---------------------------------------------------- |
| `all`             | 编译所有的目标文件和链接成一个可执行程序（默认目标） |
| `install`         | 将编译好的程序和相关文件安装到指定的目录             |
| `clean`           | 清理编译过程中产生的临时文件和目标文件               |
| `distclean`       | 除了执行 `clean` 目标的操作外，还会清理配置文件      |
| `test` 或 `check` | 运行程序的测试套件                                   |
| `uninstall`       | 从指定目录中移除之前通过 `make install` 安装的文件   |

#### 常用选项

| 选项                       | 描述                                                         |
| -------------------------- | ------------------------------------------------------------ |
| `-j [N]`                   | 允许同时执行 N 个作业（如果未指定 N，则自动选择基于可用CPU核心的数量） |
| `-k` 或 `--keep-going`     | 即使有错误发生也继续尽可能多的编译                           |
| `--silent` 或 `-s`         | 禁止显示执行的命令                                           |
| `--always-make` 或 `-B`    | 无论目标文件是否最新，都重新构建所有目标                     |
| `-f FILE` 或 `--file=FILE` | 指定一个非标准名称的 Makefile 文件来使用                     |
| `--debug`                  | 为调试 `make` 而显示调试信息                                 |
| `-n` 或 `--just-print`     | 显示但不执行命令                                             |
| `-q` 或 `--question`       | 无输出模式，用来检查指定目标是否已经是最新的                 |
| `-C DIRECTORY`             | 在执行 `make` 命令前，先切换到指定的目录                     |

## **第三步：安装与测试**

### 1. 安装

编译完成后，下一步是将软件包安装到系统中。这也是通过运行`make`命令完成的，但常配合`install`目标来将文件安装到正确的位置。

```python
# 使用 make 命令来安装软件包
sudo make install
```

### 2. 测试

某些软件包提供了测试步骤，允许你在安装之前测试以确保一切正常。

```shell
# 使用 make 命令来测试软件包
make test
```

## **第四步：后续管理和清理**

### 1. 运行和管理

安装完成后，你可以使用相应的命令来启动、停止或重载服务。例如，在Nginx的情况下，你可以使用以下命令：

```shell
# 启动 Nginx 服务
sudo /usr/local/nginx/sbin/nginx

# 停止 Nginx 服务
sudo /usr/local/nginx/sbin/nginx -s stop

# 重新加载 Nginx 配置
sudo /usr/local/nginx/sbin/nginx -s reload
```

### 2. 清理

最后，为了保持系统整洁，你可以选择清理编译时生成的临时文件。

```shell
# 使用 make 命令来清理编译生成的文件
make clean
```

## 第五步：配置 Systemd 服务

如果你希望你的新安装的服务（例如 Nginx）更好地集成到系统中，可以考虑为它创建一个 Systemd 服务单元文件。这样，你就可以用 Systemd 来管理这个服务了。

### 1. 创建 Systemd 服务单元文件

首先，我们需要创建一个新的Systemd服务单元文件。打开一个文本编辑器并创建一个新文件，通常位于`/etc/systemd/system/`目录，并以`.service`扩展名结尾。

```shell
sudo nano /etc/systemd/system/nginx.service
```

### 2. 编辑服务单元文件

在这个文件中，我们将定义服务的各种属性，包括如何启动和停止服务。以下是一个简单的Nginx Systemd服务单元文件示例：

```shell
[Unit]
Description=The NGINX HTTP and reverse proxy server
After=network.target

[Service]
Type=forking
PIDFile=/usr/local/nginx/logs/nginx.pid
ExecStartPre=/usr/local/nginx/sbin/nginx -t
ExecStart=/usr/local/nginx/sbin/nginx
ExecReload=/usr/local/nginx/sbin/nginx -s reload
ExecStop=/usr/local/nginx/sbin/nginx -s stop
PrivateTmp=true

[Install]
WantedBy=multi-user.target
```

### 3. 重新加载 Systemd

创建或修改任何Systemd服务单元文件后，你需要运行以下命令来重新加载Systemd，使其识别新的或更改的服务单元文件：

```shell
sudo systemctl daemon-reload
```

### 4. 启动和启用服务

现在，你可以使用`systemctl`命令来启动Nginx服务，并将其设置为在系统启动时自动启动：

```shell
sudo systemctl start nginx
sudo systemctl enable nginx
```

### 5. 状态和日志

你可以使用以下命令来检查服务的状态和日志：

```shell
# 检查服务状态
sudo systemctl status nginx

# 查看服务日志
sudo journalctl -u nginx
```
