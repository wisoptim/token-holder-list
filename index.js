require("dotenv").config();
const path = require("path");

const { getHolderList } = require("./api_calls");
const { writeToCSV } = require("./csv");
const { getAddressType } = require("./contract");

function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

const job = async () => {
  let balances = [];
  let length = 0;
  let page_number = 0;
  do {
    const result = await getHolderList(page_number);
    page_number++;
    length = result.data.items.length;
    console.log(page_number, length);

    for (const holder of result.data.items) {
      const type = await getAddressType(holder.address);
      console.log(holder.address, type);
      balances.push({
        ticker: holder.contract_ticker_symbol,
        address: holder.address,
        balance: holder.balance,
        total_supply: holder.total_supply,
        address_type: type,
      });
      await sleep(500);
    }

    await writeToCSV(balances);
    balances = [];
    if (page_number > 1) break;
  } while (length > 0);
};

(async function () {
  await job();
})();
