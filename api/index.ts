import * as express from "express";
import * as cors from "cors";
import * as controllers from "./controllers";
import { addEndpointToExpress } from "./express";
import { CreateUserPayload, User } from "../shared/api";
import * as t from "io-ts";

const app = express();

app.use(cors());

addEndpointToExpress(
  app,
  "/createUser",
  CreateUserPayload,
  User.props.id,
  controllers.createUser
);
addEndpointToExpress(
  app,
  "/listUsers",
  t.number,
  t.array(User),
  controllers.listUsers
);

app.listen(3456);
