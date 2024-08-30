const https = require('https');

/**
 * 获取今日诗词并格式化输出
 * @returns {Promise<string>} 返回格式化后的诗词
 */
async function getTodayPoetry() {
    return new Promise((resolve, reject) => {
        const url = 'https://v2.jinrishici.com/one.json';

        https.get(url, (resp) => {
            let data = '';

            resp.on('data', (chunk) => {
                data += chunk;
            });

            resp.on('end', () => {
                const result = JSON.parse(data);
                if (result.status === "success") {
                    const poetryContent = result.data.content;
                    const author = result.data.origin.author;
                    const dynasty = result.data.origin.dynasty;
                    const formattedPoetry = `${poetryContent}——${author}（${dynasty}）`;
                    resolve(formattedPoetry);
                } else {
                    reject("Failed to fetch poetry");
                }
            });

        }).on("error", (err) => {
            reject("Error: " + err.message);
        });
    });
}

module.exports = getTodayPoetry;
