const express = require('express');
const connectDB = require('./config/db.config');
const userTypeRouter = require('./routers/userType.router');
const userRouter = require('./routers/user.router');
const productRouter = require('./routers/product.router');
const cors = require('cors');

const port = 3000;
const app = express();

app.use(cors({ origin: 'http://localhost:4200' }));
app.use(express.json());

connectDB();

app.use('/image', express.static('./images'));
app.use('/userType',userTypeRouter);
app.use('/user',userRouter);
app.use('/product',productRouter);

app.listen(port, ()=> console.log(`server started at port: ${port}`));