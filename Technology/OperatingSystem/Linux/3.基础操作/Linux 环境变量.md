---
title: Linux 环境变量
description: 文章概述了Linux环境下环境变量的重要性和使用方法。环境变量影响程序行为和系统配置，通过键值对形式存在，分为系统和用户环境变量。文章介绍了环境变量的查看、设置、持久化，以及在不同shell中的配置。还讨论了环境变量的安全性和优化，包括使用.env文件和direnv工具来管理，以及在CI/CD、Docker和Kubernetes中的使用。
keywords:
  - Linux
  - 环境变量
  - 配置信息
  - 用户环境
tags:
  - 技术/操作系统
  - Linux/基础
author: 仲平
date: 2024-09-04
---

## 基础概念

### 环境变量

**环境变量（Environment Variables）是在操作系统层面为程序和用户提供的动态值。** 这些变量可以影响程序的行为、系统的配置以及用户环境的设定。在 Linux 系统中，环境变量以键值对的形式存在，键是变量的名称，值则是变量的具体内容。这些变量在系统启动时由 shell（如 Bash、Zsh 等）加载，贯穿整个用户会话的生命周期。

环境变量在 Linux 系统中的作用举足轻重，它们不仅影响着系统的运行方式，还决定了程序的执行路径、用户的语言和区域设置、命令行工具的默认行为等。通过设置和管理环境变量，用户可以在不同的系统和应用程序间无缝切换，优化工作流程。

#### 环境变量的用途

环境变量的用途广泛且多样，主要体现在以下几个方面：

1. **控制系统行为**：环境变量可以直接影响系统的某些行为。例如，通过设置 `PATH` 变量，可以定义系统在运行命令时搜索可执行文件的目录顺序。
2. **传递配置信息**：程序在启动时可以读取环境变量中的信息，以决定如何进行初始化和配置。例如，Java 程序可以通过 `JAVA_HOME` 变量找到 JDK 的安装路径。
3. **个性化用户环境**：用户可以通过环境变量定制他们的工作环境。例如，设置 `EDITOR` 变量可以指定默认的文本编辑器，设置 `LANG` 和 `LC_*` 变量可以确定语言和区域设置。
4. **跨程序的共享信息**：环境变量可以在不同的程序间传递信息，尤其是在脚本编写和自动化任务中非常有用。脚本可以使用环境变量与其他脚本或进程进行通信。
5. **简化命令行操作**：通过设置环境变量，用户可以减少命令行输入的长度和复杂度。例如，定义 `PAGER` 变量可以设置默认的分页程序，使用更短的命令来查看长文件。

#### 系统环境变量 Vs 用户环境变量

在 Linux 系统中，环境变量可以按照其作用范围和生效范围分为系统环境变量和用户环境变量：

- **系统环境变量**：这些**变量在整个系统范围内有效**，通常由系统管理员在系统启动时配置，影响到所有用户的会话。系统环境变量的配置文件通常位于 `/etc/` 目录下，包括 `/etc/environment`、`/etc/profile` 等文件。系统环境变量的设置影响所有用户，通常用于定义系统级别的配置，如全局的 `PATH` 变量。
- **用户环境变量**：这些**变量仅对特定用户的会话有效**。用户可以在自己的 home 目录中通过编辑 `~/.bashrc`、`~/.bash_profile` 或 `~/.profile` 文件来配置和持久化这些变量。用户环境变量主要用于个性化用户的工作环境，不会影响到其他用户。

系统环境变量通常在系统启动时由 `/etc/profile` 或其他系统脚本设置，而用户环境变量则是在用户登录时由 `~/.bash_profile`、`~/.bashrc` 等用户级配置文件加载。在需要覆盖系统默认配置时，用户可以通过设置用户环境变量来实现。

### 常见的环境变量

环境变量的种类繁多，但其中一些是最为常用的，用户在日常使用和配置中会经常接触。以下是一些常见的环境变量及其作用：

