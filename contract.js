const Web3 = require("web3");
const rpcURL = `https://mainnet.infura.io/v3/${process.env.INFURA_KEY}`;
const web3 = new Web3(rpcURL);

const getAddressType = async (address) => {
  let type = "";
  await web3.eth.getCode(address, function (error, result) {
    if (error) {
      console.log(error);
      return;
    }
    if (result === "0x") type = "wallet";
    else type = "contract";
  });
  return type;
};
module.exports = { getAddressType };
