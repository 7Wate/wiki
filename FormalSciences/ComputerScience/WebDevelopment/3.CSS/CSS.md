---
title: CSS
description: CSS 样式表
keywords:
  - CSS
tags:
  - FullStack/基础
sidebar_position: 2
author: 7Wate
date: 2023-10-13
---

**世界的色彩与形状来自于你的手中。**

## CSS

CSS，全称为层叠样式表（Cascading Style Sheets），是**一种用于描述 HTML 或 XML 文档样式的标记语言。**由于其简洁的语法和强大的功能，CSS 已成为前端开发的核心技术之一。

## 选择器

**CSS 的选择器是绑定样式到 HTML 元素的关键。**CSS 选择器大致可以分为以下几类：

- **简单选择器**：包括元素选择器、类选择器、ID 选择器。
- **属性选择器**：根据元素的属性选择元素。例如，`[attr=value]` 选择具有特定值的特定属性的元素，`[attr^=value]` 选择属性值以特定值开始的元素，`[attr$=value]` 选择属性值以特定值结束的元素，`[attr*=value]` 选择属性值中包含特定值的元素。
- **伪类和伪元素选择器**：伪类选择器是基于元素的特定状态选择元素，例如 `:hover`、`:focus`、`:checked` 等。伪元素选择器是用于选择元素的特定部分，例如 `::before`、`::after`、`::first-line` 等。
- **组合选择器**：包括子元素选择器、后代选择器、相邻兄弟选择器和一般兄弟选择器。这些选择器可以与简单选择器组合使用，以选择符合特定关系的元素。
- **分组选择器**：用逗号分隔的列表，可以同时选择多个元素。

常用的 CSS 选择器作用和使用示例：

| 选择器类型     | 作用                                                 | 示例                                       |
| :------------- | :--------------------------------------------------- | :----------------------------------------- |
| 元素选择器     | 根据元素名称选择元素                                 | `p { color: red; }`                        |
| 类选择器       | 根据元素的 class 属性选择元素                          | `.intro { font-size: 20px; }`              |
| ID 选择器       | 根据元素的 id 属性选择元素                             | `#first-paragraph { text-align: center; }` |
| 属性选择器     | 根据元素的属性选择元素                               | `a[target="_blank"] { color: red; }`       |
| 伪类选择器     | 根据元素的特定状态选择元素                           | `a:hover { color: red; }`                  |
| 伪元素选择器   | 选择元素的特定部分                                   | `p::first-line { color: blue; }`           |
| 子元素选择器   | 选择特定父元素的直接子元素                           | `div > p { margin-left: 20px; }`           |
| 后代选择器     | 选择特定元素的所有后代元素                           | `div p { margin-left: 20px; }`             |
| 相邻兄弟选择器 | 选择紧接在另一元素后的元素，且二者有相同父元素       | `h1 + p { margin-top: 50px; }`             |
| 一般兄弟选择器 | 选择所有在另一元素之后的兄弟元素，且二者有相同父元素 | `h1 ~ p { color: green; }`                 |
| 分组选择器     | 同时选择多个元素                                     | `h1, h2, p { color: purple; }`             |

### 权重计算

CSS 选择器的权重是由选择器的各个部分组成的，又称为选择器的特异性。**特异性的计算是在冲突解决中用来决定哪个样式规则优先应用的一种方式。**计算特异性的基本规则如下：

| 选择器类型                 | 示例                                   | 特异性  |
| :------------------------- | :------------------------------------- | :------ |
| 内联样式                   | `<div style="...">`                    | 1,0,0,0 |
| ID 选择器                  | `#example`                             | 0,1,0,0 |
| 类选择器、属性选择器、伪类 | `.example`, `[type="radio"]`, `:hover` | 0,0,1,0 |
| 元素选择器、伪元素         | `div`, `::before`                      | 0,0,0,1 |

**特异性的计算方式是逐级相加。**例如，对于选择器 `#id .class div:hover`，其特异性是 `0100 (id选择器) + 0010 (class选择器) + 0001 (元素选择器) + 0010 (伪类) = 0121`。