| **变量**          | **描述**                            | **用途**                                                     | **典型示例值**                                               |
| ----------------- | ----------------------------------- | ------------------------------------------------------------ | ------------------------------------------------------------ |
| **`PATH`**        | 定义 shell 搜索可执行文件的路径列表 | 当用户在命令行输入一个命令时，系统会根据 `PATH` 中定义的目录顺序逐一搜索可执行文件 | `/usr/local/sbin:/usr/local/bin:/usr/sbin:/usr/bin:/sbin:/bin` |
| **`HOME`**        | 当前用户的主目录                    | 用于存放用户的个人文件和配置文件。在脚本中使用 `HOME` 变量，可以避免硬编码路径 | `/home/username`                                             |
| **`SHELL`**       | 指定用户当前使用的 shell 程序       | 影响用户的命令行环境和脚本的执行环境                         | `/bin/bash`, `/bin/zsh`, `/bin/fish`                         |
| **`USER`**        | 当前登录的用户名                    | 在脚本或程序中识别当前操作者，通常用于权限检查或个性化设置   | `username`                                                   |
| **`LOGNAME`**     | 通常与 `USER` 一致                  | 用于登录和身份验证相关的操作                                 | `username`                                                   |
| **`LANG`**        | 系统默认的语言设置                  | 控制系统的语言和字符编码，影响命令行工具和应用程序的显示语言 | `en_US.UTF-8`, `zh_CN.UTF-8`                                 |
| **`LC_ALL`**      | 覆盖所有其他本地化设置              | 强制设置系统的语言和区域，优先级高于其他 `LC_*` 变量         | `en_US.UTF-8`                                                |
| **`EDITOR`**      | 系统默认的文本编辑器                | 在需要用户输入文本的程序中（如 `git commit`），调用此编辑器  | `vim`, `nano`, `gedit`                                       |
| **`PAGER`**       | 用于分页显示长文件内容的程序        | 当输出内容较长时，自动分页显示，常用于 `man` 等命令          | `less`, `more`                                               |
| **`TERM`**        | 终端类型                            | 定义了终端的类型和功能，如支持的颜色和格式。影响终端的显示效果 | `xterm-256color`, `vt100`                                    |
| **`PS1`**         | 主提示符字符串                      | 定义 shell 提示符的外观，通常包含用户名、主机名和当前目录    | `\u@\h:\w\$`                                                 |
| **`MAIL`**        | 当前用户的邮件存储路径              | 定义系统中邮件程序的默认邮件存储位置                         | `/var/spool/mail/username`                                   |
| **`PWD`**         | 当前工作目录                        | 记录当前 shell 会话中的工作目录，通常通过 `cd` 命令更新      | `/home/username/projects`                                    |
| **`OLDPWD`**      | 上一个工作目录                      | 保存上一次 `cd` 操作之前的工作目录，方便快速返回             | `/home/username`                                             |
| **`DISPLAY`**     | X11 显示服务器的位置                | 用于图形界面程序，定义显示服务器的位置，通常用于远程显示     | `:0`, `localhost:10.0`                                       |
| **`HOSTNAME`**    | 当前主机的名称                      | 标识系统的网络主机名，通常用于个性化提示符或网络相关操作     | `mycomputer.local`                                           |
| **`SSH_CLIENT`**  | SSH 连接的客户端信息                | 包含 SSH 客户端的 IP 地址、端口等信息，通常用于记录和安全检查 | `192.168.1.100 12345 22`                                     |
| **`SSH_TTY`**     | 当前 SSH 会话的终端设备             | 指定当前 SSH 会话使用的伪终端设备                            | `/dev/pts/1`                                                 |
| **`HISTFILE`**    | 保存 shell 历史记录的文件路径       | 定义 shell 历史记录的保存位置，默认为 `~/.bash_history`      | `~/.bash_history`                                            |
| **`HISTSIZE`**    | shell 历史记录的最大条目数          | 控制 shell 保存的历史记录条数                                | `1000`                                                       |
| **`HISTCONTROL`** | 控制历史记录的行为                  | 用于定义 shell 如何保存历史记录，例如忽略重复命令            | `ignoredups`                                                 |

### 查看和操作环境变量

了解如何查看和操作环境变量是掌握环境变量管理的基础技能。以下是一些常用的命令和方法：

| **命令**                                             | **描述**                                                       | **用法示例**                                            | **用途**                                            |                                     |     |     |
| -------------------------------------------------- | ------------------------------------------------------------ | --------------------------------------------------- | ------------------------------------------------- | ----------------------------------- | --- | --- |
| **`printenv`**                                     | 显示当前环境变量的值。可以查看特定变量或所有环境变量。                                  | `printenv PATH`   `printenv`                        | 用于快速检查环境变量的值，特别是在调试配置或验证设置时。                      |                                     |     |     |
| **`env`**                                          | 类似于 `printenv`，显示当前环境变量。还能在临时修改环境变量的情况下执行命令，而不影响当前 shell 环境。 | `env`   `env PATH=/new/path command`                | 用于查看所有环境变量或在不改变当前环境的情况下，临时设置变量并执行命令。              |                                     |     |     |
| **`set`**                                          | 查看当前 shell 中的所有变量，包括环境变量、局部变量、shell 函数和导出变量。                 | `set`                                               | 详细检查当前 shell 的变量状态，适用于调试和故障排查。                    |                                     |     |     |
| **`echo $VARIABLE_NAME`**                          | 输出特定环境变量的值。通过在变量名前加上 `$` 符号来引用变量。                            | `echo $HOME`   `echo $PATH`                         | 用于快速查看单个变量的值，尤其是在脚本或命令行中使用变量时。                    |                                     |     |     |
| **`export`**                                       | 将 shell 中的变量导出为环境变量，使其在当前 shell 及其子进程中可用。                    | `export VAR_NAME="value"`                           | 用于设置新的环境变量或修改现有变量，使其在子进程中生效。                      |                                     |     |     |
| **`unset`**                                        | 移除指定的环境变量或 shell 变量。                                         | `unset VAR_NAME`                                    | 用于删除不再需要的环境变量或清理环境。                               |                                     |     |     |
| **`declare -x`**                                   | 显示当前 shell 中已导出的环境变量。                                        | `declare -x`                                        | 类似于 `export` 的查看功能，专门用于检查已导出的变量，适合确认哪些变量被导出为环境变量。 |                                     |     |     |
| **`env -i`**                                       | 启动一个不带任何环境变量的新 shell 环境，用于排除现有环境变量对命令或程序的影响。                 | `env -i bash --noprofile --norc`                    | 用于在不受当前环境变量影响的情况下测试命令或程序，帮助识别环境变量引发的问题。           |                                     |     |     |
| **`source`**                                       | 在当前 shell 会话中执行指定脚本文件，并将其导出的环境变量加载到当前环境中。                    | `source ~/.bashrc`                                  | 用于重新加载环境配置文件（如 `.bashrc`），无需重启 shell。             |                                     |     |     |
| **`typeset`**                                      | 查看或设置 shell 变量和函数的属性。可以与 `-x` 选项结合使用，类似 `declare -x`。        | `typeset -x`                                        | 另一种检查和管理 shell 变量和环境变量的方法，适合在不同 shell 中使用（如 ksh）。 |                                     |     |     |
| **`alias`**                                        | 定义或显示别名，别名本质上是命令的环境变量。                                       | `alias ll='ls -la'`                                 | 用于为常用命令创建快捷方式，提高工作效率。别名本质上也是环境变量的一部分。             |                                     |     |     |
| **`envsubst`**                                     | 替换文本中的环境变量，常用于处理模板文件。                                        | `envsubst < template.txt > output.txt`              | 用于将包含环境变量的模板文件转换为实际值的文件，适合自动化任务中的配置文件生成。          |                                     |     |     |
| **`printenv -0`**                                  | 类似于 `printenv`，但以 NUL 字符分隔输出，适合处理包含特殊字符的变量值。                 | `printenv -0`                                       | 处理复杂环境变量值时使用，确保输出不会被空格或换行符误解析。                    |                                     |     |     |

