import * as t from "io-ts";
import { isLeft } from "fp-ts/lib/Either";

type Fetch<I, O> = (input: I) => Promise<O>;

export function fetchAPIEndpoint<I, O>(
  url: string,
  inputCodec: t.Type<I, unknown>,
  outputCodec: t.Type<O, unknown>
): Fetch<I, O> {
  return input =>
    window
      .fetch(url, {
        method: "POST",
        headers: [["Content-Type", "application/json"]],
        body: JSON.stringify(inputCodec.encode(input))
      })
      .then(res => {
        if (res.status !== 200) {
          throw res;
        }
        return res;
      })
      .then(res => res.json())
      .then(json => {
        const decodedOutput = outputCodec.decode(json);
        return isLeft(decodedOutput)
          ? Promise.reject(decodedOutput.left)
          : Promise.resolve(decodedOutput.right);
      });
}
