---
title: PM2 工具
description: PM2是一个强大的Node.js进程管理工具，它可以帮助我们简化Node.js应用程序的管理和部署。
keywords:
  - Node
  - PM2
tags:
  - FullStack/工具
sidebar_position: 3
author: 7Wate
date: 2023-10-12
---

## 简介

[PM2](https://pm2.keymetrics.io/) 是一个**卓越的 Node.js 进程管理工具**，它可以帮助我们简化 Node.js 应用程序的管理和部署。通过 PM2，我们可以实现自动重启、负载均衡、性能监控以及日志管理等功能，大大提高应用程序的稳定性和可靠性。

## 安装

安装 PM2 非常简单，只需执行以下命令即可：

```shell
npm install -g pm2
```

这将全局安装 PM2，使其可以在命令行中直接使用。

## 管理

### 目录结构

安装 PM2 后，它会自动创建一些目录，这些目录对于管理和运行应用程序非常重要。以下是这些目录的简要介绍：

- `$HOME/.pm2`：包含所有与 PM2 相关的文件。
- `$HOME/.pm2/logs`：包含所有应用程序的日志文件。
- `$HOME/.pm2/pids`：包含所有应用程序的进程 ID 文件。
- `$HOME/.pm2/pm2.log`：PM2 的日志文件。
- `$HOME/.pm2/pm2.pid`：PM2 的进程 ID 文件。
- `$HOME/.pm2/rpc.sock`：用于远程命令的 Socket 文件。
- `$HOME/.pm2/pub.sock`：用于发布事件的 Socket 文件。
- `$HOME/.pm2/conf.js`：PM2 的配置文件。

### 常用命令

PM2 提供了许多常用的命令，用于管理和操作应用程序。以下是一些常用的命令及其说明：

- `pm2 start app.js`：启动一个应用程序。
- `pm2 restart app.js`：重启一个应用程序。
- `pm2 stop app.js`：停止一个应用程序。
- `pm2 delete app.js`：删除一个应用程序。
- `pm2 list/l/ls`：查看所有运行中的应用程序的状态和详细信息。
- `pm2 describe app.js`：查看特定应用程序的详细信息。
- `pm2 logs`：显示所有应用程序的日志。
- `pm2 monit`：启动一个终端仪表板，显示每个应用程序的 CPU 和内存使用情况。

## 使用

### 监听文件

使用 PM2，您可以轻松地监听应用程序目录中的文件变化，并在文件发生更改时自动重启应用程序。只需在启动应用程序时添加 --watch 参数即可，例如：

```shell
pm2 start app.js --watch
```

这将使 PM2 监视 app.js 文件的变化，并在文件发生更改时自动重启应用程序。

### 负载均衡

PM2 还支持负载均衡功能，可以根据需要启动多个应用程序实例。您可以使用以下命令启动多个实例：

```shell
pm2 start app.js -i <instances>
```

将 `instances` 替换为您要启动的实例数。如果将 `instances` 设置为 0 或 max，则 PM2 将根据系统的 CPU 核心数自动确定实例数。

### 配置文件

PM2 还支持使用配置文件来管理应用程序。您可以创建一个 JSON 或 YAML 格式的配置文件，并在启动应用程序时指定该配置文件。配置文件可以包含应用程序的名称、启动脚本、环境变量等信息。以下是一个示例配置文件的结构：

```json
{
  "name": "my-app",
  "script": "app.js",
  "env": {
    "NODE_ENV": "production"
  }
}
```

您可以使用以下命令启动应用程序并指定配置文件：

```shell
pm2 start my-config.json
```

将 `my-config.json` 替换为您的配置文件路径。

PM2 是一个功能强大的 Node.js 进程管理工具，它可以帮助您简化应用程序的管理和部署。

### 日志管理

PM2 默认会捕获并记录应用程序的 STDOUT 和 STDERR 输出，并将其存储在 `$HOME/.pm2/logs` 目录下。你可以使用 `pm2 logs` 命令来查看这些日志。

此外，PM2 还提供了一些高级功能，如日志切割，你可以使用 `pm2 install pm2-logrotate` 命令来安装日志切割模块，这对于日志管理非常有用。

### 性能监控

PM2 还提供了一个内置的模块系统，可以安装各种模块来增强 PM2 的功能。其中，一个非常有用的模块是 `pm2-monitoring`，它可以提供应用程序的性能监控功能。只需执行 `pm2 install pm2-monitoring` 命令，就可以启用该功能。

此外，PM2 还有一个叫做 Keymetrics 的云端平台，它提供了一整套的应用程序性能管理（APM）功能，包括实时监控、CPU/内存使用情况、HTTP 交易等。

## 结论

PM2 是一个功能强大的 Node.js 进程管理工具，它可以帮助你简化应用程序的管理和部署，提高应用程序的稳定性和可靠性。不论是在开发环境还是在生产环境，PM2 都是管理 Node.js 应用程序的理想选择。
