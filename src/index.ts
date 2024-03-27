import express from "express";
import "../initializeDatabase.js";

const app = express();
const port = process.env.PORT || 3000;

app.listen(port, () => console.log(`Listening on port ${port}`));