## 环境变量的配置与持久化

### 临时设置环境变量

#### 使用 `export VARIABLE_NAME=value` 命令设置变量

在 Linux 系统中，`export` 命令用于设置和导出环境变量，使得**这些变量在当前 shell 会话中可用，并能够被所有从该 shell 派生的子进程继承。**`export` 命令的语法非常简单，通常以 `export VARIABLE_NAME=value` 的形式使用。以下是其基本用法的示例：

```shell
export MY_VAR="Hello, World!"
```

在这个例子中，我们定义了一个名为 `MY_VAR` 的环境变量，并将其值设置为 `"Hello, World!"`。此后，`MY_VAR` 将在当前 shell 会话中有效，且在该会话中启动的任何程序都可以访问 `MY_VAR`。

需要注意的是，**通过 `export` 设置的环境变量仅在当前 shell 会话中有效。**如果关闭该 shell 或启动一个新的 shell 会话，之前设置的环境变量将失效。此特性使得 `export` 非常适合临时调整环境变量，而不对系统整体配置造成影响。

#### 在当前 Shell 会话中设置变量的作用范围

**当你使用 `export` 设置一个环境变量时，它只在当前 shell 会话及其子进程中有效。**这意味着如果你打开了一个新的终端窗口，或者启动了一个新的 shell，会话中的环境变量将不会自动继承到新的会话中。这种行为可以通过以下两个例子说明：

1. **当前 shell 会话中有效**：

   ```shell
   export MY_VAR="Hello, World!"
   echo $MY_VAR   # 输出：Hello, World!
   ```

2. **新 shell 会话中无效**：

   ```shell
   bash          # 启动一个新的 shell 会话
   echo $MY_VAR  # 输出为空，因为 MY_VAR 在新会话中不存在
   ```

要让环境变量在所有会话中都有效，必须将其持久化到用户或系统的配置文件中。

#### `export` 与 `set` 的区别

`export` 和 `set` 都可以用来定义 shell 中的变量，但有一些关键区别：

- **`set`**：设置 shell 局部变量，变量只在当前 shell 环境中有效，不会自动传递给子进程。
- **`export`**：将变量导出，使其在当前 shell 以及所有子进程中都有效。通过 `export` 设置的变量是环境变量，而通过 `set` 设置的只是普通的 shell 变量。

### 持久化环境变量

**持久化环境变量指的是将环境变量配置保存到特定的配置文件中，这样每次登录或启动 shell 时，这些环境变量都能自动加载。**根据环境变量的作用范围，持久化配置可以分为全局和用户两种。

```mermaid
graph TD;
    A[1. System Boot] --> B["2. /etc/environment"]
    A --> C["3. /etc/profile"]
    C --> D["4. /etc/profile.d/*"]
    A --> E["5. ~/.bash_profile or ~/.profile"]
    E --> F["6. ~/.bashrc"]
    F --> G["7. Manual Load (source ~/.bashrc)"]
    
    subgraph Global Settings
        B
        C
        D
    end
    
    subgraph User Settings
        E
        F
    end
    
    style A fill:#ffcccc,stroke:#333,stroke-width:2px
    style B fill:#ffcc99,stroke:#333,stroke-width:2px
    style C fill:#ffcc99,stroke:#333,stroke-width:2px
    style D fill:#ffcc99,stroke:#333,stroke-width:2px
    style E fill:#ccffcc,stroke:#333,stroke-width:2px
    style F fill:#ccffcc,stroke:#333,stroke-width:2px
    style G fill:#ccccff,stroke:#333,stroke-width:2px

```

