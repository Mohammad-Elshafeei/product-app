const express = require("express");
const fileUpload = require("express-fileupload");
const bodyParser = require("body-parser");
const mysql = require("mysql");
const path = require("path");
const port = 4000;
const app = express();

app.set("port", process.env.port || port);
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

app.use(express.static(path.join(__dirname, "public")));
app.use(fileUpload());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

const { mainPage } = require("./routes/index");
app.get("/", mainPage);

const { addProductPage, addProduct } = require("./routes/addProduct");
app.get("/add", addProductPage);
app.post("/add", addProduct);

const { editProductPage, editProduct } = require("./routes/editProduct");
app.get("/edit/:id", editProductPage);
app.post("/edit/:id", editProduct);

const { deleteProduct } = require("./routes/deleteProduct");
app.get("/delete/:id", deleteProduct);

const db = mysql.createConnection({
    localhost: "localhost",
    user: "root",
    password: "",
    database: "products"
});
db.connect((err) => {
    if (err) throw err;
    console.log("Connection to DB Successed");
});
global.db = db;

app.listen(port, () => {
    console.log(`Server is running on port: ${port}`);
});