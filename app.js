const express = require("express");
const connectDB = require("./config/db.config");
const cors = require("cors");

const userRouter = require("./routers/user.router");
const userTypeRouter = require("./routers/userType.router");
const productRouter = require("./routers/product.router");
const categoryRouter = require("./routers/catygory.route");
const orderRouter = require("./routers/order.route");

const port = 3001;
const app = express();

app.use(cors({ origin: "http://localhost:4200" }));
app.use(express.json());

connectDB();

app.use("/images", express.static("./images"));
app.use("/userType", userTypeRouter);
app.use("/user", userRouter);
app.use("/product", productRouter);
app.use("/category", categoryRouter);
app.use("/order", orderRouter);

app.listen(port, () => console.log(`server started at port: ${port}`));
