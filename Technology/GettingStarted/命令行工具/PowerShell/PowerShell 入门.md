---
title: PowerShell 入门
description: PowerShell 入门
keywords:
  - PowerShell
  - 入门
tags:
  - 技术/入门
  - PowerShell
author: 仲平
date: 2024-06-05
---

## PowerShell

### 概述

PowerShell 是由微软开发的一种跨平台任务自动化和配置管理框架，由命令行 Shell 和脚本语言组成。它基于 .NET 框架，可以运行在 Windows、MacOS 和 Linux 系统上。PowerShell 的强大之处在于其能够访问和管理系统的所有资源，包括文件系统、注册表、网络等。它不仅适用于系统管理员进行日常管理任务的自动化，还适用于开发者进行复杂的脚本编写和配置管理。通过 PowerShell，用户可以轻松地执行复杂的操作任务，自动化日常管理工作，简化运维流程，并提高工作效率。

**PowerShell 通过 cmdlet（发音为 "command-let"）来执行任务。**每个 cmdlet 通常由一个动词和一个名词组成，例如 `Get-Process` 用于获取进程信息。PowerShell 还支持面向对象的管道（Pipeline），允许 cmdlet 之间传递对象，而不仅仅是文本，这使得数据处理更加直观和强大。

### 发展历史

#### 初期发展

**2006 年：Windows PowerShell 1.0** PowerShell 最初在 2006 年作为 Windows PowerShell 1.0 发布。这一版本基于 .NET Framework，旨在为系统管理员提供一种强大的命令行工具，用于自动化日常管理任务。1.0 版本的发布标志着微软在命令行和脚本语言方面迈出了重要的一步。

#### 版本演进

**2008 年：Windows PowerShell 2.0** 2008 年，微软发布了 Windows PowerShell 2.0。此版本引入了许多新功能，包括 PowerShell ISE（集成脚本环境）、高级函数、远程处理（Remoting）和模块（Modules）等。这些功能显著增强了 PowerShell 的灵活性和扩展性，使其成为一个更加全面的管理工具。

**2012 年：Windows PowerShell 3.0** Windows PowerShell 3.0 在 2012 年随 Windows Server 2012 和 Windows 8 一同发布。此版本进一步增强了脚本语言的功能，引入了工作流（Workflows）和改进的 cmdlet，增强了对任务自动化的支持。

**2013 年：Windows PowerShell 4.0** 2013 年发布的 Windows PowerShell 4.0 主要带来了 DSC（Desired State Configuration）功能，使管理员能够声明性地配置和管理系统，确保系统处于期望的状态。

**2016 年：Windows PowerShell 5.0** Windows PowerShell 5.0 于 2016 年发布，进一步引入了许多新功能，如类和枚举、自定义模块仓库、改进的 PowerShell ISE 以及增强的 DSC 功能。

#### 开源与跨平台

**2016 年：PowerShell Core 6.0** 2016 年，微软宣布 PowerShell 开源，并发布了 PowerShell Core 6.0。这是一个基于 .NET Core 的跨平台版本，能够在 Windows、MacOS 和 Linux 上运行。PowerShell Core 的发布标志着 PowerShell 从 Windows 独有工具转变为一个真正的跨平台管理框架。

#### 统一版本

**2020 年：PowerShell 7** 2020 年，微软发布了 PowerShell 7。这一版本基于 .NET Core 3.1，进一步改进了跨平台兼容性，并统一了 Windows PowerShell 和 PowerShell Core 的功能和体验。PowerShell 7 的发布标志着 PowerShell 进入了一个新的时代，提供了更高效、更灵活的自动化和管理解决方案。

#### 未来发展

**持续更新与社区参与** PowerShell 的发展一直得到社区的积极参与和贡献。微软通过 GitHub 开放源码，接受社区的反馈和贡献，使 PowerShell 不断演进和改进。PowerShell 7 之后的版本将继续增强性能、扩展功能，并进一步提升跨平台支持。

### PowerShell 与其他 Shell 的对比

