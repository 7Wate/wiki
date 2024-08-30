---
title: PowerShell 高级
description: PowerShell 高级
keywords:
  - PowerShell
  - 高级
tags:
  - 技术/入门
  - PowerShell
author: 仲平
date: 2024-06-05
---

## 文件系统管理

### 管理文件和文件夹

PowerShell 提供了丰富的命令来管理文件和文件夹，包括创建、删除、复制、移动和重命名文件和文件夹。

#### 创建文件和文件夹

可以使用 `New-Item` 命令来创建文件和文件夹：

```powershell
# 创建文件夹
New-Item -Path "C:\Example" -ItemType Directory

# 创建文件
New-Item -Path "C:\Example\file.txt" -ItemType File
```

#### 删除文件和文件夹

可以使用 `Remove-Item` 命令来删除文件和文件夹：

```powershell
# 删除文件
Remove-Item -Path "C:\Example\file.txt"

# 删除文件夹及其所有内容
Remove-Item -Path "C:\Example" -Recurse
```

#### 复制和移动文件

可以使用 `Copy-Item` 和 `Move-Item` 命令来复制和移动文件：

```powershell
# 复制文件
Copy-Item -Path "C:\Example\file.txt" -Destination "C:\Example\copy_of_file.txt"

# 移动文件
Move-Item -Path "C:\Example\file.txt" -Destination "C:\Example\moved_file.txt"
```

#### 重命名文件和文件夹

可以使用 `Rename-Item` 命令来重命名文件和文件夹：

```powershell
# 重命名文件
Rename-Item -Path "C:\Example\moved_file.txt" -NewName "renamed_file.txt"
```

### 文件内容的读取和写入

PowerShell 提供了便捷的方法来读取和写入文件内容。

#### 读取文件内容

可以使用 `Get-Content` 命令来读取文件内容：

```powershell
# 读取文件内容
Get-Content -Path "C:\Example\file.txt"
```

#### 写入文件内容

可以使用 `Set-Content` 和 `Add-Content` 命令来写入和追加文件内容：

```powershell
# 写入文件内容
Set-Content -Path "C:\Example\file.txt" -Value "Hello, World!"

# 追加文件内容
Add-Content -Path "C:\Example\file.txt" -Value "This is an appended line."
```

### 搜索文件和文件夹

可以使用 `Get-ChildItem` 命令来搜索文件和文件夹。支持通配符和递归搜索。

```powershell
# 搜索当前目录下的所有文件
Get-ChildItem -Path "C:\Example"

# 搜索当前目录及其子目录下的所有文件
Get-ChildItem -Path "C:\Example" -Recurse

# 使用通配符搜索特定类型的文件
Get-ChildItem -Path "C:\Example\*.txt"
```

### 文件属性和权限管理

可以使用 `Get-Item` 和 `Set-ItemProperty` 命令来获取和设置文件属性，以及使用 `Get-Acl` 和 `Set-Acl` 命令来管理文件权限。

#### 获取和设置文件属性

```powershell
# 获取文件属性
$file = Get-Item -Path "C:\Example\file.txt"
$file.Attributes

# 设置文件为只读
Set-ItemProperty -Path "C:\Example\file.txt" -Name Attributes -Value ReadOnly
```

#### 管理文件权限

```powershell
# 获取文件权限
$acl = Get-Acl -Path "C:\Example\file.txt"
$acl

# 设置文件权限
$acl.SetAccessRuleProtection($true, $false) # 禁用继承
$rule = New-Object System.Security.AccessControl.FileSystemAccessRule("Everyone", "Read", "Allow")
$acl.AddAccessRule($rule)
Set-Acl -Path "C:\Example\file.txt" -AclObject $acl
```

### 压缩和解压文件

可以使用 `Compress-Archive` 和 `Expand-Archive` 命令来压缩和解压文件。

#### 压缩文件

```powershell
# 压缩文件到 zip
Compress-Archive -Path "C:\Example\file.txt" -DestinationPath "C:\Example\archive.zip"
```

#### 解压文件