#### 全局环境变量配置

**全局环境变量是对整个系统所有用户都有效的变量配置**，通常由系统管理员设置，且保存在 `/etc/` 目录下的全局配置文件中。

| **文件**              | **作用**                                                     | **格式**                                    | **特点**                                                     | **适用范围**                                    |
| --------------------- | ------------------------------------------------------------ | ------------------------------------------- | ------------------------------------------------------------ | ----------------------------------------------- |
| `/etc/environment`    | 定义**全局环境变量**，适用于所有用户，在系统启动时加载。     | `KEY=value`                                 | 不支持 shell 语法（如变量引用或命令替换），只能用简单的键值对形式定义变量。 | 适用于所有用户，自动在系统启动时加载。          |
| `/etc/profile`        | **全局 shell 配置文件**，适用于所有用户的登录 shell，在用户登录时运行。 | 支持 在 Docker 中使用环境变量 shell 脚本语法 | 通常包含全局的环境变量设置、路径配置、别名等，支持 shell 脚本语法（如条件语句、循环等）。 | 所有用户登录 shell 时自动执行。                 |
| `/etc/profile.d/*.sh` | **扩展 `/etc/profile` 的功能**，允许为特定应用或功能模块单独设置环境变量和配置。 | 各 `.sh` 文件独立，支持 shell 脚本语法      | 提供更细粒度的控制，允许系统管理员为不同的应用程序或模块编写特定的环境变量配置脚本。 | 所有用户的登录 shell，自动加载所有 `.sh` 文件。 |

#### 用户环境变量配置

**用户环境变量仅对特定用户的会话有效**，通常由用户自己配置，并保存在用户 home 目录下的配置文件中。

| **文件**          | **作用**                                                     | **加载时机**                            | **典型用法**                                                 | **特点**                                                     |
| ----------------- | ------------------------------------------------------------ | --------------------------------------- | ------------------------------------------------------------ | ------------------------------------------------------------ |
| `~/.bashrc`       | 用户级非登录 shell 的配置文件，定义环境变量、别名和 shell 功能。适用于每次打开新终端时加载。 | 非登录 shell 启动时（如打开新终端窗口） | `export PATH="$HOME/bin:$PATH"` `alias ll='ls -la'`          | 用户个性化 shell 环境的主要工具，常用于设置别名、函数及环境变量。适用于所有非登录 shell 会话。 |
| `~/.bash_profile` | 用户级登录 shell 的配置文件，主要用于定义登录时的环境变量。通常调用 `~/.bashrc` 来加载非登录 shell 配置。 | 登录 shell 启动时                       | `if [ -f ~/.bashrc ]; then . ~/.bashrc; fi`                  | 专用于登录 shell，如通过 SSH 或控制台登录时加载。通常只加载一次，并可以调用 `~/.bashrc`。 |
| `~/.profile`      | 用户级通用 shell 配置文件，如果 `~/.bash_profile` 不存在，则 Bash 会加载 `~/.profile`。适用于其他 shell。 | 登录 shell 启动时                       | `export JAVA_HOME="/usr/lib/jvm/java-11-openjdk-amd64"` `export PATH="$JAVA_HOME/bin:$PATH"` | 通用配置文件，适用于 Bash 和其他 shell。在 `~/.bash_profile` 不存在时作为后备配置。 |
| `~/.bash_logout`  | 用户退出登录 shell 时执行的脚本，用于清理环境或记录会话信息。 | 退出登录 shell 时                       | `echo "Logout at $(date)" >> ~/.logout_log`                  | 在用户退出登录 shell 时自动执行，用于清理任务或保存退出日志。适合用于清理会话的任务或执行退出时的命令。 |

#### 非 Bash Shell 的配置

除了 Bash，其他 shell（如 Zsh 和 Fish）也有各自的配置文件和方法，用于设置和持久化环境变量。

| **文件**                     | **作用**                                                     | **加载时机**                            | **典型用法**                                        | **特点**                                                     |
| ---------------------------- | ------------------------------------------------------------ | --------------------------------------- | --------------------------------------------------- | ------------------------------------------------------------ |
| `~/.zshrc`                   | 非登录 shell 的配置文件，用于设置 Zsh 环境变量、别名和函数。类似于 Bash 的 `~/.bashrc`。 | 非登录 shell 启动时（如打开新终端窗口） | `export PATH="$HOME/bin:$PATH"` `alias ll='ls -la'` | 用户自定义 Zsh 环境的主要文件，适用于非登录 shell，会话中自动加载。 |
| `~/.zprofile`                | 登录 shell 的配置文件，初始化环境，类似于 Bash 的 `~/.bash_profile`。可调用 `~/.zshrc`。 | 登录 shell 启动时                       | `if [ -f ~/.zshrc ]; then source ~/.zshrc; fi`      | 专用于登录 shell 的配置文件，用于设置初始环境，并调用非登录 shell 的配置。 |
| `~/.config/fish/config.fish` | Fish shell 的用户配置文件，设置环境变量、别名等。使用 Fish 特有的语法，不支持 POSIX 语法。 | 启动 Fish shell 时                      | `set -x PATH $HOME/bin $PATH` `alias ll="ls -la"`   | Fish shell 的主要配置文件，语法不同于其他 shell，使用简单、直观的命令语法。适用于所有 Fish 会话。 |

