
import { OAuthErrorEnvelopeSchema } from "./oauth-schemas.ts"

const TERMINAL_OAUTH_ERROR_CODES = new Set(["invalid_grant", "invalid_client"])

export function classifyOAuthError(
  status: number,
  body: string
): { terminal: boolean; code: string | null; description: string | null } {
  if (status >= 500) return { terminal: false, code: null, description: null }
  if (status === 429) return { terminal: false, code: "rate_limited", description: null }

  let parsed: ReturnType<typeof OAuthErrorEnvelopeSchema.safeParse>
  try {
    parsed = OAuthErrorEnvelopeSchema.safeParse(JSON.parse(body))
  } catch {
    return { terminal: false, code: null, description: null }
  }
  if (!parsed.success) return { terminal: false, code: null, description: null }

  const code = parsed.data.error ?? null
  const description = parsed.data.error_description ?? null

  const terminal =
    status >= 400 && status < 500 && code !== null && TERMINAL_OAUTH_ERROR_CODES.has(code)
  return { terminal, code, description }
}
