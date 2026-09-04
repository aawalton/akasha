import { isRecord } from "@akasha/utils-narrow/is-record"
import { validateWatcherToken } from "../watcher-token-check/watcher-token-check.module.code.ts"
import type { Route } from "./+types/api.watcher.upsert-pricing-extract"

type RequestBody = {
  wtToken: string
  platform: string
  server: string
  priceType: string
  data: unknown
}

function isRequestBody(v: unknown): v is RequestBody {
  if (!isRecord(v)) return false
  return (
    typeof v.wtToken === "string" &&
    v.wtToken.length > 0 &&
    typeof v.platform === "string" &&
    v.platform.length > 0 &&
    typeof v.server === "string" &&
    v.server.length > 0 &&
    typeof v.priceType === "string" &&
    v.priceType.length > 0 &&
    "data" in v
  )
}

export async function action({ request }: Route.ActionArgs): Promise<Response> {
  let body: unknown
  try {
    body = await request.json()
  } catch {
    return Response.json({ error: "Invalid JSON body" }, { status: 400 })
  }

  if (!isRequestBody(body)) {
    return Response.json({ error: "Malformed request body" }, { status: 400 })
  }

  const { wtToken } = body
  const validated = await validateWatcherToken(wtToken)
  if (!validated) {
    return Response.json({ error: "Invalid or expired watcher token" }, { status: 401 })
  }

  return Response.json({ error: "pricing-pipeline-retired" }, { status: 410 })
}
