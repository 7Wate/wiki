---
title: Ansible
description: Ansible 自动化运维管理
keywords:
  - Ansible
  - 自动化运维
  - DevOps
tags:
  - 技术/操作系统
  - 自动化/Linux
  - Linux/安装
author: 仲平
date: 2024-05-15
---

## Ansible

Ansible 是一个开源的自动化工具，主要用于配置管理、应用部署、编排（Orchestration）等。由 Michael DeHaan 于 2012 年创建，Ansible 的设计理念是简单易用、无代理（Agentless）和基于推送的模型。通过简单的 YAML 文件（称为剧本，Playbooks）定义自动化任务，Ansible 能帮助系统管理员和开发人员在大量服务器上快速、可靠地执行各种操作。

### Ansible 历史与发展

Ansible 由 Michael DeHaan 创建，并在 2012 年发布首个版本。它迅速在 DevOps 社区中获得了广泛的关注和使用，因其易用性和强大的功能。2015 年，Ansible 被 Red Hat 收购，这使其发展得更为迅速和稳定。如今，Ansible 已成为业界领先的自动化工具之一，被广泛应用于各类企业和组织中。

#### 为什么选择 Ansible

1. **简单易用**：Ansible 采用 YAML 作为配置语言，简单明了，易于理解和编写。
2. **无代理架构**：Ansible 不需要在被管理的节点上安装任何代理软件，减少了维护成本和复杂性。
3. **强大的模块支持**：Ansible 提供了数百个模块，支持多种操作系统、云平台、网络设备等。
4. **声明式配置**：Ansible 允许用户通过声明式配置文件定义所需状态，确保系统的一致性。
5. **社区活跃**：Ansible 拥有一个活跃的开源社区，丰富的文档和资源，支持广泛。

### Ansible 架构概述

