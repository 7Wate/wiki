---
title: Shell 必备锦囊
description: Shell 必备锦囊
keywords:
  - Shell
  - 必备锦囊
tags:
  - Shell
  - 技术/入门
author: 7Wate
date: 2022-12-04
---

## Tab 补全

在 Shell 中可以使用 tab 键盘实现快速补全，双击 tab 可以显示补全列表。

``` shell
@:~$ cd 
.ansible/                  .config/                   .wget-hsts                 index.html
.bash_history              .lesshst                   ChangeMirrors.sh           index.html.1
.bash_logout               .profile                   DockerInstallation.sh      
.bashrc                    .ssh/                      aaaa/                      
.cache/                    .sudo_as_admin_successful  demo/  
```

## History 历史

history 命令可以显示执行过的命令历史。

``` shell
@:~$ history
    1  pwd
    2  ls -l
    3  ip addr
    4  apt-get update
    5  sudo apt-get update
```

## `^` 替换命令

如果输错了命令，特别是命令较长的情况下可以使用 `^` 替换错误的地方。

``` shell
@:~$ cat a。txt
cat: a。txt: No such file or directory
@:~$ ^。^.
cat a.txt
helloworld!
@:~$ 
```

## `!` 快捷符号

`!` 符号拥有很多便捷的实用方法，例如 `!!` 快速执行上条命令，特别适用于 sudo 权限的情况下。`!foo` 快速执行历史命令中 foo 开头的命令。`!$` 命令引用上调命令中的最后一位参数。

``` shell
@:~$ !!
cat a.txt
helloworld!
@:~$ !ca
cat a.txt
helloworld!
@:~$ mkdir path-a
@:~$ cd !$
cd path-a
@:~/path-a$ 
```

## 目录操作

Linux 终端执行命令的很多情况下需要经常的更换目录，cd 命令、pushd 命令、popd 命令可以快速移动目录。

 - cd：回到当前用户目录。
 - cd ~：回到当前用户目录（方便切换到其他用户目录）。
 - cd -：回到上次工作的目录。
 - pushd path：存入 path 目录到目录栈。
 - pop：移动到目录栈弹出的目录。

``` shell
@:~/demo/a$ cd ~
@:~$ cd -
/home/xxb/demo/a
@:~/demo/a$ cd
@:~$ cd -
/home/xxb/demo/a
@:~/demo/a$ pushd /home/xxb/demo/a
~/demo/a ~/demo/a
@:~/demo/a$ cd ~
@:~$ popd
~/demo/a
@:~/demo/a$ 
```

## Alias 别名

一些常用的命令可以使用 alais 定义别名，方便快速操作。移除别名使用 unalias 命令。

``` shell
@:~/demo/a$ cat aa.txt 
helloworld!
@:~/demo/a$ alias abc='cat aa.txt'
@:~/demo/a$ abc
helloworld!
@:~/demo/a$ 
```

## 命令替换

Shell 内可以使用反引号和 $() 命令执行命令。

```shell
@:~/demo/a$ pushd `pwd`
~/demo/a ~/demo/a
@:~/demo/a$ pushd $(pwd)
~/demo/a ~/demo/a ~/demo/a
@:~/demo/a$ 
```
