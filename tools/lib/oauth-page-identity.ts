
import { existsSync } from "node:fs"

import { removeUncommitted } from "../../page/uncommitted/uncommitted.ts"
import type { IdentityPinStage } from "./oauth-identity-core.ts"
import { holdMarksOnPage, type Marks } from "./oauth-page-mark.ts"
import { accountPage, pagesRoot, pushCredentialToPage } from "./oauth-page-push.ts"
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

export function clearPreviousAccountBookkeeping(
  account: string,
  root: string,
  relPath: string
): Cleared {
  const dropped = holdMarksOnPage(account, identityScopedClearMarks(), root)
  if (dropped.kind === "refused" || dropped.kind === "skipped") return { ok: false, why: dropped.why }
  try {
    removeUncommitted(`${root}/${relPath}`)
  } catch (thrown) {
    return {
      ok: false,
      why: `the volatile numbers beside ${relPath} could not be dropped: ${thrown instanceof Error ? thrown.message : thrown}`,
    }
  }
  return { ok: true }
}

export function pinIdentityOnPage(args: IdentityPinArgs): IdentityPin {
  const { account } = args
  let at: IdentityPinStage = "clear"
  const refused = (why: string): IdentityPin => ({ kind: "refused", account, at, why })
  try {
    const root = args.root ?? pagesRoot()
    const relPath = accountPage(account, root)
    if (!existsSync(`${root}/${relPath}`)) {
      return refused(`no page stands at ${relPath}, and a pin belongs to a page`)
    }

    if (args.previousUuid !== null) {
      const cleared = clearPreviousAccountBookkeeping(account, root, relPath)
      if (!cleared.ok) return refused(cleared.why)
    }

    at = "credential"
    const pushed = pushCredentialToPage({
      account,
      accessToken: args.accessToken,
      refreshToken: args.refreshToken,
      expiresAt: args.expiresAt,
      root,
    })
    if (pushed.kind === "refused" || pushed.kind === "skipped") return refused(pushed.why)

    at = "pin"
    const held = holdMarksOnPage(account, { [ACCOUNT_UUID_KEY]: args.accountUuid }, root)
    if (held.kind === "refused" || held.kind === "skipped") return refused(held.why)

    return { kind: "pinned", account, accountUuid: args.accountUuid, credential: pushed.kind }
  } catch (thrown) {
    return refused(
      `the identity pin threw, which it is written never to do: ${thrown instanceof Error ? thrown.message : thrown}`
    )
  }
}
