import * as React from "react";
import { apiClient } from "./client";
import { User } from "../shared/api";
import * as RD from "@devexperts/remote-data-ts";
import { pipe } from "fp-ts/lib/pipeable";

type UsersFetchStatus = RD.RemoteData<unknown, Array<User>>;

function renderUsers(status: UsersFetchStatus): JSX.Element {
  return pipe(
    status,
    RD.fold(
      () => <></>,
      () => <div>loading...</div>,
      () => <div>something went wrong</div>,
      users => (
        <ul>
          {users.map(user => (
            <li key={user.id}>
              {user.name} born on {user.birthDate}
            </li>
          ))}
        </ul>
      )
    )
  );
}

export const UsersList: React.FunctionComponent = () => {
  const [usersFetchStatus, setUsersFetchStatus] = React.useState<
    UsersFetchStatus
  >(RD.initial);
  const [refreshCount, setRefreshCount] = React.useState(0);

  React.useEffect(() => {
    setUsersFetchStatus(RD.pending);
    apiClient
      .listUsers(3)
      .then(
        users => setUsersFetchStatus(RD.success(users)),
        err => setUsersFetchStatus(RD.failure(err))
      );
  }, [refreshCount]);

  return (
    <>
      <input
        value="Refresh"
        type="button"
        onClick={() => setRefreshCount(c => c + 1)}
      />
      {renderUsers(usersFetchStatus)}
    </>
  );
};
