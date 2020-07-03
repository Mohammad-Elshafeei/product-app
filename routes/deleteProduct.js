module.exports = {
    deleteProduct: (req, res) => {
        let productID = req.params.id;

        let deleteQuery = "DELETE FROM product WHERE productID = '" + productID + "'";
        db.query(deleteQuery, (err) => {
            if (err) return res.status(500).send(err);
            res.redirect("/");
        });
    }
};