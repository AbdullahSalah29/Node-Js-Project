const express = require("express");
const app = express();

app.use((req,res,next) => {
    res.setHeader("Access-Control-Allow-Origin","*");
    res.setHeader("Access-Control-Allow-Methods","*");
    res.setHeader("Access-Control-Allow-Headers","*");
    next();

});

const productRouter = require("./routes/productRoutes");
const orderRouter = require("./routes/orderRoutes");
const userRouter = require("./routes/userRoutes");
const multerRouter = require("./routes/multer");

app.use(express.json());
app.use("/api/uploads", multerRouter);
app.use("/api/products", productRouter);
app.use("/api/orders", orderRouter);
app.use("/api/users", userRouter);

module.exports = app;