```powershell
# 解压 zip 文件
Expand-Archive -Path "C:\Example\archive.zip" -DestinationPath "C:\Example\Unzipped"
```

### 管理临时文件和文件夹

PowerShell 提供了一些命令来管理临时文件和文件夹。

#### 创建临时文件和文件夹

```powershell
# 创建临时文件
$tempFile = [System.IO.Path]::GetTempFileName()
New-Item -Path $tempFile -ItemType File

# 创建临时文件夹
$tempFolder = [System.IO.Path]::GetTempPath() + [System.Guid]::NewGuid().ToString()
New-Item -Path $tempFolder -ItemType Directory
```

## 注册表管理

PowerShell 可以读取和修改 Windows 注册表项，用于系统配置和管理。注册表操作涉及到读取、修改、新建和删除注册表项，以及管理注册表值和权限。

### 注册表概述

Windows 注册表是一个层次化数据库，存储了有关系统、硬件、用户配置和软件的信息。注册表包含多个根键，每个根键存储不同类型的信息：

- **HKEY_LOCAL_MACHINE (HKLM)**：存储计算机的硬件、软件、操作系统和安全性等全局设置，对所有用户生效。
- **HKEY_CURRENT_USER (HKCU)**：存储当前登录用户的配置信息和用户特定的设置。
- **HKEY_CLASSES_ROOT (HKCR)**：存储文件类型关联和 OLE 对象的配置信息。
- **HKEY_USERS (HKU)**：存储计算机上所有用户的配置信息，每个用户对应一个子键。
- **HKEY_CURRENT_CONFIG (HKCC)**：存储当前硬件配置文件的信息。

| 根键                           | 常见子键示例                                                |
| ------------------------------ | ----------------------------------------------------------- |
| **HKEY_LOCAL_MACHINE (HKLM)**  | `SYSTEM`：系统配置信息，包括硬件设置、驱动程序和服务。      |
|                                | `SOFTWARE`：安装在计算机上的软件和应用程序的信息。          |
|                                | `SECURITY`：安全策略和权限设置。                            |
|                                | `SAM`：安全帐户管理数据库的配置信息。                       |
|                                | `HARDWARE`：硬件抽象层和即插即用管理的信息。                |
| **HKEY_CURRENT_USER (HKCU)**   | `Software`：用户安装的软件和应用程序的配置信息。            |
|                                | `Control Panel`：用户的控制面板设置，如桌面背景和显示设置。 |
|                                | `Environment`：用户环境变量。                               |
|                                | `Network`：网络连接和配置的信息。                           |
|                                | `Printers`：用户的打印机和打印设置。                        |
| **HKEY_CLASSES_ROOT (HKCR)**   | `*\shell`：定义了所有文件类型的右键菜单命令。               |
|                                | `file`：特定文件类型的关联设置。                            |
|                                | `CLSID`：类标识符的配置信息。                               |
|                                | `Interface`：接口标识符的配置信息。                         |
| **HKEY_USERS (HKU)**           | `S-1-5-18`：LocalSystem 账户的设置。                        |
|                                | `S-1-5-19`：LocalService 账户的设置。                       |
|                                | `S-1-5-20`：NetworkService 账户的设置。                     |
|                                | `S-1-5-21-<User-SID>`：特定用户的配置信息。                 |
| **HKEY_CURRENT_CONFIG (HKCC)** | `System`：系统硬件配置文件。                                |
|                                | `Software`：与当前硬件配置相关的软件设置。                  |

### 读取和修改注册表项

#### 读取注册表项

可以使用 `Get-ItemProperty` 命令读取注册表项的值。

```powershell
# 读取注册表项值
Get-ItemProperty -Path "HKCU:\Software\Microsoft\Windows\CurrentVersion\Explorer"
```

#### 修改注册表项

可以使用 `Set-ItemProperty` 命令修改注册表项的值。

```powershell
# 修改注册表项值
Set-ItemProperty -Path "HKCU:\Software\Microsoft\Windows\CurrentVersion\Explorer" -Name "Maximize" -Value 1
```

#### 新建和删除注册表项

可以使用 `New-Item` 和 `Remove-Item` 命令来新建和删除注册表项。

