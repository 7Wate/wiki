---
title: Docker 网络
description: Docker 网络
keywords:
  - Docker
  - 网络
tags:
  - Docker/高级
  - 技术/操作系统
author: 仲平
date: 2024-03-05
---

## Docker 网络

Docker 网络是容器间通信的基础，它提供了不同容器之间的网络连接和通信能力。**Docker 默认的网络是 `bridge` 网络，它是一种虚拟的以太网桥，用于连接未指定网络配置的容器。**除了 `bridge` 网络之外，Docker 还提供了其他网络驱动类型，如 `host`、`ipvlan`、`macvlan` 和 `overlay` 等，用于满足不同的网络需求。

### 特点

- **自动连接**：当启动容器时，如果没有明确指定网络，容器会自动加入到 `bridge` 网络。这种默认行为简化了容器间通信的设置。
- **隔离与通信**：`bridge` 网络允许容器之间相互通信，但默认情况下对外部网络是不可见的。要从外部访问容器内的应用，需要设置端口映射。
- **内部 DNS 解析**：Docker 为 `bridge` 网络提供了内部 DNS 解析，容器可以使用其他容器的名字进行相互通信，而不是依赖于 IP 地址，提高了配置的灵活性和容器间互联的便利性。

### 命令

以下是一些常用的 Docker 网络命令：

- `docker network ls`：列出所有当前的 Docker 网络。
- `docker network create [OPTIONS] NETWORK`：创建一个新的 Docker 网络。可以使用 `--driver bridge` 来指定网络驱动。
- `docker network rm NETWORK`：删除一个或多个 Docker 网络。
- `docker network inspect NETWORK`：显示一个或多个 Docker 网络的详细信息。
- `docker network connect NETWORK CONTAINER`：将一个容器连接到一个网络。对于已经运行的容器添加网络连接特别有用。
- `docker network disconnect NETWORK CONTAINER`：将一个容器从一个网络断开。
- `docker run --network NETWORK`：在创建容器时，指定容器连接的网络。如果不指定，容器将连接到默认的 `bridge` 网络。
- `docker run -p HOST_PORT:CONTAINER_PORT`：在运行容器时创建端口映射，将宿主机的端口映射到容器的端口，允许从外部访问容器的服务。

### 管理

Docker 网络的管理涉及以下几个方面：

#### 步骤 1: 创建自定义网络

首先，我们可以创建一个自定义的网络，以实现更好的网络隔离和通信管理。

```shell
docker network create --driver bridge my-custom-network
```

这个命令创建了一个名为 `my-custom-network` 的新网络，使用的是 `bridge` 驱动。

#### 步骤 2: 在自定义网络中启动容器

现在，我们可以在这个新创建的网络中启动容器了。例如，我们可以运行一个简单的 web 应用容器：

```shell
docker run -d --name my-web-app --network my-custom-network -p 8080:80 nginx
```

这个命令做了几件事情：

- `-d`：以 detached 模式运行容器，即在后台运行。
- `--name my-web-app`：给容器指定一个名称，这里是 `my-web-app`。
- `--network my-custom-network`：指定容器加入 `my-custom-network` 网络。
- `-p 8080:80`：将容器内部使用的端口 80 映射到宿主机的端口 8080 上。这意味着，你可以通过访问宿主机的 8080 端口来访问容器内部运行的 Nginx 服务。

#### 步骤 3: 验证网络和端口映射

在容器启动后，你可以使用以下命令来检查网络设置和端口映射是否按预期工作：

```shell
docker container inspect my-web-app
```

这个命令会输出很多信息，包括容器的网络配置。你可以查找到 `Networks` 部分，确保容器已经加入到 `my-custom-network` 网络。同时，查看 `Ports` 部分，确认端口映射设置正确。

#### 步骤 4: 访问你的 Web 应用

既然我们已经将容器的 80 端口映射到了宿主机的 8080 端口，你可以通过浏览器访问 `http://<宿主机IP>:8080` 来查看 Nginx 的欢迎页面。这表明你的容器已经成功运行，并且端口映射工作正常。

## 网络类型

Docker 提供了多种网络类型，可以根据需求选择合适的网络驱动和配置。下面是一个关于 Docker 网络驱动的表格整理：

