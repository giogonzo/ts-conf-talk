import { fetchAPIEndpoint } from "./fetch";
import { User, CreateUserPayload } from "../shared/api";
import * as t from "io-ts";

export const apiClient = {
  listUsers: fetchAPIEndpoint(
    "http://localhost:3456/listUsers",
    t.number,
    t.array(User)
  ),
  createUser: fetchAPIEndpoint(
    "http://localhost:3456/createUser",
    CreateUserPayload,
    User.props.id
  )
};
