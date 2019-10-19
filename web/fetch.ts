import * as t from "io-ts";
import { isLeft } from "fp-ts/lib/Either";
import { Endpoint } from "../shared/dsl";
import { record } from "fp-ts/lib/Record";

/**
 * A function that can be used to "derive" (at runtime, but in a type-safe way)
 * a functioning client for our API definition
 * @param api The API definition in terms of `Endpoint`s
 * @param baseURL How to reach the HTTP server
 */
export function getClient<A extends Record<string, Endpoint<any, any>>>(
  api: A,
  baseURL: string
): {
  [K in keyof A]: Fetch<t.TypeOf<A[K]["input"]>, t.TypeOf<A[K]["output"]>>;
} {
  return record.map(api, endpoint =>
    fetchAPIEndpoint(
      `${baseURL}${endpoint.path}`,
      endpoint.input,
      endpoint.output
    )
  ) as any;
}

type Fetch<I, O> = (input: I) => Promise<O>;

function fetchAPIEndpoint<I, O>(
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
