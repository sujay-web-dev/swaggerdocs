const express = require("express");

const app = express();
const swaggerUi = require("swagger-ui-express");
const YAML = require("yamljs");
const swaggerDocument = YAML.load("./swagger.yaml");

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.get("/", (req, res) => {
  res.send("Hello its HOME PAGE");
});

app.listen(4000, () => {
  console.log(`Server is running at PORT 4000...`);
});
