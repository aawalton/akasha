import { createHash } from "node:crypto"
import { chmodSync, existsSync, readFileSync } from "node:fs"

import {
  patchUncommitted,
  patchUncommittedUnder,
  readUncommitted,
  uncommittedPathFor,
} from "../../page/uncommitted/uncommitted.ts"
import { type GatedAct, landBodies } from "./gated-landing.ts"
import { cipherFor, sidecarFor, valuesIn, type Values } from "./page-secret.ts"
import { placeDirOf } from "../../page/page-types.ts"
import { pageFileIn } from "../../page/page-file.ts"
import { canonicalize } from "../../repo/path/path.ts"
import { akashaRoot } from "../../repo/roots/roots.ts"

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
  return canonicalize(akashaRoot())
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

function heldBy(root: string, sidecar: string): Values | string {
  const at = `${root}/${sidecar}`
  if (!existsSync(at)) return new Map()
  let text: string
  try {
    text = readFileSync(at, "utf8")
  } catch (thrown) {
    return `${sidecar} could not be read: ${thrown instanceof Error ? thrown.message : thrown}`
  }
  const read = valuesIn(root, sidecar, text)
  if (read.values === null) return read.why
  return read.values
}

export function expiryHeld(root: string, relPath: string): number | null {
  const stated = readUncommitted(`${root}/${relPath}`)?.[EXPIRES_KEY]
  if (typeof stated !== "string" || stated === "") return null
  const at = Date.parse(stated)
  return Number.isNaN(at) ? null : at
}

function holdExpiry(root: string, relPath: string, expiresAt: number): void {
  try {
    patchUncommitted(`${root}/${relPath}`, { [EXPIRES_KEY]: new Date(expiresAt).toISOString() })
  } catch (thrown) {
    process.stderr.write(
      `page push: ${relPath} keeps its credential but not its expiry: ` +
        `${thrown instanceof Error ? thrown.message : thrown}\n`
    )
  }
}

function heldBeside(
  root: string,
  relPath: string,
  next: ReadonlyMap<string, string>,
  expiresAt: number
): string {
  const at = `${root}/${relPath}`
  try {
    patchUncommittedUnder(at, RESCUED_KEY, {
      [ACCESS_KEY]: next.get(ACCESS_KEY) ?? "",
      [REFRESH_KEY]: next.get(REFRESH_KEY) ?? "",
      [RESCUED_EXPIRES_KEY]: expiresAt,
    })
    chmodSync(uncommittedPathFor(at), 0o600)
    return "the rotated pair is held beside the page, which no gate judges, and the next read takes it"
  } catch (thrown) {
    return `and it could not be held beside the page either, so it is gone: ${thrown instanceof Error ? thrown.message : thrown}`
  }
}

function dropHeld(root: string, relPath: string): void {
  try {
    patchUncommitted(`${root}/${relPath}`, { [RESCUED_KEY]: null })
  } catch {
    return
  }
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
    const root = args.root ?? pagesRoot()
    const relPath = accountPage(account, root)
    if (!existsSync(`${root}/${relPath}`)) {
      return { kind: "skipped", account, why: `no page stands at ${relPath}, and a secret belongs to a page` }
    }

    const sidecar = sidecarFor(relPath)
    if (sidecar === null) {
      return { kind: "refused", account, why: `${relPath} names no sops file beside it` }
    }

    const next = new Map<string, string>([
      [ACCESS_KEY, args.accessToken],
      [REFRESH_KEY, args.refreshToken],
    ])
    for (const [key, value] of next) {
      const wrong = unfit(key, value)
      if (wrong !== null) return { kind: "refused", account, why: wrong }
    }

    const standing = expiryHeld(root, relPath)
    if (standing !== null && args.expiresAt <= standing) {
      return {
        kind: "stale",
        account,
        why:
          `the page holds a credential expiring ${new Date(standing).toISOString()} and this one expires ` +
          `${new Date(args.expiresAt).toISOString()}, so the fresher one stands`,
      }
    }

    const held = heldBy(root, sidecar)
    if (typeof held === "string") return { kind: "refused", account, why: held }
    for (const [key, value] of held) if (!next.has(key)) next.set(key, value)
    if (held.size === next.size && [...next].every(([key, value]) => held.get(key) === value)) {
      holdExpiry(root, relPath, args.expiresAt)
      dropHeld(root, relPath)
      return { kind: "unchanged", account, sidecar }
    }

    const composed = cipherFor(root, sidecar, next)
    if (composed.text === null) return { kind: "refused", account, why: composed.why }

    const back = valuesIn(root, sidecar, composed.text)
    if (back.values === null) {
      return { kind: "refused", account, why: `what was composed for ${sidecar} does not read back: ${back.why}` }
    }
    const unread = [...next.keys()].filter((key) => back.values.get(key) !== next.get(key))
    if (unread.length > 0 || back.values.size !== next.size) {
      return {
        kind: "refused",
        account,
        why: `${sidecar} does not read back what it was given for ${unread.join(", ")} — nothing was written`,
      }
    }

    const act: GatedAct = {
      repo: "akasha",
      writer: WRITER,
      message: `akasha: page-push ${sidecar}`,
      root,
    }
    const landed = landBodies(act, [{ relPath: sidecar, body: composed.text }])
    if (!landed.ok) {
      return {
        kind: "refused",
        account,
        why: `${landed.why} — ${heldBeside(root, relPath, next, args.expiresAt)}`,
      }
    }
    holdExpiry(root, relPath, args.expiresAt)
    dropHeld(root, relPath)
    return {
      kind: "pushed",
      account,
      sidecar,
      digests: PUSHED_KEYS.map((key) => `${key} ${digestOf(next.get(key) ?? "")}`),
      sha: landed.sha,
      unpushed: landed.unpushed,
    }
  } catch (thrown) {
    return {
      kind: "refused",
      account,
      why: `the page push threw, which it is written never to do: ${thrown instanceof Error ? thrown.message : thrown}`,
    }
  }
}
