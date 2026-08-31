import { createHash } from "node:crypto"
import { chmodSync } from "node:fs"
import { join } from "node:path"

import { uncommittedAt } from "../../akasha/pages-system/page/page-file-name/page-file-name.module.code.ts"
import { landInAkasha } from "./akasha-landing.ts"
import {
  akashaAccountBeside,
  akashaAccountPath,
  akashaAccountSecrets,
  akashaRoot,
  akashaSecretCipher,
  akashaSecretPath,
  holdBesideAccount,
} from "./claude-account-akasha.ts"
import { placeDirOf } from "../../page/page-types.ts"
import { pageFileIn } from "../../page/page-file.ts"
import { canonicalize } from "../../repo/path/path.ts"
import { akashaRoot as repoRoot } from "../../repo/roots/roots.ts"

export function accountDirIn(root: string): string {
  return placeDirOf("claude-account")
}

const WRITER = "claude-account-credential-writer"

export const ACCESS_KEY = "access-token"

export const REFRESH_KEY = "refresh-token"

export const EXPIRES_KEY = "access-token-expires-at"

export const RESCUED_KEY = "rescued-credential"

export const RESCUED_EXPIRES_KEY = "expires-at-ms"

export const PUSHED_KEYS: readonly string[] = [ACCESS_KEY, REFRESH_KEY]

const DIGEST_CHARS = 12

export const ACCOUNT_SHAPE = /^[a-z0-9][a-z0-9_-]*$/

export function digestOf(value: string): string {
  return createHash("sha256").update(value).digest("hex").slice(0, DIGEST_CHARS)
}

export function accountPage(account: string, root: string = pagesRoot()): string {
  const dir = accountDirIn(root)
  return pageFileIn(root, dir, account) ?? `${dir}/${account}.md`
}

export function pagesRoot(): string {
  return canonicalize(repoRoot())
}

export type PagePush =
  | {
      readonly kind: "pushed"
      readonly account: string
      readonly sidecar: string
      readonly digests: readonly string[]
      readonly sha: string | null
      readonly unpushed: string | null
    }
  | { readonly kind: "unchanged"; readonly account: string; readonly sidecar: string }
  | { readonly kind: "skipped"; readonly account: string; readonly why: string }
  | { readonly kind: "stale"; readonly account: string; readonly why: string }
  | { readonly kind: "refused"; readonly account: string; readonly why: string }

export interface CredentialPagePush {
  readonly account: string
  readonly accessToken: string
  readonly refreshToken: string
  readonly expiresAt: number
  readonly root?: string
}

function heldBy(account: string): ReadonlyMap<string, string> | string {
  try {
    return akashaAccountSecrets(account) ?? new Map()
  } catch (thrown) {
    return thrown instanceof Error ? thrown.message : String(thrown)
  }
}

export function expiryHeld(account: string): number | null {
  const stated = akashaAccountBeside(account)?.[EXPIRES_KEY]
  if (typeof stated !== "string" || stated === "") return null
  const at = Date.parse(stated)
  return Number.isNaN(at) ? null : at
}

function holdExpiry(account: string, expiresAt: number): void {
  const wrong = holdBesideAccount(account, {
    [EXPIRES_KEY]: new Date(expiresAt).toISOString(),
  })
  if (wrong !== null) {
    process.stderr.write(`page push: ${account} keeps its credential but not its expiry: ${wrong}\n`)
  }
}

// The escape hatch: where the rotated pair could not be landed, it is held beside the page, which
// no gate judges, so the next read takes it rather than the pair being lost.
function heldBeside(
  account: string,
  next: ReadonlyMap<string, string>,
  expiresAt: number
): string {
  const wrong = holdBesideAccount(account, {
    [RESCUED_KEY]: {
      accessToken: next.get(ACCESS_KEY) ?? "",
      refreshToken: next.get(REFRESH_KEY) ?? "",
      expiresAtMs: expiresAt,
    },
  })
  if (wrong !== null) return `and it could not be held beside the page either, so it is gone: ${wrong}`
  const page = akashaAccountPath(account)
  const at = page === null ? null : uncommittedAt(page)
  if (at !== null) {
    try {
      chmodSync(join(akashaRoot(), at), 0o600)
    } catch {
      // The pair is held either way; the mode is a narrowing rather than what keeps it.
    }
  }
  return "the rotated pair is held beside the page, which no gate judges, and the next read takes it"
}