需要注意的是，**`!important` 规则可以覆盖其他任何特异性计算。**只有比较两个同时使用 `!important` 的规则时，才会比较特异性。此外，当样式规则的特异性相同时，后出现的规则将覆盖先出现的规则。

以下是一个示例：

```html
<div id="id1" class="class1">
    Hello World
</div>

<style>
    div { color: blue; } /* 特异性 0001 */
    .class1 { color: green; } /* 特异性 0010 */
    #id1 { color: red; } /* 特异性 0100 */
</style>
```

在这个例子中，文本 Hello World 的颜色将会是红色，因为 `#id1` 的特异性最高。

### 层叠基层

**CSS 的全名是 Cascading Style Sheets，其中 Cascading（层叠）指的是如何解决样式冲突的过程。**当多个样式规则应用于同一个元素时，浏览器会根据一系列规则来决定使用哪个样式。这个过程主要依赖于以下三个因素：

1. **特异性**：如前面所述，不同的选择器具有不同的特异性。具有更高特异性的规则会覆盖具有较低特异性的规则。例如，ID 选择器（特异性为 0,1,0,0）会覆盖类选择器（特异性为 0,0,1,0）。

2. **来源**：样式规则的来源也会影响其优先级。例如，用户代理（浏览器）的默认样式具有最低优先级，作者的样式规则优先级较高，而用户自定义的样式规则优先级最高。

3. **顺序**：在具有相同特异性的规则中，后出现的规则会覆盖先出现的规则。

另一方面，CSS 的 继承 是指某些 CSS 属性的值可以从其父元素传递给其子元素。例如，如果你为一个 `<div>` 元素设置了 `color: blue;`，那么 `<div>` 元素的所有子元素（除非它们有自己的 `color` 规则）都将默认使用蓝色字体。

**需要注意的是，并非所有 CSS 属性都是可继承的。**一些影响布局和盒模型的属性，如 `width`, `height`, `padding`, `margin` 和 `border`，是不可继承的。而一些与文字样式和颜色相关的属性，如 `color`, `font`, `letter-spacing` 和 `line-height`，是可以继承的。如果你想强制一个属性继承其父元素的值，可以使用 `inherit` 关键字，如 `width: inherit;`。

## 盒子模型

**在 CSS 中，所有的 HTML 元素都可以看作是盒子。**当你在设计一个网页时，你实际上是在操作这些盒子。这种观念被称为 盒子模型（Box Model）。

```text
+---------------------------------------------------+
|                      Margin                       |
|  +---------------------------------------------+  |
|  |                   Border                    |  |
|  |  +---------------------------------------+  |  |
|  |  |                Padding                |  |  |
|  |  |  +---------------------------------+  |  |  |
|  |  |  |             Content             |  |  |  |
|  |  |  +---------------------------------+  |  |  |
|  |  |                Padding                |  |  |
|  |  +---------------------------------------+  |  |
|  |                   Border                    |  |
|  +---------------------------------------------+  |
|                      Margin                       |
+---------------------------------------------------+
```

CSS 的盒子模型主要由四个部分组成：

1. **Content（内容）**：这是 HTML 元素的实际内容，如文字、图片等。
2. **Padding（内边距）**：包围在内容周围的空间。内边距是透明的。
3. **Border（边框）**：包围在内边距和内容周围的边框。边框是可见的，你可以定义其样式、宽度和颜色。
4. **Margin（外边距）**：包围在边框和其他元素之间的空间。外边距是透明的。

这些部分一起决定了元素的总尺寸。**元素的 `width` 和 `height` 属性默认只包含内容的尺寸，不包括内边距、边框和外边距，这是因为 `box-sizing` 默认值为 `content-box`。**但是，你可以通过设置 `box-sizing: border-box;` 来改变这种行为，使 `width` 和 `height` 也包括内边距和边框。

这里是一个样例代码：

```css
div {
  width: 300px;
  padding: 10px;
  border: 5px solid black;
  margin: 20px;
}
```

