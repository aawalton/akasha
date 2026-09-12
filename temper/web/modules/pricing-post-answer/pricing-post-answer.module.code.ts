import { validateWatcherToken } from "akasha/temper/watcher/watcher-token-check/watcher-token-check.module.code.ts"

export async function answerPricingPost(
  request: Request,
  isRequestBody: (value: unknown) => value is { wtToken: string }
): Promise<Response> {
  let body: unknown
  try {
    body = await request.json()
  } catch {
    return Response.json({ error: "Invalid JSON body" }, { status: 400 })
  }

  if (!isRequestBody(body)) {
    return Response.json({ error: "Malformed request body" }, { status: 400 })
  }

  const validated = await validateWatcherToken(body.wtToken)
  if (!validated) {
    return Response.json({ error: "Invalid or expired watcher token" }, { status: 401 })
  }

  return Response.json({ error: "pricing-pipeline-retired" }, { status: 410 })
}