| 网络驱动 | 介绍                           | 优点                                                         | 缺点                                       | 配置方式                                                    | 适用场景                                     |
| -------- | ------------------------------ | ------------------------------------------------------------ | ------------------------------------------ | ----------------------------------------------------------- | -------------------------------------------- |
| Bridge   | 默认网络驱动，创建桥接网络     | 简单易用，容器之间可以互相通信                               | 容器与宿主机之间的网络性能有一定损耗       | `docker network create --driver bridge my-bridge-network`   | 多个容器需要在同一网络中进行通信             |
| Host     | 容器直接使用宿主机网络栈       | 最大化网络性能，容器与宿主机共享网络资源                     | 容器与宿主机之间的网络隔离性较弱           | 在运行容器时使用 `--network host` 参数                      | 需要容器与宿主机共享网络资源的场景           |
| IPvlan   | 容器直接使用宿主机物理网络接口 | 容器与外部网络直接通信，性能较好                             | 需要满足宿主机网络接口的限制，配置较为复杂 | `docker network create --driver ipvlan my-ipvlan-network`   | 需要容器具有独立的 IP 地址的场景             |
| Macvlan  | 容器直接使用宿主机物理网络接口 | 容器与外部网络直接通信，性能较好                             | 需要满足宿主机网络接口的限制，配置较为复杂 | `docker network create --driver macvlan my-macvlan-network` | 需要容器具有独立的 MAC 和 IP 地址的场景      |
| Overlay  | 多主机网络，用于跨主机容器通信 | 容器可以在多个主机之间进行通信，支持跨主机容器编排和服务发现 | 需要配置额外的网络管理工具和服务           | 使用 Docker Swarm 模式创建 Overlay 网络                     | 多主机环境下需要容器之间进行通信的场景       |
| None     | 容器不连接到任何网络           | 提供完全的网络隔离，适用于一些特殊的使用场景                 | 容器无法与其他容器或外部网络进行通信       | 在运行容器时使用 `--network none` 参数                      | 需要在容器中运行一些网络隔离的工具或测试环境 |

### 桥接网络（Bridge Network）

桥接网络是 Docker 默认网络的一种模式，它允许容器通过一个虚拟网桥接口连接到宿主机的物理网络。这种网络模式下，Docker 会为每个容器分配一个唯一的 IP 地址，并使用 NAT（网络地址转换）技术将容器内部的 IP 地址映射到宿主机的 IP 地址上，从而实现容器与外部网络的通信。

要创建一个桥接网络，可以使用以下命令：

```shell
docker network create my-bridge-network
```

### 主机网络（Host Network）

主机网络模式允许容器直接使用宿主机的网络栈，与宿主机共享网络命名空间。这意味着容器将使用宿主机的 IP 地址和端口，与宿主机一样具有与外部网络通信的能力。这种模式适用于需要容器与宿主机共享网络资源的场景，但也带来了安全性和隔离性的考虑。

要在容器中使用主机网络模式，可以在运行容器时使用 `--network host` 参数：

```shell
docker run --network host my-container
```

当涉及到 Docker 网络连接时，除了桥接网络、主机网络和 None 网络之外，还有两种重要的网络连接方式：ipvlan 和 macvlan。这两种连接方式可以提供更高级的网络功能和更好的性能。下面我们将深入了解这两种网络连接方式的概念、用法和适用场景。

### IPvlan Network

IPvlan 是一种网络连接方式，允许容器直接使用宿主机的网络接口，并为每个容器分配独立的 MAC 和 IP 地址。与桥接网络不同，IPvlan 不需要进行 NAT 转换，从而提供了更好的性能和更低的延迟。

在 IPvlan 中，有两种模式可供选择：

- L2 模式（Layer 2 mode）：容器可以直接使用宿主机的网络接口，每个容器分配一个独立的 MAC 地址。这种模式适用于需要容器与外部网络直接通信的场景，如虚拟机迁移和容器之间的高性能通信。
- L3 模式（Layer 3 mode）：容器使用宿主机的网络接口，并为每个容器分配一个独立的 IP 地址。这种模式适用于需要容器与外部网络进行通信，但不需要直接与其他容器通信的场景。

#### 使用 IPvlan 连接容器

要在 Docker 中使用 IPvlan 连接容器，需要满足以下要求：

- 宿主机的内核版本必须支持 IPvlan。
- 宿主机的网络接口必须支持多播（multicast）。

以下是使用 IPvlan 连接容器的示例命令：

```shell
docker network create -d ipvlan --subnet=192.168.0.0/24 --gateway=192.168.0.1 -o parent=eth0 my-ipvlan-network

docker run --network=my-ipvlan-network --ip=192.168.0.2 my-container
```

在上面的示例中，我们创建了一个名为 `my-ipvlan-network` 的 IPvlan 网络，并将容器连接到该网络。容器被分配了一个 IP 地址（192.168.0.2），并使用了宿主机的 `eth0` 接口。

### Macvlan Network

Macvlan 是另一种网络连接方式，允许容器直接使用宿主机的网络接口，并为每个容器分配独立的 MAC 地址。与 IPvlan 类似，Macvlan 也提供了更好的性能和更低的延迟。

在 Macvlan 中，有三种模式可供选择：

