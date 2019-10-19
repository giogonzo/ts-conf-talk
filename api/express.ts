import { Application, json } from "express";
import { Endpoint } from "../shared/dsl";
import { isLeft } from "fp-ts/lib/Either";
import { failure } from "io-ts/lib/PathReporter";

type Controller<I, O> = (input: I) => Promise<O>;

export function addEndpointToExpress<I, O>(
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
