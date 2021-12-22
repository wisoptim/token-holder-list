const https = require("https");
const axios = require("axios");

const getHolderList = async (page) => {
  let toReturn = {};
  await axios
    .get(
      `https://api.covalenthq.com/v1/1/tokens/${process.env.CONTRACT_ADDRESS}/token_holders/?key=${process.env.COVALENTH_KEY}&page-number=${page}`
    )
    .then((res) => {
      console.log(`statusCode: ${res.status}`);
      toReturn = res.data;
    })
    .catch((error) => {
      console.error(error);
    });
  return toReturn;
};

module.exports = { getHolderList };
