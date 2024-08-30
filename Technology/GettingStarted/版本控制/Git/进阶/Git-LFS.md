---
title: Git-LFS
description: Git-LFS 扩展
keywords:
  - Git
  - LFS
tags:
  - Git/进阶
  - 技术/入门
author: 7Wate
date: 2022-11-16
---

在 Git 仓库中，对于非文本文件，如各种多媒体文件，软件制品文件，二进制文件等等，这些文件往往体积比较大，使用 Git 直接管理会导致仓库的体积迅速膨胀，进而导致 Git 的许多操作变慢，同时也影响仓库上传到远程端。

Git LFS（[`Large File Storage`](https://github.com/git-lfs/git-lfs)） 相当于 Git 的一种插件式增强工具，简单讲，它是在 Git 仓库使用这些文件的**指针**代替实际文件，而把实际文件存储在远程端 LFS 服务器，同时在本地仓库中实时追踪这些文件的变动。

## 安装

### Linux

```shell
$ curl -s https://packagecloud.io/install/repositories/github/git-lfs/script.deb.sh | sudo bash
$ sudo apt-get install git-lfs
```

### Mac

```shell
$ /usr/bin/ruby -e "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/master/install)"
$ brew install git-lfs
```

### Windows

1. 下载安装 [windows installer](https://github.com/github/git-lfs/releases)。
2. 运行 windows installer。

## 使用

### 配置 LFS

```shell
$ git lfs install
```

### 追踪文件

```shell
# 追踪单个文件
$ git lfs track "coding.png"
# 追踪同一后缀的所有文件
$ git lfs track "*.png"
# 查看正在追踪的文件模式（patterns）
$ git lfs track
```

提交代码时需要将 **.gitattributes** 文件也提交到仓库，提交完成后，执行 `git lfs ls-files` 命令可以查看 LFS 跟踪的文件列表。

### 推送仓库

```shell
git push origin main
```

### 克隆 LFS 仓库

```shell
$ git lfs clone https://e.coding.net/coding/coding-manual.git
Cloning into 'coding-manual'
remote: Counting objects: 16,done.
remote: Compressing objects: 100% (12/12),done.
remote: Total 16 (delta 3), reused 9 (delta 1)
Receiving objects: 100% (16/16),done.
Resolving deltas: 100% (3/3),done.
Checking connectively...done.
Git LFS: (4 of 4 files) 0 B / 100 B
```

## 常用命令

```shell
$ git lfs track
# 将一个或者一类文件以 git lfs 的方式加入到版本控制中 (实质是修改 .gitattributes 文件)
$ git lfs untrack
# 将一个或者一类文件从 仓库中移除

$ git lfs status
# 类似于 git status , 显示 git lfs 方式的文件在 暂存区的状态

$ git lfs lock
# 锁定一个或者一些文件, 只允许当前的用户对这些文件进行修改, 防止在多人协作的场景下冲突(如果是仓库管理员可以带 --force 参数强制 unlock)
$ git lfs unlock
# 同上, 解锁一个或者一些文件

$ git lfs migrate
# 用来将当前已经被 git 储存库保存的文件以 git lfs 的保存 (将 git 对象转为 lfs 对象)
# 例如如果将当前远程不存在的的所有 pdf 文件清除
# git lfs migrate import --include="*.pdf"
#
# 如果是已经上传到中心服务器的内容, 则需要指定分支 (可能需要 push --force)
# git lfs migrate import --include="*.mp4" --include-ref=refs/origin/master --include-ref=refs/origin/dev --include-ref=refs/origin/test
#
# 然后使用如下命令清理 .git 目录
# git reflog expire --expire-unreachable=now --all && git gc --prune=now

$ git lfs ls-files
# 展示全部使用 git lfs 方式加入版本控制的文件

$ git lfs prune
# 删除全部旧的 Git LFS 文件

$ git lfs fetch
$ git lfs pull
$ git lfs push
$ git lfs checkout
# 正常情况下会随着 git pull/push 一起执行
# 如果在 git pull/push 的过程中断了, 导致二进制文件没有被拉取的时候, 可以使用这些命令(支持断点续传,速度不慢)
```