在这个例子中，`div` 元素的实际宽度是 350px（300px 的内容宽度 + 2 *10px 的内边距 + 2* 5px 的边框宽度 = 350px），外边距额外增加了 20px 的空间，但不会增加 `div` 元素本身的宽度。

### 边框

边框主要由 `border` 属性控制，这也是一个复合属性，包括以下几个子属性：

| 属性            | 描述               | 示例值                              |
| --------------- | ------------------ | ----------------------------------- |
| `border-width`  | 设置边框的宽度     | `1px`, `medium`, `thick`            |
| `border-style`  | 设置边框的样式     | `solid`, `dashed`, `dotted`, `none` |
| `border-color`  | 设置边框的颜色     | `black`, `#000000`, `rgb(0,0,0)`    |
| `border-radius` | 设置边框的圆角半径 | `10px`, `50%`                       |

```css
.example-border {
    /* 设置边框宽度为 5px */
    border-width: 5px;
    
    /* 设置边框样式为实线 */
    border-style: solid;
    
    /* 设置边框颜色为蓝色 */
    border-color: blue;
    
    /* 设置边框的圆角半径为 10px，使得边框具有圆角效果 */
    border-radius: 10px;
}
```

### 背景

背景主要由 `background` 属性控制，这是一个复合属性，包括以下几个子属性：

| 属性                  | 描述                         | 示例值                                        |
| :-------------------- | :--------------------------- | :-------------------------------------------- |
| `background-color`    | 设置元素的背景颜色           | `red`, `#FF0000`, `rgb(255,0,0)`              |
| `background-image`    | 设置一个或多个背景图像       | `url("image.jpg")`                            |
| `background-repeat`   | 设置背景图像是否以及如何重复 | `no-repeat`, `repeat-x`, `repeat-y`, `repeat` |
| `background-position` | 设置背景图像的起始位置       | `center`, `top right`, `50% 50%`              |
| `background-size`     | 设置背景图像的大小           | `cover`, `contain`, `50% 50%`                 |

```css
.example-background {
    /* 设置背景颜色为浅灰色 */
    background-color: #f8f8f8;

    /* 设置背景图像，这里使用了一个在线的图片 URL */
    background-image: url('https://example.com/image.jpg');
    
    /* 设置背景图像不重复 */
    background-repeat: no-repeat;

    /* 设置背景图像的位置在元素的中央 */
    background-position: center;

    /* 设置背景图像的大小以完全覆盖元素 */
    background-size: cover;
}
```

## 文本处理

在 CSS 中，你可以使用各种属性来处理和控制文本的样式。以下是一个 CSS 文本处理示例：

```css
.example-text {
    /* 设置文本颜色为红色 */
    color: red;
    
    /* 设置字体为 Arial */
    font-family: Arial;
    
    /* 设置字体大小为 14px */
    font-size: 14px;
    
    /* 设置字体粗细为粗体 */
    font-weight: bold;
    
    /* 设置字体样式为斜体 */
    font-style: italic;
    
    /* 设置文本居中对齐 */
    text-align: center;
    
    /* 设置下划线装饰线 */
    text-decoration: underline;
    
    /* 设置文本全部转换为大写 */
    text-transform: uppercase;
    
    /* 设置行高为 20px */
    line-height: 20px;
    
    /* 设置字符间距为 2px */
    letter-spacing: 2px;
    
    /* 设置单词间距为 5px */
    word-spacing: 5px;
    
    /* 设置首行文本缩进为 20px */
    text-indent: 20px;
    
    /* 设置不换行 */
    white-space: nowrap;
    
    /* 设置文本阴影，水平偏移 1px，垂直偏移 1px，阴影模糊半径 2px，阴影颜色为黑色 */
    text-shadow: 1px 1px 2px black;
}
```

以下是一些常用的 CSS 文本属性：

