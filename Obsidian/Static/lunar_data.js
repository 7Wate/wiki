const https = require("https");

/**
 * 获取并格式化当前日期的农历信息。
 * @returns {Promise<string>} 返回格式化后的农历信息。
 */
async function getLunarDate() {
  return new Promise((resolve, reject) => {
    const url = "https://api.timelessq.com/time";

    https
      .get(url, (resp) => {
        let data = "";

        resp.on("data", (chunk) => {
          data += chunk;
        });

        resp.on("end", () => {
          const result = JSON.parse(data);
          if (result.errno === 0) {
            const lunar = result.data.lunar;
            const formattedLunarDate = `${lunar.cyclicalYear}${lunar.zodiac}年 ${lunar.cyclicalMonth}月 ${lunar.cyclicalDay}日 农历${lunar.cnMonth}${lunar.cnDay}`;
            resolve(formattedLunarDate);
          } else {
            reject("Failed to fetch lunar date");
          }
        });
      })
      .on("error", (err) => {
        reject("Error: " + err.message);
      });
  });
}

module.exports = getLunarDate;