### 环境变量的加载顺序和优先级

了解不同环境变量配置文件的加载顺序和优先级对于正确配置系统至关重要。

```mermaid
graph TD;
    A[1. System Boot] --> B["2. /etc/environment"]
    B --> C["3. /etc/profile"]
    C --> D["4. /etc/profile.d/*.sh"]
    C --> E["5. ~/.bash_profile or ~/.profile"]
    E --> F["6. ~/.bashrc"]
    F --> G["7. Non-login Shell (Terminal Window)"]
    G --> H["8. Logout"]
    H --> I["9. ~/.bash_logout"]
    
    subgraph User Level
        E
        F
        I
    end


    subgraph System Level
        B
        C
        D
    end
    
    style B fill:#ffcccc,stroke:#333,stroke-width:2px
    style C fill:#ffcc99,stroke:#333,stroke-width:2px
    style D fill:#ffcc99,stroke:#333,stroke-width:2px
    style E fill:#ccffcc,stroke:#333,stroke-width:2px
    style F fill:#ccffcc,stroke:#333,stroke-width:2px
    style G fill:#ccccff,stroke:#333,stroke-width:2px
    style H fill:#ccccff,stroke:#333,stroke-width:2px
    style I fill:#ffccff,stroke:#333,stroke-width:2px
```

| **阶段**                       | **加载文件**                      | **描述**                                                     | **加载时机**                                       | **同名变量优先级（数值）** |
| ------------------------------ | --------------------------------- | ------------------------------------------------------------ | -------------------------------------------------- | -------------------------- |
| **1. 系统启动**                | `/etc/environment`                | 定义系统范围的静态环境变量，适用于所有用户。此文件不支持 shell 语法，仅支持简单的键值对形式。 | 系统启动时加载，影响所有用户的全局环境。           | 10                         |
| **2. 用户登录 (Login Shell)**  | `/etc/profile`                    | 全局的登录 shell 配置文件，适用于所有用户。通常用于设置全局路径、别名和系统范围的 shell 配置。 | 用户通过登录 shell（如 SSH、TTY 登录）时加载。     | 20                         |
|                                | `/etc/profile.d/*.sh`             | 系统管理员可通过该目录中的脚本为特定应用程序或模块设置额外的环境变量。 | 作为 `/etc/profile` 的扩展，按顺序加载每个脚本。   | 30                         |
| **3. 用户登录 (Login Shell)**  | `~/.bash_profile` 或 `~/.profile` | 用户级的登录 shell 配置文件，通常包含用户特定的环境变量。`~/.bash_profile` 针对 Bash，`~/.profile` 更通用。 | 登录 shell 启动时加载（如 SSH 登录、控制台登录）。 | 40                         |
|                                | `~/.bashrc`                       | 通常由 `~/.bash_profile` 调用，定义非登录 shell 的配置，如别名、函数和用户特定的变量。 | 非登录 shell 启动时（如打开终端窗口）时加载。      | 50                         |
| **4. 非登录 Shell 启动**       | `~/.bashrc`                       | 非登录 shell 的配置文件，通常由 `~/.bash_profile` 调用，设置别名、环境变量、函数等。 | 每次启动新的终端窗口（非登录 shell）时加载。       | 50                         |
| **5. 用户退出 (Logout Shell)** | `~/.bash_logout`                  | 用户退出登录 shell 时执行的脚本。用于清理临时文件、保存退出日志等操作。 | 用户退出登录 shell（如退出 SSH、TTY）时执行。      | 不适用                     |

**在同一个会话中，如果同一个变量在多个文件中被定义，后加载的文件会覆盖之前的设置。**例如上表中优先级数值越高，覆盖优先级越高。即数值高的文件中的同名变量会覆盖数值低的文件中的同名变量。例如，`~/.bashrc` (优先级 50) 会覆盖 `/etc/profile` (优先级 20) 中定义的同名变量。

根据终端类型不同，环境变量的加载行为也不同：

- **登录 shell**：当用户首次登录系统（如通过 SSH、TTY）时，系统会加载 `/etc/profile`、`~/.bash_profile` 或 `~/.profile`，然后根据这些文件设置登录 shell 的环境。
- **非登录 shell**：当用户打开一个新的终端窗口或执行一个 shell 脚本时，系统会加载 `~/.bashrc` 或 `~/.zshrc`，设置非登录 shell 的环境。这些环境变量仅在当前非登录 shell 中有效。

总结来说，登录 shell 更适合进行用户登录时的全局环境配置，而非登录 shell 则适合用于更为频繁的日常任务和命令行操作。

## 环境变量的高级使用

### 环境变量的引用与扩展

#### 使用 `$` 引用变量

在 Linux 中，通过在变量名前加 `$` 符号来引用环境变量。例如：