| 比较维度       | PowerShell                           | CMD                             | Bash                             | Zsh                                            |
| -------------- | ------------------------------------ | ------------------------------- | -------------------------------- | ---------------------------------------------- |
| **平台支持**   | 跨平台（Windows, Mac, Linux）        | Windows                         | Unix 系统（Linux, Mac）          | Unix 系统（Linux, Mac）                        |
| **开发公司**   | 微软                                 | 微软                            | GNU                              | 开源社区                                       |
| **对象模型**   | 面向对象，操作 .NET 对象             | 基于字符串处理                  | 基于字符串处理                   | 基于字符串处理                                 |
| **管道机制**   | 支持对象管道                         | 不支持                          | 支持字符串管道                   | 支持字符串管道                                 |
| **脚本扩展名** | .ps1                                 | .bat, .cmd                      | .sh                              | .zsh                                           |
| **主要用途**   | 系统管理、自动化脚本                 | 简单任务自动化、批处理          | 系统管理、自动化脚本、服务器管理 | 系统管理、自动化脚本、服务器管理               |
| **交互界面**   | 图形界面（PowerShell ISE, VS Code）  | 无图形界面                      | 无图形界面                       | 无图形界面                                     |
| **错误处理**   | 高级错误处理机制（try/catch）        | 简单的错误处理（if errorlevel） | 基本错误处理                     | 基本错误处理                                   |
| **模块系统**   | 丰富的模块和包管理系统（PSGallery）  | 无模块系统                      | 基于文件和库                     | 基于文件和库                                   |
| **脚本调试**   | 强大的调试工具（断点、变量监视）     | 无直接调试工具                  | 基本调试工具（set -x, trap）     | 基本调试工具（set -x, trap）                   |
| **命令别名**   | 支持丰富的命令别名                   | 支持少量命令别名                | 支持命令别名                     | 支持强大的命令别名（包括 Bash 支持的所有别名） |
| **扩展性**     | 高度扩展性，通过 .NET 库和第三方模块 | 低扩展性                        | 中等扩展性，通过脚本和第三方工具 | 高度扩展性，通过插件系统                       |
| **内置命令**   | 丰富的内置 cmdlet 和函数             | 基本的内置命令                  | 丰富的内置命令                   | 丰富的内置命令                                 |
| **学习曲线**   | 相对陡峭，需要了解 .NET 对象模型     | 平缓，易于上手                  | 中等，需要了解 Unix 系统和命令   | 中等，需要了解 Unix 系统和命令                 |
| **文档支持**   | 强大的内置帮助系统（Get-Help）       | 基本的帮助命令（help, /?）      | 丰富的在线文档和社区支持         | 丰富的在线文档和社区支持                       |
| **社区支持**   | 活跃的官方和社区支持                 | 基本的官方和社区支持            | 广泛的社区支持                   | 广泛的社区支持                                 |

## 安装与配置

