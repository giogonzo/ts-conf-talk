type Fetch<I, O> = (input: I) => Promise<O>;

export function fetchAPIEndpoint<I, O>(url: string): Fetch<I, O> {
  return input =>
    window
      .fetch(url, {
        method: "POST",
        headers: [["Content-Type", "application/json"]],
        body: JSON.stringify(input)
      })
      .then(res => {
        if (res.status !== 200) {
          throw res;
        }
        return res;
      })
      .then(res => res.json());
}
