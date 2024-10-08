---
title: GRUB 引导程序
description: GRUB是Linux系统中广泛使用的引导加载器，支持多操作系统引导、内核参数传递、错误恢复等功能。它通过模块化设计和自动配置简化了引导过程，并能适应UEFI和传统BIOS环境。
keywords:
  - GRUB
  - 引导加载器
  - 多操作系统
  - 内核参数
  - 错误恢复
tags:
  - 技术/操作系统
  - Linux/安装
author: 仲平
date: 2024-08-26
---

## 引导加载器

### 引导加载器是什么？

![Bootloader](https://static.7wate.com/2024/08/26/eb2655d71fc36.png)

**引导加载器是计算机启动过程中一个至关重要的组件。** 它的主要功能是在硬件自检（POST）完成后，从存储设备中加载并启动操作系统的内核。引导加载器充当了硬件和操作系统之间的桥梁，确保操作系统能够顺利运行。具体来说，引导加载器的职责包括以下几个方面：

- **识别和加载内核**：引导加载器从预定义的启动分区或磁盘位置找到操作系统内核，并将其加载到内存中。
- **传递启动参数**：引导加载器可以将启动参数传递给内核，以决定操作系统的启动行为。
- **多操作系统引导管理**：在多操作系统环境中，引导加载器允许用户在多个操作系统之间进行选择。
- **错误处理和恢复**：当出现启动错误时，引导加载器通常提供恢复选项，以修复引导过程中的问题。

引导加载器的发展历史可以追溯到早期的计算机系统。在早期，硬件本身提供了简单的启动机制，通常只支持启动单一操作系统。随着计算机技术的发展，引导加载器逐渐演变出更复杂的功能，以支持多操作系统和复杂的启动配置。

- **早期阶段**：最初的引导加载器非常简单，主要是在特定存储设备上找到一个可执行的程序来启动操作系统。这种简单的引导方法适用于单操作系统环境，但在现代复杂的多操作系统环境中不再适用。
- **LILO（Linux Loader）**：LILO 是 Linux 早期使用的引导加载器，支持在多操作系统之间进行简单切换。它的配置相对复杂，且不支持动态更新。
- **GRUB 的出现**：为了克服 LILO 的限制，GRUB（Grand Unified Bootloader）作为更强大的引导加载器被开发出来，支持动态更新和更复杂的启动配置。

## GRUB 历史发展

GRUB（GRand Unified Bootloader）作为一种广泛使用的引导加载器，其历史发展体现了计算机引导技术的演变。从最初的 GRUB Legacy 到现代的 GRUB 2.x，它的功能和特性经历了显著的变化和提升。

### GRUB 0.x 和 GRUB Legacy（GRUB 1.x）

GRUB 的发展始于 1999 年，最早的稳定版本 GRUB 0.97 发布。它被设计为 LILO（LInux Loader）的替代品，主要目标是提供一种灵活的引导方式，支持多操作系统和多内核引导。GRUB Legacy，或 GRUB 1.x，使用 `menu.lst` 作为其主要配置文件。用户需要手动编辑这个文件来定义启动项和内核参数。虽然配置相对简单，但其缺乏自动化和灵活性，配置更新需手动完成。

### GRUB 2.x

随着技术的发展，2010 年 GRUB 2.00 发布，引入了许多新的特性和改进，逐步取代了 GRUB Legacy。GRUB 2.x 的核心改进之一是其配置文件 `grub.cfg`，这是一个自动生成的文件，用户不再需要直接编辑。配置管理转移到 `/etc/default/grub` 和 `/etc/grub.d/` 目录中的脚本，通过 `update-grub` 命令自动生成 `grub.cfg`，从而减少了手动错误并增强了配置的灵活性。

另一个显著的改进是 GRUB 2.x 引入了模块化设计。它支持动态加载模块，根据启动需求加载或卸载不同的功能模块，如文件系统支持、网络引导、图形界面等。这一设计不仅提高了灵活性，还减少了内存占用，因为只有必要的模块会被加载。

GRUB 2.x 还引入了自动检测操作系统的功能。通过 `os-prober` 工具，GRUB 能够扫描磁盘上的所有操作系统并自动更新启动菜单，这使得多操作系统环境的管理变得更加简便。

### 与 UEFI 的集成

**随着计算机硬件逐步转向 UEFI（Unified Extensible Firmware Interface），GRUB 也适应了这一变化。**在 2012 年以后，GRUB 开始支持 UEFI 模式，使其能够在现代计算机上运行，并与传统 BIOS 模式兼容。**GRUB 在 UEFI 环境中支持 Secure Boot 功能，这是防止未经授权的操作系统加载的安全机制。**为了满足这一要求，GRUB 必须经过签名以确保其能够在 Secure Boot 环境中运行。

### 未来展望

展望未来，GRUB 可能会继续演进以支持新兴的引导技术和标准。未来的 GRUB 版本可能会进一步增强安全功能，如更全面的加密支持和更严格的 Secure Boot 集成，以应对不断演变的安全威胁。同时，GRUB 可能会与新兴操作系统和虚拟化技术深度集成，提升对各种操作系统和平台的支持能力。

## GRUB 基础概念

### 基本结构

![GNU_GRUB_components.svg](https://static.7wate.com/2024/08/26/d1a5b99f9a411.svg)

#### GRUB Legacy 的分层结构

![GNU_GRUB_on_MBR_partitioned_hard_disk_drives.svg](https://static.7wate.com/2024/08/26/88911f5a1bbe9.svg)

GRUB Legacy 的结构设计为分阶段加载，以克服早期计算机系统的限制并实现多操作系统引导。

- **Stage 1**：GRUB 的 Stage 1 通常位于硬盘的主引导记录（MBR）中。由于 MBR 只有 512 字节的大小限制，Stage 1 的代码非常简短，主要任务是定位并加载 Stage 1.5 或 Stage 2。Stage 1 的目标是让计算机找到并启动 Stage 1.5 或直接启动 Stage 2。
- **Stage 1.5**：Stage 1.5 是 GRUB 特有的一个中间层，通常存储在硬盘的第一个分区之前的空闲区域中。它的主要作用是提供对文件系统的支持，使得 GRUB 能够从特定的文件系统中加载 Stage 2。这一阶段的引入是为了弥补 Stage 1 无法直接处理复杂文件系统的不足。
- **Stage 2**：Stage 2 是 GRUB Legacy 的主要加载器部分，负责呈现启动菜单、加载操作系统内核，并执行用户命令。Stage 2 通常存储在硬盘的文件系统中，并且支持多操作系统的引导选择。用户可以通过 Stage 2 的菜单界面选择启动不同的操作系统或进入命令行模式进行手动操作。

#### GRUB 2 的模块化结构和主要组件

![GNU_GRUB_on_GPT_partitioned_hard_disk_drives.svg](https://static.7wate.com/2024/08/26/e0349b1621b22.svg)

与 GRUB Legacy 相比，GRUB 2.x 采用了更加现代化的模块化结构，旨在提高灵活性、可扩展性和易用性。GRUB 2.x 的结构主要包括以下组件：

- **核心映像（Core Image）**：
  核心映像是 GRUB 2.x 的基本加载器部分，相当于 GRUB Legacy 的 Stage 1 和 Stage 1.5。它通常包括最低限度的模块化代码，用于加载其他模块和配置文件。
- **模块（Modules）**：
  GRUB 2.x 使用模块来扩展其功能。不同于 GRUB Legacy 的固定功能，GRUB 2.x 的模块可以按需加载。这些模块提供文件系统支持、设备驱动、网络引导支持等功能，使 GRUB 2.x 可以适应更复杂的启动需求。
- **配置文件（Configuration File）**：
  GRUB 2.x 的配置文件是 `grub.cfg`，由系统自动生成，包含启动菜单的配置、内核选项和模块加载指令。与 GRUB Legacy 的 `menu.lst` 不同，`grub.cfg` 不应手动编辑，而是通过 `/etc/default/grub` 和脚本生成。
- **图形用户界面（Graphical User Interface）**：
  GRUB 2.x 支持图形用户界面，通过加载特定模块，可以显示带有背景图片和自定义主题的启动菜单，使用户体验更加友好。

### 核心功能

#### 引导操作系统内核

GRUB 的核心功能之一是加载并引导操作系统内核。具体过程包括：

1. **内核定位与加载**：当计算机启动时，GRUB 负责从指定的分区或设备上找到操作系统的内核映像，并将其加载到内存中。这一过程包括读取内核文件（通常是一个压缩的内核映像）并将其拷贝到内存中，为内核执行做准备。
2. **传递启动参数**：GRUB 在加载内核之前，可以通过配置文件或启动菜单传递参数给内核。这些参数可以控制内核的行为，如指定根文件系统位置、启用或禁用调试模式、设置单用户模式等。参数传递允许用户在启动时对系统进行定制化配置。
3. **支持多种内核格式**：GRUB 支持多种内核格式和引导机制，包括传统的 Linux 内核、内核映像和初始 RAM 磁盘（initrd）。对于不同的操作系统和内核类型，GRUB 提供了相应的支持。

#### 提供多操作系统引导菜单

GRUB 允许用户在多操作系统环境中选择要引导的操作系统，具体功能包括：

- **启动菜单的生成与显示**：GRUB 在系统启动时提供一个引导菜单，用户可以通过此菜单选择要启动的操作系统或内核版本。菜单可以是文本模式的，也可以是图形化的，具体取决于 GRUB 的配置和主题设置。
- **自动检测操作系统**：GRUB 2.x 的自动检测功能通过 `os-prober` 工具扫描硬盘上的所有分区，识别已安装的操作系统，并自动生成相应的启动条目。这样，用户无需手动编辑配置文件，就能在新操作系统安装后自动更新启动菜单。
- **自定义启动项**：用户可以通过编辑 `/etc/default/grub` 配置文件和 `/etc/grub.d/` 目录中的脚本来定义和管理启动项。用户可以指定启动顺序、设置超时时间、定义默认启动项等。GRUB 2.x 的配置方式使得多操作系统环境的管理变得更加灵活和方便。
- **支持多种操作系统**：GRUB 支持多种操作系统的引导，包括 Linux、Windows、BSD 等。每个操作系统的引导条目可以根据需要进行配置和调整，支持各种引导需求。

#### 提供命令行工具进行手动操作

GRUB 提供了一个强大的命令行工具，支持在引导阶段进行手动操作和故障排除，功能包括：

- **命令行模式的进入**：在 GRUB 启动时，用户可以通过按下 `c` 键进入命令行模式。在这个模式下，用户可以手动输入命令，执行内核加载、根文件系统设置、模块加载等操作。这对于系统管理员和高级用户在遇到引导问题时进行诊断和修复非常有用。
- **常用命令**：
  - `set`：设置或显示 GRUB 环境变量。例如，设置内核启动参数或根文件系统。
  - `insmod`：加载 GRUB 模块。这允许用户动态添加支持某些文件系统或功能的模块。
  - `linux`：指定要启动的内核，通常与内核文件路径一起使用。
  - `initrd`：指定内核的初始 RAM 磁盘映像，用于提供启动时所需的驱动程序和工具。
  - `boot`：启动加载并执行内核，开始操作系统的引导过程。
  - `ls`：列出指定设备或分区的内容，帮助用户查找内核和其他引导文件。
- **命令行调试**：通过命令行模式，用户可以灵活地调试和恢复系统，例如在 GRUB 配置文件损坏或系统引导失败时，用户可以手动加载内核和初始化 RAM 磁盘，逐步解决问题。

这些核心功能使 GRUB 成为一个强大而灵活的引导加载器，能够处理多种操作系统的引导需求，提供详细的故障排除能力，并允许用户在复杂环境中进行精细控制。

### 1.x 和 2.x 的主要区别

| **特性**           | **GRUB 1.x (Legacy)**                     | **GRUB 2.x**                                                 |
| ------------------ | ----------------------------------------- | ------------------------------------------------------------ |
| **配置文件**       | `menu.lst`                                | `grub.cfg`（**自动生成，不建议直接编辑**）                   |
| **配置方式**       | 手动编辑 `menu.lst`                       | 通过 `/etc/default/grub` 和 `/etc/grub.d/` 脚本管理，通过 `update-grub` 自动生成 |
| **模块化支持**     | 固定功能，需重新编译                      | 模块化设计，动态加载模块，按需加载或卸载功能模块             |
| **功能扩展**       | 受限，增加功能需重新编译                  | 支持图形引导界面、脚本支持、LVM、RAID、加密文件系统、PXE 网络引导等高级功能 |
| **引导方式**       | 仅支持传统的 BIOS 引导                    | 支持 BIOS 和 UEFI 引导，兼容性更广                           |
| **错误处理**       | 错误提示信息较少，问题排查困难            | 提供详细的错误信息和调试模式，支持 `grub-rescue` 和 `grub> ` 命令行模式 |
| **多语言支持**     | 限制，主要支持英文                        | 支持多语言，包括对图形界面的本地化支持                       |
| **支持的文件系统** | 支持的文件系统较少，通常为 ext2/ext3/ext4 | 支持多种文件系统，包括 ext2/3/4、Btrfs、XFS、FAT、NTFS 等    |
| **动态发现和配置** | 静态配置，需要手动添加新操作系统          | 通过 `os-prober` 自动发现并添加操作系统，支持动态配置        |
| **高级配置**       | 配置复杂且功能有限                        | 支持更复杂的配置和脚本，例如条件引导、动态菜单生成等         |
| **引导菜单界面**   | 基本文本模式                              | 支持图形界面，自定义主题和菜单布局，提供更友好的用户体验     |
| **性能优化**       | 性能优化有限                              | 支持优化和调整，如减少启动超时，按需加载模块以提高启动速度   |

## GRUB 安装

### 在不同操作系统上安装 GRUB

#### Linux 发行版

**在大多数 Linux 发行版中，GRUB 通常作为默认的引导加载器自动安装**，但在某些情况下可能需要手动安装或修复。以下是在常见 Linux 发行版上安装 GRUB 的基本步骤：

- **Ubuntu**：Ubuntu 在安装过程中会自动安装 GRUB。若需要手动安装，可以使用以下命令：

  ```shell
  sudo grub2-install /dev/sda
  sudo update-grub
  ```

  其中，`/dev/sda` 表示要安装 GRUB 的硬盘。**如果需要修复 GRUB（例如由于分区表变动导致 GRUB 无法启动），可以使用 Ubuntu Live CD 或 USB 启动系统，然后在 Live 环境下安装和更新 GRUB。**

- **CentOS**：CentOS 也在安装过程中自动安装 GRUB。手动安装的步骤与 Ubuntu 类似，使用以下命令：

  ```shell
  sudo grub2-install /dev/sda
  sudo grub2-mkconfig -o /boot/grub2/grub.cfg
  ```

  需要注意的是，在 CentOS 7 及以后，GRUB 2 是默认的引导加载器，配置文件位置和命令与 GRUB Legacy 略有不同。

#### 双系统（Windows + Linux）

在双系统（Windows + Linux）环境中，GRUB 通常被用来管理启动顺序，使用户可以在系统启动时选择进入 Windows 或 Linux。在这种环境下安装 GRUB，需要考虑以下步骤：

1. **安装顺序**：通常**建议先安装 Windows，再安装 Linux。**这是因为 Windows 的引导加载器会覆盖 MBR，而 Linux 在安装时可以自动检测 Windows 并配置 GRUB 以引导 Windows。

2. **安装 GRUB**：在安装 Linux 时，选择安装 GRUB 到主硬盘的 MBR（通常是 `/dev/sda`），这将使 GRUB 成为默认的引导加载器。在安装完成后，GRUB 将会自动检测 Windows 并在启动菜单中列出。

3. **修复 GRUB：**如果 Windows 更新或修复过程中覆盖了 GRUB，可以使用 Linux Live CD 启动系统，然后使用以下命令重新安装和配置 GRUB：

  ```shell
  sudo grub2-install /dev/sda
  sudo update-grub
  ```

#### 在 UEFI 和 Legacy BIOS 模式下安装 GRUB 的区别

在不同启动模式下安装 GRUB 需要考虑不同的配置和操作方法。

- **Legacy BIOS 模式**
  在 Legacy BIOS 模式下，GRUB 通常安装在 MBR 中（即硬盘的第一个扇区）。在安装 GRUB 时，需要确保目标磁盘使用 MBR 分区表格式，并在 MBR 中安装 GRUB 的 Stage 1 部分。安装命令一般为：

  ```shell
  sudo grub2-install /dev/sda
  ```

  此外，还需要生成或更新 `grub.cfg` 文件，以确保 GRUB 能够正确加载操作系统。

- **UEFI 模式**：
  在 UEFI 模式下，GRUB 通常安装在 EFI 系统分区（ESP）中，并且要求硬盘使用 GPT 分区表格式。UEFI 模式不使用 MBR，因此 GRUB 需要安装到 ESP 中，并以 `.efi` 文件的形式存在。安装 GRUB 时，通常指定 `--target=x86_64-efi` 参数：

  ```shell
  sudo grub2-install --target=x86_64-efi --efi-directory=/boot/efi --bootloader-id=GRUB
  ```

  这会在 ESP 中创建一个 GRUB 目录，并将 GRUB 的 EFI 文件放入其中。

### `grub2-install` 命令

`grub2-install` 是用于安装 GRUB 引导加载器的命令。它的基本语法为：

```shell
sudo grub2-install [选项] <目标设备>
```

常见参数包括：

| **参数**           | **描述**                                                     | **适用情况**                     |
| ------------------ | ------------------------------------------------------------ | -------------------------------- |
| `--target`         | 指定目标平台，定义 GRUB 将要安装的架构或平台。常见的值包括 `i386-pc`（Legacy BIOS）和 `x86_64-efi`（UEFI）。 | 用于选择 GRUB 安装的架构或平台。 |
| `--efi-directory`  | 指定 EFI 系统分区的挂载点。在 UEFI 模式下使用，GRUB 必须安装在此分区的 `/EFI` 子目录下。 | 仅在 UEFI 模式下使用。           |
| `--boot-directory` | 指定 GRUB 安装目录，通常是 `/boot`。GRUB 的核心文件将被安装在此目录。 | 用于定义 GRUB 安装的路径。       |
| `--recheck`        | 重新检测目标设备。如果在初次安装时设备信息发生变化，使用此选项可确保 GRUB 正确识别设备。 | 用于修正设备检测问题。           |
| `--force`          | 强制安装 GRUB，即使检测到可能的冲突或警告。适用于在安装过程中遇到错误时进行尝试。 | 用于在可能冲突的情况下强制安装。 |

#### 在不同的分区方案（MBR 和 GPT）下使用 `grub-install`

在使用 `grub-install` 命令时，分区方案（MBR 或 GPT）决定了 GRUB 的安装位置和方式。

##### MBR（Master Boot Record）

对于 MBR 分区表，`grub-install` 通常将 GRUB 的 Stage 1 部分安装到 MBR（即硬盘的第一个扇区）。这是 Legacy BIOS 模式下的常见方法：

```shell
sudo grub2-install /dev/sda
```

安装完成后，GRUB 会将控制权转移给 Stage 1.5 或 Stage 2 部分，并加载操作系统内核。

##### GPT（GUID Partition Table）

在 GPT 分区表下，如果使用 Legacy BIOS 模式引导，GRUB 仍然可以安装在一个特殊的 BIOS 引导分区中。对于 UEFI 模式，GRUB 则安装在 EFI 系统分区（ESP）中：

```shell
sudo grub2-install --target=x86_64-efi --efi-directory=/boot/efi --bootloader-id=GRUB
```

在这种情况下，GRUB 不会占用 MBR，而是通过 EFI 固件直接启动。

#### 将 GRUB 安装到特定磁盘或分区

有时需要将 GRUB 安装到特定的磁盘或分区，例如在多硬盘系统中选择某个硬盘作为主引导盘。可以使用 `grub-install` 命令指定目标设备：

##### 安装到特定磁盘

如果要将 GRUB 安装到特定的硬盘，例如 `/dev/sdb`，可以使用：

```shell
sudo grub2-install /dev/sdb
```

这会将 GRUB 的引导加载器部分安装到 `/dev/sdb` 的 MBR 或 EFI 系统分区中。

##### 安装到特定分区

在某些情况下，可能需要将 GRUB 安装到特定分区（例如双引导设置中）。这种情况下，需要特别小心，因为在分区中安装 GRUB 可能会带来一些引导问题，通常不推荐这种做法，但可以通过指定目标分区来实现：

```shell
sudo grub2-install /dev/sda1
```

这会将 GRUB 的 Stage 1 部分安装到指定的分区中，但通常这种方式仅用于链式引导等特殊情况。

## GRUB 配置文件

### `grub.cfg` 文件

`grub.cfg` 是 GRUB 2.x 的主要配置文件，通常位于 `/boot/grub/` 或 `/boot/grub2/` 目录下。这个文件由 `grub-mkconfig` 工具自动生成，包含了 GRUB 启动菜单的所有配置项。`grub.cfg` 的结构包括以下几个主要部分：

- **Global Settings（全局设置）**：定义 GRUB 的全局设置，如默认启动项、超时时间、终端输出等。通常位于文件的开头部分。
- **Menu Entries（菜单项）**：定义每个操作系统或内核的启动项。每个启动项通常以 `menuentry` 关键字开头，后面跟随启动项的名称和启动配置。
- **Modules and Additional Settings（模块和其他设置）**：包含 GRUB 加载的模块以及其他特定设置，例如图形界面、密码保护等。

### Grub 基本语法

| **语法元素**       | **说明**                                                     | **示例**                                    |
| ------------------ | ------------------------------------------------------------ | ------------------------------------------- |
| **注释**           | 使用 `#` 符号添加注释。注释内容不会被 GRUB 解析，用于在配置文件中添加说明或备注。 | `# 这是一个注释`                            |
| **变量**           | 使用 `set` 关键字定义和设置变量。变量可用于存储配置选项，如默认启动项、根文件系统路径等。 | `set default=0` `set root=(hd0,1)`          |
| **命令和选项**     | GRUB 使用类似脚本的语法定义启动选项。常用命令包括：          |                                             |
| **`set`**          | 用于定义和设置环境变量，如设置启动项、根目录等。             | `set default=0` `set timeout=10`            |
| **`linux`**        | 加载内核并指定内核参数。通常用于定义启动的内核文件及其参数。 | `linux /vmlinuz root=/dev/sda1`             |
| **`initrd`**       | 指定初始 RAM 磁盘映像（initramfs），为内核启动提供必要的驱动程序和工具。 | `initrd /initrd.img`                        |
| **`boot`**         | 启动内核和初始 RAM 磁盘，开始操作系统的引导过程。            | `boot`                                      |
| **`menuentry`**    | 定义启动菜单中的条目，每个条目表示一个可启动的操作系统或内核版本。 | `menuentry "Ubuntu" { ... }`                |
| **`insmod`**       | 加载 GRUB 模块，用于添加支持特定功能的模块，如文件系统、网络等。 | `insmod ext2`                               |
| **`search`**       | 搜索指定的设备或分区，通常用于查找启动文件或内核。           | `search --no-floppy --fs-uuid --set=root`   |
| **`configfile`**   | 引用另一个配置文件。用于将配置文件分成多个部分，以简化管理。 | `configfile /boot/grub/custom.cfg`          |
| **`if` 和 `else`** | 条件判断，允许根据不同条件执行不同的配置或命令。             | `if [ "$grub_platform" = "efi" ]; then ...` |

虽然 `grub.cfg` 是可以手动编辑的，但不建议直接修改这个文件，原因如下：

- **自动生成**：`grub.cfg` 通常由 `grub-mkconfig` 自动生成，手动编辑的修改在下次更新时可能会被覆盖。
- **复杂性**：`grub.cfg` 文件可能包含复杂的逻辑和脚本，手动修改容易引入错误，导致系统无法启动。
- **安全性**：错误的配置可能导致系统无法启动或引发安全漏洞，因此建议通过修改 `/etc/default/grub` 和相关脚本来间接配置 GRUB，然后生成新的 `grub.cfg` 文件。

### GRUB 菜单项的定义和配置

在 `grub.cfg` 文件中，菜单项是由 `menuentry` 关键字定义的，每个菜单项通常包括以下内容：

- **菜单项名称**：`menuentry 'Ubuntu'` 定义了显示在启动菜单中的名称。
- **内核加载**：使用 `linux` 命令加载指定的内核映像，例如 `linux /vmlinuz-5.4.0-42-generic root=/dev/sda1`。
- **初始内存盘**：使用 `initrd` 命令加载内核的初始内存盘（initrd），例如 `initrd /initrd.img-5.4.0-42-generic`。
- **额外参数**：可以为内核传递额外的启动参数，例如 `quiet splash`，这些参数通常通过 `GRUB_CMDLINE_LINUX_DEFAULT` 变量定义。

### `/etc/default/grub` 配置文件

`/etc/default/grub` 是 GRUB 的主配置文件之一，用户可以通过修改该文件来影响 GRUB 的行为。常见的配置选项包括：

| **配置项**                       | **说明**                                                     | **作用**                                           | **示例**                                                     |
| -------------------------------- | ------------------------------------------------------------ | -------------------------------------------------- | ------------------------------------------------------------ |
| **`GRUB_DEFAULT`**               | 设置 GRUB 的默认启动项。可以是菜单项的索引（从 0 开始计数）或 `saved`（表示上次启动的菜单项）。 | 确定系统启动时默认选择的启动项。                   | `GRUB_DEFAULT=0` `GRUB_DEFAULT=saved`                        |
| **`GRUB_TIMEOUT`**               | 设置 GRUB 启动菜单显示的超时时间（单位为秒）。超时后，GRUB 将自动启动默认项。如果设置为 `-1`，则菜单将无限期显示。 | 控制 GRUB 菜单显示的时间长度。                     | `GRUB_TIMEOUT=5` `GRUB_TIMEOUT=-1`                           |
| **`GRUB_DISTRIBUTOR`**           | 指定 GRUB 菜单中显示的操作系统名称。通常由发行版自动设置，不建议手动修改。 | 设置菜单中显示的操作系统名称。                     | `GRUB_DISTRIBUTOR="Ubuntu"`                                  |
| **`GRUB_CMDLINE_LINUX`**         | 为所有 Linux 内核启动项传递通用的内核参数。这些参数将在所有启动项中生效。 | 定义内核启动时使用的通用参数，影响所有内核启动项。 | `GRUB_CMDLINE_LINUX="nomodeset"`                             |
| **`GRUB_CMDLINE_LINUX_DEFAULT`** | 为默认启动项传递的内核参数，通常用于设置用户友好的启动体验（如减少启动时的屏幕输出）。仅在默认启动项中生效。 | 配置默认启动项时的特定内核参数。                   | `GRUB_CMDLINE_LINUX_DEFAULT="quiet splash"`                  |
| **`GRUB_BACKGROUND`**            | 设置 GRUB 启动菜单的背景图片。可以指定图片的路径。           | 更改 GRUB 启动菜单的视觉效果。                     | `GRUB_BACKGROUND="/boot/grub/background.png"`                |
| **`GRUB_HIDDEN_TIMEOUT`**        | 设置隐藏 GRUB 菜单的超时时间（单位为秒）。如果设置为 `0`，菜单将被隐藏并直接启动默认项。 | 控制 GRUB 菜单是否在启动时显示。                   | `GRUB_HIDDEN_TIMEOUT=0` `GRUB_HIDDEN_TIMEOUT=2`              |
| **`GRUB_HIDDEN_TIMEOUT_QUIET`**  | 如果启用，将在 GRUB 菜单隐藏时不显示任何提示。               | 控制菜单隐藏时是否显示提示。                       | `GRUB_HIDDEN_TIMEOUT_QUIET=true`                             |
| **`GRUB_GFXMODE`**               | 设置 GRUB 菜单的分辨率模式。可以设置为具体的分辨率（如 `1024x768`）。 | 配置 GRUB 菜单的显示分辨率。                       | `GRUB_GFXMODE=1024x768`                                      |
| **`GRUB_TERMINAL`**              | 设置 GRUB 的终端类型。可以设置为 `console` 或 `gfxterm`。    | 决定 GRUB 使用文本模式还是图形模式。               | `GRUB_TERMINAL=console` `GRUB_TERMINAL=gfxterm`              |
| **`GRUB_TERMINAL_OUTPUT`**       | 设置 GRUB 的终端输出方式，可以选择 `console`（文本模式）或 `gfxterm`（图形模式）。 | 配置 GRUB 的输出显示方式。                         | `GRUB_TERMINAL_OUTPUT=console` `GRUB_TERMINAL_OUTPUT=gfxterm` |
| **`GRUB_SAVEDEFAULT`**           | 如果启用，GRUB 将记住上一次启动的菜单项，并在下次启动时默认选择该项。 | 使 GRUB 记住并自动选择上次启动的菜单项。           | `GRUB_SAVEDEFAULT=true`                                      |
| **`GRUB_DISABLE_RECOVERY`**      | 如果启用，将禁用 GRUB 菜单中的恢复模式。                     | 控制是否在 GRUB 菜单中显示恢复模式选项。           | `GRUB_DISABLE_RECOVERY=true`                                 |

### 使用 `grub-mkconfig` 生成 GRUB 配置文件

`grub-mkconfig` 是生成 `grub.cfg` 文件的工具，它会自动扫描系统中的操作系统和内核，并生成相应的启动项。基本用法为：

```shell
sudo grub2-mkconfig -o /boot/grub/grub.cfg
```

| **选项**              | **说明**                                           | **作用**                                             | **示例**                             |
| --------------------- | -------------------------------------------------- | ---------------------------------------------------- | ------------------------------------ |
| **`-o, --output`**    | 指定生成的 GRUB 配置文件的路径。                   | 用于指定生成的 `grub.cfg` 文件的位置。               | `-o /boot/grub/grub.cfg`             |
| **`--config-file`**   | 指定一个替代的 GRUB 配置文件路径。                 | 允许使用指定的配置文件而不是默认的 `grub.cfg` 文件。 | `--config-file /etc/grub.custom.cfg` |
| **`--directory`**     | 指定 GRUB 安装目录，其中包含 GRUB 模块和其他文件。 | 用于设置 GRUB 模块的位置。                           | `--directory /boot/grub`             |
| **`--default`**       | 设置默认启动项。                                   | 配置默认启动项的编号。                               | `--default 1`                        |
| **`--output-format`** | 设置输出格式，可以是 `grub` 或 `plaintext`。       | 控制生成的配置文件格式。                             | `--output-format grub`               |
| **`--no-nice`**       | 禁用生成配置文件时的优雅显示。                     | 使 `grub-mkconfig` 不显示任何额外的信息。            | `--no-nice`                          |
| **`--no-legacy`**     | 禁用旧版 GRUB 配置文件的生成。                     | 防止生成兼容旧版 GRUB 的配置。                       | `--no-legacy`                        |
| **`--help`**          | 显示帮助信息。                                     | 提供 `grub-mkconfig` 命令的使用帮助。                | `--help`                             |
| **`--version`**       | 显示 `grub-mkconfig` 的版本信息。                  | 显示当前安装的 `grub-mkconfig` 版本。                | `--version`                          |
| **`--verbose`**       | 显示详细输出。                                     | 输出详细的处理信息。                                 | `--verbose`                          |
| **`--quiet`**         | 减少输出信息。                                     | 减少生成配置时的屏幕输出。                           | `--quiet`                            |
| **`--chroot`**        | 在指定的 chroot 环境中运行。                       | 在指定的 chroot 环境中生成 GRUB 配置。               | `--chroot /mnt/root`                 |
| **`--force`**         | 强制生成配置文件，即使在检测到潜在问题时。         | 忽略警告和错误，强制生成配置文件。                   | `--force`                            |

## GRUB 高级配置

### GRUB 配置文件的结构和语法

在 GRUB 配置文件 `grub.cfg` 中，配置的基本单位是 `menuentry`，它定义了启动菜单中的每一个选项。此外，GRUB 还支持子菜单（`submenu`）结构，用于组织复杂的引导选项。

#### `menuentry` 块

`menuentry` 是定义单个启动项的基本结构。每个启动项通常包括操作系统名称、内核路径、初始化内存盘路径、以及内核参数。例如：

```config
menuentry 'Ubuntu, with Linux 5.4.0-42-generic' {
    set root='hd0,msdos1'
    linux /vmlinuz-5.4.0-42-generic root=/dev/sda1 ro quiet splash
    initrd /initrd.img-5.4.0-42-generic
}
```

- `set root='hd0,msdos1'`：设置引导分区。
- `linux`：指定内核路径和启动参数。
- `initrd`：指定初始化内存盘的路径。

#### `submenu` 块

`submenu` 用于创建包含多个启动项的子菜单，便于在复杂的多操作系统或多内核环境中管理启动选项。例如：

```config
submenu 'Advanced options for Ubuntu' {
    menuentry 'Ubuntu, with Linux 5.4.0-42-generic' {
        linux /vmlinuz-5.4.0-42-generic root=/dev/sda1 ro quiet splash
        initrd /initrd.img-5.4.0-42-generic
    }
    menuentry 'Ubuntu, with Linux 5.4.0-40-generic' {
        linux /vmlinuz-5.4.0-40-generic root=/dev/sda1 ro quiet splash
        initrd /initrd.img-5.4.0-40-generic
    }
}
```

在启动菜单中，用户可以选择进入子菜单，然后选择特定的启动项。

### 使用 `insmod` 加载模块的配置方法

GRUB 的模块化设计允许通过 `insmod` 命令按需加载功能模块，例如文件系统支持、图形界面支持等。`insmod` 通常在 `grub.cfg` 文件的顶部或 `menuentry` 块中使用。例如：

```
insmod part_gpt
insmod ext2
```

- `part_gpt`：加载 GPT 分区表支持模块。
- `ext2`：加载 ext2/3/4 文件系统支持模块。

加载模块的顺序很重要，因为某些模块可能依赖其他模块。`insmod` 命令可以在启动时手动使用，也可以在配置文件中自动执行。

### 通过 `set` 指令配置 GRUB 的环境变量

GRUB 允许使用 `set` 指令配置环境变量，这些变量可以用于控制引导流程的各个方面。例如：

```
set timeout=5
set default=0
```

- `timeout`：设置引导菜单的超时时间。
- `default`：设置默认的启动项。

这些变量在启动时会影响 GRUB 的行为。此外，还可以定义自定义变量，用于复杂的引导逻辑控制。例如：

```
set fallback_entry=2
```

自定义变量可以在条件语句中使用，以实现更复杂的启动方案。

### 使用环境变量和内核参数自定义引导菜单

**使用 GRUB 环境变量控制引导流程**
GRUB 环境变量用于动态控制引导菜单的行为。这些变量可以通过 `set` 指令定义，并在 `grub.cfg` 中使用。例如，使用 `GRUB_DEFAULT=saved` 可以保存上次的启动选择，并在下次启动时自动选择相同的启动项。

- **保存上次的选择**：

  ```config
  set default=saved
  save_env default
  ```

  这将允许 GRUB 在每次启动后保存默认启动项，并在下次启动时自动选择。

- **使用条件语句**： 可以根据环境变量的值决定不同的启动流程。例如：

  ```config
  if [ "${timeout}" -eq "0" ]; then
      set timeout_style=hidden
  fi
  ```

  这段代码在超时时间为 0 时隐藏启动菜单。

**在引导时传递内核参数以影响操作系统的启动行为**
内核参数可以在引导时通过 GRUB 传递，以改变操作系统的启动行为。例如，在 `menuentry` 块中添加内核参数：

```config
menuentry 'Ubuntu, with Linux 5.4.0-42-generic' {
    linux /vmlinuz-5.4.0-42-generic root=/dev/sda1 ro quiet splash
    initrd /initrd.img-5.4.0-42-generic
}
```

- **`ro`**：使根文件系统以只读模式挂载。
- **`quiet splash`**：减少启动信息并显示启动动画。

通过这些内核参数，用户可以控制内核的启动模式、日志输出、硬件配置等。高级用户可以利用这些参数解决特定硬件问题或调试启动过程。

## 多重引导配置

### 配置 Windows 和 Linux 的双重引导

在同一台计算机上同时运行 Windows 和 Linux 操作系统是许多用户的常见需求，GRUB 可以轻松管理这种双重引导配置。

1. **安装顺序**：
    **一般建议先安装 Windows，然后安装 Linux。**这是因为 Windows 安装程序通常会覆盖 MBR 或 EFI 系统分区中的引导加载器，而 Linux 安装程序会检测到已有的 Windows 安装并配置 GRUB 以包含 Windows 的启动选项。

2. **Linux 安装时的引导配置**：
    在 Linux 安装过程中，选择将 GRUB 安装到主硬盘的 MBR 或 EFI 系统分区中。Linux 安装程序通常会自动检测到 Windows 并生成相应的启动菜单项。例如，Ubuntu 的安装程序会自动运行 `os-prober` 来检测 Windows，并添加启动项到 GRUB 配置文件中。

3. **修复引导问题**：
    如果 Windows 更新或重新安装后覆盖了 GRUB，可以使用 Linux Live CD/USB 启动并修复 GRUB。具体步骤如下：

  1. 启动 Linux Live 环境并打开终端。

  2. 挂载根分区和 EFI 系统分区（如果适用）：

     ```
     sudo mount /dev/sda1 /mnt
     sudo mount /dev/sda2 /mnt/boot/efi
     ```

  3. 安装 GRUB 并更新配置：

     ```
     sudo grub2-install --boot-directory=/mnt/boot /dev/sda
     sudo chroot /mnt
     sudo grub2-mkconfig -o /boot/grub/grub.cfg
     ```

### 配置多个 Linux 发行版的引导

在同一台计算机上安装多个 Linux 发行版时，GRUB 可以管理这些系统的引导顺序和配置。

1. **选择主引导加载器**
    通常选择一个主要的 Linux 发行版作为主引导加载器管理系统，其他发行版的 GRUB 可以安装到其根分区，而不是 MBR 或 EFI 系统分区。例如，使用 Ubuntu 的 GRUB 作为主引导加载器，其它发行版的 GRUB 安装到各自的根分区。

2. **更新主引导配置**
    在主引导管理系统中，使用 `sudo grub2-mkconfig -o /boot/grub/grub.cfg` 命令更新 GRUB 配置文件。`os-prober` 将自动检测到其他 Linux 发行版，并添加相应的启动项。如果检测不到，可以手动添加启动项。例如：

  ```config
  menuentry 'Fedora' {
      set root='hd0,msdos2'
      linux /vmlinuz-linux root=/dev/sda2 ro quiet
      initrd /initramfs-linux.img
  }
  ```

1. **解决冲突和兼容性问题**
    在多个 Linux 系统共存的情况下，内核参数或引导设置可能会冲突。例如，某些发行版可能需要特定的内核参数才能正确启动。可以通过调整 `grub.cfg` 或 `/etc/default/grub` 中的参数来解决这些问题。

在多操作系统环境中，可能会出现以下兼容性问题：

- **文件系统兼容性**：Windows 通常使用 NTFS 文件系统，而 Linux 使用 ext4、btrfs 等文件系统。GRUB 需要通过加载相应的模块（如 `insmod ntfs`）来访问这些文件系统。
- **Secure Boot**：在启用 Secure Boot 的 UEFI 系统中，GRUB 和 Linux 内核需要签名才能引导。如果安装的 Linux 发行版没有合适的签名文件，可能需要禁用 Secure Boot 或手动签名 GRUB 和内核。
- **UEFI 与 Legacy BIOS 模式的混用**：混用 UEFI 和 Legacy BIOS 模式可能导致引导问题，特别是在多操作系统环境中。如果系统采用 UEFI 模式安装，确保所有操作系统都使用相同的模式安装。

### 设置和管理不同操作系统的引导顺序

**调整引导顺序的技巧**
在多系统引导环境中，用户可能需要调整操作系统的引导顺序。GRUB 提供了多种方法来实现这一点：

- **编辑 `/etc/default/grub` 文件**：
  修改 `GRUB_DEFAULT` 变量来设置默认启动项。例如，将默认启动项设置为 Windows：

  ```
  GRUB_DEFAULT="Windows 10"
  ```

  然后运行 `update-grub` 更新配置文件。

- **使用 `grub-set-default` 命令**：
  该命令可以在引导菜单项之间切换默认启动项。查看当前的菜单项列表：

  ```
  sudo awk -F\' '/menuentry / {print $2}' /boot/grub/grub.cfg
  ```

  设置新的默认启动项：

  ```shell
  sudo grub2-set-default "Windows 10"
  ```

- **临时改变引导顺序**：
  在 GRUB 启动菜单出现时，可以手动选择一个非默认启动项。按下 `e` 键可以编辑引导命令，修改后按 `F10` 键启动。这不会永久更改引导顺序。

### 解决 GRUB 更新后引导顺序变化的问题

GRUB 更新后，默认启动项可能会意外改变，通常是因为新的内核或操作系统被检测到并设置为默认。

- **持久化设置**：
  使用 `saved` 选项来保存用户的最后一次选择。确保在 `/etc/default/grub` 中配置如下：

  ```
  GRUB_DEFAULT=saved
  GRUB_SAVEDEFAULT=true
  ```

- **锁定默认项**：
  如果不希望 GRUB 更新后改变默认启动项，可以在 `/etc/default/grub` 中设置具体的启动项名称：

  ```
  GRUB_DEFAULT="Ubuntu, with Linux 5.4.0-42-generic"
  ```

- **修复 `/etc/grub.d/` 脚本**：
  检查 `/etc/grub.d/` 目录中的脚本，确保没有不必要的脚本导致意外的引导顺序变化。可以通过禁用或删除无用的脚本来控制菜单的生成。

### 使用 GRUB 的 `os-prober` 自动检测并添加其他操作系统

`os-prober` 是 GRUB 中的一个实用工具，用于自动检测系统中的其他操作系统，并将其添加到 GRUB 的启动菜单中。`os-prober` 通常与 `update-grub` 一起使用。

- **启用 `os-prober`**：
  默认情况下，`os-prober` 应该是启用的，可以通过检查 `/etc/default/grub` 中的设置来确认：

  ```
  GRUB_DISABLE_OS_PROBER=false
  ```

  然后运行以下命令更新 GRUB 配置：

  ```
  sudo grub2-mkconfig -o /boot/grub/grub.cfg
  ```

- **手动运行 `os-prober`**：
  如果系统未自动检测到其他操作系统，可以手动运行 `os-prober` 来检查：

  ```
  sudo os-prober
  ```

  运行完毕后，重新生成 GRUB 配置：

  ```
  sudo grub2-mkconfig -o /boot/grub/grub.cfg
  ```

- **排查 `os-prober` 问题**：
  如果 `os-prober` 未能检测到某些操作系统，可能是因为文件系统未挂载或缺少文件系统支持模块。确保所有相关分区已挂载，并通过 `insmod` 加载必要的模块（如 `ntfs`、`ext2` 等）。

## GRUB 命令行模式

### 如何进入 GRUB 命令行模式

GRUB 命令行模式是一种强大的工具，**允许用户在引导阶段直接输入命令来引导操作系统或进行系统调试。**进入 GRUB 命令行模式有几种方法：

- **从 GRUB 启动菜单进入**：
  在系统启动时，如果看到 GRUB 启动菜单，可以按下 `c` 键直接进入 GRUB 命令行模式。这种方法适用于系统正常引导但需要手动控制启动过程的情况。
- **在引导失败时自动进入**：
  如果系统引导失败，例如无法找到内核或引导配置文件损坏，GRUB 可能会自动进入命令行模式。这是一个提示，表明需要手动引导或修复引导配置。
- **从子菜单进入命令行**：
  如果在 GRUB 启动菜单的高级选项或子菜单中，用户也可以通过按下 `c` 键进入命令行模式。这样可以在选择特定启动项之前先检查或修改启动参数。

### GRUB 命令行的基本操作

进入 GRUB 命令行模式后，用户会看到一个类似于 shell 的界面，可以直接输入命令。以下是 GRUB 命令行的基本操作特点：

| **命令**         | **说明**                     | **用途**                                               | **示例**                                                     |
| ---------------- | ---------------------------- | ------------------------------------------------------ | ------------------------------------------------------------ |
| **`set`**        | 设置和显示 GRUB 环境变量     | 用于设置或显示 GRUB 的环境变量，如根分区、启动参数等。 | **显示环境变量**： `set` **设置根分区**： `set root=(hd0,msdos1)` **设置启动参数**： `set default=0` |
| **`insmod`**     | 加载 GRUB 模块               | 动态加载模块以支持特定功能，如文件系统或图形模式。     | **加载文件系统模块**： `insmod ext2` **加载视频模块**： `insmod vbe` **加载 LVM 模块**： `insmod lvm` |
| **`linux`**      | 指定要启动的内核及其启动参数 | 设置要引导的内核和传递给内核的启动参数。               | **指定内核和启动参数**： `linux /vmlinuz-5.4.0-42-generic root=/dev/sda1 ro quiet splash` |
| **`initrd`**     | 指定内核的初始 RAM 磁盘映像  | 设置内核启动时使用的初始 RAM 磁盘映像。                | **指定 initrd 映像**： `initrd /initrd.img-5.4.0-42-generic` |
| **`boot`**       | 启动操作系统                 | 启动由 `linux` 和 `initrd` 命令加载的内核。            | **启动内核**： `boot`                                        |
| **`ls`**         | 列出设备和分区               | 列出可用的磁盘、分区以及指定分区中的文件和目录。       | **列出磁盘和分区**： `ls` **查看分区内容**： `ls (hd0,msdos1)/` |
| **`search`**     | 搜索文件或设备               | 查找指定的文件或设备，根据给定的条件。                 | **搜索内核文件**： `search --file --no-floppy /vmlinuz-5.4.0-42-generic` |
| **`root`**       | 设置根分区                   | 设置启动时的根分区。                                   | **设置根分区**： `root=(hd0,msdos1)`                         |
| **`configfile`** | 加载配置文件                 | 从指定路径加载 GRUB 配置文件。                         | **加载配置文件**： `configfile /boot/grub/grub.cfg`          |
| **`reboot`**     | 重启系统                     | 重新启动计算机。                                       | **重启系统**： `reboot`                                      |
| **`halt`**       | 关闭系统                     | 关闭计算机。                                           | **关闭系统**： `halt`                                        |

### GRUB 命令行手动引导操作系统

当自动引导失败或需要临时更改引导参数时，可以手动加载内核并启动操作系统。以下是手动引导 Linux 系统的步骤：

```shell
# 1. 设置根分区
set root=(hd0,msdos1)

# 2. 加载内核
linux /vmlinuz-5.4.0-42-generic root=/dev/sda1 ro quiet splash

# 3. 加载 initrd
initrd /initrd.img-5.4.0-42-generic

# 4. 启动系统
boot
```

### 常见问题的诊断和修复方法

引导失败可能发生在 GRUB 安装或更新后，导致系统无法启动。以下是一些常见的原因和解决方法：

#### 错误的引导加载器安装

重新安装 GRUB 可以解决大多数引导失败问题。首先，使用 Live CD/USB 启动系统，挂载系统分区，然后重新安装 GRUB。

```shell
# 1. 启动到 Live CD/USB

# 2. 挂载根文件系统
sudo mount /dev/sda1 /mnt
# （假设 /dev/sda1 是根分区，实际分区可能有所不同）

# 3. 如果使用 UEFI，还需要挂载 EFI 分区
sudo mount /dev/sda2 /mnt/boot/efi
# （假设 /dev/sda2 是 EFI 分区）

# 4. 安装 GRUB
sudo grub-install --root-directory=/mnt /dev/sda

# 5. 更新 GRUB 配置
sudo chroot /mnt
sudo update-grub
exit
```

#### 引导分区丢失或损坏

如果引导分区丢失或损坏，可以尝试以下步骤来恢复或重新创建引导分区：

1. **检查分区表和分区类型**： 确保分区表（MBR 或 GPT）与当前系统配置一致。使用工具如 `fdisk` 或 `parted` 检查分区表和分区类型：

   ```shell
   sudo fdisk -l
   sudo parted -l
   ```

2. **恢复引导分区**：

   - **创建新的引导分区**： 使用分区工具（如 `gparted` 或 `fdisk`）创建新的引导分区。请确保选择正确的文件系统（如 ext4 或 FAT32，取决于你的系统配置）。

   - **重新安装 GRUB**： 挂载引导分区和根分区，并重新安装 GRUB。请参考以下步骤：

     ```shell
     sudo mount /dev/sda1 /mnt     # 假设 /dev/sda1 是根分区
     sudo mount --bind /dev /mnt/dev
     sudo mount --bind /proc /mnt/proc
     sudo mount --bind /sys /mnt/sys
     sudo mount /dev/sda2 /mnt/boot/efi    # 如果使用 UEFI，假设 /dev/sda2 是 EFI 分区
     sudo chroot /mnt
     grub-install /dev/sda
     update-grub
     exit
     ```

3. **验证分区和 GRUB 配置**： 确保分区和 GRUB 配置文件正确无误。检查 `/etc/fstab` 文件中的分区设置是否正确，以确保系统能够正确挂载分区。

### 解决 GRUB 菜单不显示或错误加载的问题

如果 GRUB 菜单不显示或加载错误，可以尝试以下方法解决问题：

1. **检查 GRUB 配置文件**： 确保 `/etc/default/grub` 文件中的配置正确，并且 GRUB 配置文件 `/boot/grub/grub.cfg` 已正确生成。可以运行以下命令来重新生成配置文件：

   ```shell
   sudo update-grub
   ```

2. **重新安装 GRUB**： 如果菜单项不显示或 GRUB 引导程序损坏，可以重新安装 GRUB。以下步骤适用于 BIOS 和 UEFI 系统：

   - **BIOS 系统**：

     ```shell
     sudo grub-install /dev/sda
     sudo update-grub
     ```

   - **UEFI 系统**：

     ```shell
     sudo mount /dev/sda1 /mnt    # 假设 /dev/sda1 是根分区
     sudo mount --bind /dev /mnt/dev
     sudo mount --bind /proc /mnt/proc
     sudo mount --bind /sys /mnt/sys
     sudo mount /dev/sda2 /mnt/boot/efi    # 假设 /dev/sda2 是 EFI 分区
     sudo chroot /mnt
     grub-install --target=x86_64-efi --efi-directory=/boot/efi --bootloader-id=grub
     update-grub
     exit
     ```

3. **检查文件系统的完整性**： 使用 `fsck` 工具检查并修复文件系统错误。如果 GRUB 菜单项无法加载，可能是由于文件系统损坏：

   ```shell
   sudo fsck /dev/sda1
   ```

### 使用 Live CD 或 Live USB 修复损坏的 GRUB 安装

Live CD/USB 可以提供一个临时的操作环境，用于修复系统问题，包括 GRUB 安装问题。以下是进入救援模式的步骤：

```shell
# 1. 启动 Live CD/USB 并进入 Live 环境

# 2. 挂载系统分区
sudo mount /dev/sda1 /mnt

# 如果使用 UEFI，还需挂载 EFI 分区
sudo mount /dev/sda2 /mnt/boot/efi

# 3. 进入 chroot 环境
sudo chroot /mnt

# 4. 重新安装 GRUB
grub-install /dev/sda

# 5. 更新 GRUB 配置
update-grub

# 6. 退出 chroot 环境并卸载分区
exit
sudo umount /mnt/boot/efi
sudo umount /mnt
```

## GRUB 安全配置

### 设置 GRUB 密码保护

GRUB 密码保护是一种有效的措施，用于防止未经授权的用户修改 GRUB 菜单项或启动参数，从而提高系统安全性。以下是配置 GRUB 密码保护的步骤：

```shell
# 1. 生成加密密码
sudo grub-mkpasswd-pbkdf2

# 按提示输入密码后，命令会输出类似于以下的加密字符串
# PBKDF2 hash of your password is grub.pbkdf2.sha512.10000.<hash>

# 2. 编辑 GRUB 配置文件
# 打开配置文件并添加密码保护设置
# 通常是 /etc/grub.d/40_custom
echo 'set superusers="root"' | sudo tee -a /etc/grub.d/40_custom
echo 'password_pbkdf2 root grub.pbkdf2.sha512.10000.<hash>' | sudo tee -a /etc/grub.d/40_custom

# 3. 更新 GRUB 配置
sudo update-grub
```

设置 GRUB 用户和密码涉及以下步骤：

```shell
# 1. 定义用户
# 打开 /etc/grub.d/40_custom 文件，添加设置用户的指令
# 使用 echo 命令追加到文件中
echo 'set superusers="admin"' | sudo tee -a /etc/grub.d/40_custom

# 2. 设置密码
# 使用 grub-mkpasswd-pbkdf2 生成加密密码，然后将其添加到配置文件中
# 例如：使用以下命令生成加密密码
# sudo grub-mkpasswd-pbkdf2
# 输出类似于：PBKDF2 hash of your password is grub.pbkdf2.sha512.10000.<hash>
# 将生成的 <hash> 替换到下面命令中
echo 'password_pbkdf2 admin grub.pbkdf2.sha512.10000.<hash>' | sudo tee -a /etc/grub.d/40_custom

# 3. 更新 GRUB 配置
# 保存更改并更新 GRUB 配置
sudo update-grub
```

### 配置用户认证和访问控制

GRUB 本身不支持细粒度的权限控制，但可以通过不同的配置文件和密码保护机制来实现基础的用户认证和访问控制。

- **单一用户模式**：
  如果需要一个简单的保护机制，可以设置一个用户和一个密码，如上所述。这可以防止未授权的用户访问或修改引导菜单。
- **多用户配置**：
  虽然 GRUB 不原生支持多用户权限级别，但可以通过多重密码保护和分开管理不同的菜单项来模拟这种控制。例如，可以创建不同的菜单项，每个菜单项都有不同的密码保护。

通过使用密码保护配置，可以控制哪些用户能够访问特定的菜单项：

在 `/etc/grub.d/40_custom` 文件中，可以为每个菜单项设置不同的密码。例如

shell```shell

menuentry "Restricted OS" {

    set superusers="admin"

    password_pbkdf2 admin grub.pbkdf2.sha512.10000.<hash>

    linux /boot/vmlinuz-linux root=/dev/sda1

}

```

只有提供正确密码的用户才能访问 `"Restricted OS"` 菜单项。在需要高度安全性的环境中，可以考虑以下策略：

- **使用加密和保护配置文件**：
  确保 `/boot/grub/grub.cfg` 和 `/etc/grub.d/` 目录中的文件受到保护，防止未授权访问和修改。
- **定期更新密码**：
  定期更换 GRUB 密码，并更新配置文件和 GRUB 设置。
- **监控和审计**：
  监控系统的引导日志和配置文件的变更，以检测潜在的安全风险。

### 配置 GRUB 以支持系统的磁盘加密

GRUB 能够引导加密的操作系统，但需要额外的配置来处理加密磁盘。以下是配置 GRUB 以支持加密操作系统的步骤：

- **配置 GRUB 以支持 LUKS 加密磁盘**：LUKS（Linux Unified Key Setup）是常用的加密解决方案。在 GRUB 配置文件中，需要确保 GRUB 能够识别和解密加密的磁盘分区。

- **编辑 GRUB 配置文件**：确保 GRUB 能够加载加密磁盘的模块。在 `/etc/grub.d/` 目录下的相关配置文件中，可以添加以下内容来加载加密支持：

  ```shell
  insmod cryptodisk
  insmod luks
  ```

- **配置加密磁盘**：配置加密磁盘的详细信息。例如，如果加密分区是 `/dev/sda1`，可以在 `/etc/grub.d/40_custom` 中添加：

  ```shell
  menuentry "Encrypted Linux" {
      insmod cryptodisk
      insmod luks
      set root='cryptomount'
      cryptomount -u UUID
      linux /vmlinuz-5.4.0-42-generic root=/dev/mapper/root ro quiet splash
      initrd /initrd.img-5.4.0-42-generic
  }
  ```

**配置 LUKS 加密磁盘与 GRUB 的兼容性**
LUKS 加密磁盘需要 GRUB 能够正确解密。以下是配置步骤：

- **创建加密分区**：使用 LUKS 工具创建加密分区。例如：

  ```shell
  cryptsetup luksFormat /dev/sda1
  ```

- **打开加密分区**：使用 LUKS 密钥解密分区，并创建映射：

  ```shell
  cryptsetup luksOpen /dev/sda1 cryptroot
  ```

- **配置 initramfs**：确保 `initramfs` 能够处理 LUKS 加密磁盘。更新 `initramfs` 以包含 LUKS 支持：

  ```shell
  sudo update-initramfs -u
  ```

**实现基于密码的加密磁盘解锁**
加密磁盘解锁通常在引导时需要用户输入密码。以下是配置步骤：

- **配置 GRUB 提示解锁**：在 GRUB 配置文件中，设置加密分区的 UUID，并确保在引导时提示用户输入密码。

- **配置加密解锁步骤**：在 GRUB 配置中，添加用于解锁加密磁盘的设置：`cryptdevice=UUID=<UUID>:cryptroot` 在 `/etc/default/grub` 中设置：

  ```
  GRUB_CMDLINE_LINUX="cryptdevice=UUID=<UUID>:cryptroot"
  ```

- **更新 GRUB 和 initramfs**：重新生成 GRUB 配置和 `initramfs`：

  ```
  sudo update-grub
  sudo update-initramfs -u
  ```

## GRUB 自定义与优化

### 自定义 GRUB 菜单主题

自定义 GRUB 菜单的外观可以提升用户体验和系统的视觉美感。以下是自定义 GRUB 菜单主题的步骤：

1. **准备自定义图片和资源**

   - 准备适合的背景图片，通常为 PNG 格式。
   - 确保图片尺寸符合屏幕分辨率，以避免拉伸或失真。

2. **安装 GRUB 主题包**
   可以通过下载现成的主题包或创建自己的主题包。常见的主题可以在网上找到，也可以通过系统的包管理器安装。例如，在 Ubuntu 中，可以安装 `grub2-themes` 包：

  ```shell
sudo apt-get install grub2-themes
  ```

1. **配置自定义主题**
   编辑 GRUB 配置文件以应用自定义主题。首先，将主题文件放置在 `/boot/grub/themes/` 目录下，并确保主题文件夹包含 `theme.txt` 和相关资源文件。

   - **设置背景图片**：在 `theme.txt` 中，设置背景图片路径：

   ```config
     # Background image
     background_image /boot/grub/themes/mytheme/background.png
   ```

   - **自定义字体和颜色**：在 `theme.txt` 中，设置字体和颜色：

     ```config
     # Font
     font /boot/grub/themes/mytheme/dejavu-sans.ttf
     
     # Colors
     menu_color_normal = black/white
     menu_color_highlight = white/black
     ```

2. **应用自定义主题**
   在 `/etc/default/grub` 文件中，设置 `GRUB_THEME` 指令以启用自定义主题：

   ```config
   GRUB_THEME=/boot/grub/themes/mytheme/theme.txt
   ```

3. **更新 GRUB 配置**
   保存更改后，更新 GRUB 配置以应用主题：

   ```config
   sudo update-grub
   ```

### 安装和配置自定义 GRUB 主题包

1. **下载并解压主题包**：将下载的主题包解压到 `/boot/grub/themes/` 目录下，例如：

  ```shell
sudo tar -xvf custom-theme.tar.gz -C /boot/grub/themes/
  ```

1. **配置 GRUB 使用新主题**：编辑 `/etc/default/grub` 文件，设置 `GRUB_THEME` 指令：

  ```shell
GRUB_THEME=/boot/grub/themes/custom-theme/theme.txt
  ```

1. **更新 GRUB 配置**：运行更新命令以应用新主题：

  ```shell
sudo update-grub
  ```

**调整菜单布局以提高可用性**

- **修改菜单项的布局**：在 `theme.txt` 文件中，可以调整菜单项的位置和对齐方式。例如：

```shell
menu_color_normal = cyan/blue
menu_color_highlight = red/black
```

- **增加可用性选项**：可以根据需要调整菜单项的字体大小、颜色和选中效果，以提升可用性。

优化 GRUB 的启动速度和菜单配置

### 通过减少超时和优化配置文件加快引导速度

GRUB 的启动速度可以通过减少超时和优化配置来提高。

1. **减少超时**
   编辑 `/etc/default/grub` 文件，减少 `GRUB_TIMEOUT` 的值来缩短引导菜单的显示时间。

2. **禁用不必要的菜单项**
   删除不常用的菜单项，以减少引导菜单的加载时间。可以编辑 `/etc/grub.d/` 目录下的相关文件，删除不需要的菜单项。

3. **优化 GRUB 配置文件**
   通过删除无用的模块和配置，减少 GRUB 配置文件的复杂性，提高引导速度。
