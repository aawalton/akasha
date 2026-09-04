import { computeFingerprint } from "@akasha/errors-core/error-fingerprint"
import { ErrorReportSchema } from "@akasha/errors-core/error-report"
import { captureError, type ErrorCapturePayload } from "@akasha/pages-access/capture-error"
import type { Route } from "./+types/api.errors"

export async function action({ request }: Route.ActionArgs): Promise<Response> {
  if (request.method !== "POST") {
    return Response.json({ error: "method-not-allowed" }, { status: 405 })
  }

  let rawBody: unknown
  try {
    rawBody = await request.json()
  } catch {
    return Response.json({ error: "invalid-json" }, { status: 400 })
  }

  const parsed = ErrorReportSchema.safeParse(rawBody)
  if (!parsed.success) {
    return Response.json({ error: "invalid-payload" }, { status: 400 })
  }

  const fingerprint = computeFingerprint(parsed.data)
  const payload: ErrorCapturePayload = {
    ...parsed.data,
    fingerprint,
    releaseSha: parsed.data.releaseSha ?? undefined,
  }

  try {
    await captureError(payload)
  } catch (thrown) {
    console.error(`api/errors: ${thrown instanceof Error ? thrown.message : String(thrown)}`)
    return Response.json({ error: "capture-failed" }, { status: 500 })
  }

  return new Response(null, { status: 204 })
}
