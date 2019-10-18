import { Application, json } from "express";

type Controller<I, O> = (input: I) => Promise<O>;

export function addEndpointToExpress<I, O>(
  app: Application,
  path: string,
  controller: Controller<I, O>
): void {
  app.post(path, json({ strict: false }), (req, res) => {
    controller(req.body).then(
      output => res.status(200).json(output),
      () => res.status(500).end()
    );
  });
}
