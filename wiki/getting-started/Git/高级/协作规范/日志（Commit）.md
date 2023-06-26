---
title: 日志（Commit）
description: Git 协作日志
keywords:
- Git
- 协作
- 日志
tags:
- Git
sidebar_position: 2
author: 7Wate
date: 2023-06-26
---

对于项目，日志内容应使用 **ASCII** 字符、中文或 emoji，以实现**最大化的兼容性**，方便进行兼容处理。

commit 包含三个部分：**Header**、**Body**、**Footer**。

```markdown
<type>([scope]): <subject>

[body]

[footer]
```

示例：

```markdown
feature(auth): increase length of new API key

the length is increased from 24 to 32 for new API keys

close #12
```

## 头部（Header）

头部只有一行，包含三个字段：类型、范围和主题。

| 全拼                   | 简拼     | 描述                                                     |
| ---------------------- | -------- | -------------------------------------------------------- |
| feature                | feat     | 新增特性                                                 |
| fix                    | fix      | 修复 bug                                                 |
| documents              | docs     | 文档变动                                                 |
| style                  | style    | 代码格式（不影响功能，例如空格、分号等格式修正）         |
| refactor               | refactor | 代码重构                                                 |
| performance            | perf     | 改善性能                                                 |
| test                   | test     | 测试                                                     |
| build                  | build    | 影响构建系统或外部依赖的更改（例如：gulp、npm、webpack） |
| continuous integration | ci       | 更改了 CI 配置文件和脚本                                 |
| chore                  | chore    | 对构建过程或辅助工具和库的更改（不影响源文件、测试用例） |
| revert                 | revert   | 撤销上一次的 commit                                      |

- 对于破坏兼容性的更改，即会影响到依赖本项目的其他系统的更改，请在类型后面加上**半角感叹号**「**!**」。
- 主题务必不超过 **72** 个字符，且必须简洁明了。如果无法限制在 **72** 个字符内，请拆分提交。
- 主题部分应**以小写字母开头**，专有名词首字母大写，缩略语大写，并且结尾不用句号。

## 主体（Body）

主题与正文之间应有一个空行。

如果内容简单，可以按照主题格式撰写。如果超过一行，应按照常规的段落格式。

**首字母应大写，正确使用标点。可以有多行或多段，但每行不超过 72 个字符，行尾不出现空格，段落之间应用空行隔开。**

```markdown
feature!(api): limit array length to 256 elements

BREAKING: Array length limit is added to further limit request size. A
small number of existing apps may receive HTTP 413 "Payload too Large"
error.
```

## 脚注（Footer）

正文与脚注之间应有一个空行。

脚注主要用于记录不兼容的更改和关闭问题的操作。对于不兼容的更改，需要在脚注中进行描述，同时还需要在主体部分进行详细描述。如果关闭的问题是在追踪系统（如 GitHub）中的问题，需要在脚注中使用 "Close #issue" 格式进行描述。