```shell
export MY_VAR="Hello, World!"
echo $MY_VAR  
# 输出: Hello, World!
```

这是最常见的引用方式，适合在命令行和脚本中使用，能够动态传递和使用变量的值。

#### 使用 `${}` 进行引用和扩展

`${}` 是一种更灵活的引用方式，适合处理变量与其他字符紧密相连的情况，确保变量正确解析。例如：

```shell
FILENAME="file"
echo "${FILENAME}_backup.txt"  
# 输出: file_backup.txt
```

#### 变量替换

Bash 提供了替换机制，当变量未定义或为空时，可以返回默认值：

1. **默认值替换**：`${VARIABLE_NAME:-default_value}` 当变量未设置时，返回 `default_value`，但不修改变量本身：

   ```shell
   echo ${MY_VAR:-"Default Value"}  # 输出: Default Value
   ```

2. **空值替换并赋值**：`${VARIABLE_NAME:=default_value}` 如果变量未设置，返回 `default_value`，并同时将其赋值给变量：

   ```shell
   echo ${MY_VAR:="Default Value"}  # 输出: Default Value
   echo $MY_VAR  # 输出: Default Value
   ```

### 管理复杂的 PATH 变量

#### 添加路径到 `PATH` 的正确方式

`PATH` 变量决定了 shell 在执行命令时查找可执行文件的目录列表。正确的做法是将新的路径追加到现有的 `PATH` 变量中，而不是覆盖它：

```shell
export PATH=$PATH:/new/path
```

这行命令将 `/new/path` 添加到 `PATH` 的末尾。如果希望优先使用新路径，可以将它放在最前面：

```shell
export PATH=/new/path:$PATH
```

#### 路径顺序的重要性

`PATH` 中的路径顺序决定了 shell 查找命令的优先级。当同一个命令在多个路径中存在时，shell 会执行第一个找到的版本。因此，路径的安排很重要：

1. **系统路径优先**：确保 `/usr/bin` 和 `/bin` 等系统路径优先，避免误覆盖系统命令。

2. **用户路径优先**：在需要覆盖系统命令时，可以将用户路径放在前面：

   ```shell
   export PATH=~/custom/bin:$PATH
   ```

3. **避免冗余和无效路径**：管理好路径，避免路径重复或无效路径。

#### 临时修改 `PATH` 变量

如果需要临时修改 `PATH`，可以在执行命令时临时更改，而不会影响全局环境：

```shell
PATH=/new/temp/path:$PATH command_to_run
```

这种方法适合在特定环境下执行命令或测试不同的工具版本，命令执行完毕后 `PATH` 会自动恢复。

### 环境变量的调试

#### `env -i` 命令启动无环境变量的 Shell

为了排除环境变量的影响，你可以使用 `env -i` 启动一个不带任何环境变量的 shell：

```shell
env -i bash --noprofile --norc
```

这会启动一个全新的 shell，不加载任何环境变量。此方法常用于调试环境问题，确保命令不受现有环境变量的影响。

#### `declare -x` 查看已导出的环境变量

`declare -x` 命令仅显示当前 shell 中已导出的环境变量，不包含普通变量或函数：

```shell
declare -x
```

这是一个方便的命令，用于检查当前 shell 中导出的环境变量状态。

#### 使用 `strace` 查看进程使用的环境变量

`strace` 是一个强大的工具，能够跟踪进程使用的系统调用和环境变量。以下命令可以帮助你查看某个进程读取了哪些环境变量：

```shell
strace -e trace=execve -s 1000 -o output.log env
```

`strace` 将跟踪 `env` 命令的执行，并将所有与环境变量相关的操作记录到 `output.log` 文件中，帮助分析复杂的环境问题。

## 环境变量的安全性与优化

### 环境变量的安全性

环境变量有时会用于存储敏感信息，如密码、API 密钥等。然而，这种做法存在一定的安全风险，因为环境变量在系统中相对容易被泄露或访问。

**风险分析：**

1. **进程环境可访问**：在某些情况下，系统中的其他用户可能通过查看进程环境（例如通过 `/proc` 文件系统）访问环境变量，从而获取敏感信息。
2. **日志记录风险**：如果环境变量值被意外写入日志文件（如错误日志），敏感信息可能会暴露给不相关的用户。
3. **环境传递风险**：当启动子进程时，父进程的环境变量通常会传递给子进程，这可能导致敏感信息被传播到不安全的环境中。

#### 使用 `.env` 文件和 `dotenv` 工具安全管理环境变量

为了解决环境变量的安全性问题，可以使用 `.env` 文件和相关的工具（如 `dotenv`）来更安全地管理这些变量。`.env` 文件通常用于在开发或部署环境中存储配置，而不会将其公开到全局环境中。

1. **创建 `.env` 文件**：在项目的根目录下创建 `.env` 文件，并将敏感信息存储在其中。例如：

   ```shell
   DB_PASSWORD=SuperSecretPassword
   API_KEY=YourApiKeyValue
   ```

2. **使用 `dotenv` 加载变量**：在使用这些变量的脚本或应用中，可以通过 `dotenv` 库（适用于 Python、Node.js 等）加载 `.env` 文件中的变量，而不必将其暴露在全局环境中。

