---
title: 我又从 Ubunut 换成了 Fedora
description: 我又从 Ubunut 换成了 Fedora
keywords:
  - Ubuntu
  - Fedora
tags:
  - 博客/原创
  - Linux/安装
authors:
  - 仲平
date: 2024-03-05
---

去年我从 Windows 换到了 Linux，并选择了新手友好发行版——Ubuntu，并介绍了一些关于 Linux 桌面使用中的坑和解决方法。尽管现在我仍**更推荐使用 MacOS**或 Windows，但既然你点开了这篇文章，那就坚定地接受 Linux 的缺点吧哈哈哈。

至于为什么我又从 Ubuntu 换成了 Fedora，纯粹是为了学习。期间除了 OpenBSD 没尝试过，基本上都试过一遍了。我也不是在虚拟机里尝试，直接就是主力机刷哈哈哈。另外，基于《[数字文具盒](https://blog.7wate.com/tags/%E6%95%B0%E5%AD%97%E6%96%87%E5%85%B7%E7%9B%92)》系列的工具打造，我现在所有的工作几乎都基于 Web 形式进行。所以即使随便折腾一下，也不会影响太多，纯粹只是花费一些时间而已。

不过还是有一些问题想分享一下。可以结合《[电脑坏了，我换了Ubuntu](https://blog.7wate.com/archives/dian-nao-huai-le--wo-huan-le-ubuntu)》作为上篇，这篇文章作为下篇，相信对于你选择 Linux 桌面会有一定的帮助和解惑。

## 关于硬件和驱动

我其实非常希望有一种专门适配 Linux 的硬件，最好像 MacOS 一样。虽然现在确实有一些，比如 [Pop!_OS](https://pop.system76.com/)，但感觉比较小众，而且需要海购。

总之，我**不建议购买新硬件来刷 Linux**，很可能会遇到各种奇奇怪怪的问题。一般来说，越老的硬件越稳定，但也不要太老旧。同时，尽量选择一些商业发行版本，提高稳定性，减少折腾。

## 关于系统更新

Ubuntu 经常弹出提示用户更新，开机就会弹出更新窗口，看来它也喜欢把用户当小白鼠，而 Fedora 则完全是手动更新。

## 关于桌面系统

至于具体的桌面环境，喜欢哪个就用哪个。但是我**强烈建议只使用 Wayland 显示服务器协议**，我在 Ubuntu 上使用的是 X11，容易出现各种奇奇怪怪的窗口问题。

> Wayland 是为了克服 X11 的缺点而设计的一个现代化的显示服务器协议。它旨在提供更简洁、更高效和更可靠的窗口管理和渲染方式，特别是在直接渲染视频内容和图形应用程序方面。

## 关于桌面软件应用

我建议使用 [Flathub](https://flathub.org/zh-Hans)，听我一句劝，别折腾乱七八糟的 Wine 了，有那时间装个 Remmina 直接远程吧，铁铁，我爱说实话。不过也可以使用 AppImage，但需要自己创建桌面图标。没有 Flathub 那么傻瓜式方便快捷～

> Flathub 是一个开源的应用程序分发平台，旨在为 Linux 操作系统提供简便的软件安装和更新方式。它基于 Flatpak 技术，Flatpak 是一种容器化的应用程序打包和分发格式，可以在不同的 Linux 发行版上运行。

## 关于游戏

我几乎不玩游戏，纵使装了 Steam 也没怎么尝试过……

## 关于 Fedora

> Linus Torvalds 代言，你值得一试。

作为主力机使用了快一年的 Linux，我认为 Linux 相较于 Windows 和 MacOS 最大的优势在于原生的 shell。基于此，我也更加理解为什么 Windows 开发了 WSL，因为其他任何地方 Linux 总会有让你不舒服的地方。

还有，不要再说 Ubuntu 是最适合新手入门的 Linux 发行版本了，尽情拥抱 Fedora，拥抱现代化。对于安装完 Fedora 后，我推荐以下几件事：

1. 更新 DNF 源：可以手动更换各大镜像源，或者使用 [LinuxMirrors](https://linuxmirrors.cn/) 一键更换，然后更新系统和应用程序软件包。
2. 基于 Flathub 安装应用：Fedora 39 默认预装了 Flatpak，搜索并安装你常用的软件吧。
3. 安装 zsh 终端：手动安装 zsh 和 oh-my-zsh，然后配置一些常用的插件。开始享受 Linux 下 Shell 带来的快感吧～
4. 简单地调整一下你的桌面环境，然后就可以开始工作了～

> 我没有提供具体的操作步骤，因为互联网上已经有很多相关文章了，就不重复造轮子了。
