
import { mkdirSync, readFileSync, writeFileSync } from "node:fs"
import { join } from "node:path"

import { shape } from "./shape.ts"
import type { OAuthCredential } from "./oauth-types.ts"

export const CREDENTIAL_FILE_SCHEMA = shape
  .object({
    claudeAiOauth: shape
      .object({
        accessToken: shape.string().min(1),
        refreshToken: shape.string().min(1),
        expiresAt: shape.number(),
        scopes: shape.array(shape.string()).optional(),
        subscriptionType: shape.string().nullable().optional(),
        rateLimitTier: shape.string().nullable().optional(),
      })
      .passthrough()
      .optional(),
  })
  .passthrough()

export function readCredentialFileSync(
  credentialDir: string
): { accessToken: string; scopes: readonly string[]; expiresAt: number } | null {
  const credPath = join(credentialDir, ".credentials.json")
  try {
    const parsed = CREDENTIAL_FILE_SCHEMA.parse(JSON.parse(readFileSync(credPath, "utf-8")))
    const oauth = parsed.claudeAiOauth
    if (oauth == null || oauth.accessToken === "") return null
    return {
      accessToken: oauth.accessToken,
      scopes: oauth.scopes ?? [],
      expiresAt: oauth.expiresAt,
    }
  } catch {
    return null
  }
}

export function writeCredentialFile(dir: string, credential: OAuthCredential): undefined {
  if (credential.accessToken === "" || credential.refreshToken === "") {
    console.error(
      `[oauth] writeCredentialFile: refusing to write an empty token for account ` +
        `"${credential.account}" — leaving the existing credential file untouched (#15294).`
    )
    return
  }
  mkdirSync(dir, { recursive: true })
  const filePath = join(dir, ".credentials.json")
  let existing: Record<string, unknown>
  try {
    existing = CREDENTIAL_FILE_SCHEMA.parse(JSON.parse(readFileSync(filePath, "utf-8")))
  } catch {
    existing = {}
  }
  writeFileSync(
    filePath,
    JSON.stringify({
      ...existing,
      claudeAiOauth: {
        accessToken: credential.accessToken,
        refreshToken: credential.refreshToken,
        expiresAt: credential.expiresAt,
        scopes: credential.scopes,
        subscriptionType: credential.subscriptionType,
        rateLimitTier: credential.rateLimitTier,
      },
    }),
    { mode: 0o600 }
  )
}