| 属性              | 描述                     | 示例值                                            |
| ----------------- | ------------------------ | ------------------------------------------------- |
| `color`           | 设置文本颜色             | `red`, `#FF0000`, `rgb(255,0,0)`                  |
| `font-family`     | 设置字体                 | `Arial`, `"Times New Roman"`, `sans-serif`        |
| `font-size`       | 设置字体大小             | `12px`, `1em`, `80%`                              |
| `font-weight`     | 设置字体的粗细           | `normal`, `bold`, `600`                           |
| `font-style`      | 设置字体样式，如斜体     | `normal`, `italic`, `oblique`                     |
| `text-align`      | 设置文本对齐方式         | `left`, `right`, `center`, `justify`              |
| `text-decoration` | 设置文本装饰线，如下划线 | `none`, `underline`, `overline`, `line-through`   |
| `text-transform`  | 设置文本转换，如大写     | `none`, `uppercase`, `lowercase`, `capitalize`    |
| `line-height`     | 设置行高                 | `normal`, `1.5`, `20px`                           |
| `letter-spacing`  | 设置字符间距             | `normal`, `3px`, `0.5em`                          |
| `word-spacing`    | 设置单词间距             | `normal`, `10px`, `2em`                           |
| `text-indent`     | 设置首行文本缩进         | `0`, `20px`, `5%`                                 |
| `white-space`     | 设置如何处理元素内的空白 | `normal`, `nowrap`, `pre`, `pre-wrap`, `pre-line` |
| `text-shadow`     | 设置文本阴影             | `1px 1px 2px black`                               |

## 溢出内容

在 CSS 中，`overflow` 属性用于控制当元素的内容超过其指定的宽度和高度时发生的情况。这种情况通常称为溢出。`overflow` 属性有以下几个值：

- `visible`：这是默认值，表示内容会**溢出元素的边界框**。
- `hidden`：如果内容溢出元素的边界框，则该**内容会被剪裁**，并且其他内容是不可见的。
- `scroll`：如果内容溢出元素的边界框，**浏览器会添加滚动条**以便查看剩余的内容。
- `auto`：如果内容溢出元素的边界框，**浏览器会根据需要添加滚动条。**

另外，还有 `overflow-x` 和 `overflow-y` 属性，这两个属性分别用于设置元素的水平和垂直溢出。这些属性有相同的值：`visible`、`hidden`、`scroll` 和 `auto`。

以下是一些示例：

```css
/* 如果其内容溢出，该内容将被剪裁 */
.example {
    overflow: hidden;
}

/* 如果其内容在垂直方向上溢出，浏览器将添加滚动条 */
.example {
    overflow-y: scroll;
}

/* 如果其内容溢出，浏览器将根据需要添加滚动条 */
.example {
    overflow: auto;
}
```

需要注意的是，**`overflow` 属性只有在元素的宽度和高度已经明确指定（例如，通过 CSS 或内联样式）**，并且内容实际上溢出这些指定的尺寸时，才会起作用。

## 单位和值

在 CSS 中，我们经常需要为各种属性提供值，这些值可能需要单位。下面是一些常见的 CSS 单位和值：

| 类型         | 单位         | 说明                                                         |
| :----------- | :----------- | :----------------------------------------------------------- |
| 相对长度     | em           | 相对于父元素的字体大小                                       |
| 相对长度     | rem          | 相对于根元素（通常是 `<html>`）的字体大小                    |
| 相对长度     | %            | 相对于父元素的大小                                           |
| **绝对长度** | px           | 屏幕上的一个点                                               |
| **绝对长度** | cm, mm, in   | 在屏幕上的大小可能会因设备而异，但在打印中很有用             |
| 其他单位     | vw           | 相对于视口的宽度，"1vw" 等于视口宽度的 1%                    |
| 其他单位     | vh           | 相对于视口的高度，"1vh" 等于视口高度的 1%                    |
| 其他单位     | vmin 和 vmax | 分别是视口宽度和高度中较小和较大的值的百分比                 |
| 颜色值       | Hexadecimal  | 十六进制，如 "#FF0000" 代表红色                              |
| 颜色值       | RGB          | 如 "rgb(255, 0, 0)" 代表红色                                 |
| 颜色值       | RGBA         | 增加了一个 alpha (透明度) 值，如 "rgba(255, 0, 0, 0.5)" 代表半透明的红色 |
| 颜色值       | HSL          | 使用色相（hue）、饱和度（saturation）和亮度（lightness）来指定颜色，如 "hsl(0, 100%, 50%)" 代表红色 |
| 颜色值       | HSLA         | 与 HSL 类似，但增加了 alpha (透明度) 值，如 "hsla(0, 100%, 50%, 0.5)" 代表半透明的红色 |
| 关键字值     | display      | 可以接受 "block", "inline", "inline-block", "none" 等值      |
| 关键字值     | position     | 可以接受 "static", "relative", "absolute", "fixed" 等值      |

