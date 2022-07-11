---
id: 贡献者协议（Contributing）
title: 贡献者协议（Contributing）
sidebar_position: 6
data: 2022年6月15日
---

## 规范

- 文件命名：CONTRIBUTING.md

目前参考大厂协议，可根据项目自定义。

[阿里巴巴 CLA 协议](https://github.com/aliyun/cla)

[谷歌 CLA 协议](https://cla.developers.google.com/clas)

## 贡献协议简介

- 开源贡献协议有 CLA（Contributor License Agreement）和 [DCO](https://developercertificate.org/) （Developer Certificate of Origin）两种；
- DCO 由 Linux Foundation 提出，是固定的简短条文（只有4条），旨在让贡献者保证遵守开源 license；
- CLA 是对开源 license 的法律性质补充，由法务制定；
- CLA 可以自定义，不论是个人还是企业级签署的时候都需要提供详细的信息，如姓名、公司、邮箱、地址、电话等；
- 下表中对比了 CLA 和 DCO 的特性，推荐大型跨公司开源项目使用 CLA，利用项目更加正规和长久发展；

开源社区的贡献者协议一般分为两种 CLA 和 DCO，这两种协议各有优缺点如下。

| 特性         | CLA                                                | DCO                                                        |
| :----------- | :------------------------------------------------- | :--------------------------------------------------------- |
| 社区属性     | 弱                                                 | 强                                                         |
| 签署方式     | 一次性                                             | 每次提交时在 commit 信息里追加 `Signed-off-by: email` 信息 |
| 法律责任     | 明确法律义务                                       | 无声明，用来限制提交者遵守开源 license                     |
| 是否可自定义 | 公司或组织可自行定义                               | 否                                                         |
| 使用案例     | Google、Pivotal、CNCF、阿里巴巴、Apache SkyWalking | GitLab、Chef、Harbor、TiKV                                 |
| 公司属性     | 强，可以签署公司级别的 CLA                         | 弱                                                         |

### CLA

CLA 是 Contributor License Agreement 的缩写，CLA 可以看做是对开源软件本身采用的开源协议的补充。一般分为公司级和个人级别的 CLA，所谓公司级即某公司代表签署 CLA 后即可代表该公司所有员工都签署了该 CLA，而个人级别 CLA 只代表个人认可该 CLA。

因为 CLA 是每个公司或组织自定义的，在细节上可能稍有不同，不过总体都包含以下内容：

- 关于签署该 CLA 的主体和贡献的定义；
- 授予著作权给拥有该软件知识产权的公司或组织；
- 专利许可的授予；
- 签署者保证依法有权授予上述许可；
- 签署者确保所有的贡献内容均为原创作品；
- 签署者为贡献内容支持的免责描述；
- 说明贡献者提交非原创作品应该采用的方式；
- 保证在获悉任何方面不准确的事实或情况之时通知签约方；

对于主体在中国的企业，还加入了一些本地化的内容，如 [Alibaba Open Source Individual CLA](https://github.com/aliyun/cla) 。

因为 CLA 分别为个人级和公司级，所以对于不同名义签署时需要提供不同的信息。签署个人级 CLA 的时候需要提供个人信息（姓名、地址、邮箱、电话等），签署公司级 CLA 还需要提供公司信息（名称、地址、联系电话、邮箱、传真等）；

### DCO

DCO 是 Developer Certificate of Origin 的缩写，由 Linux Foundation 于 2004 年制定。DCO 最大的优点是可以减轻开发者贡献的阻碍，不用阅读冗长的 CLA 法律条文，只需要在提交的时候签署邮件地址即可。Chef 和 GitLab 已分别于 2016 年和 2017 年从 CLA 迁移到 DCO。

[DCO](https://developercertificate.org/) 目前是 1.1 版本，内容很简单，开源项目的贡献者只需要保证以下四点：

1. 该贡献全部或部分由我创建，我有权根据文件中指明的开源许可提交；要么
2. 该贡献是基于以前的工作，这些工作属于适当的开源许可，无论这些工作全部还是部分由我完成，我有权根据相同的开源许可证（除非我被允许根据不同的许可证提交）提交修改后的工作；要么
3. 该贡献由1、2、或 3 证明的其他人直接提供给我，而我没有对其进行修改。
4. 我理解并同意该项目和贡献是公开的，并且该贡献的记录（包括我随之提交的所有个人信息，包括我的签字）将无限期保留，并且可以与本项目或涉及的开源许可证保持一致或者重新分配。

