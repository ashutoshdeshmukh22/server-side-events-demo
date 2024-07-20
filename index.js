const express = require("express");
const cors = require("cors");
const app = express();
const PORT = 3000;

app.use(cors());

app.get("/stocks", (req, res) => {
  res.setHeader("Content-Type", "text/event-stream");
  res.setHeader("Cache-Control", "no-cache");
  res.setHeader("Connection", "keep-alive");

  // Simulation
  const sendStockUpdate = () => {
    const stockUpdate = {
      symbol: "AAPL",
      price: Math.random() * 1000,
    };
    res.write(`data: ${JSON.stringify(stockUpdate)}\n\n`);
  };

  const intervalId = setInterval(sendStockUpdate, 1000);

  req.on("close", () => {
    clearInterval(intervalId);
    res.end();
  });
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
