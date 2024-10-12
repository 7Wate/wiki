---
title: Shell 是什么
description: Shell 是什么
keywords:
  - Shell
  - 简介
tags:
  - Shell
  - 技术/入门
author: 7Wate
date: 2022-11-16
---

## 历史

壳层（shell）这个说法起源于路易斯·普赞（Louis Pouzin），在 1964 年至 1965 年间首次提出，随后在 Multics（MULTiplexed Information and Computing System）项目中首次被实现出来。Unix 上的第一个 Unix 壳层（Unix shell）是肯·汤普逊（Ken Thompson）以 Multics 上的 shell 为范本，所写出的 Thompson shell。

微软的 Windows 操作系统也提供了命令行壳层的功能，它们是 Windows 95 / 98 下的 command.com、Windows NT 内核下的 cmd.exe 以及 PowerShell；而图形界面壳层即为 explorer.exe。

## 简介

Shell（壳层）在计算机科学中指**为用户提供用户界面**的软件，通常指的是命令行界面的解析器。一般来说，这个词是指操作系统中提供访问内核所提供之服务的程序。Shell 也用于泛指所有为用户提供操作界面的程序，也就是程序和用户交互的层面。因此与之相对的是内核（Kernel），**内核不提供和用户的交互功能**。

通常将 shell 分为两类：命令行与图形界面。命令行壳层提供一个命令行界面（CLI）；而图形壳层提供一个图形用户界面（GUI）。

## 图形用户界面（GUI）

- DOS Shell
- Macintosh Finder
- Microsoft Windows 环境：Aston shell、BB4Win、Emerge Desktop、Geoshell、Litestep、程序管理器、Secure Desktop、SharpE、Windows Explorer、UserShell。
- X Window System 环境或 Wayland 环境（主要用于类 Unix 操作系统）
  - 独立的 X 窗口管理器，例如 Blackbox 与 Fluxbox。
  - 依靠窗口管理器的完整桌面环境，例如：CDE、GNOME、Unity（以 GNOME 作内核）、KDE、XFCE。

## 命令行界面（CLI）

### Unix

#### Bourne Shell 兼容

- **Bourne shell（sh）**史蒂夫·伯恩在贝尔实验室时编写。1978 年随 Version 7 Unix 首次发布。
  - Almquist shell（ash）由肯尼斯·艾昆斯特（Kenneth Almquist）在 SVR4 上建立了这个分支。
  - **Bourne-Again shell（bash）**由布莱恩·福克斯在 1987 年为了 GNU 计划而编写。
  - Debian Almquist shell（dash）由赫伯特·许（Herbert Xu）1997 年移植到 Linux 上后改名为 dash。
  - Korn shell（ksh）David Korn 在贝尔实验室时编写。
  - Z shell（zsh）是 macOS（2019 年起） 一款可用作交互式登录的 shell 及脚本编写的命令解释器。

#### C Shell 兼容

- C shell（csh）比尔·乔伊在加州大学伯克利分校时编写。1979 年随 BSD 首次发布。
  - TENEX C shell（tcsh） 一个向下兼容 c shell 的 Unix shell，目前作为 FreeBSD 和其延伸发行版的默认 shell。

### 非 Unix

- 4DOS, 4OS2, 4NT – JP Software 公司可在在 DOS, OS/2，及 Windows NT 下使用的壳层。Take Command 程序则是 GUI 方式的兼容程序。
- Amiga CLI/Amiga 壳层是称为 Workbench 的 AmigaOS 图形界面的另一选择。
- BASIC-PLUS – RSTS/E
- Beemos（BEEMos）–在 Windows XP 上执行的一个小型项目，提供设置、应用程序等功能，感觉起来像是在另一个操作系统下。
- CANDE MCS– MCP 操作系统的指令行壳曾与文本编辑器
- CCP – CP/M 操作系统的主控台指令处理器
- **cmd.exe** 基于 OS/2、Windows CE、Windows NT 系列操作系统的命令提示字符壳层
- COMMAND.COM – DOS 的壳层
- Commodore DOS Wedge – Commodore 64 上 BASIC 2.0 的延伸功能，包括常用磁盘操作的简略指令
- DCL – OpenVMS 的标准壳层，派生自早期的迪吉多（DEC）操作系统
- DDT – 迪吉多（DEC）PDP-10 调试工具，麻省理工学院 Incompatible Timesharing System 的指令壳层
- DROS – 智能手机上基于 Java ME 平台的类 DOS 壳层
- EFI-SHELL –可扩展固件界面（Extensible Firmware Interface，EFI）指令壳层，它是开放源代码的
- Google Shell –基于浏览器的 Google Search 前端界面
- iSeries QSHELL – IBM OS/400 上的 Unix 风格壳层
- Macintosh Programmer's Workshop –古典 Mac OS 软件开发用的老式指令行环境
- Microsoft BASIC –一些古老 8 位电脑上的主要作业环境
- Rexx – IBM 的脚本语言（scripting language）
- Singularity shell – Singularity 的标准壳层
- **Windows PowerShell** –命令提示字符的新一代面向对象后继者（旧称 Monad 或 Microsoft Shell (MSH)）
- Windows 修复主控台– Windows 2000、Windows XP、Windows 2003 操作系统的一项功能
- YouShell –用于 YouOS，基于 JavaScript 的指令处理器
