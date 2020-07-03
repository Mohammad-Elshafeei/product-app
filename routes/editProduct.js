module.exports = {
    editProductPage: (req, res) => {
        let productID = req.params.id;
        let selectQuery = "SELECT * FROM product WHERE productID = '" + productID + "'";
        db.query(selectQuery, (err, result) => {
            if (err) return res.status(500).send(err);
            res.render("edit_product.ejs", {
                title: "Products Management App | Edit Product",
                product: result[0]
            });
        });
    },
    editProduct: (req, res) => {
        let message = "";

        let productID = req.params.id;

        let title = req.body.title;
        let category = req.body.category;
        let quantity = req.body.quantity;
        let price = req.body.price;
        let image = req.files.image;
        let description = req.body.description;

        let updateQuery = "UPDATE product SET title = '" + title + "', quantity = '" + quantity + "', price = '" + price + "', category = '" + category + "', image = '" + image.name + "', description = '" + description + "' WHERE productID = '" + productID + "'";
        db.query(updateQuery, (err, result) => {
            if (err) return res.status(500).send(err);
            message = "Product " + productID + " Updated Successfully";
            let fileExtention = image.name.split(".")[1];
            let imageName = productID + "." + fileExtention;
            if (image.mimetype == "image/jpg" || image.mimetype == "image/png" || image.mimetype == "image/jif" || image.mimetype == "image/jpeg") {
                image.mv("public/assets/images/" + imageName, (err) => {
                    if (err) return res.status(500).send(err);
                    message = "Product " + productID + " Edited Successfully";
                });
                res.redirect("/");
            } else {
                message = "Invalid Image Format";
                res.render("edit_product.ejs", {
                    title: "Products Management App | Edit Product",
                    message: message
                });
            }
        });
    }
};