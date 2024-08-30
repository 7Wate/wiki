---
title: Jinja 模板引擎
description: Jinja 模板引擎教程
keywords:
  - Jinja
  - 教程
tags:
  - Python/PyPI
  - 技术/程序语言
author: 7Wate
date: 2023-10-18
---

Jinja2 是一款为 Python 设计的模板引擎，版本目前最新为 3.12。它能够生成 HTML、XML、CSV、邮件等多种文本格式的文档。

Jinja2 的设计理念源自 Django 模板引擎，但在易用性、扩展性和性能上做出了大幅提升。

## 安装

```shell
pip install jinja2
```

Jinja2 没有复杂的依赖 ，安装后可以直接导入和使用。

## 核心功能

### 创建模板环境

**使用 Jinja2 时 ，第一步是创建一个模板环境。**模板环境包含了模板的各种配置选项 ，如全局函数、过滤器、测试等。通常**一个应用只需要创建一个环境。**

```python
from jinja2 import Environment ， PackageLoader ， select_autoescape

env = Environment(
    loader=PackageLoader('yourapplication' ， 'templates') ，
    autoescape=select_autoescape(['html' ， 'xml'])
)
```

这里我们使用 `PackageLoader` 加载 `app/templates` 目录下的模板 ，并开启了自动转义 HTML 和 XML 的功能 ，以防范 XSS 攻击。`trim_blocks` 选项可以去除模板代码前后的空行。

### 定义模板

Jinja2 使用类 HTML 语法的模板文件 ，其中嵌入了一些特殊的语法来完成变量替换、逻辑控制等功能。例如:

```jinja2
<!DOCTYPE html>
<html>
<head>
  <title>{{ title }}</title>
</head>
<body>
  <ul>
  {% for item in items %}
    <li>{{ loop.index }}: {{ item }}</li>
  {% endfor %}
  </ul>
</body>
</html>
```

这个模板实现了一个简单的动态列表渲染 ，使用了变量、for 循环等模板语法。

### 渲染模板

加载一个模板并渲染只需要简单的两步：

```python
template = env.get_template('index.html')
content = template.render(title='Home' ， items=['A' ， 'B' ， 'C'])
```

这样就可以通过一个字典对象传入变量 ，生成最后的文本结果。

Jinja2 也支持模板继承 ，一个基础模板可以被多个页面模板扩展：

```jinja2
{# base.html #}

<!DOCTYPE html>
<html>
<body>
  {% block content %}
  {% endblock %}  
</body>
</html>


{# index.html #}

{% extends "base.html" %}

{% block content %}
<p>This is Index Page.</p>  
{% endblock %}
```

## 实践使用

### 帖子应用

以下是一个使用 Flask（Python Web 框架）和 Jinja 的简单帖子列表应用，这个应用将允许用户查看帖子列表，并点击一个帖子以查看其详细内容。

前端部分将使用 Jinja 来生成 HTML，后端部分将使用 Flask 来处理 HTTP 请求。

首先，让我们从后端开始。我们将定义一个 Flask 应用和两个路由：一个用于显示帖子列表，另一个用于显示单个帖子的详细信息。

```python
from flask import Flask ， render_template

app = Flask(__name__)

posts = [
    {'id': 1 ， 'title': 'First Post' ， 'content': 'This is the first post.'} ，
    {'id': 2 ， 'title': 'Second Post' ， 'content': 'This is the second post.'} ，
    # Add more posts as needed
]

@app.route('/')
def post_list():
    return render_template('post_list.html' ， posts=posts)

@app.route('/post/<int:post_id>')
def post_detail(post_id):
    post = next((post for post in posts if post['id'] == post_id) ， None)
    if post is None:
        return 'Post not found' ， 404
    return render_template('post_detail.html' ， post=post)

if __name__ == '__main__':
    app.run(debug=True)
```

在这个后端代码中，`posts` 是一个包含多个帖子的列表，每个帖子都是一个字典，包含一个 ID、一个标题和内容。`post_list` 和 `post_detail` 函数是两个路由处理器，分别用于显示帖子列表和单个帖子的详细信息。

接下来，让我们看看前端部分。我们将需要两个 Jinja 模板：一个用于显示帖子列表，另一个用于显示单个帖子的详细信息。

post_list.html：

```html
<!doctype html>
<html>
  <head>
    <title>Post List</title>
  </head>
  <body>
    <h1>Post List</h1>
    <ul>
      {% for post in posts %}
        <li>
          <a href="{{ url_for('post_detail' ， post_id=post.id) }}">{{ post.title }}</a>
        </li>
      {% endfor %}
    </ul>
  </body>
</html>
```

post_detail.html：

```html
<!doctype html>
<html>
  <head>
    <title>{{ post.title }}</title>
  </head>
  <body>
    <h1>{{ post.title }}</h1>
    <p>{{ post.content }}</p>
    <a href="{{ url_for('post_list') }}">Back to Post List</a>
  </body>
</html>
```

在这些模板中，我们使用了 Jinja 的变量、循环和函数。例如，`{% for post in posts %}` 循环遍历所有的帖子，`{{ post.title }}` 显示帖子的标题，`{{ url_for('post_detail' ， post_id=post.id) }}` 生成帖子详细信息页面的 URL。

这就是一个简单的使用 Flask 和 Jinja 的帖子列表应用示例。你可以根据需要添加更多的功能，例如添加新的帖子、编辑现有的帖子等。

