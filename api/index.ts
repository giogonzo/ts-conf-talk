import * as express from "express";
import * as cors from "cors";
import * as controllers from "./controllers";
import { addEndpointToExpress } from "./express";

const app = express();

app.use(cors());

addEndpointToExpress(app, "/createUser", controllers.createUser);
addEndpointToExpress(app, "/listUsers", controllers.listUsers);

app.listen(3456);
