---
id: OpenSSL 简明笔记
title: OpenSSL 简明笔记
data: 2022年07月10日
---

## OpenSSL 的一般使用

OpenSSL是一个开放源代码的软件库包。这个包广泛被应用在互联网的网页服务器上。 其主要库是以C语言所写成，实现了基本的加密功能，实现了SSL与TLS协议。

> 以下命令均在 cygwin 或 linux 下运行
> 以下命令是在这个版本 `OpenSSL 1.1.1g 21 Apr 2020` 下的 OpenSSL 运行的

- 查看 openssl 的版本信息

    ```shell
    openssl version -a
    ```

- 查看帮助，这里会输出 openssl 支持的算法

    ```shell
    openssl help
    ```

- 查看某个命令的帮助

    ```shell
    openssl 某个命令 --help
    ```

- 查看密码套件

    ```shell
    openssl ciphers -v
    ```

- 数字摘要

    ```shell
    echo "123" | openssl dgst -sha256
    openssl dgst -sha256 文件路径
    echo "123" | openssl dgst -sha256 | awk '{print $2}'
    openssl dgst -sha256 文件路径 | awk '{print $2}'
    ```

- 输出当前时间戳

    ```shell
    date +%s
    ```

- 输出纳秒 这是一个 9 位的数字 一些简单的伪随机数算法会使用纳秒作为种子

    ```shell
    date +%N
    ```

- 生成 32 位随机字符串

    ```shell
    openssl rand -base64 32
    ```

- 输出随机数字

    ```shell
    # 输出随机数字，但无法确定数字的长度
    openssl rand -base64 32 | tr -dc '0-9'
    openssl rand -base64 64 | tr -dc '0-9'
    # 生成16位随机数 有可能不足16位
    openssl rand -base64 128 | tr -dc '0-9' | cut -c1-16
    ```

- 查看 对称加密命令和可以使用的算法

    ```shell
    openssl enc -help
    ```

- enc 使用对称加密算法

    ```shell
    openssl enc -aes-256-cfb -e -in a.txt -a -out b.txt -pass pass:123
    openssl enc -aes-256-cfb -d -in b.txt -a -out c.txt -pass pass:123
    # -aes-256-cfb 使用的算法
    # -e 加密
    # -d 解密
    # -in 输入的文件路径
    # -out 输出文件的路径
    # -a 把输出转换成 base64 加密时有这个参数，解密时也要有这个参数
    # -pass 数入密码和输入密码的方式
    #     pass
    #     file
    #     stdio
    #     env
    #     fd
    ```

- 生成 rsa 私钥

    ```shell
    openssl genrsa -out rsa_private_key.pem 4096
    # 默认是 pem 格式的
    # -out 指定生成文件的路径
    # 最后的 4096 是生成密钥的长度
    # 生成的密钥对是 pkcs1 格式的， openssl 有相应的命令转成 pkcs8 或 pkcs12 格式
    ```

- 从私钥中提取公钥

    ```shell
    openssl rsa -in rsa_private_key.pem -pubout -out rsa_public_key.pem
    # -pubout 提取公钥
    # -out 指定生成文件的路径
    # -in 私钥路径
    ```

- 公钥加密文件

    ```shell
    openssl rsautl -encrypt -in a.txt -inkey rsa_public_key.pem -pubin -out b.txt
    # -out 加密后的文件路径
    # -in 需要加密的文件路径
    # -inkey 公钥路径
    ```

- 私钥解密文件

    ```shell
    openssl rsautl -decrypt -in b.txt -inkey rsa_private_key.pem -out c.txt
    # -out 解密后的文件路径
    # -in 需要解密的文件路径
    # -inkey 私钥路径
    ```

- 使用私钥生成签名

    ```shell
    openssl dgst -sha256 -sign rsa_private_key.pem -keyform PEM -out sign.sha256 a.txt
    # -sha256 哈希算法
    # -sign 私钥路径
    # -keyform 私钥的格式
    # -out 签名生成的路径
    # 最后的 a.txt 是需要生成签名的文件路径
    ```

