module.exports = {
    mainPage: (req, res) => {
        let selectQuery = "SELECT * FROM product ORDER BY productID ASC";
        db.query(selectQuery, (err, result) => {
            if (err) return res.status(500).send(err);
            res.render("index.ejs", {
                title: "Products Management App | View Products",
                products: result
            });
        });
    }
};