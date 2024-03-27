import express from "express";
import deliveryCostRouter from "./routers/DeliveryCostRouter.js";
import GlobalErrorHandler from "./middlewares/GlobalErrorHandler.js";
import cors from "cors";
import dotenv from "dotenv";
import bodyParser from "body-parser";

const port = process.env.PORT || 3000;
const app = express();

dotenv.config();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());

app.use("/api/v1", deliveryCostRouter);
app.use(GlobalErrorHandler);

app.listen(port, () => console.log(`Listening on port ${port}`));
