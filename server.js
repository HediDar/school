//import app.js file

const app = require("./backend/app");

// app is listening on port 3000
app.listen(3000, () => {
  console.log("app is listening on port 3000....");
});
