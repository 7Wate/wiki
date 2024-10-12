---
title: HTML
description: HTML 超文本标记语言
keywords:
  - HTML
tags:
  - FullStack/基础
sidebar_position: 1
author: 7Wate
date: 2023-10-13
---

**语法和规则，将混沌的网络之地变为有序的信息之海。**

## HTML

HTML 是用来描述网页的一种语言，它不是一种编程语言，而是一种标记语言。它由一系列的元素或标签组成，这些标签可以告诉浏览器如何呈现内容。**HTML 构成了网页的骨架。**

```html
<!DOCTYPE html>
<html lang="zh">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document Title</title>
    <!-- CSS Stylesheet link -->
    <link rel="stylesheet" href="styles.css">
</head>
<body>
    <header>
        <!-- Navigation links, logo, etc. -->
    </header>
    <main>
        <!-- Main content goes here -->
    </main>
    <footer>
        <!-- Footer content goes here -->
    </footer>

    <!-- JavaScript file link -->
    <script src="script.js"></script>
</body>
</html>
```

1. `<!DOCTYPE html>`: 声明 HTML5 文档。
2. `<html lang="zh">`: HTML 的根元素，语言设为中文。
3. `<head>`: 文档头部，包含元信息。
4. `<meta charset="UTF-8">`: 设定 UTF-8 字符编码。
5. `<meta name="viewport" content="width=device-width, initial-scale=1.0">`: 适应移动设备的视口设置。
6. `<title>Document Title</title>`: 设置文档标题。
7. `<link rel="stylesheet" href="styles.css">`: 链接外部 CSS 样式表。
8. `<body>`: 文档主体，包含可见内容。
9. `<header>`, `<main>`, `<footer>`: 分别为页眉、主内容、页脚的 HTML5 语义元素。
10. `<script src="script.js"></script>`: 链接外部 JavaScript 文件。

### 元信息

**HTML 的元信息（metadata）是关于 HTML 文档的数据，它们不会显示给用户，而是提供给浏览器和搜索引擎。**元信息通常在 HTML 文档的 `<head>` 部分定义。

```html
<!DOCTYPE html>
<html lang="zh">
<head>
    <meta charset="UTF-8">
    <meta name="author" content="John Doe">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>网页的标题，这在浏览器的标签页中显示，并被搜索引擎用于索引页面。</title>
    <meta name="description" content="Page description. No longer than 155 characters.">
    <meta name="keywords" content="your, tags">
    <link rel="icon" href="favicon.ico" type="image/x-icon">
    <link rel="stylesheet" href="styles.css">
    <script src="script.js"></script>
    <meta http-equiv="refresh" content="30">
    <meta name="robots" content="noindex, nofollow">
    <link rel="canonical" href="http://example.com/"/>
</head>
<body>
    <!-- 主要内容在这里 -->
</body>
</html>
```

1. **`<meta charset="UTF-8">`**: 这定义了文档的字符编码。常用的字符编码是 UTF-8，因为它包含了大多数已知的字符和符号。
2. **`<meta name="author" content="John Doe">`**: 这个 `<meta>` 标签定义了网页的作者。
3. **`<title>`**: 网页的标题，这在浏览器的标签页中显示，并被搜索引擎用于索引页面。
4. **`<meta name="viewport" content="width=device-width, initial-scale=1.0">`**: 这是移动端优化的元标签。它让网页的宽度等于设备的宽度，初始缩放比例为 1。
5. **`<meta name="description" content="Page description. No longer than 155 characters.">`**: 这提供了页面的简洁描述，这在搜索引擎结果页 (SERP) 中显示，可以提高页面的可点率（CTR）。
6. **`<meta name="keywords" content="your, tags">`**: 这定义了网页的关键词。虽然现在搜索引擎很少使用这个元标签，但在 SEO 中还是有一些应用。
7. **`<link rel="icon" href="favicon.ico" type="image/x-icon">`**: 这个 `<link>` 标签定义了网站的 favicon（收藏夹图标）。它在浏览器的标签页或地址栏中显示，也可以在用户的书签中显示。
8. **`<link rel="stylesheet" href="styles.css">`**: 这链接了一个外部的 CSS 文件。虽然 `<link>` 标签不是 `<meta>`，但它在 `<head>` 中定义，也提供了一些元信息。
9. **`<script src="script.js"></script>`**: 这链接了一个外部的 JavaScript 文件。与 `<link>` 标签类似，`<script>` 标签也提供了一些元信息。
10. **`<meta http-equiv="refresh" content="30">`**: 这可以让页面在特定的时间后自动刷新。在这个例子中，页面会在 30 秒后自动刷新。
11. **`<meta name="robots" content="noindex, nofollow">`**: 这可以控制搜索引擎爬虫的行为。在这个例子中，"noindex" 告诉爬虫不要索引这个页面，"nofollow" 告诉爬虫不要追踪页面上的链接。
12. **`<link rel="canonical" href="http://example.com/"/>`**: 这告诉搜索引擎此页面是其 URL 的最佳表现形式，用于防止重复内容问题。

