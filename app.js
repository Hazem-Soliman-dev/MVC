const express = require("express");
const connectDB = require("./config/db.config");
const cors = require("cors");
const { config } = require("dotenv");

const userRouter = require("./routers/user.router");
const userTypeRouter = require("./routers/userType.router");
const productRouter = require("./routers/product.router");
const categoryRouter = require("./routers/catygory.route");
const orderRouter = require("./routers/order.route");

config();
connectDB();

const port = process.env.PORT || 3000;
const app = express();

app.use(cors({ origin: "http://localhost:4200" }));
app.use(express.json());


app.use("/images", express.static("./images"));
app.use("/userType", userTypeRouter);
app.use("/user", userRouter);
app.use("/product", productRouter);
app.use("/category", categoryRouter);
app.use("/order", orderRouter);
app.use("*", (req, res) =>
  res.status(404).json({ message: "Route not found" })
);
app.use((err, req, res, next) => {
  if (err) {
    console.error(err);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

app.listen(port, () => console.log(`server started at port: ${port}`));
