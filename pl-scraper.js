const axios = require("axios");
const cheerio = require("cheerio");
const url =
  "https://www.premierleague.com/stats/top/players/goals?se=-1&cl=-1&iso=-1&po=-1?se=-1";
console.log("running");
axios(url)
  .then(response => {
    const html = response.data;
    // console.log(html);
    const $ = cheerio.load(html);
    const statsTable = $(".statsTableContainer > tr");
    const playerTable = [];

    statsTable.each(function(i, element) {
      const rank = $(element)
        .find(".rank > strong")
        .text();
      const playerName = $(element)
        .find(".playerName > strong")
        .text();
      const nationality = $(element)
        .find(".playerCountry")
        .text();
      const goals = $(element)
        .find(".mainStat")
        .text();
      playerTable.push({ rank, playerName, nationality, goals });
    });
    console.log(playerTable);
  })
  .catch(console.error);
