---
title: Linux 安装和配置
description: Linux的安装和配置
keywords:
  - Linux
  - 安装
  - 配置
tags:
  - Linux/安装
  - 技术/操作系统
author: 7Wate
date: 2024-03-22
---

## GNU/Linux 发行版的选择和下载

GNU/Linux 有许多不同的发行版可供选择，如 Debian、CentOS/RHEL、 Ubuntu 等，它们都有自己的特点和适用场景。下表列出了几种常见的 GNU/Linux 发行版及其特点和适用场景。

| 发行版                          | 特点                                   | 适用场景                   | 官方网站                                                     | 中国国内官方镜像站点         |
| ------------------------------- | -------------------------------------- | -------------------------- | ------------------------------------------------------------ | ---------------------------- |
| Ubuntu                          | 易用、更新快、软件库丰富               | 个人、办公、教育等领域     | <https://ubuntu.com/>                                          | <https://mirrors.ustc.edu.cn/> |
| Debian                          | 稳定、安全、软件包多                   | 服务器、开发等领域         | <https://www.debian.org/>                                      | <https://mirrors.ustc.edu.cn/> |
| CentOS                          | 稳定、安全、兼容性好、商业支持         | 企业级应用、服务器等领域   | <https://www.centos.org/>                                      | <https://mirrors.ustc.edu.cn/> |
| Red Hat Enterprise Linux (RHEL) | 稳定、安全、商业支持、适用于企业级应用 | 企业级应用、服务器等领域   | <https://www.redhat.com/zh/technologies/linux-platforms/enterprise-linux> |                              |
| Fedora                          | 最新的开源软件、社区驱动               | 开发、实验、桌面等领域     | <https://getfedora.org/>                                       | <https://mirrors.ustc.edu.cn/> |
| Arch Linux                      | 简单、灵活、滚动更新                   | 开发、实验、高级用户等领域 | <https://www.archlinux.org/>                                   | <https://mirrors.ustc.edu.cn/> |

以下是一些常用的中国国内 GNU/Linux 官方镜像站点：

1. 清华大学开源软件镜像站：<https://mirrors.tuna.tsinghua.edu.cn/>
2. 阿里云开源镜像站：<https://mirrors.aliyun.com/>
3. 网易开源镜像站：<http://mirrors.163.com/>
4. 中科大开源镜像站：<https://mirrors.ustc.edu.cn/>
5. 华中科技大学开源镜像站：<https://mirrors.hust.edu.cn/>
6. 上海交通大学开源软件镜像站：<https://ftp.sjtu.edu.cn/>
7. 北京交通大学开源软件镜像站：<https://mirror.bjtu.edu.cn/>
8. 北京理工大学开源镜像站：<https://mirror.bit.edu.cn/>

可以根据自己的需求来选择最适合自己的 GNU/Linux 发行版。例如，如果您需要一个易于使用、更新快、软件库丰富的发行版，那么 Ubuntu 是一个不错的选择；如果您需要一个稳定、安全、软件包多的发行版，那么 Debian 可能更适合您的需求。

## GNU/Linux 的安装和配置

在选择好自己的发行版后，我们需要将其安装到计算机上并进行配置。下面是 GNU/Linux 安装的一些基本步骤：

1. 下载并刻录光盘或制作 U 盘启动盘。
2. 进入 BIOS 设置，设置计算机从光盘或 U 盘启动。
3. 启动后进入安装程序，进行分区、格式化、挂载硬盘等操作。
4. 安装操作系统并进行基本设置，如选择时区、语言、设置用户等。

安装完成后，我们需要对 GNU/Linux 进行基本配置，以确保系统的正常运行。下面是一些基本的配置步骤：

1. 配置基本系统设置，如修改主机名、设置 IP 地址等。
2. 设置时区、语言、字符集等。
3. 配置网络连接，如设置网卡、DHCP 等。
4. 安装和配置必要的软件包，如 SSH、防火墙等。

建议在虚拟机环境下进行安装、配置、学习，同时学会利用虚拟机快照功能可以事半功倍。可以合理使用 LinuxMirrors 一键更换国内软件源。

### LinuxMirrors

**`GNU/Linux` 一键更换国内软件源脚本**

**[LinuxMirrors](https://github.com/SuperManito/LinuxMirrors) 旨在为从事计算机相关行业的朋友们提供便利**

```shell
bash <(curl -sSL https://gitee.com/SuperManito/LinuxMirrors/raw/main/ChangeMirrors.sh)
```

## GNU/Linux 的基本设置和管理

在完成基本的配置后，我们需要对 GNU/Linux 进行一些基本的设置和管理。下面是一些常见的设置和管理操作：

1. 配置用户和权限，如添加用户、设置用户组、分配权限等。
2. 管理软件包，如更新、安装、删除软件包等。
3. 配置服务，如启动、停止、重启服务等。
4. 监控系统性能，如查看系统负载、内存使用情况等。
5. 备份和恢复系统，如定期备份数据、恢复系统等。

### Cockpit

> The easy-to-use, integrated, glanceable, and open web-based interface for your servers

[Cockpit](https://cockpit-project.org/) 是一款基于 Web 的 GNU/Linux 服务器管理工具，它提供了图形化的用户界面，使得管理和监控服务器变得更加简单和易于操作。

- [安装手册](https://cockpit-project.org/running.html)
- [官方文档](https://cockpit-project.org/documentation.html)