## 布局技巧

在 CSS 的世界里，布局是最重要的技巧之一。**Flexbox（弹性盒子）和 Grid（网格）布局是两种现代且强大的布局方法。**Flexbox 主要用于在一维空间（行或列）内对元素进行布局，非常适合用于组件和小型布局。而 Grid 则主要用于在二维空间（行和列）内对元素进行布局，非常适合用于大型布局项目，如整个页面布局。

### Display

CSS 中 `display` 属性用于控制元素的显示类型。以下是一些常见的 `display` 属性值：

| 属性值         | 描述                                                         | 示例元素                         |
| :------------- | :----------------------------------------------------------- | :------------------------------- |
| `block`        | 元素作为块级元素显示，前后会有换行符。                       | `<div>`, `<p>`, `<h1>`-`<h6>` 等 |
| `inline`       | 元素作为内联元素显示，元素前后不会产生换行。                 | `<span>`, `<a>`, `<img>` 等      |
| `inline-block` | 元素作为内联块级元素显示，可以和其他元素在同一行显示，但内部可以像块级元素一样设置宽度和高度。 | -                                |
| `none`         | 元素不会被显示。                                             | -                                |
| `flex`         | 元素作为弹性盒子模型显示，用于在一维空间上布局项目，能够管理和分配空间和对齐内容。 | -                                |
| `grid`         | 元素作为网格容器显示，用于在二维空间上进行布局。             | -                                |

以下是一些使用 `display` 属性的示例：

```css
/* 元素设置为块级元素 */
.example {
    display: block;
}

/* 元素设置为内联元素 */
.example {
    display: inline;
}

/* 元素设置为内联块级元素 */
.example {
    display: inline-block;
}

/* 元素设置为不显示 */
.example {
    display: none;
}

/* 元素设置为弹性盒子模型 */
.example {
    display: flex;
}

/* 元素设置为网格模型 */
.example {
    display: grid;
}
```

### Flexbox

**Flexbox 是一种一维布局模型，主要用于在一个维度（行或列）上对元素进行排列。**只需要简单的设置 `display: flex;`，一个元素就可以变为弹性容器，其子元素会成为弹性项目。这种布局是响应式的，这意味着项目的大小和位置可以根据父容器的大小动态改变。

假设我们有一个包含三个子项的容器：

```html
<style>
    .flex-container {
      display: flex;
    }
</style>

<div class="flex-container">
  <div>1</div>
  <div>2</div>
  <div>3</div>
</div>
```

默认情况下，这会让这三个子项并排显示，并填充整个容器宽度。

```text
|   Flex Container  |
| 1 |     2     | 3 |
```

Flexbox 布局中的一些常用属性：

| 属性              | 作用                           | 示例                                             |
| :---------------- | :----------------------------- | ------------------------------------------------ |
| `display`         | 定义一个弹性容器               | `.container { display: flex; }`                  |
| `flex-direction`  | 定义项目的排列方向             | `.container { flex-direction: row; }`            |
| `justify-content` | 定义项目在主轴上的对齐方式     | `.container { justify-content: space-between; }` |
| `align-items`     | 定义项目在交叉轴上的对齐方式   | `.container { align-items: center; }`            |
| `flex-wrap`       | 定义项目是否换行               | `.container { flex-wrap: wrap; }`                |
| `flex`            | 定义项目的增长、缩小和基本大小 | `.item { flex: 1 1 auto; }`                      |