```powershell
# 新建注册表项
New-Item -Path "HKCU:\Software\MyCompany"

# 删除注册表项
Remove-Item -Path "HKCU:\Software\MyCompany" -Recurse
```

#### 新建和删除注册表值

可以使用 `New-ItemProperty` 和 `Remove-ItemProperty` 命令来新建和删除注册表值。

```powershell
# 新建注册表值
New-ItemProperty -Path "HKCU:\Software\MyCompany" -Name "MyValue" -Value "TestValue" -PropertyType String

# 删除注册表值
Remove-ItemProperty -Path "HKCU:\Software\MyCompany" -Name "MyValue"
```

### 管理注册表权限

可以使用 `Get-Acl` 和 `Set-Acl` 命令来获取和设置注册表项的权限。

#### 获取注册表项权限

```powershell
# 获取注册表项权限
$acl = Get-Acl -Path "HKCU:\Software\MyCompany"
$acl
```

#### 设置注册表项权限

```powershell
# 设置注册表项权限
$acl = Get-Acl -Path "HKCU:\Software\MyCompany"
$rule = New-Object System.Security.AccessControl.RegistryAccessRule("Everyone", "FullControl", "Allow")
$acl.SetAccessRule($rule)
Set-Acl -Path "HKCU:\Software\MyCompany" -AclObject $acl
```

### 备份和还原注册表项

可以使用 `reg.exe` 命令来备份和还原注册表项。

#### 备份注册表项

```powershell
# 备份注册表项到文件
reg export "HKCU\Software\MyCompany" "C:\Backup\MyCompany.reg"
```

#### 还原注册表项

```powershell
# 从文件还原注册表项
reg import "C:\Backup\MyCompany.reg"
```

## 进程和服务管理

PowerShell 提供了强大的功能来管理系统进程和 Windows 服务。

### 管理系统进程

#### 获取进程信息

可以使用 `Get-Process` 命令来获取系统中运行的所有进程的信息，或获取特定进程的信息。

```powershell
# 获取所有进程信息
Get-Process

# 获取特定进程信息
Get-Process -Name "notepad"
```

#### 启动和停止进程

可以使用 `Start-Process` 命令来启动进程，使用 `Stop-Process` 命令来停止进程。

```powershell
# 启动进程
Start-Process -FilePath "notepad.exe"

# 停止进程
Stop-Process -Name "notepad"
```

#### 获取和管理进程详细信息

可以获取进程的详细信息，如内存使用情况、CPU 使用率等，还可以暂停和恢复进程。

```powershell
# 获取进程的详细信息
Get-Process -Name "notepad" | Select-Object -Property Name, Id, CPU, WS

# 暂停进程
Suspend-Process -Name "notepad"

# 恢复进程
Resume-Process -Name "notepad"
```

### 管理 Windows 服务

PowerShell 提供了全面的命令来管理 Windows 服务，包括获取服务信息、启动和停止服务、设置服务启动类型等。

#### 获取服务信息

可以使用 `Get-Service` 命令来获取系统中的所有服务的信息，或获取特定服务的信息。

```powershell
# 获取所有服务信息
Get-Service

# 获取特定服务信息
Get-Service -Name "wuauserv"
```

#### 启动和停止服务

可以使用 `Start-Service` 和 `Stop-Service` 命令来启动和停止服务。

```powershell
# 启动服务
Start-Service -Name "wuauserv"

# 停止服务
Stop-Service -Name "wuauserv"
```

#### 重启服务

可以使用 `Restart-Service` 命令来重启服务。

```powershell
# 重启服务
Restart-Service -Name "wuauserv"
```

#### 设置服务的启动类型

可以使用 `Set-Service` 命令来设置服务的启动类型，例如设置为自动启动或手动启动。

```powershell
# 将服务设置为自动启动
Set-Service -Name "wuauserv" -StartupType Automatic

# 将服务设置为手动启动
Set-Service -Name "wuauserv" -StartupType Manual
```

#### 管理服务依赖项

可以使用 `sc.exe` 命令来设置服务的依赖项，使服务在启动时依赖于其他服务。

