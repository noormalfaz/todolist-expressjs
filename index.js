const express = require("express");
const cors = require("cors");
const app = express();
const PORT = 3000;
const routes = require("./routes");

app.use(cors({ credentials: true, origin: PORT }));
app.use(express.json())
app.use(routes)

app.listen(PORT, () => {
  console.log("Server running on port : " + PORT);
});