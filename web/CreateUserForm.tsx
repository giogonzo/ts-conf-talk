import * as React from "react";
import * as RD from "@devexperts/remote-data-ts";
import { pipe } from "fp-ts/lib/pipeable";
import { User } from "../shared/api";
import { apiClient } from "./client";
import { isRight } from "fp-ts/lib/Either";

type UserCreateStatus = RD.RemoteData<unknown, User["id"]>;

function renderUserCreateStatus(status: UserCreateStatus): string {
  return pipe(
    status,
    RD.fold(
      () => "",
      () => "loading...",
      err => `something went wrong: ${err}`,
      userId => `created user with id ${userId}`
    )
  );
}

export const CreateUserForm: React.FunctionComponent = () => {
  const [name, setName] = React.useState("");
  const [birthDate, setBirthDate] = React.useState("");
  const [submitStatus, setSubmitStatus] = React.useState<UserCreateStatus>(
    RD.initial
  );

  function onSubmit(e: React.FormEvent<HTMLFormElement>): void {
    e.preventDefault();
    const decodedBirthDate = User.props.birthDate.decode(birthDate);
    if (isRight(decodedBirthDate)) {
      setSubmitStatus(RD.pending);
      apiClient
        .createUser({ name, birthDate: decodedBirthDate.right })
        .then(
          userId => setSubmitStatus(RD.success(userId)),
          err => setSubmitStatus(RD.failure(err))
        );
    } else {
      setSubmitStatus(RD.failure("invalid date provided"));
    }
  }

  return (
    <>
      <form onSubmit={onSubmit}>
        <input
          placeholder="Name"
          type="text"
          value={name}
          onChange={e => setName(e.target.value)}
        />
        <input
          placeholder="Birth Date"
          type="text"
          value={birthDate}
          onChange={e => setBirthDate(e.target.value)}
        />
        <input type="submit" value="Create" />
      </form>
      <pre>{renderUserCreateStatus(submitStatus)}</pre>
    </>
  );
};
