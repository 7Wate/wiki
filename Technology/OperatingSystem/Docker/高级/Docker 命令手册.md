---
title: Docker 命令手册
description: Docker 命令手册
keywords:
  - Docker
  - 命令手册
tags:
  - Docker/高级
  - 技术/操作系统
author: 仲平
date: 2024-03-06
---

以下是根据你提供的内容，补充完善后的 Docker 命令手册：

## 容器生命周期管理

- `docker run [OPTIONS] IMAGE [COMMAND] [ARG...]`：创建一个新容器并运行一个命令。

- `docker start CONTAINER`：启动一个或多个已经停止的容器。

- `docker stop CONTAINER`：停止一个或多个正在运行的容器。

- `docker restart CONTAINER`：重启一个或多个容器。

- `docker kill CONTAINER`：强制停止一个或多个正在运行的容器。

- `docker rm CONTAINER`：删除一个或多个容器。

- `docker pause CONTAINER`：暂停一个或多个容器的所有进程。

- `docker unpause CONTAINER`：恢复一个或多个容器的所有进程。

- `docker create [OPTIONS] IMAGE [COMMAND] [ARG...]`：创建一个新的容器但不启动它。

- `docker exec [OPTIONS] CONTAINER COMMAND [ARG...]`：在运行的容器中执行一个命令。

## 容器操作

- `docker ps [OPTIONS]`：列出容器。

- `docker inspect [OPTIONS] TARGET`：返回 Docker 对象的底层信息。

- `docker top CONTAINER [ps OPTIONS]`：显示容器的运行进程。

- `docker attach CONTAINER`：连接到正在运行的容器。

- `docker events [OPTIONS]`：从服务器获取实时事件。

- `docker logs [OPTIONS] CONTAINER`：获取容器的日志。

- `docker wait CONTAINER`：阻塞到容器停止，然后打印退出代码。

- `docker export CONTAINER`：将文件系统作为一个 tar 归档文件导出到 STDOUT。

- `docker port CONTAINER [PRIVATE_PORT[/PROTO]]`：列出容器的端口映射，或打印指定端口的映射。

- `docker stats [OPTIONS] [CONTAINER...]`：实时显示容器的资源使用统计信息。

## 容器 Rootfs 命令

- `docker commit [OPTIONS] CONTAINER [REPOSITORY[:TAG]]`：从容器创建一个新的镜像。

- `docker cp [OPTIONS] CONTAINER:SRC_PATH DEST_PATH|-`：在本地文件系统和容器之间复制文件/文件夹。

- `docker diff CONTAINER`：检查在容器文件系统上所做的更改。

## 镜像仓库

- `docker login [OPTIONS] [SERVER]`：登录 Docker 的镜像仓库。

- `docker pull [OPTIONS] NAME[:TAG|@DIGEST]`：从镜像仓库中拉取镜像。

- `docker push [OPTIONS] NAME[:TAG]`：将镜像或仓库推送到镜像仓库。

- `docker search [OPTIONS] TERM`：在 Docker Hub 中搜索镜像。

## 本地镜像管理

- `docker images [OPTIONS] [REPOSITORY[:TAG]]`：列出镜像。

- `docker rmi [OPTIONS] IMAGE [IMAGE...]`：删除一个或多个镜像。

- `docker tag SOURCE_IMAGE[:TAG] TARGET_IMAGE[:TAG]`：为源镜像创建一个新的别名标签。

- `docker build [OPTIONS] PATH | URL | -`：从 Dockerfile 构建一个新的镜像。

- `docker history [OPTIONS] IMAGE`：显示镜像的历史。

- `docker save [OPTIONS] IMAGE [IMAGE...]`：将一个或多个镜像保存为 tar 归档文件。

- `docker load [OPTIONS]`：从 tar 归档文件加载一个或多个镜像。

- `docker import [OPTIONS] file|URL|- [REPOSITORY[:TAG]]`：从 tarball 导入内容以创建一个文件系统镜像。

## 系统信息

- `docker info [OPTIONS]`：显示系统级信息。

- `docker version [OPTIONS]`：显示 Docker 版本信息。