3. **保护 `.env` 文件**：确保 `.env` 文件的权限设置正确，并在版本控制系统中将其排除（如使用 `.gitignore`），以防止敏感信息泄露。

#### 避免环境变量泄露：减少使用 `export` 公布敏感变量

为了减少环境变量泄露的风险，建议谨慎使用 `export` 命令来公开敏感信息。相反，可以考虑以下方法：

1. **使用局部变量**：在脚本或命令中尽可能使用局部变量，而不是环境变量，这样可以限制变量的作用范围。

2. **临时变量设置**：在需要时临时设置环境变量，只在当前命令或脚本执行期间有效：

   ```shell
   DB_PASSWORD=SuperSecretPassword command_to_run
   ```

3. **加密存储**：对于非常敏感的信息，考虑使用加密工具或安全存储服务（如 AWS Secrets Manager）进行保护，而不是简单地存储在环境变量中。

### 环境变量配置的优化

#### 避免冗余的环境变量配置

环境变量的冗余配置不仅会增加系统的复杂性，还可能导致不必要的冲突和资源浪费。以下是一些优化策略：

1. **定期清理环境变量**：定期检查和清理不再使用或重复的环境变量，保持配置的简洁性。
2. **合并相似变量**：如果多个变量具有相似的功能或目的，考虑将它们合并为一个更通用的变量。例如，将多个路径变量合并为一个综合的 `PATH` 变量。
3. **文档化环境变量**：记录所有使用的环境变量及其用途，以便日后维护和优化。

#### 使用 `direnv` 自动加载特定目录的环境变量

`direnv` 是一个有用的工具，可以根据用户当前所在的目录自动加载和卸载环境变量。它允许用户为不同的项目配置独立的环境，而不必手动切换。

1. **安装 `direnv`**：首先需要在系统中安装 `direnv` 工具，通常可以通过包管理器完成：

   ```shell
   sudo apt install direnv
   ```

2. **配置项目环境**：在项目目录下创建 `.envrc` 文件，并将所需的环境变量定义在其中：

   ```shell
   export PATH=$HOME/project/bin:$PATH
   export DB_PASSWORD=SuperSecretPassword
   ```

3. **自动加载环境**：每次进入该目录时，`direnv` 会自动加载 `.envrc` 中的环境变量。当用户离开该目录时，这些变量将被卸载。

`direnv` 提供了一种优雅的方式来管理多个项目的环境配置，避免了环境变量的全局污染。

#### 基于场景的环境变量管理策略（如开发环境 Vs 生产环境）

在不同的环境（如开发、测试、生产）中，通常需要使用不同的环境变量配置。基于场景的环境变量管理策略可以帮助开发者和运维人员更好地控制和调试系统。

1. **分离配置文件**：为不同的环境（如开发、测试、生产）创建独立的环境变量配置文件，如 `.env.dev`、`.env.prod`，并根据需要进行加载。
2. **自动切换环境**：使用脚本或工具（如 `direnv` 或 `dotenv`）根据当前环境自动切换和加载相应的环境变量配置。
3. **敏感信息保护**：在生产环境中尤其要注意环境变量的安全性，确保敏感信息不被暴露。可以使用加密存储或安全凭证管理服务来进一步保护这些信息。

## 环境变量在脚本中的使用

### 在 Bash 脚本中使用环境变量

#### 使用 `$VARIABLE_NAME` 传递参数

在脚本中，可以直接使用 `$VARIABLE_NAME` 来引用和使用环境变量。例如：

```shell
#!/bin/bash

# 定义一个环境变量
GREETING="Hello"

# 使用环境变量
echo "$GREETING, $USER!"
```

在这个简单的脚本中，`GREETING` 和 `USER` 是两个环境变量。`USER` 是系统提供的，表示当前用户，而 `GREETING` 是自定义的变量。脚本输出一个欢迎消息，包含用户的用户名。

#### 通过命令行传递环境变量

Bash 脚本可以接收从命令行传递的环境变量，这在自动化脚本中尤为有用。例如：

```shell
#!/bin/bash

# 使用传递进来的环境变量
echo "The project directory is: $PROJECT_DIR"
```

你可以在运行脚本时传递 `PROJECT_DIR` 变量：

```shell
PROJECT_DIR="/home/user/project" ./myscript.sh
```

这种方法使得脚本的行为可以通过外部参数进行调整，而不需要修改脚本本身。

#### 设置和导出环境变量

在脚本中，使用 `export` 命令可以将一个变量导出为环境变量，使其在脚本的所有子进程中都可见。例如：

```shell
#!/bin/bash

# 设置并导出一个环境变量
export DATABASE_URL="mysql://user:password@localhost/dbname"

# 执行某个程序，该程序可以访问 DATABASE_URL
python myapp.py
```

在这个例子中，`DATABASE_URL` 被导出，`myapp.py` 可以访问到这个环境变量，用于数据库连接配置。

#### 修改现有环境变量

脚本还可以修改现有的环境变量。例如，扩展 `PATH` 变量以包括自定义的二进制路径：

