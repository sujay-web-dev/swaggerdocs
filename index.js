const express = require("express");

const app = express();
const swaggerUi = require("swagger-ui-express");
const YAML = require("yamljs");
const swaggerDocument = YAML.load("./swagger.yaml");
const fileUpload = require("express-fileupload");

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.use(express.json());

let courses = [
  {
    id: "11",
    name: "React Js",
    price: 199,
  },
  {
    id: "22",
    name: "Angular Js",
    price: 299,
  },
  {
    id: "33",
    name: "Django",
    price: 399,
  },
];

app.get("/", (req, res) => {
  res.send("Hello its HOME PAGE");
});

app.get("/api/v1/web3", (req, res) => {
  res.send("Hello its web3 PAGE");
});

app.get("/api/v1/web3oject", (req, res) => {
  res.send({ id: "55", name: "Web 3 & Blockchain", price: 1000 });
});

app.get("/api/v1/courses", (req, res) => {
  res.send(courses);
});

app.get("/api/v1/mycourses/:courseId", (req, res) => {
  const myCourse = courses.find((e) => e.id == req.params.courseId);
  res.send(myCourse);
});

app.post("/api/v1/addCourse", (req, res) => {
  console.log("req.body", req.body);
  courses.push(req.body);
  res.send(true);
});

app.get("/api/v1/coursequery", (req, res) => {
  let location = req.query.location;
  let device = req.query.device;

  res.send({ location, device });
});

app.post("/api/v1/courseupload", (req, res) => {
  const file = req.files.file;
  let path = __dirname + "/images/" + Date.now() + ".jpg";

  file.mv(path, (err) => {
    res.send(true);
  });
});

app.listen(4000, () => {
  console.log(`Server is running at PORT 4000...`);
});
