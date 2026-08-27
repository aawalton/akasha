import { AnthropicErrorEnvelopeSchema } from "../oauth-schemas.ts"

export type PermissionDeniedClassification = { matched: false } | { matched: true; reason: string }

export function isPermissionDenied(status: number, body: string): boolean {
  return classifyPermissionDenied(status, body).matched
}

export function classifyPermissionDenied(
  status: number,
  body: string
): PermissionDeniedClassification {
  if (status !== 403) return { matched: false }
  let parsed: ReturnType<typeof AnthropicErrorEnvelopeSchema.safeParse>
  try {
    parsed = AnthropicErrorEnvelopeSchema.safeParse(JSON.parse(body))
  } catch {
    return { matched: false }
  }
  if (!parsed.success) return { matched: false }
  if (parsed.data.error.type !== "permission_error") return { matched: false }
  const reason = parsed.data.error.message ?? "permission_error"
  return { matched: true, reason }
}
