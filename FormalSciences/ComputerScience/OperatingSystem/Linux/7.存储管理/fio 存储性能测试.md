---
title: fio 存储性能测试
description: Fio 是一款灵活的 I/O 测试工具，用于模拟不同工作负载下存储设备的性能。它支持多种 I/O 模式、并发任务和配置选项，适用于基准测试、故障排查和存储设备选型。
keywords:
  - fio
  - 存储性能测试
  - I/O 测试
  - 模拟工作负载
  - 基准测试
tags:
  - 技术/操作系统
  - Linux/存储管理
author: 仲平
date: 2024-09-10
---

## Fio 概述

### Fio 是什么

**`fio`（Flexible I/O Tester）是一款用于生成磁盘 I/O 测试负载的工具，广泛用于存储设备的性能测试和分析。**`fio` 支持多种 I/O 模式、并发任务以及灵活的配置选项，可以模拟实际工作负载下的磁盘 I/O 行为，因此在存储系统的基准测试、故障排查、存储设备选型等场景中被广泛应用。

1. **存储设备性能测试**：`fio` 可以通过模拟不同的 I/O 模式，如顺序读写、随机读写等，来评估存储设备在各种工作负载下的性能表现。它支持在固态硬盘（SSD）、机械硬盘（HDD）、NVMe 等存储介质上进行测试，从而帮助用户了解这些设备在不同 I/O 压力下的吞吐量、延迟和 IOPS（每秒输入输出操作数）。

2. **模拟实际工作负载**：在生产环境中，存储设备通常面对复杂的混合读写请求，`fio` 可以通过配置多线程、多任务以及读写比例来模拟真实的工作负载。例如，数据库服务器的 I/O 通常以随机读为主，而备份系统则更多地依赖顺序写。`fio` 能够灵活配置任务，以精确模拟不同应用场景下的 I/O 行为。

3. **测试不同 I/O 模型的性能**：`fio` 支持多种 I/O 引擎（如 `sync`、`libaio`、`io_uring` 等），用户可以通过调整不同的 I/O 模型来测试系统的最大 I/O 能力。同步 I/O 更适合简单的 I/O 操作场景，而异步 I/O 则能在多任务或高并发负载下提供更高的性能。
4. **支持并发、多任务处理**：`fio` 提供了非常强大的并发处理能力，可以通过设置 `numjobs` 参数来控制并发的任务数量，从而模拟不同的并发场景。此外，通过调整 `iodepth` 参数，可以控制异步 I/O 请求的深度，进一步增强并发能力。
5. **丰富的可配置选项**：`fio` 提供了大量灵活的配置参数，用户可以通过自定义配置文件或命令行参数来控制测试的具体行为。可以指定块大小（`bs`）、I/O 深度（`iodepth`）、读写比例（`rwmixread`）等详细参数。此外，`fio` 还支持多种输出格式，如 JSON、CSV，以便于集成到监控系统中进行结果分析。

> fio was written by Jens Axboe [axboe@kernel.dk](mailto:axboe@kernel.dk) to enable flexible testing of the Linux I/O subsystem and schedulers. He got tired of writing specific test applications to simulate a given workload, and found that the existing I/O benchmark/test tools out there weren’t flexible enough to do what he wanted.
>
> Jens Axboe [axboe@kernel.dk](mailto:axboe@kernel.dk) 20060905

### Fio 安装方法

