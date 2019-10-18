// domain definition

export type CreateUserPayload = {
  name: string;
  birthDate: string;
};

export type User = {
  id: string;
  name: string;
  birthDate: string;
};
