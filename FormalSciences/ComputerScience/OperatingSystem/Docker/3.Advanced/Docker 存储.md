---
title: Docker 存储
description: Docker 存储
keywords:
  - Docker
  - 存储
tags:
  - Docker/高级
  - 技术/操作系统
author: 仲平
date: 2024-03-05
---

Docker 提供了三种主要的数据存储机制：数据卷、目录绑定和临时数据。这些机制可以根据不同的需求和场景来实现数据的持久化存储和共享。

## 数据卷

数据卷是一种用于持久化存储容器数据的机制。它可以将主机上的目录或文件挂载到容器中，从而实现数据在容器和主机之间的共享和持久化。数据卷的主要优势是容器与数据的解耦，使得容器可以在不同的主机上迁移和共享数据。

数据卷的主要特点包括：

- 数据卷是独立于容器的实体。即使容器被删除，数据卷仍然存在。
- 数据卷可以被多个容器共享。这意味着多个容器可以访问和修改同一个数据卷中的数据。
- 数据卷可以在容器之间进行传递。例如，可以将一个数据卷从一个容器挂载到另一个容器中，从而实现数据的共享和传递。
- 数据卷可以在容器运行时进行挂载和卸载。这意味着可以在容器运行时动态地修改数据卷的挂载点。

使用数据卷的步骤如下：

1. 创建一个数据卷：

   ```shell
   docker volume create my-volume
   ```

   这将创建一个名为 `my-volume` 的数据卷。

2. 将数据卷挂载到容器中：

   ```shell
   docker run -v my-volume:/path/in/container my-image
   ```

   这将把名为 `my-volume` 的数据卷挂载到容器中的 `/path/in/container` 目录。

3. 可以在多个容器中使用相同的数据卷：

   ```shell
   docker run -v my-volume:/path/in/container another-image
   ```

   这将把同一个名为 `my-volume` 的数据卷挂载到另一个容器中。

数据卷的生命周期管理包括创建、使用和删除。可以使用以下命令和操作来管理数据卷：

- 创建一个数据卷：

  ```shell
  docker volume create my-volume
  ```

  这将创建一个名为 `my-volume` 的数据卷。

- 将数据卷挂载到容器中：

  ```shell
  docker run -v my-volume:/path/in/container my-image
  ```

  这将把名为 `my-volume` 的数据卷挂载到容器中的 `/path/in/container` 目录。

- 查看数据卷的详细信息：

  ```shell
  docker volume inspect my-volume
  ```

  这将显示关于数据卷的详细信息，包括挂载点、创建时间等。

- 删除一个数据卷：

  ```shell
  docker volume rm my-volume
  ```

  这将删除名为 `my-volume` 的数据卷。请注意，只有在没有容器使用该数据卷时才能删除。

数据卷的备份和还原可以使用以下方法：

- 备份数据卷：

  ```shell
  docker run --rm -v my-volume:/data -v $(pwd):/backup busybox tar cvf /backup/my-volume.tar /data
  ```

  这将创建一个名为 `my-volume.tar` 的备份文件，其中包含了 `my-volume` 数据卷中的所有数据。

- 还原数据卷：

  ```shell
  docker run --rm -v my-volume:/data -v $(pwd):/backup busybox tar xvf /backup/my-volume.tar -C /
  ```

  这将从备份文件 `my-volume.tar` 中还原数据到 `my-volume` 数据卷中。

## 目录绑定

目录绑定是将主机上的目录直接映射到容器中的一种机制。通过目录绑定，容器可以直接访问和修改主机上的文件和目录。

目录绑定的主要特点包括：

- 目录绑定是容器和主机之间的直接映射关系。容器中的操作会直接影响主机上的文件和目录。
- 目录绑定是一种静态的映射关系。一旦映射建立，容器运行期间无法修改映射关系。
- 目录绑定是一对一的关系。每个容器只能与一个主机目录进行映射。
- 目录绑定可以在容器创建时进行设置，也可以在容器运行时进行修改。但无论何时修改映射关系，都需要重新启动容器。

使用目录绑定的步骤如下：

1. 将主机上的目录映射到容器中：

   ```shell
   docker run -v /path/on/host:/path/in/container my-image
   ```

   这将把主机上的 `/path/on/host` 目录映射到容器中的 `/path/in/container` 目录。

2. 容器中对映射的目录进行操作，将直接影响主机上的目录。

## 临时数据

在某些情况下，容器可能需要临时性的数据存储，这些数据不需要持久化保存。Docker 提供了几种方式来实现临时数据存储。

临时数据的存储方式包括：

