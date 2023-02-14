// dependencies
const express = require("express");
const api = require("./routes/apiRoutes");
const pages = require("./routes/pageRoutes");

const app = express();
const PORT = process.env.PORT || 3001;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static("public"));

// api routes need to be defined before html routes so that the wildcard '*' doesn't catch everything improperly, thanks Samantha
app.use("/api", api);
app.use("/", pages);

app.listen(PORT, () =>
  console.log(`App listening at http://localhost:${PORT} 🚀`)
);