import type { PermissionDeniedClassification } from "../lib/model-gateway/permission-denied.ts"

export interface Vector {
  readonly id: string
  readonly status: number
  readonly body: string
}

export interface PermissionDeniedModule {
  readonly isPermissionDenied: (status: number, body: string) => boolean
  readonly classifyPermissionDenied: (status: number, body: string) => PermissionDeniedClassification
}

const CANONICAL_REASON =
  "Your organization has disabled Claude subscription access for Claude Code · Use an Anthropic API key instead, or ask your admin to enable access"

const CANONICAL = JSON.stringify({
  type: "error",
  error: { type: "permission_error", message: CANONICAL_REASON },
  request_id: "req_abc123",
})

const NO_MESSAGE = JSON.stringify({ type: "error", error: { type: "permission_error" } })

const AUTHENTICATION = JSON.stringify({
  type: "error",
  error: { type: "authentication_error", message: "Invalid API key" },
})

export const CARRIED_REASON = CANONICAL_REASON

export const CARRIED_BODY = CANONICAL

export const VECTORS: readonly Vector[] = [
  { id: "carried-403-canonical", status: 403, body: CANONICAL },
  { id: "carried-401-canonical", status: 401, body: CANONICAL },
  { id: "carried-429-canonical", status: 429, body: CANONICAL },
  { id: "carried-500-canonical", status: 500, body: CANONICAL },
  { id: "carried-200-canonical", status: 200, body: CANONICAL },
  { id: "carried-403-authentication-error", status: 403, body: AUTHENTICATION },
  { id: "carried-403-html", status: 403, body: "<html>Forbidden</html>" },
  { id: "carried-403-empty", status: 403, body: "" },
  { id: "carried-403-plaintext", status: 403, body: "not json at all" },
  { id: "carried-403-foo-bar", status: 403, body: '{"foo":"bar"}' },
  { id: "carried-403-type-message", status: 403, body: '{"type":"message"}' },
  { id: "carried-403-no-message", status: 403, body: NO_MESSAGE },
  { id: "driven-402-canonical", status: 402, body: CANONICAL },
  { id: "driven-404-canonical", status: 404, body: CANONICAL },
  { id: "driven-529-canonical", status: 529, body: CANONICAL },
  { id: "driven-zero-canonical", status: 0, body: CANONICAL },
  { id: "driven-negative-canonical", status: -403, body: CANONICAL },
  { id: "driven-fractional-canonical", status: 403.0000001, body: CANONICAL },
  { id: "driven-nan-canonical", status: Number.NaN, body: CANONICAL },
  { id: "driven-infinity-canonical", status: Number.POSITIVE_INFINITY, body: CANONICAL },
  { id: "driven-403-message-empty-string", status: 403, body: '{"type":"error","error":{"type":"permission_error","message":""}}' },
  { id: "driven-403-message-null", status: 403, body: '{"type":"error","error":{"type":"permission_error","message":null}}' },
  { id: "driven-403-message-number", status: 403, body: '{"type":"error","error":{"type":"permission_error","message":42}}' },
  { id: "driven-403-message-object", status: 403, body: '{"type":"error","error":{"type":"permission_error","message":{"a":1}}}' },
  { id: "driven-403-envelope-type-missing", status: 403, body: '{"error":{"type":"permission_error","message":"m"}}' },
  { id: "driven-403-envelope-type-wrong", status: 403, body: '{"type":"message","error":{"type":"permission_error","message":"m"}}' },
  { id: "driven-403-envelope-type-null", status: 403, body: '{"type":null,"error":{"type":"permission_error"}}' },
  { id: "driven-403-error-type-uppercase", status: 403, body: '{"type":"error","error":{"type":"PERMISSION_ERROR"}}' },
  { id: "driven-403-error-type-padded", status: 403, body: '{"type":"error","error":{"type":" permission_error "}}' },
  { id: "driven-403-error-type-empty", status: 403, body: '{"type":"error","error":{"type":""}}' },
  { id: "driven-403-error-type-number", status: 403, body: '{"type":"error","error":{"type":403}}' },
  { id: "driven-403-error-null", status: 403, body: '{"type":"error","error":null}' },
  { id: "driven-403-error-array", status: 403, body: '{"type":"error","error":[{"type":"permission_error"}]}' },
  { id: "driven-403-error-missing", status: 403, body: '{"type":"error"}' },
  { id: "driven-403-json-null", status: 403, body: "null" },
  { id: "driven-403-json-array", status: 403, body: "[1,2,3]" },
  { id: "driven-403-json-number", status: 403, body: "403" },
  { id: "driven-403-json-string", status: 403, body: '"permission_error"' },
  { id: "driven-403-empty-object", status: 403, body: "{}" },
  { id: "driven-403-duplicate-error-keys", status: 403, body: '{"type":"error","error":{"type":"authentication_error"},"error":{"type":"permission_error"}}' },
  { id: "driven-403-proto-key", status: 403, body: '{"__proto__":{"matched":true},"type":"error","error":{"type":"permission_error"}}' },
  { id: "driven-403-message-tostring", status: 403, body: '{"type":"error","error":{"type":"permission_error","message":"toString"}}' },
  { id: "driven-403-extra-keys-loose", status: 403, body: '{"type":"error","error":{"type":"permission_error","message":"m","code":7},"request_id":"r","extra":[1]}' },
  { id: "driven-403-whitespace-body", status: 403, body: "   " },
  { id: "driven-403-truncated-json", status: 403, body: '{"type":"error","error":{"type":"permission_error"' },
]

export function rows(mod: PermissionDeniedModule): readonly unknown[] {
  return VECTORS.map((vector) => {
    let classified: unknown = "NOT-SET"
    let matched: unknown = "NOT-SET"
    let threw: string | null = null
    try {
      classified = mod.classifyPermissionDenied(vector.status, vector.body)
      matched = mod.isPermissionDenied(vector.status, vector.body)
    } catch (error) {
      threw = error instanceof Error ? `${error.name}: ${error.message}` : String(error)
    }
    return {
      id: vector.id,
      classified,
      keys: typeof classified === "object" && classified !== null ? Object.keys(classified).sort() : [],
      matched,
      matchedKind: typeof matched,
      threw,
    }
  })
}
