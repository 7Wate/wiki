---
doc_type: weread-highlights-reviews
bookId: "39130662"
author: 仲平
cover: https://cdn.weread.qq.com/weread/cover/50/YueWen_39130662/t7_YueWen_39130662.jpg
reviewCount: 0
noteCount: 13
readingStatus: 读完
progress: 99%
totalReadDay: 5
readingTime: 2小时33分钟
readingDate: 2022-11-28
finishedDate: 2022-12-08
title: 虚拟化工程师运维实战：VMware服务器虚拟化+Citrix桌面/应用虚拟化+Veeam备份+Zabbix监控
description: 《虚拟化工程师运维实战：VMware服务器虚拟化+Citrix桌面/应用虚拟化+Veeam备份+Zabbix监控》详细介绍了实际运维工作中虚拟化工程师应该熟练掌握的虚拟化技术。全书共7章，分别是虚拟化技术概述、虚拟化工程师应知必会的六件事、部署IT基础架构服务器、实现服务器虚拟化—基于VMwarevSphere、实现桌面/应用虚拟化—基于CitrixVirtualAppsandDesktops、虚拟化备份—基于VeeamBackup&Replication，实现对虚拟化环境的灵活监控。本书图文并茂，步骤详细，介绍了大量的实用知识，能够让读者清晰地理解虚拟化项目部署中的操作细节。本书适合于从事企业信息化运维工作的虚拟化工程师学习，也可以作为项目管理人员实施企业虚拟化项目的参考书，还可作为高等院校虚拟化技术相关课程的教材。
keywords:
  - 虚拟化工程师运维实战：VMware服务器虚拟化+Citrix桌面/应用虚拟化+Veeam备份+Zabbix监控
  - 孟鹏编著
tags:
  - 阅读/计算机-编程设计
  - 阅读/笔记
date: 2024-04-29

---

## 简介

- **书名**：《虚拟化工程师运维实战：VMware服务器虚拟化+Citrix桌面/应用虚拟化+Veeam备份+Zabbix监控》
- **作者**： 孟鹏编著
- **分类**： 计算机-编程设计
- **ISBN**：9787111673248
- **出版社**：机械工业出版社

## 概述

《虚拟化工程师运维实战：VMware服务器虚拟化+Citrix桌面/应用虚拟化+Veeam备份+Zabbix监控》详细介绍了实际运维工作中虚拟化工程师应该熟练掌握的虚拟化技术。全书共7章，分别是虚拟化技术概述、虚拟化工程师应知必会的六件事、部署IT基础架构服务器、实现服务器虚拟化—基于VMwarevSphere、实现桌面/应用虚拟化—基于CitrixVirtualAppsandDesktops、虚拟化备份—基于VeeamBackup&Replication，实现对虚拟化环境的灵活监控。本书图文并茂，步骤详细，介绍了大量的实用知识，能够让读者清晰地理解虚拟化项目部署中的操作细节。本书适合于从事企业信息化运维工作的虚拟化工程师学习，也可以作为项目管理人员实施企业虚拟化项目的参考书，还可作为高等院校虚拟化技术相关课程的教材。

## 划线 
 

> 虚拟化技术在企业中的应用主要涉及服务器虚拟化、桌面虚拟化和应用程序虚拟化三方面： 

> 云计算分成3个层次，分别是IaaS（Infrastucture as a Service，基础架构即服务）、PaaS（Platform as a Service，平台即服务）和SaaS（Software as a Service，软件即服务） 

> 根据云计算资源所在的位置，分成公有云、私有云和混合云3种。公有云，是指所有的资源都放在厂商建设的数据中心，用户通过互联网接入，获取到相应的云资源，使用便捷，按需付费。私有云，是指所有的资源都由用户方进行建设，放在自有的数据中心中。资源固定，安全性高。混合云，是私有云和公有云的结合。 

> 在各大招聘网站上搜索。从各个招聘渠道去搜索虚拟化工程师、系统工程师、IT工程师、IT技术支持等 

> 1）IT管理：管理技术团队、ITIL、PMP。2）IT基础架构：微软Active Directory、DNS、DHCP、WSUS、NTP、GPO、Exchange。3）数据库：SQL Sever、MySQL、Oracle。4）虚拟化：VMware vSphere、VSAN、NSX、Citrix XenServer、XenDesktop、XenApp、Openstack、KVM。5）备份：Veritas、Acronis、Veeam。6）监控：Tivoli、Zabbix。 

> ·制定蓝图——规划企业整体IT架构方案。·搭建IT基础架构——部署和配置各类服务器。·配置服务器虚拟化——提供基础服务功能。·配置企业云桌面/云应用虚拟化——实现统一的办公环境管理。·安全第一——构建虚拟化场景下的备份系统。·搭建监控系统——力求系统稳定运行。 

> ·AD域架构服务器。·虚拟桌面/应用服务器。·DNS服务器。·备份服务器。·DHCP服务器。·监控服务器。·邮件服务器。·目录服务器。·虚拟化服务器。·数据库服务器。 

> 比如NTP服务器会提供时间同步服务，其他计算机的时间会与该NTP服务器保持时钟同步；WSUS服务器会提供Windows的补丁服务，其他计算机会从WSUS服务器获取微软发布的最新补丁，避免因漏洞、后门等引发安全问题。 

> 在硬件层上添加了虚拟化层，这种架构也被称为裸金属架构。 

> 目前，市场上主流的服务器虚拟化产品有VMware vSphere、Citrix Hypervisor（原Citrix Xenserver）、Microsoft Hyper-V等。对于虚拟化工程师来说，掌握1～2种常见的服务器虚拟化产品的部署、调试和维护是必不可少的技能。 

> 服务器提供了计算资源，网络设备将服务器之间连通，存储设备提供了数据存储的空间。 

> 常见的监控软件有IBM Tivoli、SolarWinds、Zabbix、Cacti、Nagios、Ganglia等。 

> 基础架构的范围比较广泛，广义上包含服务器等计算机设备、路由器、交换机等网络设备，存储阵列、防火墙等安全设备，机房制冷设备等，狭义上特指微软相关的基础架构服务器，例如域控制器、DNS（Domain Name System，域名系统）服务器、DHCP（Dynamic Host Configuration Protocol，动态主机配置协议）服务器、WSUS（Windows Server Update Services，Windows Server更新服务）服务器等。 

> 这就好比是一个部门的员工，大家各自负责一方面的工作内容，有人负责服务器，有人负责网络，也有人负责安全。但随着员工数量的增多，老板没有更多的精力管理所有员工，于是指定了一个部门经理，专门管理其中一部分员工。这样一来部门经理来统一规定本部门员工的工作内容和指定规章制度等。针对大规模的计算机来说，也要实现统一的管理就需要借助AD来帮忙。域控制器担任了“部门经理”的角色，部门经理的存在就决定了整个部门的成立，而其他的计算机由域控制器进行统一管理。

## 笔记


## 书评


## 点评
