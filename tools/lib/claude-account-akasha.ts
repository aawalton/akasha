import {
  type Value,
  valueAt,
} from "../../akasha/pages-system/indexes/index-entries/index-entries.module.code.ts"
import { everyOfTypeAnswered } from "../../akasha/pages-system/indexes/index-reading/index-reading.module.code.ts"
import { secretsIn } from "../../akasha/pages-system/page/page-secret/page-secret.module.code.ts"
import { uncommittedIn } from "../../akasha/pages-system/page/page-uncommitted/page-uncommitted.module.code.ts"
import { propertiesOf } from "../../akasha/pages-system/page-type/page-type-properties/page-type-properties.module.code.ts"
import { onceInCall } from "../../during-call/during-call.ts"
import { AKASHA, resolveRoots, rootFor } from "../../repo/roots/roots.ts"

// A claude-account stands in akasha and the readers above still ask for it by the keys its
// markdown page carried. This answers them under those keys so that moving the page changes
// nothing they say.
//
// A TRUE EMPTY AND A FAILURE MUST NOT READ ALIKE. A root holding no claude-account index is a
// root that cannot be read, and it is refused. A root whose index stands and names no such
// account is an answer. Renewing a token happens off these reads and nowhere else, so a fleet
// read as empty would renew nothing at all and report having done its round.

const PAGE_TYPE = "claude-account"

const ACCOUNT_DIR = "akasha/agents-system/claude-account/claude-accounts/"

export function akashaRoot(): string {
  return rootFor(resolveRoots(), AKASHA)
}

// What a claude-account STATES, and where each old key stands in akasha. The old readers ask by
// the keys the markdown frontmatter carried, so a page read from akasha is answered under those
// names rather than akasha's own.
export const STATED: Readonly<Record<string, string>> = {
  id: "id",
  slug: "slug",
  "page-type-slug": "pageTypeSlug",
  "account-uuid": "accountUuid",
  email: "email",
  "alias-index": "aliasIndex",
  "subscription-type": "subscriptionType",
  "rate-limit-tier": "rateLimitTier",
  "renewal-day": "renewalDay",
  scopes: "scopes",
  // Written onto the page when a pass finds the account unusable, and read back by the pass that
  // decides whether to skip it.
  "subscription-disabled-reason": "subscriptionDisabledReason",
  "terminal-at": "terminalAt",
  "terminal-alerted-at": "terminalAlertedAt",
}

// What is OBSERVED of an account, which stands beside its page rather than in it.
//
// `retry-after` answers `retryAllowedAt`: the old key carries the name of an HTTP header that
// states a length, and the value under it was always the moment the wait ends. Akasha names an
// instant for what it is, and the instant-property it is declared as requires the `-at` ending.
export const OBSERVED: Readonly<Record<string, string>> = {
  "access-token-expires-at": "accessTokenExpiresAt",
  "five-hour-percent-used": "fiveHourPercentUsed",
  "seven-day-percent-used": "sevenDayPercentUsed",
  "five-hour-resets-at": "fiveHourResetsAt",
  "seven-day-resets-at": "sevenDayResetsAt",
  "five-hour-started-at": "fiveHourStartedAt",
  "seven-day-started-at": "sevenDayStartedAt",
  "last-window-trigger-at": "lastWindowTriggerAt",
  "retry-after": "retryAllowedAt",
  "usage-read-at": "usageReadAt",
  // The rotated pair held beside a page when no landing would carry it. No property declares it,
  // here or in the old system, and it is passed through under its own name so that the escape
  // hatch keeps working while nothing claims to have declared it.
  "rescued-credential": "rescuedCredential",
}

// The keys a sops file beside an account holds. These stay as the standing files spell them: the
// eight encrypted sidecars move across byte for byte, and nothing judges what a sops file names.
export const HELD_SECRET: Readonly<Record<string, string>> = {
  "access-token": "access-token",
  "refresh-token": "refresh-token",
}

