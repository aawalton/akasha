import type { CredentialDoc, CredentialPick, OAuthCredential } from "@akasha/agents/oauth-types"

import { REFRESH_BUFFER_MS } from "./oauth-constants.ts"
import { parseFutureIsoMs, selectBestAccount } from "./oauth-credentials-select.ts"
import { type CredentialDb, pageCredentialDb } from "./oauth-page-db.ts"

const PAGES = pageCredentialDb()

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
