import * as t from "io-ts";

/**
 * Represents an endpoint of our API
 */
export interface Endpoint<I, O> {
  path: string;
  input: t.Type<I, unknown>;
  output: t.Type<O, unknown>;
}

/**
 * Constructor function for an endpoint
 * @param path The absolute path the enpoint can be reached at
 * @param input An io-ts codec representing the type of the expected input
 * @param output An io-ts codec representing the type of the expected output
 */
export function Endpoint<I, O>(
  path: string,
  input: t.Type<I, unknown>,
  output: t.Type<O, unknown>
): Endpoint<I, O> {
  return { path, input, output };
}
