import { Application, json } from "express";
import { Endpoint } from "../shared/dsl";
import { isLeft } from "fp-ts/lib/Either";
import { failure } from "io-ts/lib/PathReporter";
import * as t from "io-ts";
import { record } from "fp-ts/lib/Record";

/**
 * Implement the defined `api` with `implementations`, and expose the routes as POST Express handlers
 * @param app An express() application
 * @param api The API definition
 * @param implementations A bag of API implementations - must match the definition
 */
export function addAPIToExpress<A extends Record<string, Endpoint<any, any>>>(
  app: Application,
  api: A,
  implementations: {
    [K in keyof A]: Controller<
      t.TypeOf<A[K]["input"]>,
      t.TypeOf<A[K]["output"]>
    >;
  }
): void {
  record.mapWithIndex(api, (k, endpoint) => {
    addEndpointToExpress(app, endpoint, implementations[k]);
  });
}

type Controller<I, O> = (input: I) => Promise<O>;

function addEndpointToExpress<I, O>(
  app: Application,
  endpoint: Endpoint<I, O>,
  controller: Controller<I, O>
): void {
  app.post(endpoint.path, json({ strict: false }), (req, res) => {
    const decodedInput = endpoint.input.decode(req.body);
    if (isLeft(decodedInput)) {
      res.status(422).send(failure(decodedInput.left).join("\n"));
    } else {
      controller(decodedInput.right).then(
        output => res.status(200).json(endpoint.output.encode(output)),
        () => res.status(500).end()
      );
    }
  });
}