```powershell
# 设置服务依赖于其他服务
sc.exe config "MyService" depend= "OtherService"
```

### Windows 服务管理

Windows 服务是运行在 Windows 操作系统上的长期运行进程，通常在系统启动时自动启动，并在后台运行。使用 PowerShell 可以方便地创建、管理和配置 Windows 服务。

#### 创建 Windows 服务

创建 Windows 服务通常需要以下步骤：

1. 编写服务应用程序（通常使用 C# 或其他编程语言）。
2. 使用 PowerShell 注册服务。

##### 编写服务应用程序

你需要编写一个可以作为服务运行的应用程序。以下是一个简单的 C# 服务示例：

```c#
csharp复制代码using System;
using System.ServiceProcess;
using System.IO;

public class MyService : ServiceBase
{
    private FileSystemWatcher watcher;

    public MyService()
    {
        ServiceName = "MyService";
    }

    protected override void OnStart(string[] args)
    {
        watcher = new FileSystemWatcher();
        watcher.Path = "C:\\PathToWatch";
        watcher.Created += OnChanged;
        watcher.EnableRaisingEvents = true;
        File.AppendAllText("C:\\ServiceLog.txt", "Service started at " + DateTime.Now + Environment.NewLine);
    }

    private void OnChanged(object sender, FileSystemEventArgs e)
    {
        File.AppendAllText("C:\\ServiceLog.txt", $"File created: {e.FullPath} at {DateTime.Now}" + Environment.NewLine);
    }

    protected override void OnStop()
    {
        watcher.Dispose();
        File.AppendAllText("C:\\ServiceLog.txt", "Service stopped at " + DateTime.Now + Environment.NewLine);
    }

    public static void Main()
    {
        ServiceBase.Run(new MyService());
    }
}
```

编译此 C# 代码，生成一个可执行文件（如 `MyService.exe`）。

##### 使用 PowerShell 注册服务

编写完服务应用程序后，可以使用 PowerShell 注册服务：

```powershell
# 定义服务名称和路径
$serviceName = "MyService"
$serviceExePath = "C:\Path\To\MyService.exe"

# 使用 sc.exe 创建服务
sc.exe create $serviceName binPath= $serviceExePath

# 启动服务
Start-Service -Name $serviceName

# 检查服务状态
Get-Service -Name $serviceName
```

### 配置和管理 Windows 服务

使用 PowerShell，可以方便地管理 Windows 服务，包括启动、停止、重启和删除服务，以及配置服务的启动类型和依赖项。

#### 启动和停止服务

```powershell
# 启动服务
Start-Service -Name "MyService"

# 停止服务
Stop-Service -Name "MyService"
```

#### 重启服务

```powershell
# 重启服务
Restart-Service -Name "MyService"
```

#### 删除服务

```powershell
# 停止并删除服务
Stop-Service -Name "MyService"
sc.exe delete "MyService"
```

#### 修改服务启动类型

```powershell
# 将服务设置为自动启动
Set-Service -Name "MyService" -StartupType Automatic

# 将服务设置为手动启动
Set-Service -Name "MyService" -StartupType Manual
```

#### 设置服务依赖项

```powershell
# 设置服务依赖于其他服务
sc.exe config "MyService" depend= "OtherService"
```

### 示例脚本

以下是一个完整的示例脚本，用于创建、启动、检查、重启和删除服务：

```powershell
# 服务名称和路径
$serviceName = "MyService"
$serviceExePath = "C:\Path\To\MyService.exe"

# 创建服务
sc.exe create $serviceName binPath= $serviceExePath
Write-Output "Service $serviceName created."

# 启动服务
Start-Service -Name $serviceName
Write-Output "Service $serviceName started."

# 检查服务状态
$serviceStatus = Get-Service -Name $serviceName
Write-Output "Service $serviceName status: $($serviceStatus.Status)"

# 重启服务
Restart-Service -Name $serviceName
Write-Output "Service $serviceName restarted."

# 删除服务
Stop-Service -Name $serviceName
sc.exe delete $serviceName
Write-Output "Service $serviceName deleted."
```

## 用户和权限管理

