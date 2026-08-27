
import { existsSync, readdirSync, readFileSync } from "node:fs"

import { readUncommitted } from "../../page/uncommitted/uncommitted.ts"
import { stemOf as slugOf } from "../../page/name/name.ts"
import { listField, parseFrontmatter, textField } from "../../page/frontmatter.ts"
import {
  ACCESS_KEY,
  accountDirIn,
  accountPage,
  EXPIRES_KEY,
  pagesRoot,
  REFRESH_KEY,
} from "./oauth-page-push.ts"
import type { CredentialDoc, OAuthCredential } from "./oauth-types.ts"
import { sidecarFor, valuesIn } from "./page-secret.ts"

export const SUBSCRIPTION_TYPE_KEY = "subscription-type"

export const RATE_LIMIT_TIER_KEY = "rate-limit-tier"

export const SCOPES_KEY = "scopes"

export type PageCredential =
  | { readonly kind: "read"; readonly credential: CredentialDoc }
  | { readonly kind: "absent"; readonly why: string }

export function credentialByAccountFromPage(
  account: string,
  logPrefix = "[oauth]"
): OAuthCredential | null {
  const out = readCredentialFromPage(pagesRoot(), account)
  if (out.kind === "absent") {
    console.error(`${logPrefix} ${account} could not be read off its page: ${out.why}`)
    return null
  }
  const doc = out.credential
  return {
    account: doc.account,
    accessToken: doc.accessToken,
    refreshToken: doc.refreshToken,
    expiresAt: doc.expiresAt,
    scopes: doc.scopes ?? [],
    subscriptionType: doc.subscriptionType ?? null,
    rateLimitTier: doc.rateLimitTier ?? null,
  }
}

export function accountsWithPages(root = pagesRoot()): readonly string[] {
  try {
    const names = readdirSync(`${root}/${accountDirIn(root)}`).filter((one) => one.endsWith(".md"))
    return [...new Set(names.map(slugOf))].sort()
  } catch {
    return []
  }
}

export function allCredentialsFromPages(logPrefix = "[oauth]"): readonly OAuthCredential[] {
  const root = pagesRoot()
  const read: OAuthCredential[] = []
  for (const account of accountsWithPages(root)) {
    const one = credentialByAccountFromPage(account, logPrefix)
    if (one !== null) read.push(one)
  }
  return read
}

function said(thrown: unknown): string {
  return thrown instanceof Error ? thrown.message : String(thrown)
}

export function readCredentialFromPage(root: string, account: string): PageCredential {
  try {
    const relPath = accountPage(account, root)
    const at = `${root}/${relPath}`
    if (!existsSync(at)) {
      return { kind: "absent", why: `no page stands at ${relPath}` }
    }

    const sidecar = sidecarFor(relPath)
    if (sidecar === null) {
      return { kind: "absent", why: `${relPath} names no sops file beside it` }
    }
    let cipher: string
    try {
      cipher = readFileSync(`${root}/${sidecar}`, "utf8")
    } catch (thrown) {
      return { kind: "absent", why: `${sidecar} could not be read: ${said(thrown)}` }
    }
    const held = valuesIn(root, sidecar, cipher)
    if (held.values === null) {
      return { kind: "absent", why: held.why }
    }
    const accessToken = held.values.get(ACCESS_KEY)
    const refreshToken = held.values.get(REFRESH_KEY)
    if (accessToken === undefined || refreshToken === undefined) {
      return {
        kind: "absent",
        why: `${sidecar} holds no \`${ACCESS_KEY}\` or no \`${REFRESH_KEY}\``,
      }
    }

    const stated = readUncommitted(at)?.[EXPIRES_KEY]
    const expiresAt = typeof stated === "string" ? Date.parse(stated) : Number.NaN
    if (!Number.isFinite(expiresAt)) {
      return {
        kind: "absent",
        why: `${relPath} states no \`${EXPIRES_KEY}\` that reads as an instant, and a credential without one cannot be judged expired`,
      }
    }

    const fm = parseFrontmatter(readFileSync(at, "utf8"))
    if (fm.error !== null) {
      return { kind: "absent", why: `${relPath} does not parse: ${fm.error}` }
    }

    return {
      kind: "read",
      credential: {
        account,
        accessToken,
        refreshToken,
        expiresAt,
        scopes: listField(fm, SCOPES_KEY),
        subscriptionType: textField(fm, SUBSCRIPTION_TYPE_KEY),
        rateLimitTier: textField(fm, RATE_LIMIT_TIER_KEY),
      },
    }
  } catch (thrown) {
    return { kind: "absent", why: `${account} could not be read off its page: ${said(thrown)}` }
  }
}
