import * as express from "express";
import * as cors from "cors";
import * as controllers from "./controllers";
import { addEndpointToExpress } from "./express";
import { api } from "../shared/api";

const app = express();

app.use(cors());

addEndpointToExpress(app, api.createUser, controllers.createUser);
addEndpointToExpress(app, api.listUsers, controllers.listUsers);

app.listen(3456);
