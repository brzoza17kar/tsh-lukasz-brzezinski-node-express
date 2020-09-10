import express, { Application } from "express";
import "dotenv/config";
import bodyParser from "body-parser";
import routes from "./routes";

const app: Application = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const PORT = process.env.PORT;

routes({ app });

app.listen(PORT, () => {
    console.log(`server is running on PORT ${PORT}`)
});