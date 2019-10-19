import * as express from "express";
import * as cors from "cors";
import * as controllers from "./controllers";
import { addAPIToExpress } from "./express";
import { api } from "../shared/api";

const app = express();

app.use(cors());

addAPIToExpress(app, api, controllers);

app.listen(3456);
