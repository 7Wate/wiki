---
doc_type: weread-highlights-reviews
bookId: "26943492"
author: 仲平
cover: https://cdn.weread.qq.com/weread/cover/41/YueWen_26943492/t7_YueWen_26943492.jpg
reviewCount: 0
noteCount: 16
readingStatus: 读完
progress: 99%
totalReadDay: 3
readingTime: 1小时16分钟
readingDate: 2023-01-17
finishedDate: 2023-07-29
title: 每天5分钟玩转Docker容器技术
description: Docker和容器技术是当下最火的IT技术，无论是互联网还是传统企业都在研究和实践如何用容器构建自己的 IT 基础设施。学习本书能够让读者少走弯路，系统地学习、掌握和实践 Docker 和容器技术。 本书共分为三部分。第一部分介绍容器技术生态环境。第二部分是容器核心知识，包括架构、镜像、容器、网络和存储。第三部分是容器进阶知识，包括多主机管理、跨主机网络方案、监控、日志管理和数据管理。读者在学习的过程中，可以跟着教程进行操作，在实践中掌握 Docker 容器技术的核心技能。在之后的工作中，可以将本教程作为参考书，按需查找相关知识点。 本书主要面向微服务软件开发人员，以及 IT 实施和运维工程师等相关人员，也适合高等院校和培训学校相关专业的师生教学参考。
keywords:
  - 每天5分钟玩转Docker容器技术
  - CloudMan
tags:
  - 阅读/计算机-计算机综合
  - 阅读/笔记
date: 2024-04-29

---

## 简介

- **书名**：《每天5分钟玩转Docker容器技术》
- **作者**： CloudMan
- **分类**： 计算机-计算机综合
- **ISBN**：9787302479703
- **出版社**：清华大学出版社

## 概述

Docker和容器技术是当下最火的IT技术，无论是互联网还是传统企业都在研究和实践如何用容器构建自己的 IT 基础设施。学习本书能够让读者少走弯路，系统地学习、掌握和实践 Docker 和容器技术。 本书共分为三部分。第一部分介绍容器技术生态环境。第二部分是容器核心知识，包括架构、镜像、容器、网络和存储。第三部分是容器进阶知识，包括多主机管理、跨主机网络方案、监控、日志管理和数据管理。读者在学习的过程中，可以跟着教程进行操作，在实践中掌握 Docker 容器技术的核心技能。在之后的工作中，可以将本教程作为参考书，按需查找相关知识点。 本书主要面向微服务软件开发人员，以及 IT 实施和运维工程师等相关人员，也适合高等院校和培训学校相关专业的师生教学参考。

## 划线 
 

> 目前OCI发布了两个规范：runtime spec和image format spec。 

> 容器OS是专门运行容器的操作系统。与常规OS相比，容器OS通常体积更小，启动更快。因为是为容器定制的OS，通常它们运行容器的效率会更高。 

> kubernetes是Google领导开发的开源容器编排引擎，同时支持Docker和CoreOS容器。 

> Docker分为开源免费的CE（Community Edition）版本和收费的EE（Enterprise Edition）版本。 

> 容器使软件具备了超强的可移植能力。 

> 其实，“集装箱”和“容器”对应的英文单词都是“Container”。 

> Docker的核心组件包括：● Docker客户端：Client● Docker服务器：Docker daemon● Docker镜像：Image● Registry● Docker容器：Container 

> 每个容器都有一个软件镜像，相当于集装箱中的货物。容器可以被创建、启动、关闭和销毁。和集装箱一样，Docker在执行这些操作时，并不关心容器里到底装的什么，它不管里面是Web Server，还是Database。 

> base镜像有两层含义：（1）不依赖其他镜像，从scratch构建；（2）其他镜像可以以之为基础进行扩展。 

> 如果docker run指定了其他命令，CMD指定的默认命令将被忽略。● 如果Dockerfile中有多个CMD指令，只有最后一个CMD有效。 

> 对于服务类容器，我们通常希望在这种情况下容器能够自动重启。启动容器时设置 --restart就可以达到这个效果 

> cgroup和namespace是最重要的两种技术。cgroup实现资源限额，namespace实现资源隔离。 

> VLAN是现代网络常用的网络虚拟化技术，它可以将物理的二层网络划分成最多4094个逻辑网络，这些逻辑网络在二层上是隔离的，每个逻辑网络（即VLAN）由VLAN ID区分，VLAN ID的取值为1～4094。 

> ELK是三个软件的合称：Elasticsearch、Logstash、Kibana。 

> 无状态是指容器在运行过程中不需要保存数据，每次访问的结果不依赖上一次访问，比如提供静态页面的Web服务器。 

> [插图]

## 笔记


## 书评


## 点评