注意，**在 Flask 中，Jinja 是默认的模板引擎，**所以你不需要显式创建 Jinja 的环境。如果你的模板不在默认的 `templates` 文件夹中，你需要在创建 Flask 应用时指定模板文件夹的路径，如下：

```python
app = Flask(__name__ ， template_folder='/path/to/your/templates')
```

### 博客应用

以下是一个简单的博客应用示例。首先，我们定义 Flask 应用和路由（`app.py`）：

```python
from flask import Flask ， render_template

app = Flask(__name__)

# 假设我们有以下博客文章
posts = [
    {"id": 1 ， "title": "First Post" ， "content": "This is the first post."} ，
    {"id": 2 ， "title": "Second Post" ， "content": "This is the second post."} ，
]

@app.route("/")
def home():
    return render_template("home.html" ， posts=posts)

@app.route("/post/<int:post_id>")
def post_detail(post_id):
    post = next((post for post in posts if post["id"] == post_id) ， None)
    if post is None:
        return "Post not found" ， 404
    return render_template("post_detail.html" ， post=post)

if __name__ == "__main__":
    app.run(debug=True)
```

接着，我们创建一个基础模板（`base.html`）：

```html
<!DOCTYPE html>
<html>
<head>
    <title>{% block title %}{% endblock %}</title>
</head>
<body>
    {% block content %}{% endblock %}
</body>
</html>
```

然后，定义主页模板（`home.html`）：

```html
{% extends "base.html" %}

{% block title %}
    Home
{% endblock %}

{% block content %}
    <h1>My Blog</h1>
    <ul>
        {% for post in posts %}
            <li>
                <a href="{{ url_for('post_detail' ， post_id=post.id) }}">
                    {{ post.title }}
                </a>
            </li>
        {% endfor %}
    </ul>
{% endblock %}
```

最后，定义文章详情页模板（`post_detail.html`）：

```html
{% extends "base.html" %}

{% block title %}
    {{ post.title }}
{% endblock %}

{% block content %}
    <h1>{{ post.title }}</h1>
    <p>{{ post.content }}</p>
    <a href="{{ url_for('home') }}">Back to Home</a>
{% endblock %}
```

在这个 Flask 应用示例中，它显示了一个博客文章列表，你可以点击每个文章的标题来查看文章的详细内容。所有的模板都继承自 `base.html`，并覆盖了 `title` 和 `content` 区块。`home.html` 使用了一个 for 循环来显示所有的文章，`post_detail.html` 显示了单个文章的标题和内容。

### 最佳规范

编写模板时 ，有一些最佳实践可以提高可维护性:

- 命名规范：如 index.html ， base.html ，macros.html
- 模板结构：HTML、逻辑、配置等区块划分清楚
- 功能模块化：使用宏、包含等复用代码
- 注释标识：如命名空间、宏参数等

## 高级功能

### 代码优化

在 Jinja 中，一些优化技术可以帮助你提高模板的性能和可读性。例如：

- 使用宏（Macros）：宏类似于 Python 中的函数，可以帮助你避免重复的代码。

```jinja
{% macro input(name ， value='' ， type='text') %}
  <input type= {{ type }}  name= {{ name }}  value= {{ value }} >
{% endmacro %}
```

- 使用 include 和 extends ：`include` 和 `extends` 可以帮助你复用和组织模板。

```jinja
{% extends  base.html  %}

{% block content %}
  <h1>{{ title }}</h1>
  <p>{{ content }}</p>
{% endblock %}
```

### 错误处理

在 Jinja 中，错误处理是通过抛出异常实现的。Jinja 定义了一些自己的异常，如 `TemplateNotFound`、`TemplateSyntaxError` 等。主要异常类型有：

- TemplateNotFound：模板文件不存在
- TemplateSyntaxError：模板语法错误
- UndefinedError：变量未定义
- SecurityError：安全错误 (如禁用标签)

你可以通过捕捉这些异常来处理错误。

```python
from jinja2 import TemplateNotFound

try:
    template = env.get_template('mytemplate.html')
except TemplateNotFound:
    print('Template not found')
```

### 测试和调试

Jinja 提供了一个强大的模板调试器，可以帮助你查找和修复模板中的错误。你可以通过设置 `Environment` 的 `debug` 选项来启用调试器。

```python
env = Environment(loader=... ， debug=True)
```

当 `debug` 选项设置为 `True` 时，Jinja 会在渲染模板时检查错误，并在发现错误时抛出异常。

### 集成其他库

Jinja 可以与许多其他 Python 库和框架一起使用。例如，Jinja 是 Flask 和 Django 这两个流行的 Web 框架的默认模板引擎。此外，Jinja 也可以与诸如 Bootstrap 之类的前端框架一起使用，以创建更丰富和动态的网页。

## 社区动态

Jinja 是一个活跃的开源项目，有一个活跃的开发者和用户社区。你可以在 [Github](https://github.com/pallets/jinja) 上关注 Jinja 的最新更新和发布。此外，你还可以参与 [Gitter上的Jinja社区](https://gitter.im/pallets/jinja)，在那里你可以找到其他 Jinja 用户的帮助，分享你的经验，或者只是去看看其他人都在做什么。

总的来说，Jinja 是一个强大而灵活的模板引擎，适合用于多种应用。通过深入学习和实践，你可以充分利用 Jinja 的功能，提高你的 Web 开发效率和质量。