1. **下载：**从 [PowerShell GitHub 页面](https://github.com/PowerShell/PowerShell) 下载最新的 PowerShell 安装包。
2. **安装：**使用包管理器或者双击安装包，并按照提示进行安装。
3. **运行：**安装完成后，Windows 可以通过 Start 菜单启动 PowerShell，类 Unix 系统可以通过终端输入 `pwsh` 启动 PowerShell。
4. **更新：**可以通过 `Update-Help` 命令更新帮助文件，以便获取最新的帮助文档。
5. **设置执行策略（可选）**：PowerShell 的执行策略决定了脚本能否在系统上运行。可以使用 `Set-ExecutionPolicy RemoteSigned` 允许本地脚本和从受信任来源下载的脚本运行。

## 基础命令与语法

### 命令基础

PowerShell 中的命令被称为 cmdlet（发音为 "command-let"）。每个 cmdlet 通常由一个动词和一个名词组成，例如 `Get-Process`、`Set-Location`。cmdlet 具有一致的命名规范和结构，使得命令的学习和使用更加直观和简单。可以通过以下命令获取系统中的所有 cmdlet 列表：

```powershell
Get-Command
```

此外，`Get-Command` 还可以用于查找特定的命令或 cmdlet。例如，要查找所有与 "process" 相关的命令，可以使用：

```powershell
Get-Command *process*
```

### cmdlet 结构（动词 - 名词）

**PowerShell 的 cmdlet 以 "动词-名词" 形式命名，动词描述动作，名词描述操作对象。**例如：

```powershell
Get-Process # 获取当前运行的进程
Set-Location # 设置当前工作目录
```

#### 常见动词

| 动词      | 用途说明       | 示例                              |
| --------- | -------------- | --------------------------------- |
| `Get`     | 获取信息或对象 | `Get-Process` 获取当前运行的进程  |
| `Set`     | 设置或配置对象 | `Set-Location` 设置当前工作目录   |
| `New`     | 创建新的对象   | `New-Item` 创建新文件或目录       |
| `Remove`  | 删除对象       | `Remove-Item` 删除文件或目录      |
| `Start`   | 启动操作或进程 | `Start-Process` 启动一个进程      |
| `Stop`    | 停止操作或进程 | `Stop-Process` 停止一个进程       |
| `Restart` | 重启操作或进程 | `Restart-Service` 重启服务        |
| `Test`    | 测试或验证操作 | `Test-Connection` 测试网络连接    |
| `Invoke`  | 执行操作       | `Invoke-Command` 执行命令         |
| `Export`  | 导出数据或对象 | `Export-Csv` 导出到 CSV 文件      |
| `Import`  | 导入数据或对象 | `Import-Csv` 从 CSV 文件导入数据  |
| `Out`     | 输出数据到目标 | `Out-File` 输出到文件             |
| `Write`   | 写入数据到目标 | `Write-Output` 写入输出流         |
| `Read`    | 读取数据       | `Read-Host` 从用户输入读取数据    |
| `Enable`  | 启用对象       | `Enable-PSRemoting` 启用远程处理  |
| `Disable` | 禁用对象       | `Disable-PSRemoting` 禁用远程处理 |
| `Clear`   | 清除数据或对象 | `Clear-Content` 清除文件内容      |
| `Select`  | 选择数据或对象 | `Select-Object` 选择对象的属性    |
| `Measure` | 计算或测量数据 | `Measure-Object` 计算对象的属性   |
| `Compare` | 比较数据或对象 | `Compare-Object` 比较对象         |
| `Convert` | 转换数据格式   | `ConvertTo-Json` 转换为 JSON 格式 |
| `Sort`    | 排序数据       | `Sort-Object` 对对象进行排序      |
| `Group`   | 分组数据       | `Group-Object` 对对象进行分组     |
| `Join`    | 连接数据       | `Join-Path` 连接路径              |
| `Split`   | 分割数据       | `Split-Path` 分割路径             |

### 管道（Pipeline）和对象流

PowerShell 的一个重要特性是管道（Pipeline），允许将一个 cmdlet 的输出直接传递给下一个 cmdlet 作为输入。管道在 PowerShell 中不仅传递文本，还可以传递对象，这使得数据处理更加直观和灵活。例如：

```powershell
# 上获取所有进程，并筛选出 CPU 使用率大于 100 的进程。
Get-Process | Where-Object { $_.CPU -gt 100 }
```

在这个示例中，`Get-Process` cmdlet 的输出传递给 `Where-Object` cmdlet 进行过滤。`$_` 是管道中的当前对象，`$_` 后面可以跟对象的属性进行操作。

管道的另一个常见用法是将多个 cmdlet 串联起来以完成复杂任务。例如：

```powershell
# 获取所有运行的服务，筛选出已停止的服务，并重新启动它们
Get-Service | Where-Object { $_.Status -eq 'Stopped' } | Start-Service
```

### 获取帮助和使用 Get-Help 

PowerShell 提供了强大的内置帮助系统，可以通过 `Get-Help` 命令获取详细的帮助信息。`Get-Help` 是学习和查找 cmdlet 详细信息的最佳方式。例如，要了解 `Get-Process` cmdlet，可以使用：

```powershell
Get-Help Get-Process
```

使用 `Update-Help` 命令可以更新本地的帮助文件，以确保获取到最新的帮助信息：

```powershell
Update-Help
```

## 核心概念

### 变量

在 PowerShell 中，变量以 `$` 符号开头，并且是动态类型的。这意味着你可以在变量中存储任何类型的数据，而无需提前声明变量的类型。定义和使用变量的示例如下：

```powershell
# 定义变量
$name = "John"
$age = 30
$fruits = @("Apple", "Banana", "Cherry")

# 使用变量
Write-Output "Name: $name, Age: $age"
Write-Output "Fruits: $($fruits -join ', ')"
```

### 数据类型

| 数据类型            | 描述       | 示例                                         |
| ------------------- | ---------- | -------------------------------------------- |
| 字符串（String）    | 文本数据   | `$string = "Hello, World!"`                  |
| 整数（Integer）     | 整数型数值 | `$integer = 42`                              |
| 浮点数（Float）     | 浮点型数值 | `$float = 3.14`                              |
| 数组（Array）       | 有序集合   | `$array = @(1, 2, 3, 4, 5)`                  |
| 哈希表（Hashtable） | 键值对集合 | `$hashtable = @{ Name = "Alice"; Age = 25 }` |

### 算术运算符

| 运算符 | 描述         | 示例      |
| ------ | ------------ | --------- |
| `+`    | 加法         | `$a + $b` |
| `-`    | 减法         | `$a - $b` |
| `*`    | 乘法         | `$a * $b` |
| `/`    | 除法         | `$a / $b` |
| `%`    | 取模（余数） | `$a % $b` |

### 比较运算符

| 运算符 | 描述       | 示例        |
| ------ | ---------- | ----------- |
| `-eq`  | 等于       | `$a -eq $b` |
| `-ne`  | 不等于     | `$a -ne $b` |
| `-gt`  | 大于       | `$a -gt $b` |
| `-ge`  | 大于或等于 | `$a -ge $b` |
| `-lt`  | 小于       | `$a -lt $b` |
| `-le`  | 小于或等于 | `$a -le $b` |

### 逻辑运算符

| 运算符 | 描述 | 示例         |
| ------ | ---- | ------------ |
| `-and` | 与   | `$a -and $b` |
| `-or`  | 或   | `$a -or $b`  |
| `-not` | 非   | `-not $a`    |

### 特殊运算符

| 运算符      | 描述                 | 示例                     |
| ----------- | -------------------- | ------------------------ |
| `-match`    | 正则表达式匹配       | `$string -match "Power"` |
| `-like`     | 通配符匹配           | `$string -like "Power*"` |
| `-contains` | 检查数组是否包含元素 | `$array -contains 3`     |

## 流程控制

### 条件语句

#### if/else 语句

`if` 语句用于根据条件执行不同的代码块。`else` 和 `elseif` 子句可以用于添加更多条件：

```powershell
$a = 10

if ($a -gt 5) {
    Write-Output "a is greater than 5"
} elseif ($a -eq 5) {
    Write-Output "a is equal to 5"
} else {
    Write-Output "a is less than 5"
}
```

#### switch 语句

`switch` 语句用于根据多个条件执行不同的代码块，可以替代多个 `if/else` 语句：

```powershell
$day = "Tuesday"

switch ($day) {
    "Monday" { Write-Output "Today is Monday" }
    "Tuesday" { Write-Output "Today is Tuesday" }
    "Wednesday" { Write-Output "Today is Wednesday" }
    default { Write-Output "Today is another day" }
}
```

### 循环语句

#### for 循环

`for` 循环用于执行一组语句一定次数，通常用于需要明确循环次数的情况：

```powershell
for ($i = 0; $i -lt 5; $i++) {
    Write-Output "Iteration $i"
}
```

#### foreach 循环

`foreach` 循环用于遍历数组或集合中的每个元素：

```powershell
$array = @(1, 2, 3, 4, 5)

foreach ($item in $array) {
    Write-Output "Item: $item"
}
```

#### while 循环

`while` 循环在指定条件为真时重复执行一组语句。适用于条件未知，需要动态检查的情况：

```powershell
$i = 0

while ($i -lt 5) {
    Write-Output "Iteration $i"
    $i++
}
```

#### do-while 循环

`do-while` 循环与 `while` 循环类似，但它至少会执行一次循环体，然后在循环体末尾检查条件：

```powershell
$i = 0

do {
    Write-Output "Iteration $i"
    $i++
} while ($i -lt 5)
```

## 脚本编写

PowerShell 脚本文件的扩展名为 `.ps1`。可以使用任何文本编辑器编写脚本，然后在 PowerShell 控制台中运行：

```powershell
# 示例脚本：hello.ps1
$name = "World"
Write-Output "Hello, $name!"
```

在 PowerShell 控制台中执行脚本：

```powershell
.\hello.ps1
```

### 脚本参数和参数化脚本

可以通过 `param` 关键字定义脚本参数，使脚本更灵活和可重用：

```powershell
# 示例脚本：greet.ps1
param (
    [string]$name = "World"
)
Write-Output "Hello, $name!"
```

在 PowerShell 控制台中传递参数执行脚本：

```powershell
.\greet.ps1 -name "Alice"
```

### 注释和文档

使用 `#` 符号添加单行注释，使用 `<# ... #>` 添加多行注释：

```powershell
# 这是单行注释
Write-Output "This is a single-line comment."

<#
这是多行注释
可以跨越多行
#>
Write-Output "This is a multi-line comment."
```

良好的注释习惯可以提高脚本的可读性和维护性。例如：

```powershell
# 定义变量
$name = "PowerShell"  # 变量存储名称

# 输出问候信息
Write-Output "Hello, $name!"  # 打印问候信息
```

### 示例代码

以下是一个示例代码，展示了如何使用常见的数据类型和运算符，并结合条件语句和循环语句，获取并输出计算机的相关信息。代码包含详细的注释以帮助理解：

```powershell
# 定义变量
$computerName = "LocalHost" # 计算机名称
$memoryThreshold = 4 # 内存阈值（GB）

# 获取计算机的基本信息
$os = Get-WmiObject -Class Win32_OperatingSystem
$cpu = Get-WmiObject -Class Win32_Processor
$memory = Get-WmiObject -Class Win32_PhysicalMemory

# 输出计算机基本信息
Write-Output "Computer Name: $computerName"
Write-Output "Operating System: $($os.Caption)"
Write-Output "OS Version: $($os.Version)"
Write-Output "CPU: $($cpu.Name)"
Write-Output "Total Physical Memory: $([math]::round($os.TotalVisibleMemorySize / 1MB, 2)) GB"

# 检查物理内存是否低于阈值
$totalMemoryGB = [math]::round($os.TotalVisibleMemorySize / 1MB, 2)

if ($totalMemoryGB -lt $memoryThreshold) {
    Write-Output "Warning: Physical memory is below the threshold of $memoryThreshold GB."
} else {
    Write-Output "Physical memory is above the threshold."
}

# 使用 foreach 循环遍历和输出每条物理内存的信息
Write-Output "Detailed Physical Memory Info:"
foreach ($mem in $memory) {
    $memCapacityGB = [math]::round($mem.Capacity / 1GB, 2)
    Write-Output "Memory Module: $($mem.DeviceLocator), Capacity: $memCapacityGB GB"
}

# 使用 for 循环计算并输出每个逻辑磁盘的总大小和可用空间
$logicalDisks = Get-WmiObject -Class Win32_LogicalDisk -Filter "DriveType=3" # 仅获取本地磁盘

for ($i = 0; $i -lt $logicalDisks.Count; $i++) {
    $disk = $logicalDisks[$i]
    $totalSizeGB = [math]::round($disk.Size / 1GB, 2)
    $freeSpaceGB = [math]::round($disk.FreeSpace / 1GB, 2)
    Write-Output "Drive: $($disk.DeviceID), Total Size: $totalSizeGB GB, Free Space: $freeSpaceGB GB"
}

# 使用 while 循环等待特定进程启动（示例：notepad.exe）
$processName = "notepad.exe"
Write-Output "Waiting for $processName to start..."
while (-not (Get-Process -Name "notepad" -ErrorAction SilentlyContinue)) {
    Start-Sleep -Seconds 2
}
Write-Output "$processName has started."

# 使用 switch 语句输出当前操作系统类型
switch ($os.Caption) {
    "Microsoft Windows 10 Pro" { Write-Output "You are running Windows 10 Pro." }
    "Microsoft Windows Server 2019" { Write-Output "You are running Windows Server 2019." }
    default { Write-Output "Operating system not recognized." }
}

Write-Output "Script execution completed."

```

