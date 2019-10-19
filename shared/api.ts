import * as t from "io-ts";
import { DateFromISOString } from "io-ts-types/lib/DateFromISOString";

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
