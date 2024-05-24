const app = require("./app");
const connectDb = require("./config/db");

connectDb();

app.listen(7008, () => {
  console.log("Server is ruuning on port 7008!");
});

