
import { readFileSync } from "node:fs"
import { join } from "node:path"

import { REFRESH_BUFFER_MS } from "./oauth-constants.ts"
import {
  CREDENTIAL_FILE_SCHEMA,
  readCredentialFileSync,
  writeCredentialFile,
} from "./oauth-credential-file.ts"
import { readCredentialFromPage } from "./oauth-page-credential.ts"
import { pagesRoot } from "./oauth-page-push.ts"
import {
  handleCredentialFileChange,
  pushCredentialFileToPage,
  watchCredentialFile,
} from "./oauth-file-push.ts"

export { CREDENTIAL_FILE_SCHEMA, readCredentialFileSync, writeCredentialFile }
export { handleCredentialFileChange, pushCredentialFileToPage, watchCredentialFile }

export type RefreshCredentialResult = {
  refreshed: boolean
  terminal: boolean
  error?: { status?: number; code?: string | null; description?: string | null }
}

export async function refreshCredentialFromPage(
  account: string,
  credentialDir: string,
  logPrefix = "[oauth]"
): Promise<RefreshCredentialResult> {
  try {
    const credPath = join(credentialDir, ".credentials.json")
    let fileExpiresAt: number
    try {
      const raw = readFileSync(credPath, "utf-8")
      const parsed = CREDENTIAL_FILE_SCHEMA.parse(JSON.parse(raw))
      fileExpiresAt = parsed.claudeAiOauth?.expiresAt ?? 0
    } catch {
      fileExpiresAt = 0
    }

    const held = readCredentialFromPage(account)
    if (held.kind === "absent") {
      console.log(`${logPrefix} Credential refresh skip for ${account}: ${held.why}`)
      return { refreshed: false, terminal: false }
    }
    const doc = held.credential

    if (doc.expiresAt <= fileExpiresAt) {
      console.log(`${logPrefix} Credential refresh skip for ${account} (file already current)`)
      return { refreshed: false, terminal: false }
    }

    const now = Date.now()
    if (doc.expiresAt <= now) {
      console.error(
        `${logPrefix} ${account} expired at ${new Date(doc.expiresAt).toISOString()} and nothing ` +
          `here renews one — claude account upkeep has not reached it, so the file is left as it stands`
      )
      return { refreshed: false, terminal: false }
    }
    if (doc.expiresAt < now + REFRESH_BUFFER_MS) {
      console.warn(
        `${logPrefix} ${account} expires at ${new Date(doc.expiresAt).toISOString()}, inside the ` +
          `reader's buffer — upkeep is behind, and the file takes what its page holds`
      )
    }

    writeCredentialFile(credentialDir, {
      account,
      accessToken: doc.accessToken,
      refreshToken: doc.refreshToken,
      expiresAt: doc.expiresAt,
      scopes: doc.scopes ?? [],
      subscriptionType: doc.subscriptionType ?? null,
      rateLimitTier: doc.rateLimitTier ?? null,
    })
    console.log(
      `${logPrefix} Credential refresh for ${account}: pushed updated tokens from its page to the file`
    )
    return { refreshed: true, terminal: false }
  } catch (err) {
    console.error(`${logPrefix} Credential refresh error for ${account}:`, err)
    throw err
  }
}
