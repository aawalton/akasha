
import { removeUncommitted } from "../../akasha/pages-system/page/page-uncommitted/page-uncommitted.module.code.ts"
import {
  akashaAccountPath,
  akashaAccountValues,
  akashaRoot,
} from "./claude-account-akasha.ts"
import type { IdentityPinStage } from "./oauth-identity-core.ts"
import { holdMarksOnPage, type Marks } from "./oauth-page-mark.ts"
import { pushCredentialToPage } from "./oauth-page-push.ts"
import {
  ACCOUNT_UUID_KEY,
  DISABLED_REASON_KEY,
  RETRY_AFTER_KEY,
  TERMINAL_ALERTED_AT_KEY,
  TERMINAL_AT_KEY,
  WINDOW_TRIGGER_AT_KEY,
} from "./oauth-page-state.ts"

export const IDENTITY_SCOPED_FRONTMATTER_KEYS: readonly string[] = [
  RETRY_AFTER_KEY,
  TERMINAL_AT_KEY,
  TERMINAL_ALERTED_AT_KEY,
  DISABLED_REASON_KEY,
  WINDOW_TRIGGER_AT_KEY,
]

export function identityScopedClearMarks(): Marks {
  return Object.fromEntries(IDENTITY_SCOPED_FRONTMATTER_KEYS.map((key) => [key, null]))
}

export type IdentityPin =
  | {
      readonly kind: "pinned"
      readonly account: string
      readonly accountUuid: string
      readonly credential: "pushed" | "unchanged" | "stale"
    }
  | {
      readonly kind: "refused"
      readonly account: string
      readonly at: IdentityPinStage
      readonly why: string
    }

export interface IdentityPinArgs {
  readonly account: string
  readonly accountUuid: string
  readonly accessToken: string
  readonly refreshToken: string
  readonly expiresAt: number
  readonly previousUuid: string | null
  readonly root?: string
}

export type Cleared = { readonly ok: true } | { readonly ok: false; readonly why: string }

export function clearPreviousAccountBookkeeping(account: string, page: string): Cleared {
  const dropped = holdMarksOnPage(account, identityScopedClearMarks())
  if (dropped.kind === "refused" || dropped.kind === "skipped") return { ok: false, why: dropped.why }
  try {
    removeUncommitted(akashaRoot(), page)
  } catch (thrown) {
    return {
      ok: false,
      why: `the volatile numbers beside ${page} could not be dropped: ${thrown instanceof Error ? thrown.message : thrown}`,
    }
  }
  return { ok: true }
}

export function pinIdentityOnPage(args: IdentityPinArgs): IdentityPin {
  const { account } = args
  let at: IdentityPinStage = "clear"
  const refused = (why: string): IdentityPin => ({ kind: "refused", account, at, why })
  try {
    const page = akashaAccountPath(account)
    if (page === null) {
      return refused(`no page stands for \`${account}\`, and a pin belongs to a page`)
    }

    if (args.previousUuid !== null) {
      const cleared = clearPreviousAccountBookkeeping(account, page)
      if (!cleared.ok) return refused(cleared.why)
    }

    at = "credential"
    const pushed = pushCredentialToPage({
      account,
      accessToken: args.accessToken,
      refreshToken: args.refreshToken,
      expiresAt: args.expiresAt,
    })
    if (pushed.kind === "refused" || pushed.kind === "skipped") return refused(pushed.why)

    at = "pin"
    // The uuid is what the account IS, settled when the account is made. A sign-in answering the
    // same one has nothing to pin. One answering a different one has reached a different Anthropic
    // account under this name, and which account this is is a person's to say rather than a
    // reading to overwrite.
    const stated = akashaAccountValues(account)?.[ACCOUNT_UUID_KEY]
    if (stated !== args.accountUuid) {
      return refused(
        `${page} states \`${String(stated)}\` and this sign-in answered \`${args.accountUuid}\`, so it reached ` +
          `another Anthropic account under this name — say which account \`${account}\` is on its page`
      )
    }

    return { kind: "pinned", account, accountUuid: args.accountUuid, credential: pushed.kind }
  } catch (thrown) {
    return refused(
      `the identity pin threw, which it is written never to do: ${thrown instanceof Error ? thrown.message : thrown}`
    )
  }
}
