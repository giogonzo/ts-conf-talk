import { Application, json } from "express";
import * as t from "io-ts";
import { isLeft } from "fp-ts/lib/Either";
import { failure } from "io-ts/lib/PathReporter";

type Controller<I, O> = (input: I) => Promise<O>;

export function addEndpointToExpress<I, O>(
  app: Application,
  path: string,
  inputCodec: t.Type<I, unknown>,
  outputCodec: t.Type<O, unknown>,
  controller: Controller<I, O>
): void {
  app.post(path, json({ strict: false }), (req, res) => {
    const decodedInput = inputCodec.decode(req.body);
    if (isLeft(decodedInput)) {
      res.status(422).send(failure(decodedInput.left).join("\n"));
    } else {
      controller(decodedInput.right).then(
        output => res.status(200).json(outputCodec.encode(output)),
        () => res.status(500).end()
      );
    }
  });
}