### Grid

相较于 Flexbox 的一维布局，**Grid 布局则是一个二维布局模型，可以同时在行和列两个维度上对元素进行排列。**通过设置 `display: grid;`，一个元素就可以变为网格容器，其子元素会成为网格项目。Grid 布局非常适合用于构建符合网格的复杂界面。

假设我们有一个包含九个子项的容器：

```html
<style>
    .grid-container {
      display: grid;
      grid-template-columns: repeat(3, 1fr);
      grid-template-rows: repeat(3, 1fr);
    }
</style>

<div class="grid-container">
  <div>1</div>
  <div>2</div>
  <div>3</div>
  <div>4</div>
  <div>5</div>
  <div>6</div>
  <div>7</div>
  <div>8</div>
  <div>9</div>
</div>
```

这会将子项布局为一个 3x3 的网格，如下所示：

```text
|  Grid Container |
|  1  |  2  |  3  |
|  4  |  5  |  6  |
|  7  |  8  |  9  |
```

Grid 布局中的一些常用属性：

| 属性                                           | 作用                         | 示例                                             |
| ---------------------------------------------- | ---------------------------- | ------------------------------------------------ |
| `display`                                      | 定义一个网格容器             | `.container { display: grid; }`                  |
| `grid-template-columns` / `grid-template-rows` | 定义列宽/行高                | `.container { grid-template-columns: 1fr 1fr; }` |
| `grid-column` / `grid-row`                     | 定义项目的列/行位置          | `.item { grid-column: 1 / 2; }`                  |
| `grid-gap`                                     | 定义列间隔/行间隔            | `.container { grid-gap: 10px; }`                 |
| `justify-items` / `align-items`                | 定义项目在单元格中的对齐方式 | `.container { justify-items: center; }`          |
| `grid-auto-flow`                               | 定义项目的排列方式           | `.container { grid-auto-flow: dense; }`          |

### Position

CSS 定位（Position）非常强大，它可以用于创建各种复杂的布局。**但是，请注意，过度使用 `absolute` 或 `fixed` 定位可能会导致布局难以管理，尤其是在响应式设计中。**在可能的情况下，使用 Flexbox 或 Grid 通常是更好的选择。

#### Static

**`static` 是元素的默认定位方式。**这种定位方式下，元素会按照正常的文档流进行布局。`static` 定位的元素不会受到 `top`、`bottom`、`left` 或 `right` 属性的影响。

```css
div {
    position: static;
}
```

#### Relative

**`relative` 定位的元素会相对于它在正常文档流中的位置进行定位。**例如，设置 `left: 20px` 会使元素向右移动 20px。

```css
div {
    position: relative;
    left: 20px;
}
```

#### Absolute

**`absolute` 定位的元素会相对于最近的非 `static` 定位的祖先元素（如果存在的话）进行定位。**如果没有这样的祖先元素，那么它会相对于 `initial containing block` 进行定位。`absolute` 定位的元素会从正常的文档流中移除，并不会影响到其他元素的布局。

```css
div {
    position: absolute;
    top: 20px;
    right: 0;
}
```

#### Fixed

**`fixed` 定位的元素会相对于浏览器窗口进行定位，即使页面滚动，它也始终保持在同一位置。**`fixed` 定位的元素会从正常的文档流中移除，并不会影响到其他元素的布局。

```css
div {
    position: fixed;
    bottom: 0;
    right: 0;
}
```

#### Sticky

**`sticky` 定位是相对定位和固定定位的混合类型。**元素在滚动到某个位置前为相对定位，之后为固定定位。

```css
div {
    position: sticky;
    top: 0;
}
```

## 过渡与动画

在 CSS 中，动画和过渡都是创建动态效果的重要工具，它们可以在提升用户体验和增强网页视觉效果方面发挥重要作用。

### Transition

**过渡是当元素从一个样式逐渐改变为另一个样式时产生的效果。**

