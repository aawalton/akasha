
import { OAUTH_CLIENT_ID, OAUTH_TOKEN_URL, REFRESH_BUFFER_MS } from "./oauth-constants.ts"
import { parseFutureIsoMs, selectBestAccount } from "./oauth-credentials-select.ts"
import { classifyOAuthError } from "./oauth-errors.ts"
import { type CredentialDb, type CredentialStore, pageCredentialDb } from "./oauth-page-db.ts"
import { OAuthTokenResponseSchema } from "./oauth-schemas.ts"
import type { CredentialDoc, CredentialPick, OAuthCredential } from "./oauth-types.ts"



const PAGES = pageCredentialDb()

export type RefreshOutcome =
  | { ok: true; credential: OAuthCredential }
  | {
      ok: false
      terminal: boolean
      reason: "no-credential" | "http-error" | "exception"
      status?: number
      code?: string | null
      description?: string | null
      error?: unknown
    }

export async function refreshOAuthTokenWithOutcome(
  account: string,
  logPrefix = "[oauth]",
  db: CredentialStore = PAGES,
  marginMs: number = REFRESH_BUFFER_MS
): Promise<RefreshOutcome> {
  try {
    const doc = await db.getCredential(account)
    if (!doc) return { ok: false, terminal: false, reason: "no-credential" }

    if (doc.expiresAt >= Date.now() + marginMs) {
      return {
        ok: true,
        credential: {
          account,
          accessToken: doc.accessToken,
          refreshToken: doc.refreshToken,
          expiresAt: doc.expiresAt,
          scopes: doc.scopes ?? [],
          subscriptionType: doc.subscriptionType ?? null,
          rateLimitTier: doc.rateLimitTier ?? null,
        },
      }
    }

    const res = await fetch(OAUTH_TOKEN_URL, {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: new URLSearchParams({
        grant_type: "refresh_token",
        client_id: OAUTH_CLIENT_ID,
        refresh_token: doc.refreshToken,
      }),
    })
    if (!res.ok) {
      const text = await res.text()
      const classified = classifyOAuthError(res.status, text)
      console.error(
        `${logPrefix} OAuth refresh failed for ${account}: ${res.status} ${text}` +
          (classified.terminal ? " [TERMINAL — human re-auth required]" : "")
      )
      return {
        ok: false,
        terminal: classified.terminal,
        reason: "http-error",
        status: res.status,
        code: classified.code,
        description: classified.description,
      }
    }

    const raw: unknown = await res.json()
    const parsed = OAuthTokenResponseSchema.safeParse(raw)
    if (!parsed.success) {
      console.error(
        `${logPrefix} OAuth refresh response failed schema validation for ${account}: ${parsed.error.message}`
      )
      return {
        ok: false,
        terminal: false,
        reason: "http-error",
        status: res.status,
        code: "malformed_response",
        description: parsed.error.message,
      }
    }
    const data = parsed.data
    const newExpiresAt = Date.now() + data.expires_in * 1000

    let held = true
    try {
      await db.updateTokenIfNewer({
        account,
        accessToken: data.access_token,
        refreshToken: data.refresh_token,
        expiresAt: newExpiresAt,
      })
    } catch (err) {
      held = false
      console.error(
        `${logPrefix} ${account} refreshed but its credential did not reach its page, so the ` +
          `pair returned here is the only copy and the next refresh will find the spent one:`,
        err
      )
    }

    const current = held ? await db.getCredential(account) : null

    if (current) {
      return {
        ok: true,
        credential: {
          account,
          accessToken: current.accessToken,
          refreshToken: current.refreshToken,
          expiresAt: current.expiresAt,
          scopes: current.scopes ?? doc.scopes ?? [],
          subscriptionType: current.subscriptionType ?? doc.subscriptionType ?? null,
          rateLimitTier: current.rateLimitTier ?? doc.rateLimitTier ?? null,
        },
      }
    }

    return {
      ok: true,
      credential: {
        account,
        accessToken: data.access_token,
        refreshToken: data.refresh_token,
        expiresAt: newExpiresAt,
        scopes: doc.scopes ?? [],
        subscriptionType: doc.subscriptionType ?? null,
        rateLimitTier: doc.rateLimitTier ?? null,
      },
    }
  } catch (err) {
    console.error(`${logPrefix} OAuth refresh error for ${account}:`, err)
    return { ok: false, terminal: false, reason: "exception", error: err }
  }
}

export async function getCredentialByAccount(
  account: string,
  logPrefix = "[oauth]",
  db: CredentialDb = PAGES
): Promise<OAuthCredential | null> {
  try {
    const doc = await db.getCredential(account)
    if (!doc) return null
    return {
      account: doc.account,
      accessToken: doc.accessToken,
      refreshToken: doc.refreshToken,
      expiresAt: doc.expiresAt,
      scopes: doc.scopes ?? [],
      subscriptionType: doc.subscriptionType ?? null,
      rateLimitTier: doc.rateLimitTier ?? null,
    }
  } catch (err) {
    console.error(`${logPrefix} getCredentialByAccount error for ${account}:`, err)
    return null
  }
}

export async function readAllCredentials(
  logPrefix = "[oauth]",
  db: CredentialDb = PAGES
): Promise<CredentialDoc[]> {
  try {
    return await db.getAllCredentials()
  } catch (err) {
    console.error(`${logPrefix} readAllCredentials error:`, err)
    return []
  }
}

export async function getBestCredential(
  logPrefix = "[oauth]",
  excludeAccounts: ReadonlySet<string> = new Set(),
  db: CredentialDb = PAGES
): Promise<CredentialPick | null> {
  try {
    const [allCreds, pacingMap] = await Promise.all([
      db.getAllCredentials(),
      db.getClaudeAccountPacing(),
    ])
    if (allCreds.length === 0) return null

    const now = Date.now()
    const excludes = new Set(excludeAccounts)

    while (true) {
      const entry = selectBestAccount(allCreds, pacingMap, now, excludes)
      if (!entry) return null

      const { cred, state } = entry

      if (cred.expiresAt <= now) {
        console.error(
          `${logPrefix} ${cred.account} expired at ${new Date(cred.expiresAt).toISOString()} ` +
            `and nothing here renews one — claude account upkeep has not reached it, trying next account...`
        )
        excludes.add(cred.account)
        continue
      }
      if (cred.expiresAt < now + REFRESH_BUFFER_MS) {
        console.warn(
          `${logPrefix} ${cred.account} expires at ${new Date(cred.expiresAt).toISOString()}, ` +
            `inside the reader's buffer — upkeep is behind`
        )
      }
      const credential: OAuthCredential = {
        account: cred.account,
        accessToken: cred.accessToken,
        refreshToken: cred.refreshToken,
        expiresAt: cred.expiresAt,
        scopes: cred.scopes ?? [],
        subscriptionType: cred.subscriptionType ?? null,
        rateLimitTier: cred.rateLimitTier ?? null,
      }

      return {
        credential,
        fiveHourResetsAtMs: parseFutureIsoMs(state.fiveHourResetsAt, now),
      }
    }
  } catch (err) {
    console.error(`${logPrefix} getBestCredential error:`, err)
    return null
  }
}
