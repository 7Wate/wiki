---
title: Docusaurus 搭建
description: 如何使用 Docusaurus 搭建个人知识库网站。
keywords:
  - Docusaurus
  - 搭建
  - 个人
  - 知识库
tags:
  - 开源项目/数字文具盒
  - 博客/原创
authors:
  - 7Wate
date: 2023-06-28
---

Docusaurus 是一款**静态站点生成器**。 可以搭建带有快速客户端导航的**单页应用**，充分利用了 **React**，让你的网站具有交互能力。 它提供了开箱即用的**文档功能**，不过也可用于搭建**各种网站**：个人网站、产品、博客、营销主页等等。

当下个人知识的整理归纳已经及其重要了，废话不多说。可以先体验一下我的个人 wiki：<https://wiki.7wate.com/>，相信我你一定会爱上它！

## 安装

- [Docusaurus 官网](https://docusaurus.io/)

- [Docusaurus 官网（中文版）](https://docusaurus.io/zh-CN/docs)

因为**中国官网文档更新相对滞后**，所以这里**推荐使用英文官网**，进入后**选择中文**。

### 环境

- [Node.js （中文网）](http://nodejs.cn/download/) **v16.14** 或以上版本

- 本文使用 **Docusaurus 2.0.0-rc.1** 作为演示

### 初始化

使用命令行工具可以帮助你快速简单地安装 Docusaurus 并搭建网站框架。 你可以在空仓库或现有仓库的任何地方运行这个命令，它会创建一个包含模板文件的新目录。

```shell
npx create-docusaurus@latest my-website classic
```

### 项目结构

命令行工具成功运行后，你将会在新目录 `my-website/` 下看到下列文件：

```markdown

my-website
├── blog
│   ├── 2019-05-28-hola.md
│   ├── 2019-05-29-hello-world.md
│   └── 2020-05-30-welcome.md
├── docs
│   ├── doc1.md
│   ├── doc2.md
│   ├── doc3.md
│   └── mdx.md
├── src
│   ├── css
│   │   └── custom.css
│   └── pages
│       ├── styles.module.css
│       └── index.js
├── static
│   └── img
├── docusaurus.config.js
├── package.json
├── README.md
├── sidebars.js
└── yarn.lock

```

- `/blog/`：包含博客的 Markdown 文件。

- `/docs/`：包含文档的 Markdown 文件。

- `/src/`：如页面或自定义 React 组件一类的非文档文件。

  - `/src/pages` - 所有放在此目录中的 JSX/TSX/MDX 文件都会被转换成网站页面。

- `/static/` - 静态目录。

- `/docusaurus.config.js` - 站点配置文件。

- `/package.json` - Docusaurus 网站是一个 React 应用。 你可以安装并使用任何 npm 包。

- `/sidebars.js` - 由文档使用，用于指定侧边栏中的文档顺序。

### 运行网站

```shell
cd my-website
npm run start
```

默认情况下，浏览器会自动打开 <http://localhost:3000> 的新窗口。

![站点首页](https://static.7wate.com/img/2022/07/27/13c9cd02b370f.png)

### 项目构建

```shell
npm run build
```

网站内容会被生成在 `/build` 目录中，随后可以被上传到 [GitHub Pages](https://pages.github.com/)、[Vercel](https://vercel.com/)、[Netlify](https://www.netlify.com/) 等静态网页托管服务。

## 配置

配置文件为项目目录下 **docusaurus.config.js**，配置字段官方文档：[点击打开](https://docusaurus.io/zh-CN/docs/api/docusaurus-config)。

一定要参考官方文档，因为项目组贡献者有一位厉害的中国大学生，所以中文文档更新很及时。

### 设置中文

docusaurus.config.js 中找到 i18n 配置节点，如下是原配置（其实看得懂英文就知道咋改 🤣）：

```json
// Even if you don't use internalization, you can use this field to set useful
// metadata like html lang. For example, if your site is Chinese, you may want
// to replace "en" with "zh-Hans".
i18n: {
  defaultLocale: 'en',
  locales: ['en'],
},

```

修改为如下配置设置为中文：

```json
i18n: {
  defaultLocale: "zh-Hans",
  locales: ["zh-Hans"],
},

```

## 搜索

在使用官方插件中 Algolia DocSearch 搜索时候，会有几率踩坑，可以参考我的部署经验。

1. 正确启用 sitemap 插件，参考文档：[sitemap 插件](https://docusaurus.io/zh-CN/docs/api/plugins/@docusaurus/plugin-sitemap)。

2. 正确启用 Algolia DocSearch 插件，参考文档：[Algolia DocSearch 插件](https://docusaurus.io/zh-CN/docs/api/themes/@docusaurus/theme-search-algolia)。

3. 构建项目，**确认插件是否显示**。

### 注册账号

在 [Algolia官网](https://www.algolia.com/) 注册账号后，打开控制台新建数据源，填写数据名（**后面会用到**），并选择免费计划。

![新建数据源](https://static.7wate.com/img/2022/07/27/c249ea1971f87.png)

![免费计划](https://static.7wate.com/img/2022/07/27/4b2daf39e8a1f.png)

### 获取 API Keys

控制台打开设置页面，点击 API keys，拷贝 **Application ID、Search-Only API Key、Admin API Key**。

![打开密钥页面](https://static.7wate.com/img/2022/07/27/7d53ade2658b4.png)

![Key 页面](https://static.7wate.com/img/2022/07/27/6f7717de46944.png)

### 配置 Docusaurus

打开项目配置文件 docusaurus.config.js，填写如下配置：

```json
module.exports = {
  // ...
  themeConfig: {
    // ...
 algolia: {
  apiKey: "Search-Only API Key",
  appId: "Application ID",
  indexName: "数据源名称",
 },
  }
}
```

### 推送数据

由于 Algolia 限制开源项目才可以免费试用爬虫，所以我们要自己推送数据。需要如下环境：

- Docker（谷歌一堆安装教程）

- jq（使用包管理器直接安装）

环境安装好以后，按照如下步骤操作：

#### 1. 新建 .env 文件（键值不带双引号）

```shell
APPLICATION_ID=Application ID
API_KEY=Admin API Key
```

#### 2. 新建 docsearch.json（爬虫配置文件）

```json
{
  "index_name": "wiki",
  "start_urls": [
    "https://wiki.7wate.com/"     # wiki 网址
  ],
  "sitemap_urls": [
    "https://wiki.7wate.com/sitemap.xml"  # sitemap.xml 地址
  ],
  "stop_urls": [
    "/search",
    "/v3me",
    "/playground",
    "/inspector"
  ],
  "sitemap_alternate_links": true,
  "selectors": {
    "lvl0": {
      "selector": "(//ul[contains(@class,'menu__list')]//a[contains(@class, 'menu__link menu__link--sublist menu__link--active')]/text() | //nav[contains(@class, 'navbar')]//a[contains(@class, 'navbar__link--active')]/text())[last()]",
      "type": "xpath",
      "global": true,
      "default_value": "Documentation"
    },
    "lvl1": "header h1",
    "lvl2": "article h2",
    "lvl3": "article h3",
    "lvl4": "article h4",
    "lvl5": "article h5, article td:first-child",
    "lvl6": "article h6",
    "text": "article p, article li, article td:last-child"
  },
  "strip_chars": " .,;:#",
  "custom_settings": {
    "separatorsToIndex": "_",
    "attributesForFaceting": [
      "language",
      "version",
      "type",
      "docusaurus_tag"
    ],
    "attributesToRetrieve": [
      "hierarchy",
      "content",
      "anchor",
      "url",
      "url_without_anchor",
      "type"
    ]
  },
  "js_render": true,
  "nb_hits": 856
}
```

#### 3. 运行 Docker

```shell
docker run -it --env-file=.env -e "CONFIG=$(cat docsearch.json | jq -r tostring)" algolia/docsearch-scraper
```

![image-20220727191725309](https://static.7wate.com/img/2022/07/27/783c79aea020d.png)

如果数据抓取异常，推送到 algolia 的索引条目过少。可以尝试多次运行 Docker，即可解决。至于为什么我也不知道，反正就能搞定 ~

## 总结

如果想要稳定运行项目，请务必一定**仔细阅读官方文档**。官方文档维护的相当好，主要就是 algolia 搜索哪里，刚开始很容易无从下手……

因为被 Docusaurus 官方 Showcase 收录了，所以产出一篇文章推广一下 ~

更多优秀 Docusaurus 站点请访问：[展示站点](https://docusaurus.io/showcase?tags=personal)
