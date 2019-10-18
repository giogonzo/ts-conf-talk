import * as React from "react";
import { UsersList } from "./UsersList";
import { CreateUserForm } from "./CreateUserForm";

export const App: React.FunctionComponent = () => (
  <>
    <CreateUserForm />
    <hr />
    <UsersList />
  </>
);
