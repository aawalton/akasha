
import { AnthropicErrorEnvelopeSchema } from "../oauth-schemas.ts"

export type ModelUnavailableClassification = { matched: false } | { matched: true; reason: string }

export function isModelUnavailable(status: number, body: string): boolean {
  return classifyModelUnavailable(status, body).matched
}

export function classifyModelUnavailable(
  status: number,
  body: string
): ModelUnavailableClassification {
  if (status !== 404) return { matched: false }
  let parsed: ReturnType<typeof AnthropicErrorEnvelopeSchema.safeParse>
  try {
    parsed = AnthropicErrorEnvelopeSchema.safeParse(JSON.parse(body))
  } catch {
    return { matched: false }
  }
  if (!parsed.success) return { matched: false }
  if (parsed.data.error.type !== "not_found_error") return { matched: false }
  const reason = parsed.data.error.message ?? "not_found_error"
  return { matched: true, reason }
}

export type ModelUnavailableAction =
  | { action: "mark-rebind" }
  | { action: "global-unmark"; firstAccount: string }

export function decideModelUnavailableAction(
  markedByReason: ReadonlyMap<string, string>,
  reason: string,
  currentAccount: string
): ModelUnavailableAction {
  const firstAccount = markedByReason.get(reason)
  if (firstAccount != null && firstAccount !== currentAccount) {
    return { action: "global-unmark", firstAccount }
  }
  return { action: "mark-rebind" }
}