- 使用公钥验证签名

    ```shell
    openssl dgst -sha256 -verify rsa_public_key.pem -keyform PEM -signature sign.sha256 a.txt
    ```

- 对文件的内容进行 base64 编码

    ```shell
    openssl enc -base64 -e -in sign.sha256 -out sign.sha256.base64
    ```

- 对文件的内容进行 base64 解码

    ```shell
    openssl enc -base64 -d -in sign.sha256.base64 -out sign.sha2562
    ```

- 比较两个文件的内容，如果两个文件内容一致则不会有输出

    ```shell
    diff 文件1的路径 文件2的路径
    ```

- 生成一个 csr 文件

  - 启动一个问题/回答的交互式会话，其它随便填就好，extra attributes 可以留空
  - 其实 openssl 有一键生成密钥对， csr 和 证书的命令

```shell
openssl req -new \
    -key rsa_private_key.pem \
    -keyform PEM \
    -out myserver.csr
# -new 生成一个新的 csr 文件
# -key 私钥文件路径
# -keyform 私钥的格式
# -out 生成的 csr 文件路径
```

- 查看 csr 文件内容

    ```shell
    openssl req -text -in myserver.csr -noout -verify
    # -in csr 文件路径
    ```

- 使用 csr 和 私钥生成自签证书

    ```shell
    openssl x509 \
      -sha256 \
      -signkey rsa_private_key.pem \
      -in myserver.csr \
      -req -days 365 -out domain3.crt
    # x509 生成 x509 格式的证书
    # -sha256 证书采用的哈希算法
    # -signkey 私钥路径
    # -in csr 文件路径
    # -days 证书有效天数
    # -out 生成的证书路径
    ```

- 一条命令生成密钥和证书

    ```shell
    openssl req -newkey rsa:4096 -nodes -keyout rsa_private_key.pem -x509 -days 365 -out domain.crt
    ```

    ```shell
    openssl req -newkey rsa:4096 -nodes -keyout rsa_private_key.pem -x509 -days 365 -out domain.crt -subj "/C=CN/ST=State/L=City/O=Ltd/OU=Section/CN=localhost"
    ```

- 查看证书内容

    ```shell
    openssl x509 -in domain.crt -noout -text
    ```

- 查看证书序列号

    ```shell
    openssl x509 -in domain.crt -noout -serial
    ```

- 查看证书有效时间

    ```shell
    openssl x509 -in domain.crt -noout -dates
    ```

### 生成多个域名的证书

一般使用 OpenSSL 生成证书时都是 v1 版的，不带扩展属性。 多域名证书需要用到 v3 版的 extensions 的 Subject Alternative Name (SAN 主题替代名称)

1. 寻找默认配置文件

    ```shell
    find / -name openssl.cnf
    ```

2. 复制一份默认配置文件

    ```shell
    cp /usr/ssl/openssl.cnf openssl.cnf
    ```

3. 编辑 openssl.cnf

    1. [ req ] 字段下加入 req_extensions = v3_req

    2. [ v3_req ] 字段下加入 subjectAltName = @alt_names

    3. 在配置文件的最后最后新建一个字段 [ alt_names ]

    4. 在 [ alt_names ] 里按以下格式写入多个域名

        ```shell
         [ alt_names ]
         DNS.1 = 3.example.com
         DNS.2 = 4.example.com
        ```

4. 新建私钥

    ```shell
    openssl genrsa -out rsa_private_key.pem 4096
    ```

5. 生成 csr 文件

    ```shell
    openssl req -new \
     -key rsa_private_key.pem \
     -keyform PEM \
     -config openssl.cnf \
     -out myserver.csr
    ```

6. 生成数字证书

    ```shell
    openssl x509 \
     -sha256 \
     -signkey rsa_private_key.pem \
     -in myserver2.csr \
     -extensions v3_req \
     -extfile openssl.cnf \
     -req -days 365 -out domain.crt
    ```

### 自建 CA

1. 创建 CA 目录

    ```shell
    mkdir -p ~/ssl/demoCA/{certs,newcerts,crl,private}
    cd ~/ssl/demoCA
    Touch index.txt
    echo "01" > serial
    ```