- 桥接模式（Bridge mode）：容器使用宿主机的网络接口，并分配一个独立的 MAC 地址。这种模式适用于需要容器与外部网络直接通信的场景。
- VEPA 模式（Virtual Ethernet Port Aggregator mode）：容器使用宿主机的网络接口，并分配一个独立的 MAC 地址。这种模式适用于需要容器与外部网络通信，并且需要在物理网络上进行流量分析的场景。
- Private 模式：容器使用宿主机的网络接口，并分配一个独立的 MAC 地址。这种模式适用于需要容器与外部网络通信，但不需要与其他容器直接通信的场景。

#### 使用 Macvlan 连接容器

要在 Docker 中使用 Macvlan 连接容器，需要满足以下要求：

- 宿主机的内核版本必须支持 Macvlan。
- 宿主机的网络接口必须支持 promiscuous 模式。

以下是使用 Macvlan 连接容器的示例命令：

```shell
docker network create -d macvlan --subnet=192.168.0.0/24 --gateway=192.168.0.1 -o parent=eth0 my-macvlan-network

docker run --network=my-macvlan-network --ip=192.168.0.2 my-container
```

在上面的示例中，我们创建了一个名为 `my-macvlan-network` 的 Macvlan 网络，并将容器连接到该网络。容器被分配了一个 IP 地址（192.168.0.2），并使用了宿主机的 `eth0` 接口。

### None 网络

None 网络模式是一种特殊的网络模式，它表示容器不连接到任何网络。在这种模式下，容器只能与它自己隔离，并且无法与其他容器或外部网络进行通信。这种模式适用于一些特殊的使用场景，例如需要在容器中运行一些网络隔离的工具或测试环境。

要在容器中使用 None 网络模式，可以在运行容器时使用 `--network none` 参数：

```shell
docker run --network none my-container
```

## 自定义网络

Docker 允许用户创建自定义网络，以满足特定的网络需求。自定义网络可以提供更好的隔离性、灵活性和可管理性。

### 1. 创建自定义网络

首先，**确定你需要的网络类型**。Docker 支持多种网络类型（例如，`bridge`、`overlay`、`macvlan`），但对于大多数单宿主场景，`bridge` 类型是最常用的。

可以使用以下命令创建具有自定义子网和网关的 `bridge` 类型网络：

```shell
docker network create --driver bridge --subnet=192.168.1.0/24 --gateway=192.168.1.1 my-custom-network
```

| 选项            | 描述                                                         |
| --------------- | ------------------------------------------------------------ |
| `--driver`      | 指定网络的驱动类型。常用的驱动有 `bridge`、`overlay`、`macvlan` 等。 |
| `--subnet`      | 定义网络的 IP 地址范围。例如，`--subnet=192.168.1.0/24` 指定了一个包含 256 个可能 IP 地址的网络。 |
| `--ip-range`    | 指定允许分配给容器的 IP 地址范围。它必须在 `--subnet` 指定的范围内。 |
| `--gateway`     | 定义网络的网关地址。容器将使用这个地址作为出口网关。         |
| `--aux-address` | 为网络上的特定用途保留 IP 地址。例如，可以为网络服务保留地址。 |
| `--ipam-driver` | 指定 IP 地址管理（IPAM）驱动，默认是 `default`。             |
| `--ipam-opt`    | 传递给 IPAM 驱动的选项。                                     |
| `--opt` 或 `-o` | 设置驱动特定的选项和参数。例如，`-o com.docker.network.bridge.name=docker1` 可以设置桥接网络的名称。 |
| `--label`       | 为网络添加元数据标签。                                       |

### 2. 指定容器的网络设置

在你的自定义网络中启动容器时，可以使用 `--ip` 选项为容器指定一个固定的 IP 地址：

```shell
docker run -d --name my-container --network my-custom-network --ip=192.168.1.5 nginx
```

确保指定的 IP 地址在 `--subnet` 指定的范围内。

如果需要，可以在启动容器时通过 `--dns` 选项指定一个或多个 DNS 服务器：

```shell
docker run -d --name my-container --network my-custom-network --dns=8.8.8.8 nginx
```

| 选项           | 描述                                                      |
| -------------- | --------------------------------------------------------- |
| `--dns`        | 设置容器使用的 DNS 服务器的 IP 地址。                     |
| `--dns-search` | 设置容器 DNS 搜索域名，用于解析未完全限定的域名（FQDN）。 |
| `--dns-option` | 设置容器 DNS 解析器的内部选项。                           |

### 3. 管理和验证网络配置

创建网络和容器后，可以使用以下命令查看网络的详细信息，验证配置是否正确：

```shell
docker network inspect my-custom-network
```

这将显示网络的配置详情，包括分配给网络中容器的 IP 地址。

为了测试容器间的网络通信，可以在两个或更多容器之间进行 ping 测试，确保它们能够相互通信。

## Docker Swarm 模式下的网络

