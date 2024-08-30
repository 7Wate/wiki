const https = require('https');

/**
 * 获取指定城市的天气信息
 * @param {string} city - 城市名
 * @param {string} params - wttr.in的查询参数
 * @returns {Promise<string>} 天气信息
 */
function getWeather(city = 'Shanghai', params = 'format=3') {
    return new Promise((resolve, reject) => {
        const timeout = setTimeout(() => {
            reject(new Error('Request timed out'));
        }, 15000);  // 设置15秒的请求超时

        https.get(`https://wttr.in/${encodeURIComponent(city)}?${params}`, (resp) => {
            let data = '';

            // A chunk of data has been received.
            resp.on('data', (chunk) => {
                data += chunk;
            });

            // The whole response has been received. Print out the result.
            resp.on('end', () => {
                clearTimeout(timeout);  // 清除超时
                resolve(data);
            });

        }).on("error", (err) => {
            clearTimeout(timeout);  // 清除超时
            reject("Error: " + err.message);
        });
    });
}

module.exports = getWeather;
