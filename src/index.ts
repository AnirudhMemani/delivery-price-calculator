import express from "express";
import deliveryCostRouter from "./routers/DeliveryCostRouter.js";
import GlobalErrorHandler from "./middlewares/GlobalErrorHandler.js";
import dotenv from "dotenv";

dotenv.config();
const app = express();
const port = process.env.PORT || 3000;

app.use("/api/v1", deliveryCostRouter);
app.use(GlobalErrorHandler);

app.listen(port, () => console.log(`Listening on port ${port}`));