PowerShell 提供了管理用户账户、组和权限的功能，帮助管理员高效地管理 Windows 系统的安全和用户权限。

### 用户和组的管理

PowerShell 提供了一系列命令来管理本地用户和组，包括创建、删除和修改用户和组的属性。

#### 创建和删除用户

使用 `New-LocalUser` 命令可以创建新用户，使用 `Remove-LocalUser` 命令可以删除用户。

```powershell
# 创建新用户
New-LocalUser -Name "NewUser" -Password (ConvertTo-SecureString "P@ssw0rd" -AsPlainText -Force) -FullName "New User" -Description "This is a new user."

# 删除用户
Remove-LocalUser -Name "NewUser"
```

#### 创建和删除组

使用 `New-LocalGroup` 命令可以创建新组，使用 `Remove-LocalGroup` 命令可以删除组。

```powershell
# 创建新组
New-LocalGroup -Name "NewGroup" -Description "This is a new group."

# 删除组
Remove-LocalGroup -Name "NewGroup"
```

#### 将用户添加到组

使用 `Add-LocalGroupMember` 命令可以将用户添加到组，使用 `Remove-LocalGroupMember` 命令可以将用户从组中移除。

```powershell
# 将用户添加到组
Add-LocalGroupMember -Group "Administrators" -Member "NewUser"

# 将用户从组中移除
Remove-LocalGroupMember -Group "Administrators" -Member "NewUser"
```

#### 查看用户和组信息

使用 `Get-LocalUser` 命令可以查看用户信息，使用 `Get-LocalGroup` 命令可以查看组信息。

```powershell
# 查看所有本地用户
Get-LocalUser

# 查看特定用户信息
Get-LocalUser -Name "NewUser"

# 查看所有本地组
Get-LocalGroup

# 查看特定组信息
Get-LocalGroup -Name "Administrators"
```

### 权限设置

PowerShell 提供了管理文件和文件夹权限的功能，可以查看和修改文件系统 ACL（访问控制列表）。

#### 查看文件和文件夹权限

使用 `Get-Acl` 命令可以查看文件和文件夹的权限。

```powershell
# 查看文件权限
Get-Acl -Path "C:\Example\file.txt"

# 查看文件夹权限
Get-Acl -Path "C:\Example"
```

#### 修改文件和文件夹权限

可以使用 `Set-Acl` 命令来修改文件和文件夹的权限。需要先获取现有的 ACL，然后添加或修改权限规则，最后应用新的 ACL。

```powershell
# 获取现有权限
$acl = Get-Acl -Path "C:\Example\file.txt"

# 定义新的权限规则
$permission = "DOMAIN\Username", "FullControl", "Allow"
$accessRule = New-Object System.Security.AccessControl.FileSystemAccessRule $permission

# 添加权限规则
$acl.SetAccessRule($accessRule)

# 应用新的权限设置
Set-Acl -Path "C:\Example\file.txt" -AclObject $acl
```

#### 删除文件和文件夹权限

可以删除特定的权限规则。

```powershell
# 获取现有权限
$acl = Get-Acl -Path "C:\Example\file.txt"

# 定义要删除的权限规则
$permission = "DOMAIN\Username", "FullControl", "Allow"
$accessRule = New-Object System.Security.AccessControl.FileSystemAccessRule $permission

# 删除权限规则
$acl.RemoveAccessRule($accessRule)

# 应用新的权限设置
Set-Acl -Path "C:\Example\file.txt" -AclObject $acl
```

#### 递归修改文件夹权限

可以递归修改文件夹及其子文件夹和文件的权限。

```powershell
# 获取文件夹及其子文件夹和文件
$items = Get-ChildItem -Path "C:\Example" -Recurse

# 修改每个项目的权限
foreach ($item in $items) {
    $acl = Get-Acl -Path $item.FullName
    $accessRule = New-Object System.Security.AccessControl.FileSystemAccessRule ("DOMAIN\Username", "Modify", "ContainerInherit,ObjectInherit", "None", "Allow")
    $acl.SetAccessRule($accessRule)
    Set-Acl -Path $item.FullName -AclObject $acl
}
```

