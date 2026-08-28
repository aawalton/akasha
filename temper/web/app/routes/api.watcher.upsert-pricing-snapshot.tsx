import { isRecord } from "@shared/utils-narrow/is-record"
import { validateWatcherToken } from "@/lib/watcher-auth"
import type { Route } from "./+types/api.watcher.upsert-pricing-snapshot"

type RequestBody = {
  wtToken: string
  platform: string
  server: string
  dataTimestamp: number
  chunks: readonly unknown[]
  chunkCount: number
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
    typeof v.dataTimestamp === "number" &&
    Number.isFinite(v.dataTimestamp) &&
    Array.isArray(v.chunks) &&
    typeof v.chunkCount === "number"
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