function dropHeld(account: string): void {
  holdBesideAccount(account, { [RESCUED_KEY]: null })
}

function unfit(key: string, value: string): string | null {
  if (value === "") return `\`${key}\` arrived empty, and an empty secret would replace a usable one`
  if (value.includes("\n")) return `\`${key}\` holds a newline, and a secret's value is one line`
  return null
}

export function pushCredentialToPage(args: CredentialPagePush): PagePush {
  const { account } = args
  try {
    if (!ACCOUNT_SHAPE.test(account)) {
      return { kind: "refused", account, why: `\`${account}\` is not an account name this writes a path from` }
    }
    if (akashaAccountPath(account) === null) {
      return { kind: "skipped", account, why: `no page stands for \`${account}\`, and a secret belongs to a page` }
    }
    const sidecar = akashaSecretPath(account)
    if (sidecar === null) {
      return { kind: "refused", account, why: `\`${account}\` names no sops file beside its page` }
    }

    const next = new Map<string, string>([
      [ACCESS_KEY, args.accessToken],
      [REFRESH_KEY, args.refreshToken],
    ])
    for (const [key, value] of next) {
      const wrong = unfit(key, value)
      if (wrong !== null) return { kind: "refused", account, why: wrong }
    }

    const standing = expiryHeld(account)
    if (standing !== null && args.expiresAt <= standing) {
      return {
        kind: "stale",
        account,
        why:
          `the page holds a credential expiring ${new Date(standing).toISOString()} and this one expires ` +
          `${new Date(args.expiresAt).toISOString()}, so the fresher one stands`,
      }
    }

    const held = heldBy(account)
    if (typeof held === "string") return { kind: "refused", account, why: held }
    for (const [key, value] of held) if (!next.has(key)) next.set(key, value)
    if (held.size === next.size && [...next].every(([key, value]) => held.get(key) === value)) {
      holdExpiry(account, args.expiresAt)
      dropHeld(account)
      return { kind: "unchanged", account, sidecar }
    }

    const composed = akashaSecretCipher(account, next)
    if (composed.text === null) return { kind: "refused", account, why: composed.why }

    const landed = landInAkasha(akashaRoot(), WRITER, `akasha: page-push ${sidecar}`, [
      { relPath: sidecar, body: composed.text },
    ])
    if (!landed.ok) {
      return {
        kind: "refused",
        account,
        why: `${landed.why} — ${heldBeside(account, next, args.expiresAt)}`,
      }
    }

    // What stands is read back rather than what was composed, so that a sops file landing as
    // something other than what it was given is caught here and not by the next pass finding a
    // token it cannot use.
    let back: ReadonlyMap<string, string> | null
    try {
      back = akashaAccountSecrets(account)
    } catch (thrown) {
      back = null
      process.stderr.write(
        `page push: ${sidecar} landed and would not read back: ${thrown instanceof Error ? thrown.message : thrown}\n`
      )
    }
    if (back === null || [...next].some(([key, value]) => back.get(key) !== value)) {
      return {
        kind: "refused",
        account,
        why: `${sidecar} landed and does not read back what it was given — ${heldBeside(account, next, args.expiresAt)}`,
      }
    }

    holdExpiry(account, args.expiresAt)
    dropHeld(account)
    return {
      kind: "pushed",
      account,
      sidecar,
      digests: PUSHED_KEYS.map((key) => `${key} ${digestOf(next.get(key) ?? "")}`),
      sha: landed.sha,
      unpushed: null,
    }
  } catch (thrown) {
    return {
      kind: "refused",
      account,
      why: `the page push threw, which it is written never to do: ${thrown instanceof Error ? thrown.message : thrown}`,
    }
  }
}