2. 寻找默认配置文件

    ```shell
    find / -name openssl.cnf
    ```

3. 复制一份默认配置文件

    ```shell
    cp /usr/ssl/openssl.cnf ~/ssl/openssl.cnf
    ```

4. 修改 openssl.cnf 文件

    - 把 [ CA_default ] 的 dir 修改成 ~/ssl/demoCA/ 的绝对路径，类似于这样

        ```shell
          [ CA_default ]
          dir  = /root/ssl/demoCA  # Where everything is kept
        ```

5. 生成 CA 根证书及密钥

    ```shell
    openssl req -new -x509 -newkey rsa:4096 -nodes -keyout cakey.key -out cacert.crt -config openssl.cnf -days 365
    ```

6. 生成客户端私钥

    ```shell
    openssl genrsa -out client.key 4096
    ```

7. 用该客户端私钥生成证书签名请求

    ```shell
    openssl req -new -key client.key -out client.csr -config openssl.cnf
    ```

8. 使用 CA 根证书签发客户端证书

    ```shell
    openssl ca -in client.csr -out client.crt -cert cacert.crt -keyfile cakey.key -config openssl.cnf
    ```

- 注意：默认要求 国家，省，公司名称三项必须和CA一致

- 如果不想一致，可以修改 openssl.cnf 的 [ CA_default ] 的 policy 为 policy_anything

    ```shell
      policy = policy_anything
    ```

### 证书链合并

一些情况下，从 CA 那里申请到的 SSL 证书需要配置证书链，因为颁发的 CA 只是一个中间 CA 。 这个时候，需要把 CA 的证书和 SSL 证书都转换成 pem 格式。 然后新建一个文件，按照 最终实体证书 -> 中间证书 -> 根证书 这样的顺序，把证书的 pem 格式的内容复制进去，证书之间用一个空行隔开。 例如这样

```shell
-----BEGIN CERTIFICATE-----
这是 最终实体证书
------END CERTIFICATE------

-----BEGIN CERTIFICATE-----
这是 中间证书
------END CERTIFICATE------

-----BEGIN CERTIFICATE-----
这是 根证书
------END CERTIFICATE------
```

根证书大多数情况下都会内置在客户端，所以大多数情况下都只需要 最终实体证书 和 中间证书。 有时 中间证书 可能有多个，按照签发顺序排列就好，反正就是下面的证书颁发上面的证书。

有时还需要把私钥和证书合并成一个文件，一般是把私钥放在前面，证书放在后面，例如 这样

```shell
cat server.key server.crt > server.pem
```

### 其它命令

openssl s_time 用于测试 TSL 服务

openssl s_server 用于测试 TSL 客户端，例如浏览器对各个加密套件的支持情况

```shell
openssl s_server -accept 2009 -key rsa_private_key.pem -cert domain.crt -www -debug -msg
# -accept 监听的端口 -key 私钥路径 -crt 证书路径 -www http请求返回状态信息
# 可以用浏览器输测试，直接输入网址 https://127.0.0.1:2009
# 可以用 curl 测试 curl -k -i -v https://127.0.0.1:2009
# 可以用 openssl s_client 测试 openssl s_client -connect 127.0.0.1:2009 -showcerts
```

openssl s_client 用于测试 TSL 服务端

- 可以像 telnet 那用测试端口

    ```shell
      # 测试 example.com 的 80 端口是否有开启
      openssl s_client -connect example.com:80
    ```

- 可以像 telnet 模拟 http 那样，模拟 https

    ```shell
      # 输入这个命令后，会进入一个命令行交互界面，这时快速地输入 GET / HTTP/1.O 然后连续输入两个回车，就能返回网页内容
      openssl s_client -connect www.baidu.com:443 -showcerts
    ```

openssl smime 用于处理S/MIME邮件，它能加密、解密、签名和验证S/MIME消息

openssl ca ca命令是一个小型CA系统。它能签发证书请求和生成CRL。它维护一个已签发证书状态的文本数据库。
