import { CreateUserPayload, User } from "../shared/api";
import { v4 } from "uuid";

const usersDB = new Map<User["id"], CreateUserPayload>();

export function usersDBInsert(
  createUser: CreateUserPayload
): Promise<User["id"]> {
  const id = v4();
  const user = { id, ...createUser };
  usersDB.set(id, user);
  return Promise.resolve(id);
}

export function usersDBList(limit: number): Promise<Array<User>> {
  return Promise.resolve(
    Array.from(usersDB.entries())
      .map(([id, user]) => ({ ...user, id }))
      .slice(0, limit)
  );
}
