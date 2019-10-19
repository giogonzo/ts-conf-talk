import { getClient } from "./fetch";
import { api } from "../shared/api";

export const apiClient = getClient(api, "http://localhost:3456");
