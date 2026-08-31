import { join } from "node:path"

import { keepUncommitted } from "../../../akasha/pages-system/page/page-uncommitted/page-uncommitted.module.code.ts"
import { readUncommitted } from "../../../page/uncommitted/uncommitted.ts"
import { akashaAccountPath, akashaKeyOf, akashaRoot } from "../../lib/claude-account-akasha.ts"
import { accountPage, pagesRoot } from "../../lib/oauth-page-push.ts"

// What is observed of each claude-account, carried from the sidecar beside its old markdown page
// to the sidecar beside its page in akasha.
//
// This runs once, with upkeep stopped. It reads and never removes: the old sidecar stands after it
// so that nothing is lost if the cutover is put back.

const RESCUED = "rescued-credential"

const RESCUED_KEY = "rescuedCredential"

// The rescued pair is nested and no property declares it, here or in the old system. Its inner
// keys are carried into akasha's spelling so that the whole sidecar reads one way.
const WITHIN: Readonly<Record<string, string>> = {
  "access-token": "accessToken",
  "refresh-token": "refreshToken",
  "expires-at-ms": "expiresAtMs",
}

export type Carried = {
  readonly account: string
  readonly to: string
  readonly values: Readonly<Record<string, unknown>>
  readonly why: string | null
}

function withinCarried(held: unknown): Record<string, unknown> | string {
  if (held === null || typeof held !== "object" || Array.isArray(held)) {
    return `${RESCUED} is held as something other than a set of keys`
  }
  const out: Record<string, unknown> = {}
  for (const [said, value] of Object.entries(held as Record<string, unknown>)) {
    const key = WITHIN[said]
    if (key === undefined) return `${RESCUED} holds \`${said}\`, which names nothing carried`
    out[key] = value
  }
  return out
}

function refused(account: string, to: string, why: string): Carried {
  return { account, to, values: {}, why }
}

// What would stand beside the account's akasha page. Nothing is written.
export function carriedFor(account: string): Carried {
  const page = akashaAccountPath(account)
  if (page === null) return refused(account, "", `no page stands for \`${account}\` in akasha`)
  const held = readUncommitted(join(pagesRoot(), accountPage(account, pagesRoot())))
  if (held === null) return { account, to: page, values: {}, why: null }

  const values: Record<string, unknown> = {}
  for (const [said, value] of Object.entries(held)) {
    if (value === null || value === undefined) continue
    if (said === RESCUED) {
      const within = withinCarried(value)
      if (typeof within === "string") return refused(account, page, within)
      values[RESCUED_KEY] = within
      continue
    }
    const key = akashaKeyOf(said)
    if (key === null) {
      return refused(
        account,
        page,
        `\`${said}\` stands beside the old page and names nothing the claude-account page type declares`
      )
    }
    values[key] = value
  }
  return { account, to: page, values, why: null }
}

// The same, written. A sidecar carrying nothing is left unwritten rather than stood up empty.
export function carry(account: string): Carried {
  const said = carriedFor(account)
  if (said.why !== null || Object.keys(said.values).length === 0) return said
  keepUncommitted(akashaRoot(), said.to, said.values)
  return said
}

const ACCOUNTS = [
  "aawalton",
  "aine",
  "alanwalton",
  "amywalton",
  "aow",
  "audhdalan",
  "ctw",
  "tempereso",
] as const

if (import.meta.main) {
  const dry = process.argv.includes("--dry-run")
  const named = process.argv.slice(2).filter((one) => !one.startsWith("--"))
  const accounts: readonly string[] = named.length > 0 ? named : ACCOUNTS
  let wrong = 0
  for (const account of accounts) {
    const said = dry ? carriedFor(account) : carry(account)
    if (said.why !== null) {
      wrong += 1
      process.stderr.write(`${account}: ${said.why}\n`)
      continue
    }
    const keys = Object.keys(said.values).sort()
    process.stdout.write(
      `${account.padEnd(12)} ${String(keys.length).padStart(2)} values${dry ? " would go" : " ->"} ` +
        `${said.to}\n${keys.length === 0 ? "" : `             ${keys.join(" ")}\n`}`
    )
  }
  process.exit(wrong === 0 ? 0 : 1)
}
