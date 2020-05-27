const express = require("express");
const user = require("./routers/user");
const image = require("./routers/image");

const app = express();

const jsonParser = express.json();

app.use(jsonParser);

app.use("/users", user);
app.use("/images", image);

const port = 4000;

app.listen(port, () => console.log(`Listening on :${port}`));
