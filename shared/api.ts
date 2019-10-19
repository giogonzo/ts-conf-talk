import * as t from "io-ts";
import { DateFromISOString } from "io-ts-types/lib/DateFromISOString";
import { Endpoint } from "./dsl";

// domain definition

export const CreateUserPayload = t.type(
  { name: t.string, birthDate: DateFromISOString },
  "CreateUserPayload"
);
export type CreateUserPayload = t.TypeOf<typeof CreateUserPayload>;

export const User = t.type(
  { id: t.string, name: t.string, birthDate: DateFromISOString },
  "User"
);
export type User = t.TypeOf<typeof User>;

// API definition

/**
 * Our API is described by a set of endpoints.
 * To represent the set we are using a labeled product type in
 * order to be able to be exhaustive (is our service implementing
 * all the defined API endpoints?)
 */
export const api = {
  listUsers: Endpoint("/listUsers", t.number, t.array(User)),
  createUser: Endpoint("/createUser", CreateUserPayload, User.props.id)
};