`transition` 属性是一个复合属性，用于设置四个过渡效果的属性，包括 `transition-property`，`transition-duration`，`transition-timing-function` 和 `transition-delay`。这些属性可以单独使用，也可以组合在一起使用。

例如，你可以创建一个当鼠标悬停时颜色逐渐改变的按钮：

```css
button {
    background-color: blue;
    transition: background-color 2s;
}

button:hover {
    background-color: red;
}
```

| 属性                         | 描述                                                         | 示例值             |
| :--------------------------- | :----------------------------------------------------------- | :----------------- |
| `transition-property`        | 指定应用过渡效果的 CSS 属性。可以是任何 CSS 属性，如 `background-color`，`height`，`all` 等。 | `background-color` |
| `transition-duration`        | 指定过渡效果花费的时间，以秒（s）或毫秒（ms）为单位。        | `2s`               |
| `transition-timing-function` | 规定过渡效果的速度曲线。可选值有 `linear`，`ease`，`ease-in`，`ease-out`，`ease-in-out`，`cubic-bezier(n,n,n,n)`。 | `ease-in`          |
| `transition-delay`           | 指定过渡效果何时开始。时间以秒（s）或毫秒（ms）为单位。      | `1s`               |

### Animation

动画是元素从一系列样式中逐渐改变的过程，可以使用 `@keyframes` 规则和 `animation` 属性来创建动画。`@keyframes` 本身并没有属性，但是你可以在 **`@keyframes` 规则中定义动画的各个阶段（关键帧）**和它们的样式。

| 关键词         | 描述                                                         | 示例值                         |
| :------------- | :----------------------------------------------------------- | :----------------------------- |
| `@keyframes`   | 用于创建新的动画规则。它的值是一个动画名称和一个包含关键帧的块。 | `@keyframes myAnimation {...}` |
| `0%` 或 `from` | 表示动画的开始阶段。你可以在这里定义元素的初始样式。         | `0% { opacity: 0; }`           |
| `100%` 或 `to` | 表示动画的结束阶段。你可以在这里定义元素的最终样式。         | `100% { opacity: 1; }`         |
| `n%`           | 表示动画的中间阶段。`n` 是一个介于 0 和 100 之间的百分数。你可以在这里定义元素在动画中间的样式。 | `50% { opacity: 0.5; }`        |

**而 `animation` 属性则用于将动画绑定到特定元素。**例如，你可以创建一个循环移动的方块：

```css
@keyframes move {
    0% { left: 0; }
    50% { left: 200px; }
    100% { left: 0; }
}

div {
    position: absolute;
    width: 100px;
    height: 100px;
    background: red;
    animation: move 2s infinite;
}
```

在这个例子中，方块将在 2 秒内从左移动到右，然后再移动回左边，这个过程将无限循环。

## 响应式设计与媒体查询

**响应式设计是一种使网站能够适应各种屏幕尺寸和设备的设计和开发方法。**在响应式设计中，布局、图片、文字和其他元素都会根据浏览器窗口的大小自动调整。

响应式设计的主要原则包括：

- **流式布局**：元素的宽度以百分比表示，以便能够随着浏览器窗口的大小变化而变化。
- **灵活的图片和媒体**：这些元素的大小也是以百分比表示，以保持其在页面中的比例不变。
- **媒体查询**：根据设备的特性，如宽度、高度和方向等，应用不同的样式规则。

**媒体查询是实现响应式设计的主要工具。**媒体查询允许我们根据设备的特性，如宽度、高度和方向等，应用不同的样式规则。在创建响应式布局时，我们也可以使用**视口单位（vw、vh、vmin、vmax）**。这些单位是相对于视口（即浏览器窗口）的大小，根据视口的大小动态变化，非常适合用于创建响应式设计。

媒体查询的基本语法如下：

```css
@media media-type and (media-feature) {
  /* CSS rules go here */
}
```

- `media-type` 是可选的，表示媒体类型，如 `screen`、`print` 等。
- `media-feature` 表示要查询的设备特性，如 `width`、`height` 等。