这些是 HTML 元信息的一些常见形式，但还有更多的可能性。一般情况下，你应该根据你的**需要选择合适的元信息来优化网站的性能和搜索引擎优化（SEO）。**

### 基础标签

HTML 文档的基础是由各种标签组成，这些标签定义了网页的不同部分。

![grumpy-cat-small.png](https://static.7wate.com/img/2023/10/13/707fac8d60c90.png)

主要部分有：

- **开始标签（Opening tag）**：包含元素的名称（本例为 p），被左、右角括号所包围。开头标签标志着元素开始或开始生效的地方。在这个示例中，它在段落文本的开始之前。
- **内容（Content）**：元素的内容，本例中就是段落的文本。
- **结束标签（Closing tag）**：与开始标签相似，只是其在元素名之前包含了一个斜杠。这标志着该元素的结束。没有包含关闭标签是一个常见的初学者错误，它可能会产生奇特的结果。

以下是一些最常见和重要的 HTML 标签：

| 标签             | 描述                         |
| :--------------- | :--------------------------- |
| `<html>`         | 定义 HTML 文档               |
| `<head>`         | 包含元数据/头部数据          |
| `<title>`        | 定义文档的标题               |
| `<body>`         | 定义文档的主体               |
| `<h1>` 到 `<h6>` | 定义标题                     |
| `<p>`            | 定义段落                     |
| `<br>`           | 插入换行符                   |
| `<hr>`           | 定义主题之间的切换（水平线） |
| `<!--...-->`     | 定义注释                     |
| `<a>`            | 定义超链接                   |
| `<img>`          | 定义图像                     |
| `<table>`        | 定义表格                     |
| `<tr>`           | 定义表格行                   |
| `<th>`           | 定义表格标题                 |
| `<td>`           | 定义表格单元格               |
| `<caption>`      | 定义表格标题                 |
| `<thead>`        | 定义表格头部分组             |
| `<tbody>`        | 定义表格主体分组             |
| `<tfoot>`        | 定义表格脚部分组             |
| `<div>`          | 定义文档中的节               |
| `<span>`         | 定义文档中的行内元素         |

#### 属性

HTML 属性是 HTML 元素提供的附加信息。它们定义了元素的一些特性或行为，或者包含了元素的可用数据。

![grumpy-cat-attribute-small.png](https://static.7wate.com/img/2023/10/13/28f67550b8e32.png)

属性总是在 HTML 元素的开始标签中指定，通常是以 `name="value"` 的形式出现。这里的 `class` 是属性名，`editor-note` 是属性值。

属性必须包含：

- **空格**：它在属性和元素名称之间。如果一个元素具有多个属性，则每个属性之间必须由空格分隔。
- **名称**：后面跟着一个等于号。
- **属性值**：由一对引号（""）引起来。

| 属性            | 描述                           | 常用在的标签                                                 |
| --------------- | ------------------------------ | ------------------------------------------------------------ |
| class           | 定义元素的一种或多种类名       | 所有标签                                                     |
| id              | 为元素定义唯一的 ID             | 所有标签                                                     |
| style           | 为元素定义内联 CSS 样式          | 所有标签                                                     |
| src             | 定义引用的资源 URL              | `<img>`, `<script>`, `<iframe>`, `<source>`, `<audio>`, `<video>` |
| alt             | 定义图像的替代文本             | `<img>`                                                      |
| width 和 height | 定义元素的宽度和高度           | `<img>`, `<canvas>`, `<iframe>`, `<video>`, `<object>`       |
| href            | 定义链接的 URL                  | `<a>`, `<link>`, `<base>`, `<area>`                          |
| target          | 定义链接打开的位置             | `<a>`, `<base>`, `<form>`                                    |
| disabled        | 定义元素为禁用状态             | `<button>`, `<fieldset>`, `<input>`, `<optgroup>`, `<option>`, `<select>`, `<textarea>` |
| placeholder     | 定义输入字段的占位符文本       | `<input>`, `<textarea>`                                      |
| value           | 定义元素的值                   | `<button>`, `<option>`, `<input>`, `<li>`, `<meter>`, `<progress>`, `<param>` |
| checked         | 定义单选按钮或复选框是否被选中 | `<input>`                                                    |
| selected        | 定义选项是否被选中             | `<option>`                                                   |
| readonly        | 定义输入元素为只读             | `<input>`, `<textarea>`                                      |
| maxlength       | 定义输入元素的最大长度         | `<input>`, `<textarea>`                                      |
| rel             | 定义当前文档与链接文档的关系   | `<a>`, `<link>`, `<area>`, `<form>`                          |
| type            | 定义元素的类型                 | `<button>`, `<input>`, `<command>`, `<embed>`, `<object>`, `<script>`, `<source>`, `<style>`, `<menu>` |

### 表单与输入

在 HTML 中，表单是一个包含表单元素的区域。表单元素是允许用户在表单中输入内容，如文本字段，选择框，单选框，复选框等。

| 标签         | 描述                                                         |
| :----------- | :----------------------------------------------------------- |
| `<form>`     | 定义 HTML 表单                                               |
| `<input>`    | 定义输入控制。HTML5 引入了一些新的输入类型，如 `color`, `date`, `datetime-local`, `email`, `month`, `number`, `range`, `search`, `tel`, `time`, `url`, `week` |
| `<textarea>` | 定义多行文本输入控制                                         |
| `<button>`   | 定义点击按钮                                                 |
| `<select>`   | 定义下拉列表                                                 |
| `<optgroup>` | 定义下拉列表中的选项组                                       |
| `<option>`   | 定义下拉列表中的选项                                         |
| `<label>`    | 定义 `input`, `meter`, `progress`, `select`, `textarea` 元素的标签 |
| `<fieldset>` | 定义表单中的一组相关元素                                     |
| `<legend>`   | 定义 `fieldset` 元素的标题                                   |
| `<datalist>` | 定义 `input` 元素的预定义选项列表                            |
| `<output>`   | 定义计算结果                                                 |
| `<progress>` | 定义进度（进度条）                                           |
| `<meter>`    | 定义度量衡。仅用于已知最大和最小值的度量，如磁盘使用、查询结果的相关性等 |

### HTML5 新特性

HTML5 是 HTML 的最新演进，它引入了一系列新的元素和属性，以反映现代网站设计和开发的实践。

#### 语义元素

HTML5 引入了一系列新的语义元素，以更准确地描述内容。例如，`<article>`，`<section>`，`<nav>`，`<header>`，`<footer>`，`<aside>`，`<figure>`，`<figcaption>` 等。

```html
<article>
  <header>
    <h2>Article Title</h2>
    <p>Posted on <time datetime="2023-10-13">October 13, 2023</time></p>
  </header>
  <p>This is the article content.</p>
  <footer>
    <p>Author: John Doe</p>
  </footer>
</article>
```

#### 图形和多媒体元素

HTML5 引入了新的元素来支持图形和多媒体，包括 `<canvas>` 用于绘制图形，`<svg>` 用于定义可缩放向量图形，以及 `<video>` 和 `<audio>` 用于在网页上播放视频和音频。

```html
<canvas id="myCanvas" width="200" height="100" style="border:1px solid #000000;">
</canvas>

<video width="320" height="240" controls>
  <source src="movie.mp4" type="video/mp4">
  <source src="movie.ogg" type="video/ogg">
  Your browser does not support the video tag.
</video>
```

#### 表单控件

HTML5 为表单输入引入了新的元素类型，如 `color`，`date`，`email`，`number`，`range`，`search`，`tel`，`time` 等。还引入了新的表单元素，如 `<datalist>` 和 `<output>`。

```html
<input type="number" name="quantity" min="1" max="10">

<input list="browsers" name="browser">
<datalist id="browsers">
  <option value="Internet Explorer">
  <option value="Firefox">
  <option value="Chrome">
  <option value="Opera">
  <option value="Safari">
</datalist>
```

#### Web APIs

HTML5 引入了一系列新的 JavaScript APIs，如 Geolocation API，Drag and Drop API，Local Storage API，等等。这些 API 使网页可以与用户设备进行更深层次的交互。

```javascript
// Geolocation API
navigator.geolocation.getCurrentPosition(function(position) {
  console.log("Latitude: " + position.coords.latitude + ", Longitude: " + position.coords.longitude);
});

// Local Storage API
localStorage.setItem("name", "John Doe");
console.log(localStorage.getItem("name"));
```

#### Web Socket

Web Socket 是一种协议，它提供了全双工通信的能力，使得服务器能够实时地向客户端推送数据。

```javascript
var socket = new WebSocket("ws://localhost:8080");

socket.onopen = function(event) {
  socket.send("Hello Server");
};

socket.onmessage = function(event) {
  console.log("Message from server: ", event.data);
};
```

#### Web Workers

Web Workers 允许开发者在后台，独立于主执行线程运行脚本。这样可以在不影响用户界面的情况下执行复杂的计算任务。

```javascript
var worker = new Worker("worker.js");

worker.onmessage = function(event) {
  console.log("Received: " + event.data);
};

worker.postMessage("Hello Worker");
```

#### 离线存储

HTML5 引入了应用程序缓存（AppCache）和本地存储（localStorage 和 sessionStorage），使得网页可以在离线状态下工作，以及保存用户数据在本地。

```java
// Check if a new cache is available on page load.
window.addEventListener('load', function(e) {
  window.applicationCache.addEventListener('updateready', function(e) {
    if (window.applicationCache.status == window.applicationCache.UPDATEREADY) {
      // Browser downloaded a new app cache.
      if (confirm('A new version of this site is available. Load it?')) {
        window.location.reload();
      }
    } else {
      // Manifest didn't change. Nothing new to server.
    }
  }, false);
}, false);
```

## 文档架构

### 基本组成

HTML（超文本标记语言）是用于构建网页的标准标记语言，它使用一系列的标签（或元素）来描述和组织内容。

HTML 文档的基本结构通常包含以下几个主要部分：

- **页眉（Header）**：通常位于整个页面的顶部，包含网站的主要标题和/或标志。它是网站的核心信息，通常在所有页面上都存在。
- **导航栏（Navigation Bar）**：导航栏包含指向网站各个主要区域的超链接。它通常以菜单按钮、链接或标签页的形式呈现。导航栏在设计上通常要保持一致，出现在所有页面上，以帮助用户导航网站。有些人将导航栏视为页眉的一部分，而另一些人认为导航栏是一个独立的组件。
- **主内容区域（Main Content）**：主内容区域是页面的中心部分，包含当前页面的大部分独有内容，如文章、视频、地图、新闻等。主内容区域是网站的核心部分，不同页面的主内容会有所不同。
- **侧边栏（Sidebar）**：侧边栏通常位于主内容区域旁边，包含一些附加信息、链接、引用、广告等。侧边栏通常与主内容相关，例如在新闻页面上，侧边栏可能包含作者信息或相关文章链接。侧边栏还可以包含其他重复元素，如辅助导航系统。
- **页脚（Footer）**：页脚位于页面底部，通常是一个横跨页面的窄条区域。类似于页眉，页脚包含一些公共信息，如版权声明或联系方式。通常使用较小的字体，内容相对次要。页脚还可以提供快速访问链接，以改善网站的搜索引擎优化（SEO）。

一个**典型的网站**可能会这样布局：

![sample-website.png](https://static.7wate.com/img/2023/10/13/345ddbff25c21.png)

### 布局细节

在进行网页布局时，有一些关键的细节需要考虑。以下是一些常见的布局细节，可以帮助你创建具有良好用户体验和吸引力的网页布局。

- **响应式设计：**确保你的网页能够适应不同屏幕尺寸和设备类型。使用 CSS 媒体查询和弹性布局来实现响应式设计，以便在桌面电脑、平板电脑和移动设备上都能提供良好的用户体验。
- **网格布局：**使用网格系统来创建整齐的网页布局。将页面划分为网格列和行，以便在不同屏幕尺寸上灵活地排列和对齐内容。
- **盒子模型：**了解 CSS 盒子模型的概念，包括内容区域、填充、边框和外边距。正确地设置和管理盒子模型属性可以影响元素的大小、间距和布局。

- **流动布局：**使用流动布局使元素按照自然流动方式排列。避免使用固定宽度和高度，而是使用百分比或自适应单位来设置元素的尺寸。

- **定位：**使用 CSS 定位属性（如相对定位、绝对定位和固定定位）来精确控制元素在页面中的位置。这可以用于创建重叠效果、浮动元素或固定位置的元素。

- **色彩和对比度：**选择适合你网站主题和品牌的配色方案。确保文本和背景之间有足够的对比度，以确保可读性和可访问性。

- **导航设计：**设计易于使用的导航菜单，使用户能够轻松浏览网站的不同部分。考虑使用清晰的标签、下拉菜单或面包屑导航等。

- **空白和间距：**合理利用空白和间距来提高页面的可读性和视觉吸引力。避免内容过于拥挤，给元素之间留出适当的空间。

- **图片和媒体布局：**对于包含图片、视频或其他媒体的网页，考虑使用适当的布局和对齐方式来展示这些媒体内容。

## 多媒体嵌入

### 视频

`<video>` 元素用于在网页上嵌入视频内容。以下是一个简单的例子：

```shell
<video width="320" height="240" controls>
  <source src="movie.mp4" type="video/mp4">
  <source src="movie.ogg" type="video/ogg">
  您的浏览器不支持 Video 标签。
</video>
```

在上面的例子中，`<video>` 标签内部的 `<source>` 标签用于指定视频源文件。支持多个 `<source>` 标签，这样如果浏览器不支持第一个视频格式，它将尝试下一个。**您的浏览器不支持 Video 标签**将在所有指定的源都不被支持的情况下显示。

`<video>` 标签的常用属性包括：

| 属性                | 描述                                                         | 示例                                               |
| :------------------ | :----------------------------------------------------------- | :------------------------------------------------- |
| `controls`          | 为视频提供播放、暂停和音量控制按钮                           | `<video src="movie.mp4" controls>`                 |
| `autoplay`          | 视频就绪后立即开始播放。注意，因为用户体验的问题，一些浏览器可能会忽略这个属性 | `<video src="movie.mp4" autoplay>`                 |
| `loop`              | 视频播放结束后从头开始                                       | `<video src="movie.mp4" loop>`                     |
| `muted`             | 将视频的声音默认设置为静音                                   | `<video src="movie.mp4" muted>`                    |
| `poster`            | 在视频下载期间或用户在点击播放按钮之前，显示一个图像。图像的 URL 在 `poster` 属性中指定 | `<video src="movie.mp4" poster="poster.jpg">`      |
| `preload`           | 规定页面加载后立即加载视频。可以设置为 "auto"、"metadata" 或 "none" | `<video src="movie.mp4" preload="auto">`           |
| `width` 和 `height` | 定义视频播放器的高度和宽度                                   | `<video src="movie.mp4" width="320" height="240">` |
| `src`               | 规定媒介源的 URL                                             | `<video src="movie.mp4">`                          |

### 音频

`<audio>` 元素用于在网页上嵌入音频内容。语法和 `<video>` 类似：

```html
<audio controls>
  <source src="audio.mp3" type="audio/mpeg">
  <source src="audio.ogg" type="audio/ogg">
  您的浏览器不支持Audio标签。
</audio>
```

`<audio>` 标签的常用属性也包括 controls、autoplay、loop 和 muted 等。

### Iframe

`<iframe>` 是一个 HTML 标签，它允许我们在当前的 HTML 文档中嵌入另一个 HTML 文档。`<iframe>` 标签通常被用于嵌入来自不同源的内容，例如嵌入 Google 地图，YouTube 视频，或者其他网站的页面。

例如通过 `<iframe>` 标签嵌入 YouTube 视频：

```html
<iframe width="560" height="315" src="https://www.youtube.com/embed/dQw4w9WgXcQ" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
```

`<iframe>` 标签支持多种属性，包括：

| 属性名              | 描述                                                         | 示例                                                |
| :------------------ | :----------------------------------------------------------- | :-------------------------------------------------- |
| `src`               | 规定在 `<iframe>` 中显示的文档的 URL                          | `<iframe src="https://www.example.com">`            |
| `height` 和 `width` | 规定 `<iframe>` 的高度和宽度，单位可以是像素（px）或百分比（%） | `<iframe src="demo.html" height="200" width="300">` |
| `frameborder`       | 规定是否显示 `<iframe>` 的边框。在 HTML5 中，这个属性已经废弃，应使用 CSS 来控制边框 | `<iframe src="demo.html" frameborder="0">`          |
| `sandbox`           | 允许对于 `<iframe>` 中内容的一些限制，如阻止脚本执行，限制表单提交等 | `<iframe src="demo.html" sandbox>`                  |
| `allowfullscreen`   | 允许 `<iframe>` 的内容全屏显示，这对于嵌入视频特别有用        | `<iframe src="video.html" allowfullscreen>`         |

### 兼容性

要注意的是，不是所有浏览器都支持所有视频或音频格式。例如，MP4 主要由 IE，Safari 和 Chrome 支持，而 Firefox 和 Opera 主要支持 Ogg 和 WebM 。因此，为了获得最佳的跨浏览器兼容性，通常需要提供多种格式的源文件。

总的来说，`<video>`、`<audio>` 和 `<iframe>` 标签在现代浏览器中都有良好的兼容性。但是，考虑到一些用户可能仍然使用老版本的浏览器，我们需要在使用这些标签的时候提供合适的备选方案。

## HTML 表格

HTML 数据表格用于在网页上显示二维数据。它由 `<table>`、`<tr>`、`<td>` 和 `<th>` 等标签组成。以下是一个基本的 HTML 表格结构：

```html
<table>
  <tr>
    <th>标题1</th>
    <th>标题2</th>
  </tr>
  <tr>
    <td>数据1</td>
    <td>数据2</td>
  </tr>
</table>
```

在上述代码中：

- `<table>` 标签定义了一个表格。
- `<tr>` 标签定义了一个表格行。
- `<th>` 标签定义了一个表头单元格，通常用于显示列的标题。`<th>` 中的内容默认会被加粗并居中显示。
- `<td>` 标签定义了一个表格数据单元格，用于显示数据。

HTML 表格还支持一些更高级的特性，例如：

- `<thead>`、`<tbody>` 和 `<tfoot>`：用于对表格内容进行分组，有助于提高可访问性，并可以用于应用特定的样式。
- `colspan` 和 `rowspan` 属性：用于定义单元格可以横跨的列数和行数。
- `<caption>`：为表格提供标题或摘要。

以下是一个使用了这些高级特性的表格示例：

```html
<table>
  <caption>2019 年销售数据</caption>
  <thead>
    <tr>
      <th>季度</th>
      <th>销售额</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>第一季度</td>
      <td>$200,000</td>
    </tr>
    <tr>
      <td>第二季度</td>
      <td>$250,000</td>
    </tr>
  </tbody>
  <tfoot>
    <tr>
      <td colspan="2">总计：$450,000</td>
    </tr>
  </tfoot>
</table>
```

在这个例子中，`<caption>` 提供了表格的标题，`<thead>`、`<tbody>` 和 `<tfoot>` 将表格内容进行了分组，`colspan` 属性使得总计行可以横跨两列。

需要注意的是，**虽然 HTML 表格非常适合用于显示二维数据，但是不应该用于页面布局。**使用 CSS 布局技术（如 Flexbox 或 Grid）可以更好地控制页面布局，同时也能提高页面的可访问性和响应式设计的能力。
