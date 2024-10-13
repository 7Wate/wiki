---
title: GNU&Linux 社区与文化
description: GNU&Linux 社区与文化
keywords:
  - GNU
  - Linux
  - 社区
  - 文化
tags:
  - Linux/文化
  - 技术/操作系统
author: 7Wate
date: 2023-06-21
---

## 官方社区

### 官方讨论社区

[Linux.org](https://www.linux.org/) 是一个广泛的 Linux 讨论和学习社区，提供了丰富的信息资源，包括新闻、教程、论坛讨论和详尽的 Linux 发行版目录。无论你是 Linux 新手还是经验丰富的用户，都可以在这个社区找到有用的信息和交流的机会。

### 内核归档社区

[Kernel.org](https://www.kernel.org/) 是 Linux 内核的主要分发点，你可以在这个网站上找到最新的 Linux 内核源代码，以及与内核相关的各种信息，包括发布日志、维护者信息、补丁提交指南等。这是一个面向内核开发者和高级用户的社区。

### GNU 项目社区

[GNU.org](https://www.gnu.org/) 是 GNU 项目的官方网站，你可以在这里找到关于 GNU 操作系统、GNU 许可证和自由软件哲学的所有信息。这个网站还包括了一个开放的社区，其中包括各种邮件列表、IRC 频道和论坛，供 GNU 用户和开发者进行交流。

### 自由软件基金会

[Free Software Foundation](https://www.fsf.org/) (FSF) 是一个致力于自由软件事业的非营利性组织，其官方网站提供了丰富的关于自由软件的信息和资源，包括新闻、活动、项目、法律资源和教育资源等。作为自由软件运动的中心，FSF 社区也为用户、开发者和支持者提供了一个交流和协作的平台。<https://www.fsf.org/>)

### Linux 基金会

[Linux 基金会](https://www.linuxfoundation.org/) 旨在推动 Linux 和开源生态系统的增长。它主办各种技术峰会，发布研究报告，同时也主导了多个重要的开源项目，比如 CNCF（云原生计算基金会），LF AI（Linux 基金会人工智能），Hyperledger 等。

## 开源社区

### Debian 社区

![Openlogo-debianV2.svg](https://static.7wate.com/img/2022/08/08/5509dcaa6438e.png)

> [Debian](https://www.debian.org/) 是一个由普罗大众组成的社区！

#### 概述

在 1993 年 8 月，Ian Murdock 开始着手创建一个遵循 Linux 和 GNU 理念的、开放的操作系统。他向其他软件开发人员发出了一份公开邀请，希望他们能为一个基于 Linux 内核的新发行版作出贡献，当时的 Linux 内核仅仅还在起步阶段。

Debian 项目最初是一个由自由软件爱好者组成的和谐小团体，后来逐渐发展成为一个由开发者、贡献者和用户组成的庞大且组织良好的社区。**Debian 的设计目标是创建一个各组件能够紧密协作、并得到精心维护和支持的系统，同时积极接纳来自自由软件社区的开放设计、贡献和支持。**

#### 特色

**Debian 以其坚守 Unix 和自由软件的理念，以及给用户提供的丰富选择而闻名。**至今，Debian 提供了超过 25,000 个软件，超过 50,000 个软件包，并正式支持 10 个计算机系统架构。众多知名的 Linux 发行版，例如 Ubuntu、Knoppix 和 Deepin，也都基于 Debian GNU/Linux 构建。

Debian 社区下设有多个**采用不同操作系统内核**的子项目：

- 主要项目是采用 **Linux 内核**的 Debian GNU/Linux。
- 采用 **GNU Hurd 内核**的 Debian GNU/Hurd。
- 采用 **FreeBSD 内核**的 Debian GNU/kFreeBSD。

Debian 主要有三个版本：**稳定版（stable）、测试版（testing）、不稳定版（unstable）**。

Debian 稳定版通常每两年发布一次，每个版本从发布之日起会得到大约**三年的正式支持**。期间，系统会不定期得到小版本更新以及持续的安全更新以修复已知的重要问题。

自 Debian 6 开始，Debian 也推出了长期支持（LTS）计划，为每个稳定版在三年支持期结束后提供额外两年的安全更新支持，但不再提供小版本更新。这意味着**每个稳定版的用户可以享受总计五年的安全更新支持**。

![Debian release timeline](https://static.7wate.com/img/2023/06/21/a5dbc38b5743c.png)

#### 社区评价

Debian Project 是一个**独立运作的项目，不受任何商业性质的影响**，并且不依赖任何商业公司或者机构，这使得 Debian 能够坚持自由软件的理念和独特风格。因为 Debian 不受任何商业公司或者机构控制，所以它不会为了迎合商业利益而牺牲用户权益，也不会因为公司运营不善或者商业模式转换等因素影响开发进度。这些特性使得 Debian 在众多的 GNU/Linux 发行版中独树一帜。

一些用户批评 Debian 的**发布周期过长**，这可能导致稳定版中的软件包版本较旧。由于 Debian 的设计理念主要考虑稳定性，因此它的发行版通常更适合“静态”环境（例如服务器或开发环境），在这些环境中，用户通常只需要安全更新，而不需要最新的软件版本。

另外，因为 Debian 对于**自由软件的严格标准**，有些软件和文件并未出现在 Debian 的官方包库中。例如，mplayer 曾经就未被收录为 Debian 的官方包。同样地，也有人批评 Debian 将一些专有软件放到“非自由”包库中，而没有完全排除这些软件。过去，Debian 在其“主要”（main）包库中同时包含自由和非自由的软件包，但现在已将非自由的软件，例如专有的驱动程序，移至不同的包库中。

### Arch 社区

![Arch_Linux_logo.svg](https://static.7wate.com/img/2022/08/08/fa7736b4dd8d1.png)

> [Arch](https://archlinux.org/) 之道：Keep It Simple, Stupid

#### 概述

由加拿大程序设计师兼吉他手 Judd Vinet 从 2001 年早期开始开发 Arch Linux，并在 2002 年 3 月 11 日正式发行 0.1 版。2007 下半年，Vinet 退出了 Arch Linux 的开发，项目由 Aaron Griffin 接手并继续推进。

#### 特色

- **简洁**：Arch Linux 主张避免任何不必要的添加、修改和复杂性增加，致力于提供一个最小化、高度可定制的平台。
- **现代**：Arch 采用滚动升级策略，始终保持软件处于最新的稳定版本。只要系统软件包不出现破损，都会使用最新版本。安装一次，随时升级，享受最新的软件和特性。
- **实用**：Arch 注重实用性，避免无谓的意识形态争辩。最终的设计决策都是由开发者基于事实的技术分析和讨论来决定的，不受流行观点和政治因素的影响。
- **以用户为中心**：Arch Linux 一直坚持以用户为中心，更关注满足贡献者的需求，而非只是吸引尽可能多的用户。

这四点可以概括为 Arch 之道由**简洁、现代、实用、以用户为中心**构成，或许最好的结词是 **Keep It Simple, Stupid。**

#### 社区评价

Arch Linux 是一款具有极度定制化特性的操作系统，允许用户根据个人需求和偏好配置，显著区别于像 Ubuntu 和 Fedora 这类预装大量软件的发行版。同时，通过采取滚动升级模型，Arch Linux 确保了社区成员能始终使用到最新的软件包，只要他们定期进行系统更新。

社区为 Arch Linux 打造了丰富的 Wiki 和用户资源库，不仅提供了全面的操作系统安装和维护信息，还有一个大型的社区驱动的软件仓库，为用户提供了极其丰富的资源。然而，也必须注意到，Arch Linux 作为一款面向中高级用户的系统，其入门门槛可能相对较高，**对于 Linux 新手可能会有一定挑战**。

### openSUSE 社区

![openSUSE](https://static.7wate.com/img/2023/06/21/a1b00265b30b2.png)

> 桌面用户、开发者以及系统管理员的匠之所选。

[openSUSE](https://www.opensuse.org/) 是一款基于 Linux 的开源操作系统，对**稳定性和易用性**有着深远的追求。它是一款多用途的发行版，能够满足各种类型的用户需求。openSUSE 项目由国际 IT 企业 SUSE 赞助并支持，该公司也为 openSUSE 提供了商业版本，即 SUSE Linux Enterprise Server (SLES)。

openSUSE 以其出色的硬件兼容性、清晰的配置工具和卓越的用户文档而受到广泛赞誉。项目发布两种版本的 openSUSE，分别为 openSUSE Leap（稳定版本）和 openSUSE Tumbleweed（滚动更新版本）。

#### 特色

##### YaST

openSUSE 包含一个称为 YaST（Yet another Setup Tool）的系统配置工具，它是一个功能全面的配置工具，允许用户以图形界面或命令行界面对系统进行设置和修改。YaST 是 openSUSE 的一大亮点，极大地方便了系统的管理和配置。

##### 稳定性和易用性

openSUSE 的设计注重**稳定性和易用性**，使其成为 Linux 初学者的理想选择。开发者社区提供大量的教程和文档，帮助新用户解决问题。

##### 发布版本

openSUSE 提供两种版本的发行版，分别为 **openSUSE Leap** 和 **openSUSE Tumbleweed**。Leap 是定期发布的稳定版本，强调稳定性和兼容性。Tumbleweed 是滚动更新版本，为了追求最新的软件和功能，采用了持续更新的模式。

#### 社区评价

openSUSE 是世界上最受欢迎的 Linux 发行版之一，它以其易用性、稳定性和全面的特性受到了用户的高度赞誉。开发者社区活跃，而且对新手友好，提供了大量的教程和文档来帮助新用户解决问题。

虽然 openSUSE 是一个强大且易于使用的系统，但是有些用户反映，openSUSE 的软件包可能不如一些其他的发行版更新得那么及时，这可能会让一些追求最新软件的用户感到失望。此外，一些用户也反映 YaST 有时候对于高级用户来说过于复杂。

![openSUSE release timeline](https://static.7wate.com/img/2023/06/21/eb2be1fa0406e.png)

## 商业社区

### RedHat 社区

![Red_Hat_logo_1.svg](https://static.7wate.com/img/2022/08/08/1871b3cf0a5c5.png)

> 世界领先的企业级开源解决方案供应商。

#### 概述

[红帽](https://www.redhat.com/)（Red Hat）是美国一家以开发、贩售 Linux 发行版本并提供技术服务为业务内容的企业，其著名的产品为 Red Hat Enterprise Linux。

1990 年代末期，Linux 以自由软件和开放源代码的理念挑战商业且闭源的 Windows 在操作系统市场的霸主地位。适时地，Red Hat 推出了 Linux 系统与软件集成包——Red Hat Linux，满足了市场的需求，从而奠定了 Red Hat 在 Linux 业界的领导地位。

截至 2008 年，Red Hat 在提供 Linux 集成服务的同类企业中规模最大。Red Hat 于 1999 年 8 月 11 日在纳斯达克上市，2005 年 12 月 19 日纳入纳斯达克 100 指数，2006 年 12 月 12 日转到纽约证券交易所挂牌。2018 年 10 月 28 日，IBM 以每股 190 美元的现金收购 Red Hat 所有已发行股份，总价值约为 340 亿美元。目前红帽的产品涉及五大技术领域：云计算、存储、虚拟化、中间件、操作系统。

#### Fedora

![Fedora_logo_(2021).svg](https://static.7wate.com/img/2022/08/08/b742d2b21d59e.png)

[Fedora Linux](https://getfedora.org/)（第七版以前为 Fedora Core）是较具知名度的 Linux 发行包之一，由 Fedora 项目社群开发，红帽公司赞助。其目标是创建一个新颖、多功能且自由（开放源代码）的操作系统。**Fedora 是商业化的 Red Hat Enterprise Linux 发行版的上游源码。**

最早，Fedora Linux 社群的目标是为 Red Hat Linux 制作并发布第三方的软件包。然而，当免费的 Red Hat Linux 停止发行后，Fedora 社群整合到了 Red Hat 赞助的 Fedora 项目。新的目标是开发一个由社群支持的操作系统。Red Hat Enterprise Linux 则取代了 Red Hat Linux，成为官方支持的系统版本。

![fedora release timeline](https://static.7wate.com/img/2023/06/21/b530272250eab.png)

#### Red Hat Enterprise Linux

![Red_Hat_Enterprise_Linux_textlogo_(without_the_hat).svg](https://static.7wate.com/img/2022/08/08/978ef44593a20.png)

Red Hat Enterprise Linux（RHEL）是一个由 **Red Hat 开发的面向商业市场的 Linux 发行版。**红帽公司从 Red Hat Enterprise Linux 5 开始，为每个版本的企业版 Linux 提供 10 年的支持。RHEL 是常用的非官方简称。Red Hat Enterprise Linux 约每 3 年发布一个新版本。起初，Red Hat Enterprise Linux 基于 Red Hat Linux，但使用较为保守的发布周期。后来的版本都是基于 Fedora。

![Red Hat Enterprise Linux release timeline](https://static.7wate.com/img/2023/06/21/ce4302a91afcc.png)

#### CentOS

![300px-Centos-logo-light.svg](https://static.7wate.com/img/2022/08/08/f67a281f4efaa.png)

CentOS（Community Enterprise Operating System）是 Linux 发行版之一，它是基于 Red Hat Enterprise Linux（RHEL）依照开放源代码规定发布的源代码所编译而成。因为源于相同的源代码，因此许多需要高度稳定性的服务器选择 CentOS 替代商业版的 Red Hat Enterprise Linux。CentOS 和 RHEL 的主要区别在于，CentOS 并不包含封闭源代码软件，它的主要修改是为了移除不能自由使用的商标。

**CentOS 开发团队于 2020 年 12 月 8 日宣布，传统的 CentOS 8 将仅维护至 2021 年底，之后仅维护 CentOS Stream，使其变为滚动发行的散布版。**

#### RHEL、CentOS 和 Fedora 的关系

**RHEL、CentOS 和 Fedora 的相似之处都是基于 2004 年停产的 Red Hat Linux。**RHEL、CentOS 和 Fedora 的区别在于：CentOS 是社区开发的 RHEL；Fedora 是面向社区、快节奏的 RHEL 上游贡献者；RHEL 则是基于 Fedora 的企业稳定版。

|        | 免费下载 | 免费使用 | 技术支持 (商业) |
| :----: | :------: | :------: | --------------- |
|  RHEL  |    否    |    否    | 付费提供        |
| CentOS |    是    |    是    | 不提供          |
| Fedora |    是    |    是    | 不提供          |

### Ubuntu 社区

![Ubuntu-logo-2022.svg](https://static.7wate.com/img/2022/08/08/db8eb92ea5fac.png)

> 我的存在是因为大家的存在。

#### 概述

**[Ubuntu](https://ubuntu.com/) 是一个基于 Debian 的 Linux 发行版，以桌面应用为主。**Ubuntu 主要有三个版本：桌面版、服务器版和专为物联网设备及机器人设计的 Core 版。

**Ubuntu 由英国的 Canonical 公司发布并提供商业支持**。Canonical 公司由南非企业家 Mark Shuttleworth 创立，该公司通过销售 Ubuntu 相关的技术支持和其他服务来产生收益。Ubuntu 项目坚守开源软件开发原则，鼓励使用、研究、改进和分发自由软件。

Ubuntu 是目前用户数最多的 Linux 发行版之一。**Ubuntu 每六个月发布一个新版本**，每两年发布一次长期支持（LTS）版本。非 LTS 版本的支持期为 9 个月，而 **LTS 版本的支持期为 5 年**。

#### 特色

##### 系统管理

Ubuntu 的一个独特之处在于**所有系统相关任务都需要使用 sudo 指令**，这比传统的以系统管理员账户进行管理的方式更安全。这是 Linux 和 Unix 系统的基本设计理念之一。Windows 在其新版本中也引入了类似的 UAC（用户账户控制）机制。

##### 开发理念

Ubuntu 强调**易用性和国际化**，使其能够被更多的人使用。Ubuntu 在 5.04 版本发布时，就已将 Unicode（UTF-8）设为系统默认编码，以应对全球各地不同的语言和文字符号，努力为用户提供一个无乱码的交流平台。在语言支持方面，Ubuntu 是 Linux 发行版中的佼佼者。

##### 发布周期

Ubuntu 每 6 个月发布一个新版本，每个版本都有自己的代号和版本号。长期支持版本（LTS）每两年发布一次，它的更新和维护时间相对较长。

![Ubuntu release timeline](https://static.7wate.com/img/2023/06/21/3c6ac599e40ab.png)

#### 社区评价

在 2005 年伦敦举行的 Linux 世界论坛及会议（LinuxWorld Conference and Expo）上，Ubuntu 被读者选为**最佳 Linux 发行版**。

Ubuntu 虽源自 Debian，但 Debian 的创始人 Ian Murdock 对 Ubuntu 提出了批评。他认为 Ubuntu 虽然是一款优秀的 Linux 发行版，推动了 Debian 的全球化，**但 Ubuntu 开发的软件包并未直接改进 Debian 的现有软件包，因此产生了与 Debian 不兼容的问题。**他希望 Ubuntu 能与 Debian 进行更为紧密的合作，使其改进也可以被 Debian 所采用。

2010 年欧洲 GUADEC 会议上公布的“GNOME 开发者分布”表明，**Ubuntu 的母公司 Canonical 对 GNOME 项目的贡献很小。**此事引发了一些人的不满，他们认为 Canonical 应该做出更大的贡献。前 Red Hat 开发者 Greg DeKoenigsberg 就批评 Canonical 是一家伪装成技术企业的营销公司，虽然他后来为此道歉，但仍然坚持**Canonical 应该为 Linux 社区做出更大的贡献**。

由于 Ubuntu 基于 **Debian 的不稳定分支**（sid），所以在使用过程中，用户可能会遇到一些内部错误。

由于 Canonical 帮助微软开发了 **Windows 下的 Linux 兼容层（Windows Subsystem for Linux，WSL）**，部分用户认为这是背叛了 Linux 社区。

## 特色社区

### Kali Linux 社区

![kali logo](https://static.7wate.com/img/2023/06/21/86123ab0f03ad.png)

> The most advanced Penetration Testing Distribution

#### 概述

[Kali Linux](https://www.kali.org/) 是一款源自 Debian 的开源操作系统，专门为**数字取证和渗透测试**设计。此操作系统由 Offensive Security 维护和资助。Kali Linux 包含了数百种安全相关的工具，满足专业安全和网络测试人员的需求。

Kali Linux 系统被设计成满足所有的渗透测试需求，包含了静态二进制分析到后门的嵌入等多种工具。

#### 特色

##### 安全工具

Kali Linux 操作系统包括了一套广泛的**安全和取证工具**，它们在系统安装时即被预先安装，以便用户随时使用。这些工具包括 Aircrack-ng、Nmap、Wireshark、John the Ripper、Burp suite 和 OWASP ZAP 等等。

##### 系统设计

Kali Linux 系统专为安全专家设计，主要在**网络安全和信息安全审计**领域应用。这使得 Kali Linux 成为那些需要进行系统渗透测试、网络防御、计算机取证、安全研究等工作的人员的理想选择。

##### 定制性

Kali Linux 具有很高的**定制性**，允许用户定制自己的 Kali Linux 发行版，包括选择安装的工具，修改 Kali Linux ISO 图像等。

#### 社区评价

Kali Linux 作为一个专注于网络安全的操作系统，在网络安全领域的用户之间赢得了极高的赞誉。它为安全专业人员和热衷于安全的爱好者提供了一个集成了所有主要的安全工具的平台。

尽管 Kali Linux 的功能强大，但它并**不适合所有的用户**。由于其主要针对的是安全专家，因此对于初学者和非专业人士来说，Kali Linux 可能会感到复杂和难以管理。此外，使用 Kali Linux 所包含的一些工具可能需要合法的授权，否则可能会违反某些地方的法律规定。因此，**使用 Kali Linux 需要对安全和法律问题有充分的认识。**

### Tails 社区

![Tails-logo-flat-inverted.svg](https://static.7wate.com/img/2022/08/08/27870ae72a536.png)

> Tails is a portable operating system that protects against surveillance and censorship.

#### 概述

[Tails](https://tails.boum.org/)（The Amnesic Incognito Live System）是一个基于 Debian 的操作系统，专注于提供**个人隐私保护和匿名性**，并封锁所有非匿名通信。所有的外部通信都会被强制通过 Tor 网络进行传输，为了最大程度地确保用户的隐私安全。Tails 是一个可以通过 Live DVD 或 Live USB 启动的系统，其设计原则是**在非显式用户操作下不留下任何数据痕迹**。Tails 项目得到了 Tor Project 的经济支持。

#### 特色

##### 隐私和匿名性

Tails 的核心理念是提供一个**全匿名的操作环境**，并通过使用 Tor 网络，使用户在浏览互联网时可以难以被追踪。它包含了众多预安装的隐私工具，如匿名浏览器 Tor Browser，加密邮件客户端 Thunderbird，文件加密和隐藏工具等。

##### " 遗忘性 " 系统

Tails 是一个 " 遗忘性 " 的系统。这意味着，除非显式地保存，否则系统在关机后**不会保留任何用户数据**。这对于需要在不留下任何痕迹的情况下使用计算机的用户来说，是非常有用的。

##### 轻型系统

Tails 是一个轻量级的操作系统，可以在 Live DVD 或 Live USB 上运行。这使得用户可以在**任何支持引导的计算机上**，使用包含完整操作环境的 Tails。

#### 社区评价

Tails 社区以其对隐私保护的坚定承诺而受到高度赞誉。**它是对抗互联网审查，特别是在网络审查严格的国家和地区的重要工具。**然而，由于 Tails 的这些特性，它也可能被用于非法活动，这引发了一些关于如何平衡隐私权和社会责任的讨论。

由于 Tails 的使用有一定的技术门槛，使得不熟悉技术的用户可能难以上手。尽管 Tails 社区提供了详细的使用指南，但是由于 Tails 的安全特性，一些常见的用户体验可能会受到影响。此外，由于所有的网络流量都通过 Tor 网络，所以网络连接速度可能会较慢。

## 中国社区

### Deepin 社区

![Deepin_logo.svg](https://static.7wate.com/img/2023/06/21/f63a873842a78.png)

> 漂亮的设计、贴心的人机交互、安全友好的社区环境让您感觉宾至如归。

#### 概述

[Deepin](https://www.deepin.org/)（深度操作系统）是一个来自中国的，基于 Debian 的开源操作系统，**主要以美观和易用性为特点**。Deepin 系统由武汉深之度科技有限公司维护和发布。

Deepin 提供了一个用户友好的、美观的桌面环境，被称为 DDE（Deepin Desktop Environment）。此外，Deepin 还提供了一套自家开发的应用程序，包括深度商店、深度音乐、深度影院等。

在 2023 年，Deepin 发布了 V23 的预览版，包括了三个主要的新特性：**全新的仓库，原子更新，和自研的软件包格式 Linglong。**

#### 特色

- **美观的用户界面：Deepin 仍然是众多 Linux 发行版中最美观的一个**，它的桌面环境和系统应用都经过精心设计，目的是为用户提供一种清新、美观、用户友好的界面。

- **易用性**：Deepin 注重用户体验，提供了丰富的系统设置和定制选项，使用户能够按照自己的需要和喜好来定制系统。

- **本地化支持**：Deepin 是最先提供**全面中文支持**的 Linux 发行版之一，而且也提供了多种语言环境，以满足全球用户的需求。

Deepin V23 预览版引入了一些新的特性：

- **全新的仓库**：依赖于核心包和一些可选组件，预览阶段构建了一个全新的 V23 仓库。deepin 将继续从上游分发（如 Debian 和 Arch Linux）中学习。
- **[Linglong](https://linglong.dev/) 包格式**：这是由 deepin 开发的新包格式，旨在解决 Linux 下传统包格式因复杂依赖关系引起的各种兼容性问题，以及通过分散控制权限引起的安全风险。Linglong 可用于任何 Linux 发行版，支持应用程序的增量更新，管理，分发，以及沙盒化应用，这不仅提高了易用性，而且大大保护了用户隐私。
- **原子更新**：这是一种新的系统更新概念，可以在系统更新失败时将系统还原到之前的版本，从而有效地避免了一些依赖关系安装了，但系统没有完全升级的问题。原子更新不依赖于系统安装方法和特定分区，并支持升级后的系统回滚。

#### 社区评价

Deepin 因其美观的用户界面和易用性在用户中享有高度声誉，特别是在中国用户中极受欢迎。Deepin 被认为是一款适合新手的 Linux 发行版，因为它极大地降低了 Linux 的学习曲线。

然而，Deepin 也有一些争议，尤其是关于其隐私政策。由于 Deepin 的维护公司位于中国，一些用户担心 Deepin 可能被用于收集用户数据。然而，Deepin 是开源的，任何人都可以审计其代码，这就大大减轻了这种担忧。

### OpenEuler 社区

![OpenEuler](https://static.7wate.com/img/2023/06/21/825e46de12931.png)

#### 概述

openEuler 是基于 Linux Kernel 的开放的企业级 Linux 操作系统软件，具备高安全性、高可扩展性、高性能等技术特性，能够满足客户 IT 基础设施和云计算服务等多业务场景需求。openEuler 拥有三级智能调度，可以将多进程并发时延缩短 60%，而且还可以智能自动有规划，可将 Web 服务器性能提升 137%。

2021 年 9 月 25 日，面向数字基础设施的开源操作系统 EulerOS「欧拉」全新发布。它以 Linux 稳定系统内核为基础，支持鲲鹏处理器和容器虚拟化技术，是一个面向企业级的通用服务器架构平台。其可广泛部署于服务器、云计算、边缘计算、嵌入式等各种形态设备，应用场景覆盖 IT、CT 和 OT，实现统一操作系统支持多设备，应用一次开发覆盖全场景。目前，欧拉和鸿蒙已经实现了内核技术共享，未来，在鸿蒙和欧拉之间会共享底层技术，使安装两个操作系统的设备可以连接起来，打通两个操作系统。

> 华为服务器操作系统 EulerOS 开源后命名为 openEuler。

#### 特色

OpenEuler 基于 Linux Kernel 5.10 内核构建，并且在进程调度、内存管理等方面带来了 10 余处创新。

- **多架构支持**：如主流的处理器架构和硬件 100% 覆盖，例如 ARM、x86、RISC-V 等。
- **全场景覆盖**：如云原生、大数据、CDN、工业控制等，主流应用场景 100% 支持。
- **优化性能**：OpenEuler 通过一系列技术手段优化了系统的运行效率，包括改进内存管理，提升大块内存的处理速度，以及优化内核的抢占模式等。
- **新型文件系统**：OpenEuler 引入了一种名为 Eulerfs 的新型文件系统，它通过创新的技术降低了元数据同步的开销，使得文件系统的性能得到了提升。
- **内存分级扩展**：OpenEuler 可以支持多种内存和存储设备，使得系统的内存容量可以得到扩展，同时降低了内存使用成本。
- **云原生调度增强**：OpenEuler 优化了在云环境中的任务调度，可以保证在线任务能够快速抢占 CPU 资源，同时在内存不足时，优先回收低优先级的进程组的内存，保障在线业务的正常运行。
- **KubeOS**：OpenEuler 实现了一种名为 KubeOS 的容器化操作系统，可以统一管理云原生集群 OS，使得操作系统可以轻量化，快速升级和替换。
- **轻量安全容器增强**：OpenEuler 采用了一种轻量级的虚拟化技术，使得容器的运行负载降低，同时提高了虚拟机的安全性。

#### 社区评价

OpenEuler 社区活跃且开放，得到了来自全球开发者的广泛关注和参与。它因其在多硬件架构支持和系统优化方面的努力，以及对开源精神的坚持而受到广泛的赞誉。截至在 Linux Kernel 5.10 版本中，**华为提交的补丁数量为 1434 个，占比 8.9%，内核代码贡献排名第一，代码修改 41049 行，占比 5.3%。**

尽管 OpenEuler 具有许多优点，但作为一个较新的开源项目，在稳定性和兼容性上可能面临一些挑战。然而，社区正在积极努力，通过开放的合作和持续的技术创新，来解决这些问题。

![openEuler release timeline](https://static.7wate.com/img/2023/06/21/aabeab3432d8e.png)

### OpenAnolis 社区

![OpenAnolis ](https://static.7wate.com/img/2023/06/21/88e1bd0d2ce99.png)

> 多架构的开源 Linux 操作系统发行版

#### 概述

[OpenAnolis](https://www.openanolis.org/) 是一个致力于提供高效、稳定、可扩展操作系统平台的开源社区，**核心技术基于 Linux Kernel 和 K8s，对接云原生生态。**OpenAnolis 由阿里云发起并持续维护，旨在通过社区合作，推动 Linux 和云原生技术的创新和发展。

OpenAnolis 提供了一个包含了云原生组件、工具链、硬件和服务的完整技术栈，以帮助用户构建云原生应用。

#### 特色

- **云原生支持**：OpenAnolis 针对云原生应用进行了设计，提供了一套完整的云原生技术栈，包括操作系统、容器运行时、服务网格等，以帮助用户快速构建和部署云原生应用。

- **系统优化**：OpenAnolis 基于 Linux Kernel，针对云原生环境进行了深度优化，以提供高效、稳定、可扩展的运行环境。

- **社区驱动**：OpenAnolis 由社区驱动，汇集了众多企业和开发者的力量，共同推动云原生技术的创新和发展。

#### 社区评价

OpenAnolis 由于其针对云原生的专注和优化，在云原生领域得到了广泛的认可和使用。其社区活跃，技术发展快速，被认为是云原生技术的重要推动者。

尽管 OpenAnolis 在云原生领域表现出色，但由于其相对年轻和专注的特性，**在通用性和成熟度上可能略显不足**。社区正在努力通过持续的技术创新和社区合作，来解决这些问题。
