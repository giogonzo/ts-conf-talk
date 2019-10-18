import { fetchAPIEndpoint } from "./fetch";
import { User, CreateUserPayload } from "../shared/api";

export const apiClient = {
  listUsers: fetchAPIEndpoint<number, Array<User>>(
    "http://localhost:3456/listUsers"
  ),
  createUser: fetchAPIEndpoint<CreateUserPayload, User["id"]>(
    "http://localhost:3456/createUser"
  )
};
