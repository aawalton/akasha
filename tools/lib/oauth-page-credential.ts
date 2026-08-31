
import {
  akashaAccountBeside,
  akashaAccounts,
  akashaAccountSecrets,
  akashaAccountValues,
} from "./claude-account-akasha.ts"
import {
  ACCESS_KEY,
  EXPIRES_KEY,
  REFRESH_KEY,
  RESCUED_EXPIRES_KEY,
  RESCUED_KEY,
} from "./oauth-page-push.ts"
import type { CredentialDoc, OAuthCredential } from "./oauth-types.ts"

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
  const out = readCredentialFromPage(account)
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

// Every account standing in akasha. A root that names no claude-account index at all is refused
// by the reader below this rather than answered as a fleet with no accounts in it.
export function accountsWithPages(): readonly string[] {
  return akashaAccounts()
}

export function allCredentialsFromPages(logPrefix = "[oauth]"): readonly OAuthCredential[] {
  const read: OAuthCredential[] = []
  for (const account of accountsWithPages()) {
    const one = credentialByAccountFromPage(account, logPrefix)
    if (one !== null) read.push(one)
  }
  return read
}

function said(thrown: unknown): string {
  return thrown instanceof Error ? thrown.message : String(thrown)
}

export interface HeldCredential {
  readonly accessToken: string
  readonly refreshToken: string
  readonly expiresAt: number
}

// The rescued pair akasha holds beside the page. Its inner keys are akasha's own spelling, the
// whole sidecar reading one way.
const RESCUED_ACCESS = "accessToken"

const RESCUED_REFRESH = "refreshToken"

const RESCUED_EXPIRES = "expiresAtMs"

export function heldBesidePage(held: Record<string, unknown> | null): HeldCredential | null {
  const under = held?.[RESCUED_KEY]
  if (typeof under !== "object" || under === null || Array.isArray(under)) return null
  const at = under as Record<string, unknown>
  const accessToken = at[RESCUED_ACCESS] ?? at[ACCESS_KEY]
  const refreshToken = at[RESCUED_REFRESH] ?? at[REFRESH_KEY]
  const stated = at[RESCUED_EXPIRES] ?? at[RESCUED_EXPIRES_KEY]
  if (typeof accessToken !== "string" || accessToken === "") return null
  if (typeof refreshToken !== "string" || refreshToken === "") return null
  if (typeof stated !== "number" || !Number.isFinite(stated)) return null
  return { accessToken, refreshToken, expiresAt: stated }
}

function textOf(stated: Record<string, unknown>, key: string): string | null {
  const held = stated[key]
  return typeof held === "string" && held !== "" ? held : null
}

function listOf(stated: Record<string, unknown>, key: string): readonly string[] {
  const held = stated[key]
  return Array.isArray(held) ? held.filter((one): one is string => typeof one === "string") : []
}

export function readCredentialFromPage(account: string): PageCredential {
  try {
    const stated = akashaAccountValues(account)
    if (stated === null) return { kind: "absent", why: `no page stands for \`${account}\`` }

    let secrets: ReadonlyMap<string, string> | null
    try {
      secrets = akashaAccountSecrets(account)
    } catch (thrown) {
      // A sops file that stands and will not decrypt is not an account holding no token. Saying so
      // is what parts a machine missing its age key from an account nobody has signed in to.
      return { kind: "absent", why: said(thrown) }
    }
    if (secrets === null) {
      return { kind: "absent", why: `\`${account}\` names no sops file beside its page` }
    }
    const accessToken = secrets.get(ACCESS_KEY)
    const refreshToken = secrets.get(REFRESH_KEY)
    if (accessToken === undefined || refreshToken === undefined) {
      return {
        kind: "absent",
        why: `the sops file beside \`${account}\` holds no \`${ACCESS_KEY}\` or no \`${REFRESH_KEY}\``,
      }
    }

    const held = akashaAccountBeside(account)
    const saidAt = held?.[EXPIRES_KEY]
    const expiresAt = typeof saidAt === "string" ? Date.parse(saidAt) : Number.NaN
    if (!Number.isFinite(expiresAt)) {
      return {
        kind: "absent",
        why: `nothing beside \`${account}\` states an \`${EXPIRES_KEY}\` that reads as an instant, and a credential without one cannot be judged expired`,
      }
    }

    const rescued = heldBesidePage(held)
    const standing =
      rescued !== null && rescued.expiresAt > expiresAt
        ? rescued
        : { accessToken, refreshToken, expiresAt }

    return {
      kind: "read",
      credential: {
        account,
        accessToken: standing.accessToken,
        refreshToken: standing.refreshToken,
        expiresAt: standing.expiresAt,
        scopes: listOf(stated, SCOPES_KEY),
        subscriptionType: textOf(stated, SUBSCRIPTION_TYPE_KEY),
        rateLimitTier: textOf(stated, RATE_LIMIT_TIER_KEY),
      },
    }
  } catch (thrown) {
    return { kind: "absent", why: `${account} could not be read off its page: ${said(thrown)}` }
  }
}