![](https://static.7wate.com/2024%2F05%2F16%2F60b689d609a756040c7d4bcbc25ab74a-Understanding-Ansible-Architecture-using-diagram3.png)

Ansible 的架构设计非常简洁，主要包括以下几个组件：

- **控制节点（Control Node）**：运行 Ansible 的机器，通常是管理员的工作站或管理服务器。所有的 Ansible 命令和 Playbook 都从控制节点执行。
- **被管理节点（Managed Nodes）**：通过 SSH 或 WinRM 连接并由 Ansible 控制的机器，这些节点可以是物理服务器、虚拟机、容器，或网络设备等。
- **剧本（Playbooks）**：使用 YAML 编写的配置文件，定义了一系列的任务和操作，用于配置、部署和编排多个被管理节点上的资源。
- **模块（Modules）**：Ansible 的基本执行单元，每个模块都实现了特定的功能，如安装软件包、管理文件、执行命令等。Ansible 提供了数百个内置模块，并允许用户编写自定义模块。
- **插件（Plugins）**：扩展 Ansible 功能的小程序，包括连接插件（connection plugins）、回调插件（callback plugins）、过滤插件（filter plugins）等，增强 Ansible 的灵活性和功能。
- **清单（Inventory）**：定义被管理节点及其分组信息的文件，可以是静态文件（如 INI 或 YAML 格式）或动态生成的脚本，支持定义主机变量和组变量。
- **角色（Roles）**：将剧本、任务、处理程序、变量、模板和文件等组织在一起的目录结构，用于复用和共享配置，实现配置管理的模块化和标准化。

### Ansible 主要特性

#### 无代理架构

Ansible 采用无代理架构，这意味着它不需要在被管理的节点上安装任何软件或代理。Ansible 通过 SSH 进行通信，简化了管理和维护工作，并提高了系统的安全性和可靠性。

#### 基于 YAML 的配置

Ansible 使用 YAML 作为其配置语言。YAML 简洁直观，易于阅读和编写，特别适合用来编写配置文件。通过 YAML 文件，用户可以定义各种自动化任务，轻松实现复杂的操作。

#### 以声明式为中心

Ansible 采用声明式配置模型，用户只需定义期望的系统状态，Ansible 会自动计算并执行所需的操作，确保系统达到期望状态。这种方式减少了配置错误，提高了系统的一致性和可维护性。

#### 广泛的模块支持

Ansible 提供了丰富的内置模块，涵盖了几乎所有常见的系统管理和应用部署任务。此外，Ansible 还支持用户编写自定义模块，满足特殊需求。模块可以通过官方 Ansible Galaxy 平台共享和下载，进一步扩展了 Ansible 的功能和应用范围。

### Ansible 应用场景

#### 配置管理

Ansible 可以用于配置管理，自动化配置服务器和网络设备。通过剧本定义配置细节，Ansible 能够确保大规模环境中所有设备的一致性，简化了系统维护和升级工作。

#### 应用部署

Ansible 支持自动化应用部署，从代码拉取、编译、安装到配置，均可以通过剧本实现。无论是简单的单机应用，还是复杂的多节点分布式系统，Ansible 都能有效管理和部署。

#### 编排（Orchestration）

Ansible 不仅可以执行单个任务，还可以编排复杂的工作流程。通过定义依赖关系和执行顺序，Ansible 能够协调多个服务和系统的协同工作，确保在多步骤操作中各个环节的正确执行。

## Ansible 安装与配置

### 系统要求

Ansible 设计为跨平台运行，支持多种操作系统，包括但不限于以下几种：

- **Linux**：支持绝大多数发行版，如 Ubuntu、CentOS、Debian、Red Hat Enterprise Linux (RHEL) 等。
- **macOS**：可以在 macOS 上安装并运行 Ansible，用于开发和测试环境。
- **Windows**：通过 WSL（Windows Subsystem for Linux）或在 Windows 上安装 Cygwin，可以在 Windows 上运行 Ansible。

**Ansible 运行时需要以下基本依赖项：**

- **Python**：Ansible 需要 Python 2.7 或 Python 3.5 及以上版本。
- **SSH**：Ansible 通过 SSH 与被管理节点通信，需要在控制节点和被管理节点上配置 SSH。
- **其他依赖**：根据具体模块需求，可能需要额外安装一些依赖包，例如用于云平台管理的 SDK。

### Ansible 安装步骤

#### 在不同操作系统上的安装

##### Ubuntu

在 Ubuntu 上安装 Ansible 非常简单，可以通过官方的包管理器 APT 进行安装：

```shell
sudo apt update
sudo apt install ansible
```

##### CentOS

在 CentOS 上，可以通过 EPEL（Extra Packages for Enterprise Linux）库安装 Ansible：

```shell
sudo yum install epel-release
sudo yum install ansible
```

##### macOS

在 macOS 上，可以使用 Homebrew 来安装 Ansible：

```shell
brew install ansible
```

#### 通过 Python Pip 安装

可以使用 Python 的包管理器 pip 来安装 Ansible，这种方法适用于任何支持 Python 的操作系统：

```shell
pip install ansible
```

#### 从源代码安装

从源代码安装适用于需要最新功能或定制 Ansible 的场景：

```shell
git clone https://github.com/ansible/ansible.git
cd ansible
source ./hacking/env-setup
```

这种方法需要额外的依赖包，具体可以参考 Ansible 官方文档。

### Ansible 配置方法

#### Ansible 配置文件结构（ansible.cfg）

Ansible 的配置文件 `ansible.cfg` 允许用户自定义 Ansible 的运行参数。该文件通常位于以下位置之一：

1. 当前目录下的 `ansible.cfg`
2. 用户主目录下的 `.ansible.cfg`
3. 全局配置文件 `/etc/ansible/ansible.cfg`

一个典型的 `ansible.cfg` 文件结构如下：

```ini
[defaults]
inventory = ./hosts
remote_user = ansible
private_key_file = ~/.ssh/id_rsa
host_key_checking = False

[privilege_escalation]
become = True
become_method = sudo
become_user = root
become_ask_pass = False

[ssh_connection]
ssh_args = -o ControlMaster=auto -o ControlPersist=60s
pipelining = True
```

#### Ansible 配置文件优先级

Ansible 允许在多个位置定义配置文件，并根据以下优先级顺序应用配置：

1. **命令行参数**：直接在命令行上指定的参数优先级最高。
2. **环境变量**：通过环境变量设置的配置次高优先级。
3. **ansible.cfg 文件：**
   1. 当前目录下的 `ansible.cfg`
   2. 用户主目录下的 `.ansible.cfg`
   3. 全局配置文件 `/etc/ansible/ansible.cfg`
4. **模块参数**：模块内部的参数配置。
5. **默认值**：Ansible 内部的默认值。

#### 常用配置选项

| 配置选项            | 说明                              |
| ------------------- | --------------------------------- |
| inventory           | 定义主机清单文件的位置。          |
| remote_user         | 指定远程主机的默认用户。          |
| private_key_file    | 定义用于 SSH 连接的私钥文件。     |
| host_key_checking   | 是否检查 SSH 主机密钥，默认启用。 |
| retry_files_enabled | 是否生成重试文件，默认启用。      |
| log_path            | 指定 Ansible 运行日志的存储路径。 |
| become              | 是否启用权限提升（如 sudo）。     |
| become_method       | 权限提升的方法（如 sudo 或 su）。 |
| become_user         | 权限提升后的目标用户。            |
| become_ask_pass     | 是否提示输入密码用于权限提升。    |
| ssh_args            | 定制 SSH 连接参数。               |
| pipelining          | 启用管道以提高性能。              |

#### SSH 密钥和认证配置

Ansible 通过 SSH 与被管理节点通信，配置 SSH 密钥认证可以提高安全性和自动化程度。

1. **生成 SSH 密钥对**：

```shell
ssh-keygen -t rsa -b 4096 -C "your_email@example.com"
```

生成的密钥文件通常存储在 `~/.ssh/` 目录下。

1. **将公钥添加到被管理节点**：

```shell
ssh-copy-id user@remote_host
```

或者手动将公钥添加到被管理节点的 `~/.ssh/authorized_keys` 文件中。

1. **配置 SSH 代理（可选）**： 使用 SSH 代理可以管理多个 SSH 密钥，提高连接效率：

```shell
eval "$(ssh-agent -s)"
ssh-add ~/.ssh/id_rsa
```

通过上述步骤，Ansible 可以无密码地通过 SSH 访问被管理节点，从而实现自动化操作。

## Ansible 自动化管理基础

### Ansible Playbooks

#### Playbook 的基本结构

Playbook 是 Ansible 的核心配置文件，用于定义一系列自动化任务。它使用 YAML 格式编写，主要由 Plays 和 Tasks 组成。一个典型的 Playbook 结构如下：

```yaml
- name: Describe the purpose of the playbook
  hosts: target_hosts_group
  become: yes
  vars:
    variable_name: value
  tasks:
    - name: Describe the task
      module_name:
        module_option: value
```

#### Playbook 的常用关键字

| 关键字                | 说明                                                     |
| --------------------- | -------------------------------------------------------- |
| `name`                | 描述 Play 或 Task 的名称，便于阅读和调试。               |
| `hosts`               | 指定目标主机或主机组，可以是一个或多个主机组名。         |
| `become`              | 是否启用权限提升（如 sudo），默认值为 `no`。             |
| `vars`                | 定义在 Play 级别的变量，适用于整个 Play。                |
| `tasks`               | 任务列表，每个任务调用一个模块执行特定操作。             |
| `roles`               | 指定在 Play 中包含的角色，角色是一个组织良好的任务集合。 |
| `handlers`            | 定义事件触发的任务，当其他任务通知这些处理程序时执行。   |
| `environment`         | 指定任务或 Play 级别的环境变量。                         |
| `gather_facts`        | 是否在 Play 开始时收集远程主机的信息，默认值为 `yes`。   |
| `notify`              | 通知一个或多个处理程序在任务完成时执行。                 |
| `when`                | 条件语句，用于在特定条件下执行任务。                     |
| `with_items`          | 循环语句，用于在任务中迭代一个列表。                     |
| `register`            | 捕获任务的输出结果并存储在变量中。                       |
| `tags`                | 为任务或 Play 打标签，便于选择性地运行特定任务或 Play。  |
| `ignore_errors`       | 是否忽略任务执行中的错误，继续执行后续任务。             |
| `delegate_to`         | 将任务委派给指定的主机执行，而不是在目标主机上执行。     |
| `serial`              | 控制任务并行执行的主机数量或批次大小。                   |
| `max_fail_percentage` | 允许的最大失败百分比，超过此比例时停止 Play。            |

#### 编写和运行第一个 Playbook

1. **编写 Playbook 文件**（如 `first_playbook.yml`）：

```yaml
- name: Install and start Apache web server
  hosts: webservers
  become: yes
  tasks:
    - name: Install Apache
      apt:
        name: apache2
        state: present
    - name: Start Apache service
      service:
        name: apache2
        state: started
```

1. **运行 Playbook**：

```bash
ansible-playbook first_playbook.yml
```

在此示例中，Playbook 定义了一个 Play，包含两个任务：一个用于安装 Apache Web 服务器，另一个用于启动 Apache 服务。`hosts` 指定了目标主机组为 `webservers`，并通过 `become: yes` 启用权限提升（通常是 sudo）。

#### 多 Play 和任务的组织

一个 Playbook 可以包含多个 Play，每个 Play 针对不同的主机组或执行不同的任务。这种结构有助于在一个 Playbook 中管理复杂的部署场景。

```yaml
- name: Setup web servers
  hosts: webservers
  become: yes
  tasks:
    - name: Install Apache
      apt:
        name: apache2
        state: present

    - name: Start Apache service
      service:
        name: apache2
        state: started

- name: Setup database servers
  hosts: dbservers
  become: yes
  tasks:
    - name: Install MySQL
      apt:
        name: mysql-server
        state: present

    - name: Start MySQL service
      service:
        name: mysql
        state: started
```

在此示例中，Playbook 包含两个 Play：第一个 Play 针对 `webservers` 主机组，安装并启动 Apache Web 服务器；第二个 Play 针对 `dbservers` 主机组，安装并启动 MySQL 数据库服务。

通过组织多个 Play 和任务，可以在一个 Playbook 中处理多种部署需求，提高配置管理的灵活性和可维护性。

### Ansible 模块

#### 常用模块

| 模块名称   | 用途                                            | 示例                                                         |
| ---------- | ----------------------------------------------- | ------------------------------------------------------------ |
| `file`     | 管理文件和目录                                  | `yaml\n- name: Create a directory\n file:\n path: /path/to/directory\n state: directory\n` |
| `service`  | 管理服务                                        | `yaml\n- name: Start a service\n service:\n name: nginx\n state: started\n` |
| `command`  | 执行命令                                        | `yaml\n- name: Run a command\n command: /usr/bin/uptime\n`   |
| `shell`    | 执行 shell 命令                                 | `yaml\n- name: Run a shell command\n shell: echo "Hello, world!" > /tmp/hello.txt\n` |
| `copy`     | 复制文件到远程主机                              | `yaml\n- name: Copy a file\n copy:\n src: /local/path/to/file\n dest: /remote/path/to/file\n` |
| `template` | 使用 Jinja2 模板渲染并复制文件到远程主机        | `yaml\n- name: Deploy configuration file from template\n template:\n src: /path/to/template.j2\n dest: /path/to/destination\n` |
| `yum`      | 使用 YUM 包管理器安装、卸载包（适用于 RHEL 系）   | `yaml\n- name: Install a package using yum\n yum:\n name: httpd\n state: present\n` |
| `apt`      | 使用 APT 包管理器安装、卸载包（适用于 Debian 系） | `yaml\n- name: Install a package using apt\n apt:\n name: apache2\n state: present\n` |
| `user`     | 管理用户                                        | `yaml\n- name: Create a user\n user:\n name: username\n state: present\n password: password_hash\n` |
| `group`    | 管理用户组                                      | `yaml\n- name: Create a group\n group:\n name: groupname\n state: present\n` |
| `cron`     | 管理 cron 作业                                  | `yaml\n- name: Add a cron job\n cron:\n name: "backup script"\n minute: "0"\n hour: "2"\n job: "/path/to/backup.sh"\n` |
| `git`      | 管理 Git 仓库                                   | `yaml\n- name: Clone a Git repository\n git:\n repo: "https://github.com/repo.git"\n dest: "/path/to/destination"\n` |

每个模块都有特定的参数和选项，可以在 Ansible 官方文档中查找详细信息。例如，`file` 模块的常用参数包括 `path`、`state`、`owner`、`group` 等。

#### 自定义模块

如果内置模块不能满足需求，可以编写自定义模块。自定义模块可以使用 Python 编写，并放置在库路径中。

示例自定义模块（`my_module.py`）：

```python
#!/usr/bin/python

from ansible.module_utils.basic import AnsibleModule

def run_module():
    module_args = dict(
        name=dict(type='str', required=True)
    )

    module = AnsibleModule(
        argument_spec=module_args,
        supports_check_mode=True
    )

    result = dict(
        changed=False,
        message=''
    )

    name = module.params['name']
    result['message'] = f'Hello, {name}!'

    if module.check_mode:
        module.exit_json(**result)

    module.exit_json(**result)

def main():
    run_module()

if __name__ == '__main__':
    main()
```

运行自定义模块：

```yaml
- name: Use custom module
  hosts: localhost
  tasks:
    - name: Call custom module
      my_module:
        name: Ansible
```

### Ansible 变量和模板

#### 变量的定义与使用

变量可以在多个地方定义，如 Playbook、清单文件、角色等：

```yaml
- name: Example with variables
  hosts: localhost
  vars:
    http_port: 80
  tasks:
    - name: Display variable
      debug:
        msg: "HTTP port is {{ http_port }}"
```

#### 变量优先级

Ansible 变量的优先级从低到高依次为：

1. 角色默认变量（role defaults）
2. 组变量（group vars）
3. 主机变量（host vars）
4. 播放（Play）中的变量
5. 任务（Task）中的变量
6. 命令行定义的变量（使用 `-e` 参数）

这个优先级决定了当同一个变量在多个地方定义时，哪个值会被使用。

#### Jinja2 模板语法

Ansible 使用 Jinja2 作为模板引擎，支持复杂的模板生成。模板文件通常以 `.j2` 结尾，放置在 `templates` 目录下。

示例模板文件（`config.j2`）：

```jinja2
## 变量替换
Hello, {{ name }}!

## 条件语句
{% if http_port == 80 %}
  server {
      listen 80;
  }
{% else %}
  server {
      listen {{ http_port }};
  }
{% endif %}

## 循环语句
{% for user in users %}
  user {{ user.name }} with id {{ user.id }}
{% endfor %}
```

#### 使用模板生成配置文件

可以使用 `template` 模块将 Jinja2 模板渲染为实际配置文件，并部署到目标主机上。

示例 Playbook（`deploy_config.yml`）：

```yaml
- name: Deploy configuration file
  hosts: webservers
  become: yes
  vars:
    http_port: 80
    server_name: example.com
    proxy_url: 127.0.0.1:8080
  tasks:
    - name: Deploy nginx configuration
      template:
        src: templates/nginx.conf.j2
        dest: /etc/nginx/sites-available/default
      notify:
        - restart nginx

  handlers:
    - name: restart nginx
      service:
        name: nginx
        state: restarted
```

示例模板文件（`nginx.conf.j2`）：

```nginx
server {
    listen {{ http_port }};
    server_name {{ server_name }};
    
    location / {
        proxy_pass http://{{ proxy_url }};
    }
}
```

在此 Playbook 中，`template` 模块会将 `templates/nginx.conf.j2` 文件渲染为实际的配置文件，并部署到 `/etc/nginx/sites-available/default`。如果模板内容发生变化，通知部分会触发 `restart nginx` 处理程序，重启 nginx 服务以应用新的配置。

通过这种方式，可以使用 Ansible 自动化生成和部署配置文件，大大简化了系统配置管理的工作，并确保配置的一致性和可重复性。

## Ansible 高级应用技巧

### Ansible 角色

#### 角色的结构与组成

角色（Roles）是 Ansible 中的一种组织方式，用于将 Playbooks 和相关文件（如任务、处理程序、变量、模板等）结构化和模块化。角色的目录结构通常如下：

```css
roles/
  └── role_name/
      ├── tasks/
      │   └── main.yml
      ├── handlers/
      │   └── main.yml
      ├── templates/
      │   └── template_file.j2
      ├── files/
      │   └── file_name
      ├── vars/
      │   └── main.yml
      ├── defaults/
      │   └── main.yml
      ├── meta/
      │   └── main.yml
      └── README.md
```

- **tasks**：存放主要任务列表（`main.yml` 是入口文件）。
- **handlers**：存放处理程序（`main.yml` 是入口文件）。
- **templates**：存放 Jinja2 模板文件。
- **files**：存放需要复制到远程主机的静态文件。
- **vars**：存放角色专用变量。
- **defaults**：存放默认变量。
- **meta**：存放角色的元数据，如依赖关系。
- **README.md**：角色的说明文档，描述角色的用途、用法等。

#### 创建和使用角色

1. **创建角色**：

```bash
ansible-galaxy init my_role
```

这条命令会生成上述结构的角色目录。

1. **定义任务**（`roles/my_role/tasks/main.yml`）：

```yaml
- name: Install Apache
  apt:
    name: apache2
    state: present

- name: Start Apache service
  service:
    name: apache2
    state: started
```

在这个例子中，定义了两个任务：一个用于安装 Apache，另一个用于启动 Apache 服务。

1. **在 Playbook 中使用角色**：

```yaml
- name: Apply my role
  hosts: webservers
  roles:
    - my_role
```

在 Playbook 中，通过 `roles` 关键字引用角色。

#### 角色的共享与重用（Ansible Galaxy）

Ansible Galaxy 是 Ansible 官方的角色分享平台，用户可以在上面发布和下载角色，方便角色的共享与重用。

1. **安装角色**：

```shell
ansible-galaxy install username.role_name
```

可以从 Galaxy 下载并安装角色。安装的角色通常会存放在 Ansible 的角色路径中（默认是 `/etc/ansible/roles` 或 `~/.ansible/roles`）。

1. **使用已安装的角色**：

```yaml
- name: Use a role from Ansible Galaxy
  hosts: webservers
  roles:
    - username.role_name
```

在 Playbook 中通过 `roles` 关键字引用已经安装的角色。

通过使用 Ansible 角色，可以将复杂的 Playbook 结构化、模块化，使得配置管理更为清晰、可维护。同时，通过 Ansible Galaxy 平台，可以方便地共享和重用角色，提升团队协作和生产效率。

### Ansible 动态 Inventory

#### 静态 Vs 动态 Inventory

静态 Inventory 是一个简单的文本文件，列出所有被管理节点及其分组。动态 Inventory 则是通过脚本或插件生成的，适用于云环境或动态变化的基础设施。

示例静态 Inventory（`hosts`）：

```ini
[webservers]
web1.example.com
web2.example.com

[dbservers]
db1.example.com
db2.example.com
```

#### 动态 Inventory 脚本编写

动态 Inventory 脚本可以用任何语言编写，只要它能输出 JSON 格式的主机和组信息。例如，使用 Python 编写一个简单的动态 Inventory 脚本（`my_inventory.py`）：

```python
#!/usr/bin/env python

import json

inventory = {
    "webservers": {
        "hosts": ["web1.example.com", "web2.example.com"],
    },
    "dbservers": {
        "hosts": ["db1.example.com", "db2.example.com"],
    }
}

print(json.dumps(inventory))
```

运行 Playbook 时使用该脚本：

```bash
ansible-playbook -i my_inventory.py my_playbook.yml
```

#### 常用的动态 Inventory 插件（如 AWS、Azure）

Ansible 提供了多种动态 Inventory 插件，支持 AWS、Azure、GCP 等云平台。

1. **AWS 动态 Inventory**： 安装 `boto3`：

```shell
pip install boto3
```

创建 `aws_ec2.yml` 配置文件，使用 `aws_ec2` 插件：

```yaml
plugin: aws_ec2
regions:
  - us-east-1
filters:
  instance-state-name: running
keyed_groups:
  - key: tags.Name
    prefix: tag
  - key: tags.Environment
    prefix: env
```

使用该配置文件运行 Playbook：

```bash
ansible-playbook -i aws_ec2.yml my_playbook.yml
```

1. **Azure 动态 Inventory**： 安装 `azure-cli` 和 `azure-mgmt`：

```bash
pip install azure-cli azure-mgmt
```

使用 `azure_rm` 插件：

```yaml
plugin: azure_rm
include_vm_resource_groups:
  - myResourceGroup
auth_source: auto
```

使用该配置文件运行 Playbook：

```
ansible-playbook -i azure_rm.yml my_playbook.yml
```

1. **GCP 动态 Inventory**

安装 `google-auth` 和 `google-api-python-client` 库：

```bash
pip install google-auth google-api-python-client
```

创建 `gcp_compute.yml` 配置文件，使用 `gcp_compute` 插件：

```yaml
plugin: gcp_compute
projects:
  - my-gcp-project
filters:
  - status = RUNNING
auth_kind: serviceaccount
service_account_file: /path/to/service-account.json
```

使用该配置文件运行 Playbook：

```bash
ansible-playbook -i gcp_compute.yml my_playbook.yml
```

通过动态 Inventory，可以自动发现和管理云环境中的资源，提高自动化程度和灵活性。这在动态变化的基础设施中尤其有用，确保 Ansible 的管理目标始终是最新的。

### Ansible Vault

#### 使用 Vault 加密敏感数据

Ansible Vault 用于加密敏感数据，如密码、密钥等，确保这些信息在存储和传输过程中不会被泄露。以下是 Ansible Vault 的基本使用方法：

```shell
# 1.加密文件
ansible-vault encrypt secret.yml

# 2.解密文件
ansible-vault decrypt secret.yml

# 3.编辑加密文件
ansible-vault edit secret.yml

# 4.查看加密文件
ansible-vault view secret.yml

# 5.重新加密文件（更改加密密码）
ansible-vault rekey secret.yml
```

#### Vault 的管理和使用

为了更方便地管理 Vault，可以在 `ansible.cfg` 中指定 Vault 密码文件，这样在运行 Playbook 时无需每次手动输入密码：

```ini
[defaults]
vault_password_file = /path/to/.vault_pass.txt
```

`/path/to/.vault_pass.txt` 文件中应只包含 Vault 密码，且该文件应设置为仅有文件所有者可读写：

```shell
chmod 600 /path/to/.vault_pass.txt
```

如果不希望将密码写入文件，也可以使用命令行参数 `--ask-vault-pass`：

```shell
ansible-playbook --ask-vault-pass my_playbook.yml
```

#### 在 Playbooks 中集成 Vault

在 Playbook 中使用 Vault 加密的变量文件时，可以通过 `vars_files` 引用这些文件：

```yaml
- name: Deploy with Vault
  hosts: webservers
  vars_files:
    - secret.yml
  tasks:
    - name: Use encrypted variable
      debug:
        msg: "The secret is {{ vault_secret }}"
```

在这个示例中，`secret.yml` 是一个加密的变量文件，其中包含敏感数据。Ansible 会在运行 Playbook 时解密并加载这些变量。

#### Vault ID 和多 Vault 支持

Ansible Vault 支持使用多个 Vault ID 来加密不同级别或类型的敏感数据。使用 `--vault-id` 选项可以指定不同的 Vault 密码文件或密码提示命令。

例如，加密文件时指定 Vault ID：

```yaml
ansible-vault encrypt --vault-id dev@prompt secret_dev.yml
ansible-vault encrypt --vault-id prod@/path/to/prod_vault_pass.txt secret_prod.yml
```

在 Playbook 中引用不同 Vault ID 的变量文件：

```yaml
- name: Deploy with Vault IDs
  hosts: webservers
  vars_files:
    - vault_id: dev
      file: secret_dev.yml
    - vault_id: prod
      file: secret_prod.yml
  tasks:
    - name: Use dev encrypted variable
      debug:
        msg: "Dev secret is {{ dev_secret }}"
    - name: Use prod encrypted variable
      debug:
        msg: "Prod secret is {{ prod_secret }}"
```

运行 Playbook 时，指定 Vault ID 和密码文件：

```yaml
ansible-playbook --vault-id dev@prompt --vault-id prod@/path/to/prod_vault_pass.txt my_playbook.yml
```

通过 Ansible Vault，可以有效地保护敏感数据，确保自动化流程的安全性，同时保持操作的便捷性和高效性。

## Ansible 与其他自动化工具的比较

| 维度           | Ansible                                                 | Puppet                                                | Chef                                                  |
| -------------- | ------------------------------------------------------- | ----------------------------------------------------- | ----------------------------------------------------- |
| **架构**       | 无代理架构，通过 SSH 或 WinRM 与被管理节点通信          | 有代理架构，需要在被管理节点上安装 Puppet Agent       | 有代理架构，需要在被管理节点上安装 Chef Client        |
| **通信模型**   | 基于推送模型，由控制节点推送任务到被管理节点执行        | 基于拉取模型，被管理节点定期向 Puppet Master 拉取配置 | 基于拉取模型，被管理节点定期向 Chef Server 拉取配置   |
| **配置语言**   | 使用 YAML 编写 Playbook，直观易读                       | 使用 Puppet 自定义的声明式语言编写清单（Manifest）    | 使用 Ruby 编写食谱（Cookbooks），脚本式语言，灵活性高 |
| **学习曲线**   | 简单易用，适合快速上手                                  | 学习曲线较为陡峭                                      | 学习曲线较陡，需要掌握 Ruby                           |
| **适用场景**   | 临时和一次性任务、多平台支持、快速部署和小型团队        | 大规模配置管理、复杂依赖管理、企业级功能              | 复杂和大型环境管理、需要复杂逻辑和自定义的场景        |
| **模块支持**   | 内置丰富的模块，适用于多种场景                          | 提供丰富的模块和企业级工具                            | 提供灵活的配置和扩展能力                              |
| **依赖管理**   | 依赖管理能力相对较弱                                    | 强大的资源依赖管理能力                                | 灵活的依赖管理和配置能力                              |
| **企业级功能** | 提供一些企业级功能，社区活跃，资源丰富                  | 提供丰富的企业级功能和工具，如报告、审计、合规管理等  | 提供强大的企业级功能和支持                            |
| **性能**       | 由于采用 SSH 推送模型，在大规模环境中性能可能会受到限制 | 性能较好，适合大规模环境                              | 性能较好，适合复杂和大型环境                          |
| **维护成本**   | 无代理架构，减少了管理和维护成本                        | 需要管理和维护 Puppet Master 和 Agent                 | 需要管理和维护 Chef Server 和 Client                  |
| **社区和支持** | 拥有庞大且活跃的社区，提供丰富的资源和支持              | 社区活跃，企业级支持完善                              | 社区活跃，企业级支持完善                              |

### Ansible 在云环境中的应用

#### AWS 集成

安装并配置 `boto3` 库，使用 `ec2` 模块管理 AWS 资源。

```shell
pip install boto3
```

   配置 Ansible Inventory 使用 AWS 动态库存插件 `aws_ec2`：

```ini
plugin: aws_ec2
regions:
  - us-east-1
filters:
  instance-state-name: running
```

   示例 Playbook：创建和管理 EC2 实例。

```yaml
- name: Launch EC2 instance
  hosts: localhost
  tasks:
    - name: Launch an instance
      ec2:
        key_name: my-key
        instance_type: t2.micro
        image: ami-0abcdef1234567890
        wait: yes
        region: us-east-1
        group: my-security-group
```

#### Azure 集成

安装并配置 `azure-cli` 和 `azure-mgmt` 库，使用 `azure_rm` 模块管理 Azure 资源。

```shell
pip install azure-cli azure-mgmt
```

   配置 Ansible Inventory 使用 Azure 动态库存插件 `azure_rm`：

```yaml
plugin: azure_rm
include_vm_resource_groups:
  - myResourceGroup
```

 示例 Playbook：创建和管理 Azure VM 实例。

```yaml
- name: Launch Azure VM
  hosts: localhost
  tasks:
    - name: Create a VM
      azure_rm_virtualmachine:
        resource_group: myResourceGroup
        name: myVM
        vm_size: Standard_DS1_v2
        admin_username: azureuser
        admin_password: Password123!
        image:
          offer: UbuntuServer
          publisher: Canonical
          sku: 18.04-LTS
          version: latest
```

#### 云资源管理和部署

##### 动态库存管理

使用动态库存插件自动发现和管理云资源，无需手动更新 Inventory 文件。

```yaml
   - name: List EC2 instances
     hosts: localhost
     tasks:
       - name: List instances
         ec2_instance_facts:
           region: us-east-1
```

##### 自动化部署

使用 Ansible Playbook 实现云资源的自动化部署和配置，简化操作流程。

```yaml
- name: Deploy web application on AWS
  hosts: tag_Environment_web
  become: yes
  tasks:
    - name: Install Nginx
      yum:
        name: nginx
        state: present
    - name: Start Nginx
      service:
        name: nginx
        state: started
```

### Ansible 在容器化环境中的应用

#### Docker 集成

使用 `community.docker` 集成 Docker，管理 Docker 容器和镜像。

```yaml
- name: Manage Docker
  hosts: all
  become: yes
  tasks:
    - name: Install Docker
      apt:
        name: docker.io
        state: present
    - name: Run a Docker container
      community.docker.docker_container:
        name: mycontainer
        image: nginx
        state: started
        ports:
          - "80:80"
```

#### Kubernetes 集成

使用 `kubernetes.core` 集成 Kubernetes，管理 Kubernetes 资源和集群。

```yaml
- name: Manage Kubernetes
  hosts: localhost
  tasks:
    - name: Create a namespace
      kubernetes.core.k8s:
        state: present
        definition:
          apiVersion: v1
          kind: Namespace
          metadata:
            name: mynamespace
    - name: Deploy a pod
      kubernetes.core.k8s:
        state: present
        definition:
          apiVersion: v1
          kind: Pod
          metadata:
            name: mypod
            namespace: mynamespace
          spec:
            containers:
            - name: nginx
              image: nginx
```

#### 容器部署

使用 Ansible 部署和管理容器化应用，实现自动化运维。

```yaml
- name: Deploy Dockerized application
  hosts: all
  become: yes
  tasks:
    - name: Pull Docker image
      community.docker.docker_image:
        name: myapp
        tag: latest
        source: pull
    - name: Run Docker container
      community.docker.docker_container:
        name: myapp
        image: myapp:latest
        state: started
        ports:
          - "8080:8080"
```

#### Kubernetes 应用编排

使用 Ansible 管理 Kubernetes 集群，实现应用编排和服务发现。

```yaml
- name: Deploy Kubernetes application
  hosts: localhost
  tasks:
    - name: Create deployment
      kubernetes.core.k8s:
        state: present
        definition:
          apiVersion: apps/v1
          kind: Deployment
          metadata:
            name: myapp
            namespace: default
          spec:
            replicas: 3
            selector:
              matchLabels:
                app: myapp
            template:
              metadata:
                labels:
                  app: myapp
              spec:
                containers:
                - name: myapp
                  image: myapp:latest
                  ports:
                  - containerPort: 8080
    - name: Expose service
      kubernetes.core.k8s:
        state: present
        definition:
          apiVersion: v1
          kind: Service
          metadata:
            name: myapp-service
            namespace: default
          spec:
            selector:
              app: myapp
            ports:
            - protocol: TCP
              port: 80
              targetPort: 8080
```

### Ansible 在传统 IT 环境中的应用

#### 数据中心管理

##### 服务器配置管理

使用 Ansible 管理数据中心服务器的配置，确保一致性和自动化。

```yaml
- name: Configure data center servers
  hosts: datacenter
  become: yes
  tasks:
    - name: Update all packages
      apt:
        upgrade: dist
    - name: Ensure NTP is installed
      apt:
        name: ntp
        state: present
    - name: Configure NTP
      copy:
        src: templates/ntp.conf.j2
        dest: /etc/ntp.conf
      notify:
        - restart ntp

  handlers:
    - name: restart ntp
      service:
        name: ntp
        state: restarted
```

##### 硬件管理

使用 Ansible 自动化硬件管理，如固件升级和 BIOS 配置。

```yaml
- name: Manage hardware
  hosts: datacenter
  become: yes
  tasks:
    - name: Upgrade firmware
      command: /usr/bin/upgrade_firmware.sh
```

#### 网络设备配置

##### 网络设备管理

使用 Ansible 管理网络设备配置，自动化网络设备的部署和更新。

```yaml
- name: Configure network devices
  hosts: switches
  become: yes
  tasks:
    - name: Update switch firmware
      ios_command:
        commands:
          - copy tftp://192.0.2.1/new_firmware.bin flash:
          - reload
```

##### 网络拓扑管理

使用 Ansible 自动化网络拓扑的配置和管理，确保网络配置的一致性。

```yaml
- name: Configure network topology
  hosts: routers
  become: yes
  tasks:
    - name: Configure OSPF
      ios_config:
        lines:
          - router ospf 1
          - network 10.0.0.0 0.255.255.255 area 0
```

#### 跨平台管理

##### 多操作系统管理

使用 Ansible 管理多种操作系统，包括 Linux、Windows 和 macOS。

```yaml
- name: Manage multiple OS
  hosts: all
  become: yes
  tasks:
    - name: Install packages on Linux
      apt:
        name: nginx
        state: present
      when: ansible_os_family == "Debian"

    - name: Install packages on Windows
      win_feature:
        name: Web-Server
        state: present
      when: ansible_os_family == "Windows"

    - name: Install packages on macOS
      homebrew:
        name: nginx
        state: present
      when: ansible_os_family == "Darwin"
```

##### 跨平台应用部署

使用 Ansible 实现跨平台应用的自动化部署，确保各平台的一致性。

```yaml
- name: Deploy application across platforms
  hosts: all
  become: yes
  tasks:
    - name: Deploy app on Linux
      command: /usr/local/bin/deploy_app.sh
      when: ansible_os_family == "Debian"

    - name: Deploy app on Windows
      win_command: C:\Deploy\deploy_app.bat
      when: ansible_os_family == "Windows"

    - name: Deploy app on macOS
      command: /usr/local/bin/deploy_app.sh
      when: ansible_os_family == "Darwin"
```

## Ansible 实践案例

### 常见使用案例

#### 系统用户和组管理

创建用户和组，设置权限和密码。

```yaml
- name: Create a new user
  hosts: all
  become: yes
  tasks:
    - name: Add a user
      user:
        name: john
        state: present
        password: "{{ 'password' | password_hash('sha512') }}"
```

#### 软件安装和更新

使用包管理器安装和更新软件包。

```yaml
- name: Install and update software packages
  hosts: all
  become: yes
  tasks:
    - name: Install nginx
      apt:
        name: nginx
        state: present
    - name: Update all packages
      apt:
        upgrade: dist
```

#### 服务管理

启动、停止和重启服务。

```yaml
- name: Manage services
  hosts: all
  become: yes
  tasks:
    - name: Ensure nginx is running
      service:
        name: nginx
        state: started
```

#### 文件和目录管理

创建、删除文件和目录，设置权限和所有者。

```yaml
- name: Manage files and directories
  hosts: all
  become: yes
  tasks:
    - name: Create a directory
      file:
        path: /etc/myapp
        state: directory
    - name: Copy a configuration file
      copy:
        src: files/myapp.conf
        dest: /etc/myapp/myapp.conf
        owner: root
        group: root
        mode: '0644'
```

#### 网络配置

配置网络接口和防火墙规则。

```yaml
- name: Configure network interfaces
  hosts: all
  become: yes
  tasks:
    - name: Configure eth0
      network:
        name: eth0
        state: up
        address: 192.168.1.100
        netmask: 255.255.255.0
        gateway: 192.168.1.1
```

### 真实场景的 Playbook 编写

#### LAMP 堆栈部署

安装 Apache、MySQL 和 PHP，配置虚拟主机和数据库。

```yaml
- name: Deploy LAMP stack
  hosts: webservers
  become: yes
  tasks:
    - name: Install Apache
      apt:
        name: apache2
        state: present

    - name: Install MySQL
      apt:
        name: mysql-server
        state: present

    - name: Install PHP
      apt:
        name: php
        state: present

    - name: Configure Apache virtual host
      template:
        src: templates/vhost.conf.j2
        dest: /etc/apache2/sites-available/000-default.conf
      notify:
        - restart apache

  handlers:
    - name: restart apache
      service:
        name: apache2
        state: restarted
```

#### Docker 容器管理

安装 Docker，启动容器，部署应用。

```yaml
- name: Manage Docker containers
  hosts: all
  become: yes
  tasks:
    - name: Install Docker
      apt:
        name: docker.io
        state: present

    - name: Ensure Docker is running
      service:
        name: docker
        state: started

    - name: Run a web application container
      docker_container:
        name: mywebapp
        image: nginx
        state: started
        ports:
          - "80:80"
```

### 故障排除与调试技巧

#### 使用 `-vvv` 选项

提供详细的输出信息，帮助定位问题。

```yaml
ansible-playbook -i inventory myplaybook.yml -vvv
```

#### 调试模块

使用 `debug` 模块输出变量信息。

```yaml
- name: Debug variables
  hosts: all
  tasks:
    - name: Show variable value
      debug:
        var: my_variable
```

#### 条件执行

使用 `when` 条件语句，避免在不满足条件时执行任务。

```yaml
- name: Conditional execution
  hosts: all
  tasks:
    - name: Only run when condition is met
      command: /usr/bin/somecommand
      when: ansible_os_family == "Debian"
```

#### 查看日志文件

查看 Ansible 生成的日志文件，分析错误信息。

```yaml
tail -f /var/log/ansible.log
```

## Ansible 性能优化

### 大规模部署的性能优化

#### 并行执行

增加并行任务的数量，默认值为 5，可以通过 `forks` 参数调整。

```shell
ansible-playbook -i inventory myplaybook.yml -f 10
```

#### SSH 连接复用

启用 SSH 连接复用，提高效率。

```ini
[ssh_connection]
ssh_args = -o ControlMaster=auto -o ControlPersist=60s
```

#### 使用缓存

使用事实缓存减少收集远程主机信息的时间。

```ini
[defaults]
fact_caching = jsonfile
fact_caching_connection = /tmp/ansible_cache
```

### 高效编写 Playbooks 的技巧

#### 避免重复

使用角色和 include 机制，避免重复代码。

```yaml
- name: Include common tasks
  import_tasks: common.yml
```

#### 变量和模板

使用变量和模板简化配置文件。

```yaml
- name: Use variables in tasks
  hosts: all
  vars:
    my_var: "value"
  tasks:
    - name: Print variable
      debug:
        msg: "The value is {{ my_var }}"
```

#### 条件和循环

使用条件和循环减少代码冗余。

```yaml
- name: Install multiple packages
  hosts: all
  become: yes
  tasks:
    - name: Install packages
      apt:
        name: "{{ item }}"
        state: present
      loop:
        - nginx
        - mysql-server
        - php
```

### 常见性能问题及解决方案

#### SSH 连接瓶颈

使用 `pipelining` 提升 SSH 连接速度。

```ini
[ssh_connection]
pipelining = True
```

#### 冗余任务执行

​	使用 `check_mode` 检查任务是否需要执行，避免不必要的任务执行。

```yaml
- name: Check mode example
  hosts: all
  tasks:
    - name: Ensure nginx is installed
      apt:
        name: nginx
        state: present
      check_mode: yes
```

#### 过多事实收集

禁用不必要的事实收集，提高效率。

```yaml
- name: Disable fact gathering
  hosts: all
  gather_facts: no
  tasks:
    - name: Ensure nginx is installed
      apt:
        name: nginx
        state: present
```

## Ansible 集成

### Jenkins

1. **安装 Jenkins 插件**

   安装 Ansible 插件和 SSH 插件，以便 Jenkins 可以运行 Ansible 任务。

2. **配置 Jenkins 作业**

   创建一个 Jenkins 作业，配置源代码管理、构建触发器等。

3. **在 Jenkins 中运行 Playbook**

   在 Jenkins 作业中添加构建步骤，运行 Ansible Playbook。

```shell
   ansible-playbook -i inventory myplaybook.yml
```

### Nagios

使用 Ansible 安装和配置 Nagios，部署监控插件。

```yaml
   - name: Install Nagios
     hosts: all
     become: yes
     tasks:
       - name: Install Nagios packages
         apt:
           name: nagios3
           state: present
       - name: Configure Nagios
         template:
           src: templates/nagios.cfg.j2
           dest: /etc/nagios3/nagios.cfg
         notify:
           - restart nagios
   
     handlers:
       - name: restart nagios
         service:
           name: nagios3
           state: restarted
```

### Prometheus

使用 Ansible 部署 Prometheus 和 Node Exporter，收集和监控指标。

```yaml
   - name: Install Prometheus
     hosts: all
     become: yes
     tasks:
       - name: Download Prometheus
         get_url:
           url: https://github.com/prometheus/prometheus/releases/download/v2.26.0/prometheus-2.26.0.linux-amd64.tar.gz
           dest: /tmp/prometheus.tar.gz
   
       - name: Extract Prometheus
         unarchive:
           src: /tmp/prometheus.tar.gz
           dest: /opt/
           remote_src: yes
   
       - name: Configure Prometheus
         template:
           src: templates/prometheus.yml.j2
           dest: /opt/prometheus-2.26.0.linux-amd64/prometheus.yml
   
       - name: Create systemd service
         template:
           src: templates/prometheus.service.j2
           dest: /etc/systemd/system/prometheus.service
         notify:
           - reload systemd
           - start prometheus
   
     handlers:
       - name: reload systemd
         command: systemctl daemon-reload
       - name: start prometheus
         service:
           name: prometheus
           state: started
```

通过以上系统全面的内容，您可以更好地理解和掌握 Ansible 的使用，从而实现自动化部署和管理，提高工作效率。
