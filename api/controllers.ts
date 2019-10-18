import { CreateUserPayload, User } from "../shared/api";
import { usersDBInsert, usersDBList } from "./db";

export function createUser(user: CreateUserPayload): Promise<User["id"]> {
  return delay().then(() => usersDBInsert(user));
}

export function listUsers(limit: number): Promise<Array<User>> {
  return delay().then(() => usersDBList(limit));
}

// A synthetic 1s delay so that we'll be able to see some loader in the UI
function delay(): Promise<void> {
  return new Promise(resolve => setTimeout(resolve, 1000));
}