### 远程用户和权限管理

PowerShell 还提供了远程管理用户和权限的功能，通过 PowerShell Remoting 可以管理远程计算机上的用户和权限。

#### 启用 PowerShell Remoting

```powershell
# 启用 PowerShell Remoting
Enable-PSRemoting -Force
```

#### 远程执行命令

可以使用 `Invoke-Command` 命令在远程计算机上执行用户和权限管理命令。

```powershell
# 在远程计算机上创建用户
Invoke-Command -ComputerName "RemoteComputer" -ScriptBlock {
    New-LocalUser -Name "RemoteUser" -Password (ConvertTo-SecureString "P@ssw0rd" -AsPlainText -Force) -FullName "Remote User" -Description "This is a remote user."
}

# 在远程计算机上设置文件权限
Invoke-Command -ComputerName "RemoteComputer" -ScriptBlock {
    $acl = Get-Acl -Path "C:\RemoteExample\file.txt"
    $permission = "DOMAIN\Username", "FullControl", "Allow"
    $accessRule = New-Object System.Security.AccessControl.FileSystemAccessRule $permission
    $acl.SetAccessRule($accessRule)
    Set-Acl -Path "C:\RemoteExample\file.txt" -AclObject $acl
}
```

## 网络管理

PowerShell 提供了强大的工具来管理和配置网络，包括查看和设置网络适配器、IP 地址、DNS 服务器以及测试网络连接。还可以通过 PowerShell 进行远程管理。

### 网络配置

#### 获取和设置网络配置

PowerShell 提供了丰富的 cmdlet 来获取和设置网络配置，包括查看网络适配器信息、配置 IP 地址等。

##### 获取网络适配器信息

使用 `Get-NetAdapter` 命令可以查看所有网络适配器的信息，使用 `Get-NetIPAddress` 命令可以获取网络配置。

```powershell
# 获取所有网络适配器信息
Get-NetAdapter

# 获取特定网络适配器信息
Get-NetAdapter -Name "Ethernet"
```

##### 获取网络配置

```powershell
# 获取所有网络适配器的 IP 配置
Get-NetIPAddress

# 获取特定网络适配器的 IP 配置
Get-NetIPAddress -InterfaceAlias "Ethernet"
```

##### 设置网络配置

使用 `New-NetIPAddress` 和 `Set-DnsClientServerAddress` 命令可以配置静态 IP 地址和 DNS 服务器。

```powershell
# 设置静态 IP 地址
New-NetIPAddress -InterfaceAlias "Ethernet" -IPAddress "192.168.1.100" -PrefixLength 24 -DefaultGateway "192.168.1.1"

# 设置 DNS 服务器
Set-DnsClientServerAddress -InterfaceAlias "Ethernet" -ServerAddresses "8.8.8.8", "8.8.4.4"
```

##### 设置 DHCP

使用 `Remove-NetIPAddress` 和 `Set-DnsClientServerAddress` 命令可以将网络配置改为 DHCP。

```powershell
# 移除静态 IP 地址以启用 DHCP
Remove-NetIPAddress -InterfaceAlias "Ethernet" -Confirm:$false

# 设置 DNS 服务器为自动获取
Set-DnsClientServerAddress -InterfaceAlias "Ethernet" -ResetServerAddresses
```

#### 配置防火墙

PowerShell 还可以用于配置防火墙规则。

```powershell
# 查看现有防火墙规则
Get-NetFirewallRule

# 新建入站规则允许 HTTP 流量
New-NetFirewallRule -DisplayName "Allow HTTP" -Direction Inbound -Protocol TCP -LocalPort 80 -Action Allow

# 新建出站规则阻止 FTP 流量
New-NetFirewallRule -DisplayName "Block FTP" -Direction Outbound -Protocol TCP -RemotePort 21 -Action Block
```

### 测试网络连接

PowerShell 提供了多种方法来测试网络连接，例如使用 `Test-Connection` 和 `Test-NetConnection` cmdlet。

#### 测试网络连通性

使用 `Test-Connection` 命令可以测试网络连接，类似于 `ping` 命令。

