module.exports = {
    addProductPage: (req, res) => {
        res.render("add_product.ejs", {
            title: "Products Management App | Add Product"
        });
    },
    addProduct: (req, res) => {
        if (!req.files) return res.status(400).send("No Product's Image Were Found.");

        let message = "";

        let title = req.body.title;
        let category = req.body.category;
        let quantity = req.body.quantity;
        let price = req.body.price;
        let image = req.files.image;
        let description = req.body.description;

        let insertQuery = "INSERT INTO product(productID, title, quantity, price, category, image, description) VALUES(NULL, '" + title + "', '" + quantity + "', '" + price + "', '" + category + "', '" + image.name + "', '" + description + "')";
        db.query(insertQuery, (err, result) => {
            if (err) return res.status(500).send(err);
            message = "Product " + result.insertId + " Added Successfully";
            let fileExtention = image.name.split(".")[1];
            let imageName = result.insertId + "." + fileExtention;
            if (image.mimetype == "image/jpg" || image.mimetype == "image/png" || image.mimetype == "image/jif" || image.mimetype == "image/jpeg") {
                image.mv("public/assets/images/" + imageName, (err) => {
                    if (err) return res.status(500).send(err);
                });
                res.redirect("/");
            } else {
                message = "Invalid Image Format";
                res.render("add_product.ejs", {
                    title: "Products Management App | Add Product",
                    message: message
                });
            }
        });
    }
};