- 临时文件系统（tmpfs）：可以将一个临时文件系统挂载到容器中的某个目录，用于存储临时数据。这些数据在容器停止时会被删除。

  ```shell
  docker run --rm -it --mount type=tmpfs,destination=/data my-image
  ```

- 临时性数据卷：可以创建一个临时性的数据卷，用于存储临时数据。这些数据卷在容器停止时会被删除。

  ```shell
  docker run --rm -it -v /data my-image
  ```

临时数据的清理与管理方法包括：

- 定期清理任务：可以编写一个定期运行的清理任务，删除不再需要的临时数据。
- 使用临时性数据卷：如果使用临时性数据卷存储临时数据，可以在容器停止时自动删除数据卷。

## 常用命令

| 命令                                                         | 描述                                               |
| ------------------------------------------------------------ | -------------------------------------------------- |
| `docker volume create <volume_name>`                         | 创建一个数据卷                                     |
| `docker volume ls`                                           | 列出所有数据卷                                     |
| `docker volume inspect <volume_name>`                        | 查看数据卷的详细信息                               |
| `docker volume rm <volume_name>`                             | 删除一个数据卷                                     |
| `docker run -v <volume_name>:<container_path> <image>`       | 将数据卷挂载到容器中                               |
| `docker run -v <host_path>:<container_path> <image>`         | 将主机上的目录映射到容器中                         |
| `docker run --mount type=tmpfs,destination=<container_path> <image>` | 创建一个临时文件系统挂载到容器中                   |
| `docker cp <container_id>:<container_path> <host_path>`      | 将容器中的文件或目录复制到主机上                   |
| `docker run --rm -v <volume_name>:/data -v $(pwd):/backup busybox tar cvf /backup/<backup_name>.tar /data` | 备份数据卷中的数据到主机上的备份文件中             |
| `docker run --rm -v <volume_name>:/data -v $(pwd):/backup busybox tar xvf /backup/<backup_name>.tar -C /` | 从备份文件中还原数据到数据卷中                     |
| `docker run --rm -it --mount type=tmpfs,destination=<container_path> <image>` | 创建一个临时文件系统挂载到容器中，用于存储临时数据 |
| `docker run --rm -it -v /data <image>`                       | 创建一个临时性数据卷，用于存储临时数据             |

请注意，上述命令中的 `<volume_name>`、`<container_path>`、`<host_path>`、`<backup_name>` 等参数需要根据实际情况进行替换。

## 数据卷插件

除了默认的本地数据卷驱动程序，Docker 还支持使用数据卷插件进行数据存储。数据卷插件可以提供更高级的存储功能，例如远程存储、分布式存储等。

数据卷插件分为存储驱动程序插件和第三方数据卷插件。

### 存储驱动程序插件

存储驱动程序插件是 Docker 的一种官方插件类型，用于扩展 Docker 引擎的存储功能。存储驱动程序插件可以实现不同的存储后端，例如 Amazon EBS、GlusterFS、Ceph 等。

使用存储驱动程序插件时，需要先安装插件并将其配置为 Docker 引擎的默认存储驱动程序。然后，可以使用标准的 Docker 命令和操作来创建和管理存储卷。

### 第三方数据卷插件

除了官方的存储驱动程序插件，还有很多第三方数据卷插件可供选择。这些插件提供了各种不同的存储后端和功能，可以根据具体需求选择合适的插件。

使用第三方数据卷插件时，需要先安装插件并配置其相关参数。然后，可以使用插件特定的命令和操作来创建和管理存储卷。

## 数据备份与迁移

在 Docker 中，数据备份和迁移是常见的需求。下面介绍一些备份和迁移容器中数据的方法。

### 备份容器中的数据

备份容器中的数据可以使用以下方法：

- 使用 `docker cp` 命令将容器中的数据复制到主机上：

  ```shell
  docker cp <container_id>:/path/in/container /path/on/host
  ```

  这将把容器中的 `/path/in/container` 目录或文件复制到主机上的 `/path/on/host` 目录。

- 使用数据卷进行备份：如果容器使用了数据卷，可以直接备份数据卷，或者将数据卷挂载到另一个容器中进行备份。

### 迁移容器中的数据到其他环境

迁移容器中的数据到其他环境可以使用以下方法：

- 使用数据卷进行迁移：如果容器使用了数据卷，可以将数据卷挂载到另一个容器中，然后在新环境中运行该容器，从而迁移数据。

- 使用容器快照进行迁移：Docker 提供了容器快照功能，可以将容器的状态和数据保存为一个快照文件，然后在其他环境中加载该快照文件，从而迁移数据。

以上是关于 Docker 数据存储的详细介绍和示例。根据不同的需求和场景，可以选择合适的数据存储机制来管理容器中的数据。