```shell
#!/bin/bash

# 将自定义路径添加到 PATH 中
export PATH="/opt/myapp/bin:$PATH"

# 验证新的 PATH
echo $PATH
```

这样做确保了脚本执行时，系统首先查找 `/opt/myapp/bin` 中的可执行文件，然后才查找其他路径。

#### 条件逻辑基于环境变量

脚本可以根据环境变量的值执行不同的操作。例如：

```shell
#!/bin/bash

# 基于 DEBUG 环境变量控制脚本行为
if [ "$DEBUG" == "true" ]; then
    echo "Debug mode is ON"
    set -x  # 开启命令回显
else
    echo "Debug mode is OFF"
    set +x  # 关闭命令回显
fi
```

在这个例子中，脚本通过检查 `DEBUG` 环境变量来决定是否开启调试模式。在调试模式下，脚本将回显每一条命令，这对于排查问题非常有帮助。

### 环境变量在 CI/CD 中的应用

在持续集成/持续部署（CI/CD）管道中，环境变量用于传递配置信息和敏感数据（如 API 密钥），以便在不同的构建和部署阶段使用。这种做法不仅提高了安全性，还简化了配置管理。

#### 在 CI/CD 系统中定义环境变量

大多数 CI/CD 工具（如 Jenkins、GitLab CI、Travis CI）都允许在项目设置或管道文件中定义环境变量。例如，在 GitLab CI 中，可以在 `.gitlab-ci.yml` 文件中定义全局或作业级别的环境变量：

```shell
variables:
  DATABASE_URL: "mysql://user:password@localhost/dbname"

build:
  script:
    - echo $DATABASE_URL
```

这些变量在管道的所有步骤中都可用，确保构建和部署过程的一致性。

#### 使用环境变量存储敏感信息

在 CI/CD 中，敏感信息（如密钥和密码）不应硬编码在脚本或配置文件中。相反，应将它们存储为环境变量，并通过安全机制（如加密或隐藏变量）进行管理。例如，在 Jenkins 中，可以使用 `Credentials Binding Plugin` 来安全地注入敏感信息：

```groovy
pipeline {
    environment {
        AWS_ACCESS_KEY_ID = credentials('aws-access-key-id')
        AWS_SECRET_ACCESS_KEY = credentials('aws-secret-access-key')
    }
    stages {
        stage('Deploy') {
            steps {
                sh 'aws s3 sync . s3://mybucket'
            }
        }
    }
}
```

#### 基于环境的动态配置

可以根据环境变量的值动态选择配置。例如，在 Node.js 应用中，可以使用 `NODE_ENV` 环境变量来选择不同的配置文件：

```javascript
const config = require(`./config.${process.env.NODE_ENV}.json`);
```

在 CI/CD 管道中，可以通过设置 `NODE_ENV` 来自动选择适当的配置：

```yaml
deploy:
  stage: deploy
  script:
    - export NODE_ENV=production
    - npm run deploy
```

这种方法确保了同一份代码能够灵活地部署到不同的环境中。

#### 在 Docker 中使用环境变量

Docker 支持在容器启动时传递环境变量。这些变量可以通过 `docker run` 命令的 `-e` 选项或 `--env-file` 选项传递。例如：

```shell
docker run -e DATABASE_URL="mysql://user:password@localhost/dbname" myapp
```

或者使用 `.env` 文件：

```shell
docker run --env-file .env myapp
```

通过这种方式，应用程序可以根据传入的环境变量配置其行为，而无需在镜像中硬编码这些信息。

#### 在 Kubernetes 中管理环境变量

Kubernetes 提供了多种管理环境变量的方法，包括通过 ConfigMaps 和 Secrets 将配置信息和敏感数据传递给容器。

1. **通过 ConfigMap 设置环境变量**：

   ```yaml
   apiVersion: v1
   kind: ConfigMap
   metadata:
     name: app-config
   data:
     DATABASE_URL: "mysql://user:password@localhost/dbname"
   ```

   在 Pod 配置中引用 ConfigMap：

   ```yaml
   apiVersion: v1
   kind: Pod
   metadata:
     name: myapp
   spec:
     containers:
     - name: myapp-container
       image: myapp:latest
       envFrom:
       - configMapRef:
           name: app-config
   ```

2. **通过 Secret 管理敏感环境变量**：

   Kubernetes 的 Secret 机制用于安全管理敏感数据，例如 API 密钥。与 ConfigMap 类似，Secret 可以在 Pod 中引用，并以环境变量的形式提供给容器：

   ```yaml
   apiVersion: v1
   kind: Secret
   metadata:
     name: db-secret
   type: Opaque
   data:
     DB_PASSWORD: c3VwZXJzZWNyZXRwYXNzd29yZA==
   ```

   在 Pod 中引用 Secret：

   ```yaml
   apiVersion: v1
   kind: Pod
   metadata:
     name: myapp
   spec:
     containers:
     - name: myapp-container
       image: myapp:latest
       env:
       - name: DB_PASSWORD
         valueFrom:
           secretKeyRef:
             name: db-secret
             key: DB_PASSWORD
   ```

这种方法确保了容器中的环境变量安全且易于管理，适用于大规模的集群环境。
