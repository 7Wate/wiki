const https = require('https');

/**
 * 获取一言
 * @param {Object} options - 请求的参数
 * @returns {Promise<string>} 返回一言的句子
 */
async function getHitokoto(options = {}) {
    return new Promise((resolve, reject) => {
        const {
            c,          // 句子类型
            encode = 'json', // 默认使用json格式
            charset,    // 字符集
            callback,   // 调用的异步函数
            select,     // 选择器
            min_length, // 返回句子的最小长度
            max_length  // 返回句子的最大长度
        } = options;

        let url = 'https://v1.hitokoto.cn?';

        if (c) url += `&c=${c}`;
        if (encode) url += `&encode=${encode}`;
        if (charset) url += `&charset=${charset}`;
        if (callback) url += `&callback=${callback}`;
        if (select) url += `&select=${select}`;
        if (min_length) url += `&min_length=${min_length}`;
        if (max_length) url += `&max_length=${max_length}`;

        https.get(url, (resp) => {
            let data = '';

            resp.on('data', (chunk) => {
                data += chunk;
            });

            resp.on('end', () => {
                const result = JSON.parse(data);
                resolve(result.hitokoto);
            });

        }).on("error", (err) => {
            reject("Error: " + err.message);
        });
    });
}

module.exports = getHitokoto;
