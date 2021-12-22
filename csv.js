const createCsvWriter = require("csv-writer").createObjectCsvWriter;

const writeToCSV = async (data) => {
  const csvWriter = createCsvWriter({
    path: "out.csv",
    header: [
      { id: "ticker", title: "Ticker" },
      { id: "address", title: "Address" },
      { id: "balance", title: "Balance" },
      { id: "total_supply", title: "Total Supply" },
      { id: "address_type", title: "Account type" },
    ],
    append: true,
  });
  csvWriter
    .writeRecords(data)
    .then(() => console.log("The CSV file was written successfully"));
};

module.exports = { writeToCSV };