```powershell
# 使用 Test-Connection 测试网络连接
Test-Connection -ComputerName "www.google.com" -Count 4

# 使用 Test-NetConnection 测试特定端口的网络连接
Test-NetConnection -ComputerName "www.google.com" -Port 80
```

### 远程管理

PowerShell 提供了强大的远程管理功能，可以通过 WinRM（Windows Remote Management）和 SSH 进行远程管理。

#### 使用 PowerShell 进行远程管理（WinRM, SSH）

##### 启用 WinRM

```powershell
# 启用 WinRM 服务
Enable-PSRemoting -Force
```

##### 配置 SSH

```powershell
# 安装 OpenSSH 客户端和服务器（Windows 10 及以上版本）
Add-WindowsCapability -Online -Name OpenSSH.Client*
Add-WindowsCapability -Online -Name OpenSSH.Server*

# 启动并配置 SSH 服务
Start-Service sshd
Set-Service -Name sshd -StartupType 'Automatic'

# 配置防火墙规则允许 SSH 连接
New-NetFirewallRule -Name sshd -DisplayName 'OpenSSH Server (sshd)' -Enabled True -Direction Inbound -Protocol TCP -Action Allow -LocalPort 22
```

#### 使用 Invoke-Command 和 Enter-PSSession

##### 使用 `Invoke-Command` 在远程计算机上执行命令

```powershell
# 在远程计算机上执行命令
Invoke-Command -ComputerName "RemoteComputerName" -ScriptBlock { Get-Process }

# 使用凭证执行命令
$cred = Get-Credential
Invoke-Command -ComputerName "RemoteComputerName" -Credential $cred -ScriptBlock { Get-Process }
```

##### 使用 `Enter-PSSession` 进入远程会话

```powershell
# 进入远程计算机的 PowerShell 会话
Enter-PSSession -ComputerName "RemoteComputerName"

# 使用凭证进入远程会话
$cred = Get-Credential
Enter-PSSession -ComputerName "RemoteComputerName" -Credential $cred

# 退出远程会话
Exit-PSSession
```

### 高级网络配置

#### 配置网络流量控制（QoS）

```powershell
# 创建 QoS 策略
New-NetQosPolicy -Name "QoSPolicy1" -AppPathNameMatchCondition "C:\Program Files\ExampleApp\Example.exe" -IPDstPortMatchCondition 80 -ThrottleRateActionBitsPerSecond 50000000

# 查看现有 QoS 策略
Get-NetQosPolicy

# 删除 QoS 策略
Remove-NetQosPolicy -Name "QoSPolicy1"
```

#### 配置路由

```powershell
# 查看路由表
Get-NetRoute

# 添加静态路由
New-NetRoute -DestinationPrefix "10.0.0.0/24" -NextHop "192.168.1.1" -InterfaceAlias "Ethernet"

# 删除静态路由
Remove-NetRoute -DestinationPrefix "10.0.0.0/24" -NextHop "192.168.1.1" -InterfaceAlias "Ethernet"
```

通过以上内容和示例，

## 自动化

PowerShell 是一个功能强大的自动化工具，可以帮助系统管理员和 IT 专业人员简化和自动化各种任务。本文将介绍如何使用 PowerShell 创建和管理计划任务，以及自动化日常管理任务的示例。

### 任务计划

#### 使用 PowerShell 创建计划任务

PowerShell 提供了 `ScheduledTasks` 模块，可以方便地创建和管理计划任务。以下是一些常见的计划任务操作示例：

##### 创建计划任务

使用 `New-ScheduledTaskAction`、`New-ScheduledTaskTrigger` 和 `Register-ScheduledTask` 命令可以创建计划任务。

```powershell
# 定义任务动作
$action = New-ScheduledTaskAction -Execute 'PowerShell.exe' -Argument '-NoProfile -WindowStyle Hidden -File C:\Scripts\MyScript.ps1'

# 定义触发器，每天上午 8 点执行
$trigger = New-ScheduledTaskTrigger -Daily -At 8am

# 定义任务设置
$settings = New-ScheduledTaskSettingsSet -AllowStartIfOnBatteries -DontStopIfGoingOnBatteries

# 创建计划任务
Register-ScheduledTask -Action $action -Trigger $trigger -Settings $settings -TaskName "MyDailyTask" -Description "My daily PowerShell script task"
```

