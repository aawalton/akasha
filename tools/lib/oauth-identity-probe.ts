
import { PROFILE_URL } from "./oauth-constants.ts"
import type { CredentialIdentity } from "./oauth-identity-core.ts"
import { ProfileResponseSchema } from "./oauth-schemas.ts"

const PROBE_TIMEOUT_MS = 750
const BODY_SUMMARY_MAX = 200

function summarizeBody(body: string): string {
  const collapsed = body.replace(/\s+/g, " ").trim()
  return collapsed.length > BODY_SUMMARY_MAX
    ? `${collapsed.slice(0, BODY_SUMMARY_MAX)}…`
    : collapsed
}

export async function probeCredentialIdentity(accessToken: string): Promise<CredentialIdentity> {
  const res = await fetch(PROFILE_URL, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
      "Content-Type": "application/json",
      "User-Agent": "claude-code/2.1.63",
      "anthropic-beta": "oauth-2025-04-20",
    },
    signal: AbortSignal.timeout(PROBE_TIMEOUT_MS),
  })

  if (!res.ok) {
    throw new Error(
      `identity probe failed: ${res.status} (content-type ` +
        `${res.headers.get("content-type") ?? "unknown"}) ${summarizeBody(await res.text())}`
    )
  }

  const parsed = ProfileResponseSchema.safeParse(await res.json())
  if (!parsed.success) {
    throw new Error(`identity probe response malformed: ${parsed.error.message}`)
  }
  return { accountUuid: parsed.data.account.uuid, email: parsed.data.account.email ?? null }
}
