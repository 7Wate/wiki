---
title: Linux 下 0-1 手动安装 Arch Linux
description: 本文提供了一个详细的指南，用于手动安装 Arch Linux，包括从分区到安装桌面环境的完整步骤。
keywords:
  - Linux
  - ArchLinux
  - 手动安装
tags:
  - 技术/操作系统
  - Linux/安装
author: 仲平
date: 2024-09-02
---

从 0 到 1 手动安装一个 Linux 发行版本确实是一个非常有价值的学习实践。以下是一个详细的方案和步骤，通过手动方式从分区开始安装 Linux。

这里以 Arch Linux 为例，因为它是一个极简主义的发行版，允许你从头开始定制系统。可以根据实际情况选择参考 [Arch Linux 官方的安装手册](https://wiki.archlinux.org/title/Installation_guide)，也可以选择阅读下面的文章。

## 0.前期准备

1. **获取 Arch Linux ISO 文件**：从 Arch Linux [官方网站下载](https://archlinux.org/download/) 最新的 ISO 文件。

2. **创建可引导的 USB 安装盘**：使用 `dd` 或 `Rufus` 创建一个可引导的 USB 安装盘。

   ```shell
   sudo dd if=/path/to/archlinux.iso of=/dev/sdX bs=4M status=progress && sync
   ```

   这里 `/dev/sdX` 是你的 USB 设备。

## 1.启动并进入 Arch Linux 环境

### 1.1 从 USB 启动

电脑开机选择从 USB 启动，进入 Arch Linux 的 Live 环境。

### 1.2 网络连接

首先，确保网络接口已启动。通常在最小系统中，不会有图形化的网络管理工具，因此我们需要通过命令行手动管理网络接口。（可以使用 `ip` 管理网络接口，不过重启后会重置）。

```shell
# 查看网络接口
# 这将列出所有网络接口以及它们的状态（`UP` 或 `DOWN`）。
ip link

# 如果接口状态为 DOWN，使用以下命令启动它。
# 注意将 enp0s3 替换为你实际的网络接口名称。
ip link set enp0s3 up

# 手动为某个网络接口配置静态 IP 地址。
# 192.168.1.100/24 是你要设置的 IP 地址和子网掩码。
# enp0s3 是你要配置的网络接口。
ip addr add 192.168.1.100/24 dev enp0s3

# 配置默认网关，确保网络接口能够访问外部网络
# 192.168.1.1 是默认网关的 IP 地址（通常是路由器的 IP 地址）。
ip route add default via 192.168.1.1

# 查看网络配置
ip addr show enp0s3

# 测试网络连接
ping -c 4 baidu.com
```

### 1.3 配置 DNS（可选）

如果 `ping` 域名失败，但 `ping` IP 地址成功，则可能是 DNS 配置有问题。

编辑或创建 `/etc/resolv.conf` 文件，并添加公共 DNS 服务器，如 Google 的 DNS：

```shell
echo "nameserver 223.5.5.5" > /etc/resolv.conf
echo "nameserver 8.8.8.8" >> /etc/resolv.conf
```

### 1.4 同步时间

```shell
timedatectl set-ntp true
```

## 2.磁盘分区

### 2.1 查看磁盘

在开始分区之前，首先需要了解系统中的磁盘情况。使用以下命令查看磁盘设备和它们的现有分区：

```shell
fdisk -l
```

这个命令会列出所有的磁盘及其分区。假设你的目标磁盘是 `/dev/sda`，你可能将看到类似如下的输出：

```shell
Disk /dev/sda: 50 GiB, 53687091200 bytes, 104857600 sectors
Units: sectors of 1 * 512 = 512 bytes
Sector size (logical/physical): 512 bytes / 4096 bytes
I/O size (minimum/optimal): 4096 bytes / 4096 bytes
Disklabel type: gpt
Disk identifier: XXXXXXXX-XXXX-XXXX-XXXX-XXXXXXXXXXXX

Device       Start       End   Sectors  Size Type
/dev/sda1     2048    1050623   1048576  512M EFI System
/dev/sda2  1050624  42008575  40957952   20G Linux filesystem
/dev/sda3 42008576 104857566  62848991   30G Linux filesystem
```

在这个示例中，磁盘 `/dev/sda` 上有三个分区，其中 `/dev/sda1` 是 EFI 系统分区，`/dev/sda2` 是根分区，`/dev/sda3` 是 Home 分区。

### 2.2 分区磁盘

接下来，我们将使用 `fdisk` 来创建新的分区。以下是使用 `fdisk` 工具创建分区的详细步骤。

**2.2.1 启动 `fdisk`**

使用以下命令启动 `fdisk` 工具并开始分区：

```shell
fdisk /dev/sda
```

进入 `fdisk` 后，命令行会切换到交互模式，你将看到一个提示符类似 `Command (m for help):`。

**2.2.2 创建 EFI 系统分区**

1. 输入 `n` 创建一个新分区。

   ```shell
   Command (m for help): n
   ```

2. 选择分区类型，通常默认是 `primary`，直接按 `Enter`。

3. 选择分区号（一般是 1），按 `Enter`。

4. 选择起始扇区，默认从 2048 开始，按 `Enter`。

5. 输入分区大小。例如，为 EFI 系统分区分配 512MB（+512M）：

   ```shell
   Last sector, +sectors or +size{K,M,G,T,P} (2048-104857599, default 104857599): +512M
   ```

6. 设置分区类型为 EFI 系统分区（类型代码为 `1`），输入 `t` 修改类型：

   ```shell
   Command (m for help): t
   Selected partition 1
   Hex code (type L to list all codes): 1
   ```

**2.2.3 创建 root 根分区**

1. 同样输入 `n` 创建新的根分区：

   ```shell
   Command (m for help): n
   ```

2. 选择分区类型和分区号（2），然后按 `Enter`。

3. 选择起始扇区，默认即可，按 `Enter`。

4. 输入分区大小，例如，分配 20GB 给根分区（+20G）：

   ```shell
   Last sector, +sectors or +size{K,M,G,T,P} (1050624-104857599, default 104857599): +20G
   ```

**2.2.4 创建 Home 分区**

1. 输入 `n` 创建 Home 分区：

   ```shell
   Command (m for help): n
   ```

2. 选择分区类型和分区号（3），然后按 `Enter`。

3. 选择起始扇区，默认即可，按 `Enter`。

4. 直接按 `Enter` 使用剩余的所有空间：

   ```shell
   Last sector, +sectors or +size{K,M,G,T,P} (42008576-104857599, default 104857599): <Press Enter>
   ```

**2.2.5 保存分区表并退出**

1. 输入 `w` 写入分区表并退出 `fdisk`：

   ```shell
   Command (m for help): w
   ```

此时，新分区已经创建并保存到磁盘中。

### 2.3 格式化分区

现在，使用 `mkfs` 命令格式化新创建的分区：

**2.3.1 格式化 EFI 分区**

```shell
mkfs.fat -F32 /dev/sda1
```

**2.3.2 格式化根分区**

```shell
mkfs.ext4 /dev/sda2
```

**2.3.3 格式化 Home 分区**

```shell
mkfs.ext4 /dev/sda3
```

### 2.4 交换分区（可选）

如果需要交换分区，你可以在磁盘上创建一个交换分区或选择使用交换文件。

**2.4.1 创建交换分区**

1. 在分区时，创建一个适合你系统需求大小的交换分区。例如，创建一个 2GB 的交换分区。

2. 格式化交换分区：

   ```shell
   mkswap /dev/sda4
   ```

3. 启用交换分区：

   ```shell
   swapon /dev/sda4
   ```

**2.4.2 创建交换文件（可选）**

如果你不想使用交换分区，可以使用以下步骤创建交换文件：

1. 创建一个 2GB 的交换文件：

   ```shell
   dd if=/dev/zero of=/mnt/swapfile bs=1M count=2048
   ```

2. 将其格式化为交换文件格式：

   ```shell
   mkswap /mnt/swapfile
   ```

3. 启用交换文件：

   ```shell
   swapon /mnt/swapfile
   ```

4. 为了确保在系统重启后交换文件仍然有效，你需要将其添加到 `/etc/fstab` 中：

   ```shell
   echo '/mnt/swapfile none swap sw 0 0' | tee -a /etc/fstab
   ```

至此，你已经成功地完成了磁盘分区并格式化了各个分区。接下来，你可以继续安装操作系统的其他部分。

## 3.挂载分区

### 3.1 挂载根分区

```shell
# 挂载 root 根分区
mount /dev/sda2 /mnt
```

### 3.2 创建必要的目录并挂载

```shell
# 创建 boot 目录，并挂载
mkdir /mnt/boot
mount /dev/sda1 /mnt/boot

# 创建 home 目录，并挂载
mkdir /mnt/home
mount /dev/sda3 /mnt/home
```

## 4.安装基础系统

### 4.1 选择最快的镜像

可以手动编辑 `/etc/pacman.d/mirrorlist`，将最快的镜像放在顶部。

### 4.2 安装基本包

使用 `pacstrap` 命令安装基本系统。

```shell
pacstrap /mnt base linux linux-firmware
```

### 4.3 生成 Fstab

手动生成文件系统表，并将其写入 `fstab` 文件。

```shell
genfstab -U /mnt >> /mnt/etc/fstab
```

## 5.系统配置

### 5.1 进入 Chroot 环境

```shell
arch-chroot /mnt
```

### 5.2 设置系统时区

```shell
ln -sf /usr/share/zoneinfo/Asia/Shanghai /etc/localtime
hwclock --systohc
```

### 5.3 设置系统语言

手动编辑 `/etc/locale.gen`，取消你需要的语言注释，然后生成本地化设置。

```shell
locale-gen
echo "LANG=en_US.UTF-8" > /etc/locale.conf
```

### 5.4 设置系统主机名

```shell
echo "your_hostname" > /etc/hostname
```

### 5.5 设置 Hosts 文件

```shell
echo "127.0.0.1 localhost" > /etc/hosts
echo "::1       localhost" >> /etc/hosts
echo "127.0.1.1 your_hostname.localdomain your_hostname" >> /etc/hosts
```

### 5.6 设置 Root 密码

```shell
passwd
```

## 6.引导加载程序

根据你的系统（BIOS 或 UEFI），安装 GRUB 或 systemd-boot。

### 6.1 对于 UEFI 系统

```shell
pacman -S grub efibootmgr
grub-install --target=x86_64-efi --efi-directory=/boot --bootloader-id=GRUB
grub-mkconfig -o /boot/grub/grub.cfg
```

### 6.2 对于 BIOS 系统

```shell
pacman -S grub
grub-install --target=i386-pc /dev/sda
grub-mkconfig -o /boot/grub/grub.cfg
```

## 7.完成和重启

```shell
# 退出 chroot 并卸载
exit
umount -R /mnt
reboot
```

如果一切正常，你现在应该能够从硬盘启动进入新安装的 Arch Linux 系统。

### 7.1 确认网络连接正常

如果网络未连接，请先重复 1.2 和 1.3 步骤。

### 7.2 安装 NetworkManager 管理网络

通过安装 NetworkManager，你可以快速在最小化系统中配置网络，确保系统能连接到互联网并正常工作。

```shell
pacman -S networkmanager
systemctl enable NetworkManager
systemctl start NetworkManager
```

### 7.3 重启更新系统

首先，重启 Linux 确定 NetworkManager 工作正常，然后确保你的系统是最新的：

```shell
reboot
sudo pacman -Syu
```

## 8.基本的桌面环境

在 Arch Linux 上安装一个基本的桌面环境 (Desktop Environment, DE) 需要经过几个步骤，包括安装 X Window 系统、显卡驱动程序以及实际的桌面环境。以下是详细的步骤说明。

### 8.1 安装 X Window 系统

X Window 系统是 Linux 上大多数桌面环境的基础。你需要安装 `xorg` 相关的包：

```shell
sudo pacman -S xorg-server xorg-apps xorg-xinit xterm
```

- `xorg-server` 是 X 服务器。
- `xorg-apps` 是一些有用的 X 应用程序。
- `xorg-xinit` 是 X 启动器。
- `xterm` 是一个基本的终端仿真器，供测试 X 环境使用。

### 8.2 安装显卡驱动程序（可选）

根据你的显卡类型，安装相应的驱动程序。

#### 8.2.1 对于 Intel 显卡

```shell
sudo pacman -S xf86-video-intel
```

#### 8.2.2 对于 NVIDIA 显卡：

```shell
# 开源驱动
sudo pacman -S nvidia nvidia-utils nvidia-settings

# 闭源驱动
sudo pacman -S xf86-video-nouveau
```

#### 8.2.3 对于 AMD 显卡

```shell
sudo pacman -S xf86-video-amdgpu
```

### 8.3 安装桌面环境

你可以选择多种桌面环境，根据你的需求选择一个。这里我将介绍如何安装几个常见的桌面环境。

#### 8.3.1 安装 GNOME 桌面环境

GNOME 是一个功能齐全的桌面环境，适合需要稳定和易用性的用户。

```shell
sudo pacman -S gnome gnome-extra
```

安装完成后，启用 `gdm`（GNOME Display Manager）：

```shell
sudo systemctl enable gdm
sudo systemctl start gdm
```

#### 8.3.2 安装 KDE Plasma 桌面环境

KDE Plasma 是一个高度可定制的桌面环境，适合喜欢自定义的用户。

```shell
sudo pacman -S plasma kde-applications
```

安装完成后，启用 `sddm`（Simple Desktop Display Manager）：

```shell
sudo systemctl enable sddm
sudo systemctl start sddm
```

#### 8.3.3 安装 XFCE 桌面环境

XFCE 是一个轻量级且资源占用较低的桌面环境，适合性能较弱的机器。

```shell
sudo pacman -S xfce4 xfce4-goodies
```

你可以选择安装 `lightdm` 作为显示管理器：

```shell
sudo pacman -S lightdm lightdm-gtk-greeter
sudo systemctl enable lightdm
sudo systemctl start lightdm
```

### 8.4 使用 `startx` 启动

如果你不使用显示管理器而是手动使用 `startx` 启动桌面环境，需要编辑 `.xinitrc` 文件。

```shell
nano ~/.xinitrc
```

在文件末尾添加你选择的桌面环境启动命令：

```shell
# GNOME
exec gnome-session
# KDE Plasma
exec startplasma-x11
# XFCE
exec startxfce4
```

保存并退出，然后通过 `startx` 启动桌面环境：

```shell
startx
```

### 8.5 重启系统并登录

重启系统后，你应该会被引导至图形登录界面。如果使用了显示管理器（如 GDM、SDDM 或 LightDM），你可以选择相应的桌面环境并登录。

```shell
sudo reboot
```

通过这些步骤，你将成功安装并配置一个基本的桌面环境，并能够在 Arch Linux 上运行图形化应用程序。如果有任何问题或需要进一步的帮助，请随时提问。

## 9.完整的工作环境

如果要将 Arch Linux 从一个最小的基础系统升级为一个功能齐全的工作环境，你需要安装和配置一些常用的工具和软件包。以下是一个全面的步骤指南，帮助你将 Arch Linux 系统完善到适合日常使用的状态。

### 9.1 更新系统

确保你的系统和包管理器处于最新状态：

```shell
sudo pacman -Syu
```

### 9.2 安装基础开发工具

这些工具对于编译软件或开发环境非常重要：

```shell
sudo pacman -S base-devel
```

`base-devel` 包括 `gcc`、`make`、`binutils` 等常用的开发工具。

### 9.3 安装网络工具

一些常用的网络工具，如 `wget`、`curl` 和 `net-tools`，在日常使用中非常有用：

```shell
sudo pacman -S wget curl net-tools openssh
```

### 9.4 安装文件系统和磁盘管理工具

这些工具有助于管理磁盘、文件系统和分区：

```shell
sudo pacman -S dosfstools exfat-utils ntfs-3g gparted
```

- `dosfstools` 和 `exfat-utils`：支持 FAT 和 exFAT 文件系统。
- `ntfs-3g`：支持 NTFS 文件系统。
- `gparted`：一个图形化的分区管理工具。

### 9.5 安装常用编辑器

根据你的喜好安装文本编辑器：

```shell
sudo pacman -S vim nano
```

- `vim`：功能强大的文本编辑器。
- `nano`：简单易用的文本编辑器。

### 9.6 安装常用终端工具

一些增强终端体验的工具：

```shell
sudo pacman -S htop tmux screen neofetch
```

- `htop`：互动的进程查看器。
- `tmux` 和 `screen`：终端复用器，允许在单个终端中运行多个会话。
- `neofetch`：显示系统信息的工具。

### 9.7 安装常用压缩工具

安装一些常用的归档和解压工具：

```shell
sudo pacman -S unzip p7zip tar gzip
```

### 9.8 安装常用字体

安装一些常用字体以改善图形界面和文档的显示：

```shell
sudo pacman -S ttf-dejavu ttf-liberation noto-fonts
```

### 9.9 安装浏览器

选择并安装一个适合你的浏览器：

```shell
sudo pacman -S firefox
```

你也可以选择 `chromium`，或者在 AUR 中安装 `google-chrome`。

### 9.10 安装常用的多媒体工具

多媒体播放和管理工具：

```shell
sudo pacman -S vlc mpv
```

- `vlc`：功能强大的媒体播放器。
- `mpv`：轻量级的媒体播放器。

### 9.11 安装办公软件

如果需要办公软件，可以安装 LibreOffice：

```shell
sudo pacman -S libreoffice-fresh
```

### 9.12 安装 AUR 助手

Arch User Repository (AUR) 包含了大量社区维护的软件包，安装一个 AUR 助手会方便很多。`yay` 是一个常用的 AUR 助手。

首先，确保你安装了 `git`：

```shell
sudo pacman -S git
```

然后，克隆 `yay` 的仓库并安装它：

```shell
cd /opt
sudo git clone https://aur.archlinux.org/yay.git
sudo chown -R $USER:$USER yay
cd yay
makepkg -si
```

安装完成后，你可以通过 `yay -S <package_name>` 安装 AUR 软件包。

### 9.13 安装实用工具

安装一些实用工具提高使用体验：

```shell
sudo pacman -S ranger fzf fd ripgrep
```

- `ranger`：终端文件管理器。
- `fzf`：模糊查找工具。
- `fd` 和 `ripgrep`：快速文件和内容查找工具。

### 9.14 安装打印和扫描支持

如果你有打印和扫描需求，可以安装以下软件包：

```shell
sudo pacman -S cups hplip simple-scan
```

- `cups`：打印服务管理器。
- `hplip`：HP 打印机驱动（适用于 HP 打印机用户）。
- `simple-scan`：简单易用的扫描工具。

### 9.15 安装虚拟机支持

如果你打算在 Arch Linux 上运行虚拟机，安装 `VirtualBox` 及其扩展包：

```shell
sudo pacman -S virtualbox virtualbox-host-modules-arch
```

### 9.16 启用常用服务

确保一些关键服务开机自启，例如：

```shell
sudo systemctl enable sshd
sudo systemctl enable cups
sudo systemctl enable NetworkManager
```

### 9.17 安装额外的文件系统支持

支持额外的文件系统，例如 `btrfs` 或 `zfs`：

```shell
sudo pacman -S btrfs-progs
```

如果需要 ZFS 支持，可以从 AUR 安装 `zfs-linux`。

### 9.18 清理不需要的包

清理系统中不再需要的孤立包：

```shell
sudo pacman -Rns $(pacman -Qdtq)
```