例如，我们可以写一个媒体查询，当浏览器窗口的宽度小于 600 像素时，让主要内容的字体大小增大，以便于在小屏幕设备上阅读。

```css
@media screen and (max-width: 600px) {
  .main-content {
    font-size: 18px;
  }
}
```

在这个例子中，`.main-content { font-size: 18px; }` 这条样式规则只会在媒体类型为 `screen` 并且浏览器窗口的最大宽度为 600px 时应用。以下是一些常见的媒体查询的例子：

| 媒体特性       | 描述                         | 示例                                    |
| :------------- | :--------------------------- | :-------------------------------------- |
| `max-width`    | 屏幕宽度的最大值             | `@media (max-width: 600px) {...}`       |
| `min-width`    | 屏幕宽度的最小值             | `@media (min-width: 768px) {...}`       |
| `max-height`   | 屏幕高度的最大值             | `@media (max-height: 400px) {...}`      |
| `min-height`   | 屏幕高度的最小值             | `@media (min-height: 500px) {...}`      |
| `orientation`  | 设备屏幕的方向（横向或纵向） | `@media (orientation: landscape) {...}` |
| `aspect-ratio` | 视窗的宽高比                 | `@media (aspect-ratio: 16/9) {...}`     |
| `resolution`   | 设备的像素密度               | `@media (min-resolution: 300dpi) {...}` |
| `color`        | 设备的颜色位数               | `@media (color: 8) {...}`               |
| `monochrome`   | 黑白设备的像素位数           | `@media (monochrome: 2) {...}`          |

## CSS 预处理器

**CSS 预处理器是一种脚本语言，它扩展了 CSS 的功能，增加了变量、嵌套、混合和函数等特性，使得 CSS 更加强大和易于维护。**预处理器将扩展的 CSS 语法转换为普通的 CSS，以便浏览器可以解析。

SASS 和 LESS 都是流行的 CSS 预处理器，它们提供了许多强大的特性，如变量、嵌套、混合和函数等。SASS 支持两种语法：旧版的缩进语法和新版的 SCSS 语法，而 LESS 的语法更接近于原生 CSS。此外，SASS 提供了更多高级的特性，比如条件语句、循环等。在选择哪种预处理器时，你可以根据你的需求和喜好来决定。

### SASS

[SASS](https://sass-lang.com/)（Syntactically Awesome StyleSheets）是一种 CSS 预处理器，它提供了许多有用的特性，如变量、嵌套、混合和函数等。SASS 支持两种语法：旧版的缩进语法（Indented Syntax）和新版的 SCSS。旧版的语法更简洁，但新版的 SCSS 语法更接近于原生 CSS。

以下是一个使用 SASS 特性的例子：

```scss
$font-stack:    Helvetica, sans-serif;
$primary-color: #333;

body {
  font: 100% $font-stack;
  color: $primary-color;
}

.container {
  width: 100%;

  .sidebar {
    width: 30%;
  }

  .content {
    width: 70%;
  }
}
```

### LESS

[LESS](https://lesscss.org/) 是另一种流行的 CSS 预处理器，它的语法和 CSS 非常相似，所以学习曲线相对较平缓。LESS 提供了变量、嵌套、混合、函数和运算等特性。

以下是一个使用 LESS 特性的例子：

```less
@base-color: #f938ab;

.box-shadow(@style, @c) when (iscolor(@c)) {
  -webkit-box-shadow: @style @c;
  box-shadow:         @style @c;
}
.box-shadow(@style, @alpha: 50%) when (isnumber(@alpha)) {
  .box-shadow(@style, rgba(0, 0, 0, @alpha));
}
.box {
  color: saturate(@base-color, 5%);
  border-color: lighten(@base-color, 30%);
  div { .box-shadow(0 0 5px, 30%) }
}
```

总的来说，CSS 预处理器如 SASS 和 LESS 可以让你的 CSS 更加强大和易于维护，它们是现代前端开发工具链的重要组成部分。