##### 查看计划任务

使用 `Get-ScheduledTask` 命令可以查看所有或特定的计划任务。

```powershell
# 获取所有计划任务
Get-ScheduledTask

# 获取特定计划任务
Get-ScheduledTask -TaskName "MyDailyTask"
```

##### 修改计划任务

使用 `Set-ScheduledTask` 命令可以修改现有计划任务的触发器、动作等。

```powershell
# 修改计划任务的触发器
$trigger = New-ScheduledTaskTrigger -Weekly -DaysOfWeek Monday,Wednesday,Friday -At 8am
Set-ScheduledTask -TaskName "MyDailyTask" -Trigger $trigger
```

##### 删除计划任务

使用 `Unregister-ScheduledTask` 命令可以删除计划任务。

```powershell
# 删除计划任务
Unregister-ScheduledTask -TaskName "MyDailyTask" -Confirm:$false
```

#### 任务的调度和管理

除了创建计划任务，PowerShell 还可以管理任务的调度和执行情况。

##### 启动和停止计划任务

```powershell
# 启动计划任务
Start-ScheduledTask -TaskName "MyDailyTask"

# 停止计划任务
Stop-ScheduledTask -TaskName "MyDailyTask"
```

##### 获取计划任务运行历史

使用 `Get-ScheduledTaskInfo` 命令可以获取计划任务的运行历史。

```powershell
# 获取任务的最近运行历史
Get-ScheduledTaskInfo -TaskName "MyDailyTask"
```

### 自动化常见任务

#### 自动化日常管理任务

PowerShell 可以自动化许多日常管理任务，如备份文件、清理日志、监控系统等。

##### 自动备份文件

以下脚本展示了如何使用 PowerShell 自动备份文件。

```powershell
# 自动备份文件脚本
$sourcePath = "C:\Data"
$backupPath = "D:\Backup"
$timestamp = Get-Date -Format "yyyyMMddHHmmss"
$backupDestination = "$backupPath\DataBackup_$timestamp.zip"

# 压缩并备份文件
Compress-Archive -Path $sourcePath -DestinationPath $backupDestination
Write-Output "Backup completed: $backupDestination"
```

##### 自动清理日志

以下脚本展示了如何使用 PowerShell 自动清理超过 30 天的日志文件。

```powershell
# 自动清理超过 30 天的日志文件
$logPath = "C:\Logs"
$daysOld = 30

# 获取并删除旧日志文件
Get-ChildItem -Path $logPath -Filter *.log | Where-Object { $_.LastWriteTime -lt (Get-Date).AddDays(-$daysOld) } | Remove-Item -Force
Write-Output "Old log files cleaned up."
```

#### 脚本的自动化执行

通过计划任务或事件触发器，可以自动执行 PowerShell 脚本，实现任务自动化。

##### 通过计划任务自动执行脚本

使用计划任务可以定期执行脚本。

```powershell
# 创建计划任务以定期执行脚本
$action = New-ScheduledTaskAction -Execute 'PowerShell.exe' -Argument '-NoProfile -WindowStyle Hidden -File C:\Scripts\MyScript.ps1'
$trigger = New-ScheduledTaskTrigger -Daily -At 6pm
Register-ScheduledTask -Action $action -Trigger $trigger -TaskName "EveningScriptTask"
```

##### 事件触发自动执行脚本

使用事件触发器可以在特定事件发生时执行脚本，例如系统启动时。

```powershell
# 创建事件触发器
$trigger = New-ScheduledTaskTrigger -AtStartup

# 创建计划任务在系统启动时执行脚本
$action = New-ScheduledTaskAction -Execute 'PowerShell.exe' -Argument '-NoProfile -WindowStyle Hidden -File C:\Scripts\StartupScript.ps1'
Register-ScheduledTask -Action $action -Trigger $trigger -TaskName "StartupScriptTask"
```
