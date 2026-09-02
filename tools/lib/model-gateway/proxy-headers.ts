const STRIPPED_REQUEST_HEADERS = new Set([
  "connection",
  "keep-alive",
  "proxy-authenticate",
  "proxy-authorization",
  "te",
  "trailers",
  "transfer-encoding",
  "upgrade",
  "authorization",
  "host",
  "content-length",
])

const STRIPPED_RESPONSE_HEADERS = new Set([
  "connection",
  "keep-alive",
  "proxy-authenticate",
  "te",
  "trailers",
  "transfer-encoding",
  "upgrade",
  "content-encoding",
  "content-length",
])

export function copyRequestHeaders(req: Request): Headers {
  const out = new Headers()
  req.headers.forEach((v, k) => {
    if (!STRIPPED_REQUEST_HEADERS.has(k.toLowerCase())) out.set(k, v)
  })
  return out
}

// A RESPONSE'S HEADERS ARE APPENDED RATHER THAN SET. `forEach` yields every other repeated header
// once, already joined, but it yields `set-cookie` once per cookie. Setting each one overwrites the
// last, so a response carrying two cookies reached the client carrying one.
export function copyResponseHeaders(res: Response): Headers {
  const out = new Headers()
  res.headers.forEach((v, k) => {
    if (!STRIPPED_RESPONSE_HEADERS.has(k.toLowerCase())) out.append(k, v)
  })
  return out
}