`fio` 支持多种操作系统，包括主流的 Linux、macOS 和 Windows 平台。在不同的操作系统上安装 `fio` 具有一些小的差异，用户可以选择合适的安装方式。目前 fio 已经集成在各大 Linux 发行版中，可以自行安装或参考 [官方手册](https://fio.readthedocs.io/en/latest/fio_doc.html#binary-packages)。

#### 支持的平台

- **Linux**：Linux 是 `fio` 最常用的平台，在各大 Linux 发行版（如 Ubuntu、CentOS、Debian 等）上，`fio` 都有对应的预编译包。
- **macOS**：`fio` 也支持在 macOS 上安装，可以通过 Homebrew 等包管理工具安装。
- **Windows**：在 Windows 环境下，`fio` 支持原生的 Windows 文件系统，并可以通过 Cygwin 或 Windows Subsystem for Linux (WSL) 运行。

### Fio 基本原理

`fio` 是一个高度灵活的工具，它的核心原理是通过模拟不同的 I/O 模式来生成实际负载，从而测试存储设备的性能。了解 `fio` 的 I/O 模型和工作负载模拟原理，能够帮助用户更好地配置测试场景。

#### I/O 模型

**在 `fio` 中，I/O 模型分为两类：同步 I/O 和异步 I/O。**

1. **同步 I/O：** 同步 I/O 模型是指每个 I/O 操作在完成之前，发起 I/O 请求的线程会被阻塞，直到 I/O 操作完成后才会继续进行后续操作。这种模型通常用于低并发场景或 I/O 请求较少的工作负载。例如，在单线程的顺序读写测试中，使用同步 I/O 可以更直接地反映存储设备的顺序访问性能。

2. **异步 I/O：** 异步 I/O 模型允许多个 I/O 请求同时进行。发起 I/O 请求后，线程不需要等待当前 I/O 操作完成，而是可以继续发起其他请求，这大大提高了并发能力。异步 I/O 更适合高并发、大量随机访问的场景，比如服务器上并发处理多个数据库查询请求时，异步 I/O 能显著提升处理效率。常用的异步 I/O 引擎包括 `libaio` 和 `io_uring`。

`fio` 支持多种 I/O 引擎，它们决定了 I/O 操作的执行方式，不同的 I/O 引擎在性能和应用场景上有很大区别。选择合适的 I/O 引擎可以帮助用户更精准地模拟特定的负载场景。

| I/O 引擎 | 特点                                                         |
| -------- | ------------------------------------------------------------ |
| sync     | 同步 I/O 引擎，所有 I/O 操作在返回前都会被阻塞，适合简单的顺序读写操作。适合对吞吐量敏感的场景。 |
| libaio   | Linux 异步 I/O 引擎，允许多个 I/O 请求并行执行，不需等待前一个操作完成。适合高并发、高性能存储设备。 |
| mmap     | 通过内存映射实现的 I/O 操作，适合对文件的大块连续读写场景。  |
| io_uring | Linux 新引入的高性能异步 I/O 模型，提供了更低的系统开销和更高的 I/O 性能。特别适用于 NVMe 等高性能存储设备。 |

### Fio 如何模拟工作负载

**`fio` 通过创建多个线程或进程来模拟多任务并发的 I/O 请求。** 每个任务可以独立配置它的 I/O 模型、读写模式、块大小等，从而能够精确地模拟出不同应用程序的 I/O 行为。例如，可以同时配置一个任务进行顺序写操作，另一个任务进行随机读操作，达到模拟数据库写操作和备份操作并行执行的效果。

### Fio Job 的基本组成

一个 `fio` 的 job（任务）是测试的核心，它通常由以下几个部分组成：

1. **任务配置**：每个任务可以独立配置 I/O 模型、读写模式等。例如，可以配置多个 job 并发运行以模拟真实环境中的多线程负载。
2. **文件配置**：文件配置指的是 `fio` 要对哪个文件或设备进行读写操作。可以是具体的文件路径，也可以是块设备，如 `/dev/sda`。
3. **进程/线程控制**：`fio` 可以通过 `numjobs` 参数创建多个并发任务，并通过 `thread` 参数决定任务是以线程还是进程的形式运行。

## Fio 基本操作

### Fio 基础命令

`fio` 支持两种方式运行：**命令行模式和配置文件模式。** 这两种方式提供了不同的灵活性和适用场景：

- **命令行模式**：在命令行中直接指定测试参数和选项。这种方式更适合简单、快速的测试场景。命令行模式提供的参数直接跟随 `fio` 命令。例如：

  ```shell
  fio --name=test --rw=randread --size=1G --bs=4k --ioengine=libaio --numjobs=4 --iodepth=64
  ```

- **配置文件模式**：将所有的测试选项写入一个配置文件，然后通过 `fio` 执行该配置文件。这种模式适合复杂的多任务、多文件的测试场景，尤其在需要复现特定的工作负载时非常有用。例如，用户可以在配置文件中定义多个任务，指定不同的读写模式、块大小和 I/O 引擎等。使用方式如下：

  ```shell
  fio mytest.fio
  ```

  配置文件的内容可以非常复杂，允许用户指定多个任务和设备。

#### **基本语法和参数介绍**

在命令行模式中，`fio` 的基本命令结构如下：

```shell
fio [全局参数] --name=任务名 [任务参数]
```

**全局参数**：影响所有任务的运行行为，如日志输出格式。

**任务参数**：每个任务可以独立配置，如 I/O 模式、块大小等。常用参数包括 `rw`、`bs`、`size`、`numjobs` 等。

#### **简单 I/O 测试实例**

通过简单的 `fio` 命令，可以执行读写操作并测试设备性能。以下是一些常见的测试场景：

```shell
# 在默认路径生成一个 1GB 的文件，并进行顺序写操作，块大小为 1MB。
fio --name=seqwrite --rw=write --size=1G --bs=1M --ioengine=sync

# 随机读操作，块大小为 4KB，使用异步 I/O 引擎并设置 I/O 深度为 64。
fio --name=randread --rw=randread --size=1G --bs=4k --ioengine=libaio --iodepth=64
```

#### **使用 `--output` 参数保存输出结果**

`fio` 支持将测试结果保存到指定的文件中，这对于长时间或复杂的测试尤为重要。可以通过 `--output` 参数将输出保存到文件：

```shell
fio --name=test --rw=randwrite --size=1G --bs=4k --output=result.txt
```

### Fio 常用参数

| 参数        | 描述                                                         | 常用选项                                           | 示例命令                                                     |
| ----------- | ------------------------------------------------------------ | -------------------------------------------------- | ------------------------------------------------------------ |
| `rw`        | 定义 I/O 操作类型，包括顺序读 (`read`)、顺序写 (`write`)、随机读 (`randread`)、随机写 (`randwrite`)、混合读写 (`randrw`)。 | `read`, `write`, `randread`, `randwrite`, `randrw` | `fio --name=test --rw=randread --size=1G --bs=4k`            |
| `bs`        | 块大小，指定每次 I/O 操作的块大小，影响 IOPS 和带宽。小块大小适合 IOPS，大块适合带宽测试。 | `4k`, `8k`, `1M`                                   | `fio --name=test --rw=write --bs=1M --size=1G`               |
| `size`      | 测试文件的大小，定义测试过程中传输的数据总量。               | `1G`, `2G`, `10G`                                  | `fio --name=test --rw=write --size=2G`                       |
| `ioengine`  | 选择不同的 I/O 引擎，如同步 (`sync`)、异步 (`libaio`)、`io_uring`。 | `sync`, `libaio`, `io_uring`                       | `fio --name=test --rw=randread --ioengine=libaio --iodepth=64` |
| `numjobs`   | 设置并发任务数，增加并发负载，模拟多线程或多进程环境下的 I/O。 | `1`, `4`, `8`, `16`                                | `fio --name=test --rw=randwrite --numjobs=4`                 |
| `iodepth`   | 控制异步 I/O 请求的队列深度，适用于 `libaio` 和 `io_uring` 等异步 I/O 模型。 | `32`, `64`, `128`                                  | `fio --name=test --rw=randread --ioengine=libaio --iodepth=64` |
| `thread`    | 控制任务以线程模式执行，适合轻量级并发场景。                 | `thread`, `process`                                | `fio --name=test --rw=randread --numjobs=4 --thread`         |
| `rwmixread` | 在混合读写测试中，控制读写比例，如 70% 读，30% 写。          | `50`, `70`, `80`                                   | `fio --name=test --rw=randrw --rwmixread=70 --size=1G --bs=4k` |
| `rate`      | 限制每秒的传输字节数，适用于带宽受限的场景。                 | `10m`, `100m`, `1g`                                | `fio --name=test --rw=randwrite --size=1G --rate=10m`        |
| `rate_iops` | 限制每秒的 I/O 操作次数（IOPS）。                            | `100`, `500`, `1000`                               | `fio --name=test --rw=randwrite --rate_iops=100`             |
| `verify`    | 数据一致性校验，确保写入数据能正确读回，常用模式如 `md5`、`crc32`。 | `md5`, `crc32`                                     | `fio --name=test --rw=randwrite --verify=md5 --size=1G`      |

### Fio 文件配置

**`fio` 文件配置为管理复杂的 I/O 测试场景提供了极大的灵活性。** 通过配置文件，用户可以定义多个并发任务，指定不同的 I/O 模式、块大小、I/O 引擎以及存储目标。每个测试任务的参数可以独立配置，适合多任务并发运行或复杂负载的测试需求。

**`fio` 配置文件使用 `.fio` 后缀，文件结构类似于 `ini` 格式，每个任务用 `[jobname]` 进行定义，后面跟随具体的参数配置。**配置文件可以包含全局设置以及单独任务的定义，适合测试复杂的场景，如多任务、多设备的并发 I/O 测试。

#### 配置文件结构示例

```ini
[global]
ioengine=libaio
size=1G
bs=4k

[readtest]
rw=randread
iodepth=32

[writetest]
rw=randwrite
iodepth=64
```

- **[global]**：全局配置部分，适用于所有任务，例如 `ioengine=libaio` 设置 I/O 引擎为异步模式，`size=1G` 设置测试文件大小为 1GB，`bs=4k` 设置块大小为 4KB。
- **[readtest]**：定义了一个随机读测试任务，`iodepth=32` 表示该任务的 I/O 队列深度为 32。
- **[writetest]**：定义了一个随机写测试任务，`iodepth=64` 表示该任务的 I/O 队列深度为 64。

#### **使用 `filename` 参数定义测试文件**

`filename` 参数用于指定测试使用的文件或块设备。可以是具体的文件路径，也可以是裸设备（如 `/dev/sda`）。这使得 `fio` 不仅可以在文件系统层面测试，还可以直接测试块设备的 I/O 性能。

```shell
fio --name=test --rw=write --size=1G --filename=/dev/sda
```

- **临时文件**：在文件系统上创建的文件用于测试，适合测试文件系统的性能。
- **裸设备**：直接在块设备上运行测试，适合测试硬盘或存储设备的底层性能，避免文件系统的缓存影响。

#### **多文件和目录的 I/O 测试**

`fio` 支持在多个文件或目录上并发运行测试任务。可以使用通配符或明确指定多个文件进行测试。

```shell
fio --name=test --rw=randread --filename=/mnt/data/testfile[1-4]
```

使用 `fio` 配置文件，可以管理复杂的测试场景。配置文件结构清晰，能够定义多个并发任务、不同的 I/O 模式以及特定的存储目标。

`fio` 配置文件使用 `.fio` 作为后缀，文件内部的结构类似于 ini 格式。每个任务通过 `[jobname]` 定义，任务的详细参数在后续逐行配置。例如：

```ini
[global]
ioengine=libaio
size=1G
bs=4k

[readtest]
rw=randread
iodepth=32

[writetest]
rw=randwrite
iodepth=64
```

该配置文件定义了两个任务 `readtest` 和 `writetest`，分别进行随机读和随机写操作。

### Fio 日志报告

`fio` 提供了方便的输出报告功能，可以将测试结果保存到日志文件中，便于后续分析、共享和归档。通过 `--output` 参数指定输出文件，可以轻松生成测试报告：

```shell
fio --name=test --rw=randread --size=1G --output=result.txt
```

#### 标准输出解析

| 术语                               | 描述                                                         | 适用场景                                                     | 单位                   |
| ---------------------------------- | ------------------------------------------------------------ | ------------------------------------------------------------ | ---------------------- |
| **IOPS**                           | 每秒输入输出操作数，用于衡量设备在单位时间内处理的 I/O 请求数量。特别适合小块随机 I/O 的性能评估。 | 高并发场景，如数据库、虚拟化系统中小块 I/O 性能的评估。      | IOPS（每秒请求数）     |
| **带宽（Bandwidth）**              | 表示单位时间内的数据传输量，评估大块顺序 I/O 性能。          | 适合大文件传输、顺序读写的场景，如流媒体、备份等需要大量连续数据传输的场景。 | MB/s 或 GB/s           |
| **延迟（Latency）**                | 每个 I/O 操作从发出到响应完成的时间。延迟越低，系统响应越快，适合高并发和实时性要求高的应用。 | 高性能存储需求场景，如数据库、交易系统、实时应用。           | 微秒（µs）或毫秒（ms） |
| **完成时间（Completion Time）**    | 表示单个测试任务完成所需的总时间。这可以用于评估整体性能表现。 | 测试持续时间较长的 I/O 操作，如备份和归档。                  | 秒（s）                |
| **CPU 使用率（CPU Utilization）**  | 指测试期间系统的 CPU 占用情况，反映 I/O 操作对 CPU 资源的消耗。 | 用于衡量存储设备和系统的 CPU 整体利用效率，特别是在高并发或高负载场景中有助于确定 CPU 资源是否成为瓶颈。 | 百分比（%）            |
| **队列深度（Queue Depth）**        | 反映测试期间并发处理的 I/O 请求数量，尤其是异步 I/O 操作中。队列深度较大时，系统可以更高效地并行处理 I/O 请求。 | 适合异步 I/O 负载测试场景，如 SSD 和 NVMe 设备的性能优化，帮助评估设备的并行处理能力。 | 无单位                 |
| **错误率（Error Rate）**           | 反映测试过程中发生的错误数量和类型，如 I/O 失败或数据验证失败。确保测试过程中的数据完整性和可靠性。 | 数据可靠性测试和故障排查场景，如验证存储设备的故障检测能力。 | 错误次数               |
| **磁盘利用率（Disk Utilization）** | 指存储设备的忙碌程度，反映设备在 I/O 操作中的占用率，通常结合 CPU 利用率来评估系统资源的综合使用情况。 | 用于评估系统和存储设备在高负载下的工作状态，判断系统瓶颈点。 | 百分比（%）            |

#### 日志输出格式

为了方便数据分析和集成监控系统，`fio` 支持将测试结果输出为标准文本、JSON 或 CSV 格式。用户可以选择最适合的格式来处理和分析测试结果。

##### JSON 格式

结构化数据输出，适合与自动化工具和监控系统集成。JSON 输出便于导入诸如 Grafana、Prometheus 等监控工具进行可视化和性能趋势分析。

```shell
fio --name=test --rw=randread --size=1G --output-format=json --output=result.json
```

##### CSV 格式

CSV 格式适合导入 Excel 或数据分析工具（如 R、Python），便于用户手动分析和生成图表。

```shell
fio --name=test --rw=write --size=1G --output-format=csv --output=result.csv
```

#### 日志间隔与精确数据记录

| 参数                    | 描述                                                         | 示例命令                                                     | 适用场景                       |
| ----------------------- | ------------------------------------------------------------ | ------------------------------------------------------------ | ------------------------------ |
| `--log_avg_msec`        | 设置时间间隔记录平均性能数据，适用于长时间压力测试，帮助用户观察性能趋势和波动。 | `fio --name=test --rw=randread --size=1G --log_avg_msec=1000 --output=result.txt` | 长时间压力测试，性能趋势观察   |
| `--log_hist_msec`       | 记录更加精确的 I/O 性能数据，适用于捕捉短时间内的 I/O 波动，帮助分析微观层面上的性能变化。 | `fio --name=test --rw=randwrite --size=1G --log_hist_msec=100 --output=result.txt` | 高精度性能监控，短时间性能分析 |
| `--write_iops_log`      | 将 IOPS 性能数据记录到日志文件中，用于观察和分析 IOPS 的变化情况，支持长期记录和监控。 | `fio --name=test --rw=randread --size=1G --write_iops_log=iops_log.txt` | IOPS 监控，长期性能观察        |
| `--write_bw_log`        | 将带宽（Bandwidth）性能数据记录到日志文件中，适合大文件传输、顺序读写的带宽监控与分析。 | `fio --name=test --rw=write --size=1G --write_bw_log=bw_log.txt` | 带宽性能监控，顺序读写分析     |
| `--write_lat_log`       | 将延迟（Latency）数据记录到日志文件中，帮助分析 I/O 操作的响应时间变化，特别适用于高实时性要求的场景，如数据库和虚拟机。 | `fio --name=test --rw=randwrite --size=1G --write_lat_log=lat_log.txt` | 延迟监控，高实时性应用分析     |
| `--write_log`           | 同时记录 IOPS、带宽和延迟数据，生成综合日志文件，适合对存储设备的整体性能进行全面监控和记录。 | `fio --name=test --rw=randrw --size=1G --write_log=performance_log.txt` | 综合性能监控，全面性能评估     |
| `--log_max_value`       | 设置日志记录的最大值，适用于限制日志文件中记录的最大性能数据点，防止异常值导致日志分析数据失真。 | `fio --name=test --rw=write --size=1G --log_max_value=10000` | 限制日志数据范围，去除异常数据 |
| `--log_offset`          | 为日志文件中的数据设置偏移值，用于对记录数据进行时间上的调整，适合对多次测试进行对比分析时使用。 | `fio --name=test --rw=randread --size=1G --log_offset=1000 --output=result.txt` | 数据对比分析，多次测试分析     |
| `--log_unix_epoch`      | 记录日志时以 Unix 时间戳（秒级或毫秒级）为基础，适用于将数据集成到其他系统中进行时序分析或对接监控工具。 | `fio --name=test --rw=randwrite --size=1G --log_unix_epoch=1 --output=result.txt` | 时间序列分析，监控系统集成     |
| `--write_log_units`     | 设置日志文件中记录的数据单位，如 IOPS 的单位可以是 `iops`，带宽可以是 `mbps`，延迟可以是 `ms`。 | `fio --name=test --rw=randread --size=1G --write_log_units=iops,mbps,ms --write_log=unit_log.txt` | 自定义单位日志记录             |
| `--log_avg_msec`        | 设置记录平均性能数据的时间间隔，用于长时间性能监控。         | `fio --name=test --rw=randwrite --size=1G --log_avg_msec=2000 --output=result.txt` | 长时间压力测试，平均性能分析   |
| `--log_hist_coarseness` | 设置记录直方图数据的粒度，适用于需要捕捉细微性能变化的场景。 | `fio --name=test --rw=randread --size=1G --log_hist_coarseness=10 --output=hist_log.txt` | 性能微观分析，细粒度数据监控   |

## Fio 实际应用案例

`fio` 是一个高度灵活的存储性能测试工具，广泛应用于不同场景下的 I/O 性能测试。无论是在评估 SSD 和 HDD 性能、分布式存储和网络 I/O 测试，还是模拟数据库负载，`fio` 都能够提供精准的 I/O 负载模拟和详细的性能指标。此外，`fio` 在企业级存储基准测试和大规模存储性能测试中也是必不可少的工具。

### 在 SSD/HDD 上的测试

SSD 和 HDD 是两类性能差异较大的存储介质。**SSD 具有更高的随机读写性能和更低的延迟，而 HDD 则更适合大规模顺序读写操作。** 通过 `fio`，可以精确测试这两种设备在不同工作负载下的表现，并对其性能差异进行对比。

#### SSD 的读写性能测试

SSD 通常在随机读写操作中表现突出，尤其是 NVMe SSD 通过支持高并发和低延迟的 I/O 操作，能显著提升系统性能。使用 `fio` 测试 SSD 的随机读写性能，可以评估其在高负载场景下的表现。

```
# 测试 NVMe SSD 的随机读写性能，其中 70% 是随机读，30% 是随机写，块大小为 4KB，I/O 深度为 64。
fio --name=ssd-test --rw=randrw --rwmixread=70 --bs=4k --size=10G --iodepth=64 --numjobs=4 --filename=/dev/nvme0n1
```

#### 机械硬盘的顺序读写和随机读写性能测试

机械硬盘（HDD）在顺序读写操作中表现较好，但在随机读写下性能表现较差。`fio` 可以帮助分析 HDD 的顺序和随机 I/O 性能，评估其适用于哪些应用场景。

```shell
# 测试顺序写性能，块大小为 1MB，适合测试 HDD 的带宽和吞吐量。
fio --name=hdd-test --rw=write --bs=1M --size=10G --iodepth=32 --filename=/dev/sda

# 测试 HDD 的随机读性能，适合评估 HDD 在随机访问应用场景中的表现。
fio --name=hdd-test --rw=randread --bs=4k --size=10G --iodepth=32 --filename=/dev/sda
```

### **分布式存储和网络 I/O 测试**

在现代数据中心，分布式存储和网络文件系统被广泛使用，如 Ceph、GlusterFS、NFS 等。`fio` 支持 client/server 模式，可以用于分布式 I/O 测试，评估系统在网络存储环境中的性能表现。

#### 使用 client/server 模式进行分布式 I/O 测试

`fio` 的 client/server 模式允许在不同的主机之间进行 I/O 测试，这使得其非常适合分布式存储环境的性能评估。通过在不同节点之间传输数据，可以测试网络延迟、带宽以及多节点间的 I/O 协作能力。

```shell
# 1.服务器端启动并等待客户端连接。
fio --server

# 2.客户端启动测试，客户端连接到远程 `fio` 服务器进行随机写测试。
fio --client=server_ip --name=test --rw=randwrite --size=10G --bs=4k
```

#### 网络文件系统（NFS）、分布式存储（Ceph）的测试

对于分布式文件系统（如 NFS 或 Ceph），可以使用 `fio` 测试其性能，模拟多个客户端同时访问共享存储的场景。

```shell
# 在挂载的 NFS 目录中执行随机写测试，用于评估 NFS 在并发访问下的性能表现。
fio --name=nfs-test --rw=randwrite --size=10G --bs=4k --directory=/mnt/nfs

# 在 Ceph 文件系统中执行多任务随机读测试，评估其在高并发情况下的读写能力。
fio --name=ceph-test --rw=randread --size=10G --bs=4k --numjobs=8 --filename=/mnt/ceph
```

### **模拟数据库负载**

数据库应用的 I/O 负载通常表现为高并发、小块的随机读写操作。通过 `fio`，可以模拟数据库的典型 I/O 模型，测试存储设备在类似数据库工作负载下的性能。

数据库负载往往以 4KB 的小块随机读写为主，`fio` 可以通过设置 `bs=4k` 和高并发来精确模拟这种工作负载。

```shell
# 模拟 70% 随机读和 30% 随机写的混合操作，块大小为 4KB，16 个并发任务和较高的 I/O 深度，能够逼真地模拟数据库环境中的高负载。
fio --name=db-test --rw=randrw --rwmixread=70 --bs=4k --size=10G --numjobs=16 --iodepth=64
```

为了进一步优化数据库工作负载的性能，通常需要对块大小和 I/O 深度进行调整：

- **块大小**：数据库通常使用较小的块大小（如 4KB），以优化随机读写性能。较大的块大小适合顺序操作或批量数据处理，但对数据库负载可能不利。
- **I/O 深度**：增加 I/O 深度（`iodepth`）可以提高系统的并发处理能力，尤其是对于 NVMe SSD 等高性能存储设备，合适的 `iodepth` 可以极大提升系统 IOPS。

### **企业级应用场景**

在企业环境中，`fio` 被广泛用于存储设备的基准测试、压力测试和性能验证。通过 `fio` 的灵活配置，用户可以评估存储系统在不同负载下的表现，并预测系统在实际生产环境中的稳定性和响应能力。

#### **使用 Fio 进行存储设备的基准测试和验证**

基准测试是存储设备选型和性能优化的重要手段。`fio` 能够模拟各种典型的应用场景，帮助企业对比不同存储设备的性能表现。

```shell
#　对设备进行顺序读基准测试，块大小为 1MB，适合评估设备的最大带宽。
fio --name=baseline --rw=read --bs=1M --size=10G --iodepth=32 --filename=/dev/sda
```

#### **大规模存储设备的 I/O 性能测试与压力测试**

在大规模存储系统（如 SAN、NAS）中，压力测试用于评估系统在长时间高负载条件下的性能稳定性。通过增加并发任务和 I/O 负载，`fio` 能够模拟生产环境中极端的使用场景，帮助企业发现存储系统的性能瓶颈。

```shell
# 在 24 小时内对存储设备进行随机读写压力测试，64 个并发任务和较高的 I/O 深度能够逼真模拟企业生产环境下的高负载工作场景。
fio --name=stress --rw=randrw --bs=4k --size=100G --numjobs=64 --iodepth=128 --runtime=24h --time_based
```

## Fio 性能优化与故障排查

### 性能调优技巧

#### **使用 `numjobs` 增加并发性**

`numjobs` 参数是 `fio` 中控制并发性的重要工具。它用于定义并行执行的任务数量，适合模拟多线程或多任务环境下的 I/O 负载。例如，在测试数据库或虚拟化环境中，可以通过增加并发任务数量来模拟实际应用中高负载下的存储访问行为。

- **调优场景**：

  - 如果存储设备支持并发 I/O，那么通过增加 `numjobs` 可以有效提升设备的吞吐量和 IOPS，尤其是在 NVMe SSD 等高性能存储设备上。

- **示例**：

  ```shell
  fio --name=test --rw=randread --size=1G --bs=4k --numjobs=8
  ```

  在该命令中，`numjobs=8` 表示将启动 8 个并发任务进行随机读操作。较高的并发性适合测试系统在高负载条件下的 I/O 性能。

#### **调整 `iodepth` 优化异步性能**

`iodepth` 参数定义了在异步 I/O 模式下（如 `libaio` 或 `io_uring`），队列中允许同时存在的最大 I/O 请求数。更高的 `iodepth` 值可以提升并发能力，但如果系统资源有限，过高的 `iodepth` 可能会导致队列过长，增加延迟。通过合理调整 `iodepth`，可以找到设备的最佳异步性能点。

- **调优场景**：

  - 在高性能 SSD 或 NVMe 设备上，较大的 `iodepth` 可以提高设备的 IOPS 和吞吐量。
  - 对于 HDD 或 SATA SSD，过高的 `iodepth` 可能会因为硬件瓶颈导致性能下降或延迟增加。

- **示例**：

  ```shell
  fio --name=test --rw=randwrite --size=1G --ioengine=libaio --iodepth=64
  ```

  该命令中，`iodepth=64` 表示同时进行 64 个异步 I/O 操作，适合高并发场景。

#### **针对 IOPS、带宽、延迟等不同目标进行针对性优化**

根据不同的测试目标，`fio` 可以通过以下参数进行针对性优化：

- **优化 IOPS**：为小块随机读写的场景调优。通过增加并发任务数（`numjobs`）和适度提高 `iodepth`，可以有效提高 IOPS。合适的块大小（`bs`）对 IOPS 影响极大，通常 4KB 是优化 IOPS 的标准选择。

  ```shell
  fio --name=io_test --rw=randread --bs=4k --size=10G --numjobs=16 --iodepth=32
  ```

- **优化带宽**：适用于大块顺序读写操作。通过增大块大小（`bs=1M` 或更大），可以提高数据传输速率，最大化设备的带宽性能。

  ```shell
  fio --name=bw_test --rw=write --bs=1M --size=10G
  ```

- **优化延迟**：适用于实时性要求较高的场景。需要控制 `iodepth` 和 `numjobs`，避免过多的并发和过深的队列，保证 I/O 请求尽快被处理。

  ```shell
  fio --name=latency_test --rw=randread --bs=4k --size=1G --iodepth=4
  ```

### Fio 常见问题与排错

在使用 `fio` 进行测试时，可能会遇到一些错误和性能问题。了解 `fio` 输出日志中的错误信息，并通过正确的调试工具和方法进行排错，是测试工作顺利进行的保障。

#### **如何分析和解决 Fio 报错**

- **常见报错**：
  - **文件系统/块设备权限问题**：执行测试时，确保 `fio` 对测试文件或设备有写入权限。可以通过 `chmod` 或 `chown` 修改文件权限。
  - **参数配置冲突**：有些参数不能同时使用，如指定 `rw=randread` 时不应再设定 `verify` 参数。解决方案是根据报错提示，调整相应的参数配置。
- **分析报错日志**： 当 `fio` 报错时，日志中会包含详细的错误信息。通过阅读 `fio` 输出的错误消息，可以准确定位到导致错误的参数或系统配置。例如，如果在测试期间设备无法响应，报错信息可能会显示 "I/O error"。
- **解决方法**：
  - 检查并确保所有的设备路径正确。
  - 检查设备的挂载状态和可写权限。
  - 根据错误日志，调整 `fio` 的配置或系统资源分配。

#### **系统资源（CPU、内存、磁盘）的使用情况监控**

`fio` 运行时对系统资源的占用情况（如 CPU 和内存）可能会影响测试结果，因此监控系统资源使用至关重要。可以使用以下工具来监控测试过程中系统的资源使用情况：

- **`top` 或 `htop`**：实时监控 CPU 和内存使用情况，识别系统瓶颈。

  ```shell
  top
  ```

- **`iostat`**：监控磁盘 I/O 性能，分析磁盘读写速率、设备利用率等。

  ```shell
  iostat -x 1
  ```

- **`vmstat`**：监控系统的虚拟内存使用情况，帮助识别内存瓶颈。

  ```shell
  vmstat 1
  ```

通过实时监控系统资源使用，可以识别由于 CPU 或内存不足导致的 I/O 性能瓶颈，并进行相应的优化调整。

#### **使用 `--debug` 参数进行深度调试**

`fio` 提供了 `--debug` 参数，用于调试运行过程中的细节。可以通过该参数输出更多调试信息，从而深入了解 `fio` 的内部运行机制，帮助排查一些难以发现的系统问题。

```shell
fio --name=test --rw=randread --size=1G --debug=all
```

此命令会生成详尽的调试信息，涵盖从 I/O 操作到系统调用的详细日志。

### 性能瓶颈分析与解决方案

`fio` 测试过程中，存储设备的性能可能受到多种硬件和软件因素的影响。分析 I/O 性能瓶颈，并结合其他系统工具进行深入排查，可以帮助用户识别并解决影响系统性能的根本问题。

#### **分析不同硬件和软件配置下的 I/O 性能瓶颈**

存储设备的 I/O 性能瓶颈可以来源于硬件或软件层：

- **硬件瓶颈**：
  - **磁盘 I/O 性能不足**：传统 HDD 在处理高并发随机 I/O 时会遇到 IOPS 限制。更换为 SSD 或 NVMe 设备通常能显著提高 IOPS 性能。
  - **网络带宽受限**：在分布式存储系统中，网络带宽可能成为瓶颈。通过增加网络带宽或使用更高性能的网络接口卡（如 10GbE、25GbE）可以缓解这种瓶颈。
- **软件瓶颈**：
  - **I/O 队列设置不当**：在高并发负载下，如果 I/O 队列深度设置过小，可能会导致设备性能无法充分发挥；如果设置过大，可能会增加延迟，导致系统响应速度变慢。
  - **文件系统的选择**：不同文件系统（如 ext4、XFS）的性能差异可能影响测试结果。针对特定应用场景，选择合适的文件系统对提高 I/O 性能至关重要。

#### **使用 Fio 结合其他系统工具（如 `iostat`、`sar`）进行性能分析**

`fio` 可以与其他性能监控工具结合使用，帮助全面分析系统的 I/O 性能瓶颈：

- **`iostat`**：`iostat` 提供了磁盘 I/O 的详细信息，包括每个设备的读写速率、平均等待时间、设备利用率等。通过与 `fio` 结合使用，可以监控不同测试条件下磁盘的性能表现。

  ```shell
  iostat -x 1
  ```

- **`sar`**：`sar` 是一款强大的系统性能分析工具，可以监控系统的 CPU、内存、I/O 性能等多种资源。通过收集长时间的系统数据，用户可以分析系统在不同时间段的性能变化情况。

  ```shell
  sar -d 1
  ```

通过这些工具，用户可以更好地了解 `fio` 测试时系统的资源使用情况，从而识别和解决性能瓶颈。