Docker Swarm 是 Docker 的集群管理和编排工具，用于在多个 Docker 守护进程上运行和管理容器。在 Docker Swarm 模式下，网络的管理和配置与单个 Docker 守护进程的方式有所不同。Docker Swarm 提供了一种名为 Overlay 网络的特殊网络类型，用于实现跨主机容器的通信。

### Overlay 网络

Overlay 网络是一种多主机网络，它允许在 Docker Swarm 集群中的多个节点上创建和管理网络。Overlay 网络使用 VXLAN（Virtual Extensible LAN）技术来实现容器之间的通信，提供了跨主机的网络隔离和连接。

要创建一个 Overlay 网络，需要先初始化一个 Docker Swarm 集群，然后使用以下命令创建网络：

```shell
docker network create --driver overlay my-overlay-network
```

这将创建一个名为 `my-overlay-network` 的 Overlay 网络。

### 在 Overlay 网络中启动服务

在 Overlay 网络中启动服务与在普通网络中启动服务类似，只需将服务加入到 Overlay 网络即可。以下是一个示例命令：

```shell
docker service create --name my-service --network my-overlay-network nginx
```

这将在 Swarm 集群中启动一个名为 `my-service` 的服务，并将其加入到 `my-overlay-network` 网络中。服务将在 Swarm 集群中的多个节点上运行，并通过 Overlay 网络进行通信。

### 跨主机通信

在 Overlay 网络中，容器可以跨主机进行通信，无需显式配置。Docker Swarm 使用内置的路由和负载均衡机制来处理跨主机通信。

例如，如果在 Swarm 集群中有两个节点，分别是 Node1 和 Swarm 节点上的网络管理有一些特殊考虑。

### Overlay 网络

Overlay 网络是 Docker Swarm 模式下的一种网络类型，它允许在多个 Swarm 节点之间创建跨主机的容器网络。Overlay 网络提供了容器之间的透明通信，并支持容器的动态伸缩和服务发现。

要创建一个 Overlay 网络，可以使用以下命令：

```shell
docker network create --driver overlay my-overlay-network
```

在创建 Overlay 网络时，Docker 会自动配置网络的路由和负载均衡，使得容器可以在不同的 Swarm 节点上进行通信。

### 跨主机通信

在 Docker Swarm 模式下，容器可以在不同的 Swarm 节点上运行。为了实现跨主机的容器通信，需要使用 Overlay 网络。

以下是在 Swarm 模式下实现跨主机通信的一般步骤：

1. 创建一个 Overlay 网络：

   ```shell
   docker network create --driver overlay my-overlay-network
   ```

2. 在 Swarm 中创建服务：

   ```shell
   docker service create --name my-service --network my-overlay-network my-image
   ```

   这将在 Swarm 中创建一个名为 `my-service` 的服务，并将其连接到 `my-overlay-network` 网络。

3. 根据需要进行扩展：

   ```shell
   docker service scale my-service=3
   ```

   这将将 `my-service` 服务的副本数扩展到 3 个。

4. 验证容器间的通信：

   ```shell
   docker exec -it <container_id> ping <container_name>
   ```

   使用上述命令在一个容器中执行 ping 命令，以验证与另一个容器的通信。

### 负载均衡

在 Docker Swarm 模式下，Overlay 网络提供了内置的负载均衡功能。当多个副本的服务容器运行在不同的 Swarm 节点上时，Docker 会自动将流量分发到这些容器上，实现负载均衡。

负载均衡是通过 Swarm 内部的 DNS 解析和代理实现的。当一个服务容器被创建时，Docker 会自动为该容器分配一个虚拟 IP 地址，并将其注册到内部 DNS 服务中。当其他容器或外部客户端访问该服务时，DNS 解析会将请求路由到可用的服务副本上。

### 操作示例

下面是一个在 Docker Swarm 模式下创建 Overlay 网络和服务的操作示例：

1. 创建一个 Overlay 网络：

   ```shell
   docker network create --driver overlay my-overlay-network
   ```

2. 构建一个包含 Web 应用的镜像：

   ```shell
   docker build -t my-web-app .
   ```

3. 将镜像推送到 Docker 镜像仓库：

   ```shell
   docker push my-web-app:latest
   ```

4. 在 Swarm 中创建一个服务：

   ```shell
   docker service create --name my-service --network my-overlay-network -p 8080:80 my-web-app
   ```

   这将在 Swarm 中创建一个名为 `my-service` 的服务，并将其连接到 `my-overlay-network` 网络。同时，将容器内部的 80 端口映射到宿主机的 8080 端口上，以便从外部访问该服务。

5. 验证服务是否正常运行：

   ```shell
   curl http://localhost:8080
   ```

   如果一切正常，你应该能够看到 Web 应用返回的内容。