// Refuses a root that names no claude-account index at all, and answers for one that does. The
// listing is taken once per call rather than per account, because every reader below reaches it.
function accountsStandingInAkasha(): ReadonlyMap<string, string> {
  return onceInCall("akasha-claude-account-path-by-slug", () => {
    const root = akashaRoot()
    const found = new Map<string, string>()
    for (const one of everyOfTypeAnswered(root, PAGE_TYPE)) {
      if (!one.path.startsWith(ACCOUNT_DIR)) continue
      const value = valueAt(one.path, root)
      const slug = value === null ? null : value["slug"]
      if (typeof slug !== "string" || slug === "") continue
      if (!found.has(slug)) found.set(slug, one.path)
    }
    return found
  })
}

// Every account standing in akasha, by slug, in the order the old reader answered them.
export function akashaAccounts(): readonly string[] {
  return [...accountsStandingInAkasha().keys()].sort()
}

// The repository-relative path of an account's page, or null where akasha stands and holds no
// such account.
export function akashaAccountPath(account: string): string | null {
  return accountsStandingInAkasha().get(account) ?? null
}

function underOldKeys(
  held: Record<string, unknown>,
  naming: Readonly<Record<string, string>>
): Record<string, unknown> {
  const values: Record<string, unknown> = {}
  for (const [key, from] of Object.entries(naming)) {
    const said = held[from]
    if (said !== undefined && said !== null && said !== "") values[key] = said
  }
  return values
}

// What an account states in akasha, under the keys its markdown page carried.
export function akashaAccountValues(account: string): Record<string, unknown> | null {
  const page = akashaAccountPath(account)
  if (page === null) return null
  const held: Value | null = valueAt(page, akashaRoot())
  if (held === null) return null
  return underOldKeys(held as Record<string, unknown>, STATED)
}

// What is observed of an account, under the keys the old sidecar carried. An account with no file
// beside it carries no observed values, which is an answer rather than a failure to read one.
export function akashaAccountBeside(account: string): Record<string, unknown> | null {
  const page = akashaAccountPath(account)
  if (page === null) return null
  const held = uncommittedIn(akashaRoot(), page)
  if (held === null) return {}
  return underOldKeys(held as Record<string, unknown>, OBSERVED)
}

// Every old key, by the name akasha declares it under.
const AKASHA_NAMED: ReadonlyMap<string, string> = new Map(
  [...Object.entries(STATED), ...Object.entries(OBSERVED)].map(([old, said]) => [said, old])
)

// The keys a mark goes beside an account's page under rather than into it.
//
// This is the routing table every mark passes through: a key named here is held beside the page,
// and a key not named here is written into the page body and landed as a commit. Reading it as
// empty would not fail — it would quietly route every token expiry and both usage percentages
// into tracked page bodies, landing volatile churn as commits on every pass, for every account.
// So a table that cannot be read is refused rather than answered as a table naming nothing.
export function akashaUncommittedKeys(): ReadonlySet<string> {
  const root = akashaRoot()
  const declared = propertiesOf(PAGE_TYPE, root, (path) => valueAt(path, root))
  if (declared.length === 0) {
    throw new Error(
      `no \`${PAGE_TYPE}\` page type could be read from ${root}, and where each value a mark ` +
        `carries stands is declared there and nowhere else, so where to write one is unknown ` +
        `rather than the page body by default`
    )
  }
  const beside = new Set<string>()
  for (const one of declared) {
    if (!one.uncommitted) continue
    // Matched on the key a page is read by rather than the slug the declaration reaches it with,
    // because the naming above is written in the keys akasha carries.
    //
    // A declaration akasha carries that no old key names is one the old writers never wrote, so
    // it routes nothing and is left out rather than guessed a name for.
    const named = AKASHA_NAMED.get(one.key)
    if (named !== undefined) beside.add(named)
  }
  return beside
}

// The secrets an account holds, under the keys its sops file spells. Throws where a sidecar
// stands and will not decrypt, because a token that cannot be read is not an account without one.
export function akashaAccountSecrets(account: string): ReadonlyMap<string, string> | null {
  const page = akashaAccountPath(account)
  if (page === null) return null
  return secretsIn(akashaRoot(), page)
}
