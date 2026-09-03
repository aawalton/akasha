import { existsSync, readdirSync, readFileSync, statSync } from "node:fs"
import { landBodies, landRemovals } from "@akasha/command-system/gated-landing"
import { parseFrontmatter } from "@akasha/markdown-pages/frontmatter"
import { MARKDOWN } from "@akasha/markdown-pages/page-file"
import { placeDirOf } from "@akasha/markdown-pages/page-types"
import {
  patchUncommitted,
  readUncommitted,
  removeUncommitted,
} from "@akasha/markdown-pages/uncommitted"
import { AKASHA, akashaRoot } from "@akasha/pages-system/checkout-roots"
import { akashaSeatIdForName } from "./seat-akasha-beside.ts"

const PAGE_TYPE = "message"

const MESSAGES = placeDirOf(PAGE_TYPE)

const PAGE_SUFFIX = `.${PAGE_TYPE}${MARKDOWN}`

const WRITER = "message-file-writer"

const CLAIMED_AT = "claimed-at"

export type Warrant = "announce" | "blocked"

export interface Message {
  readonly id: string
  readonly to: string
  readonly from: string
  readonly warrant: Warrant
  readonly body: string
  readonly claimedAtMs: number | null
  readonly relPath: string
}

export type Written =
  | { readonly kind: "written"; readonly id: string; readonly relPath: string }
  | { readonly kind: "refused"; readonly detail: string }

export type Taken =
  | { readonly kind: "taken" }
  | { readonly kind: "gone" }
  | { readonly kind: "refused"; readonly detail: string }

export function recipientRefused(to: string): string | null {
  if (to === "") return "a message is addressed to somebody, and this names nobody"
  if (to.includes("/") || to.includes("\\")) {
    return `\`${to}\` spells a path rather than a recipient, and a recipient is one directory`
  }
  if (to.startsWith(".")) return `\`${to}\` starts with a dot, which names no seat or persona`
  return null
}

export function messagesDirRelPath(): string {
  return MESSAGES
}

export function messageDirRelPath(to: string): string {
  return `${MESSAGES}/${to}`
}

export function messageRelPath(to: string, id: string): string {
  return `${messageDirRelPath(to)}/${id}${PAGE_SUFFIX}`
}

export function composeMessage(stated: {
  readonly slug: string
  readonly to: string
  readonly from: string
  readonly warrant: Warrant
  readonly body: string
}): string {
  const body = stated.body.endsWith("\n") ? stated.body : `${stated.body}\n`
  return [
    "---",
    `page-type-slug: ${PAGE_TYPE}`,
    `slug: ${stated.slug}`,
    `to: ${stated.to}`,
    `from: ${stated.from}`,
    `warrant: ${stated.warrant}`,
    "---",
    "",
    body,
  ].join("\n")
}

const FAILED = /^\s*\[[a-z-]+\]\s+fail\b/

export function whyRefused(report: string): string {
  const failed = report.split("\n").filter((line) => FAILED.test(line))
  return (failed.length === 0 ? report.trim() : failed.join("; ")).trim()
}

// A DELIVERY THAT MAKES ITS OWN DESTINATION CANNOT FAIL. `recipientRefused` bars a path and a
// dot and then takes any name at all, and the write below creates the directory it addresses. So
// a misspelled recipient was not a failed send: it was a new mailbox holding one message, and the
// caller was answered `written` with an id.
//
// That has already happened, measured 2026-09-02: `pages/message/` holds 68 messages nobody
// drained, in three directories no seat has ever been named for —
// `change-harness-cluster-operator` 39 (addressed by itself), `domain-archivist-review-documents`
// 28 (from `supervisor`), `amy-alan-handler` 1 (from `service`) — the newest of them 2026-08-27.
// Both directories named for a seat hold nothing, because a seat drains what it is sent.
//
// The predicate was already written and already reasoned, at `agent-record.ts:writeAnnouncement`,
// which refuses `no seat currently holds the name` rather than writing where nobody drains it. It
// guarded one caller of seven. It belongs here, under all of them.
//
// THE THIRD ANSWER IS THE POINT, and it is `agent-record.ts`'s own: a seat that is not there and
// a place where no seat can be read must not read alike. Where the seat index cannot be read at
// all, this writes rather than refusing — refusing there would take every message in the tree
// down with one unreadable checkout, which is a worse failure than the one being fixed.
function unknownRecipient(to: string): string | null {
  let known: boolean
  try {
    known = akashaSeatIdForName(to) !== null
  } catch {
    return null
  }
  if (known) return null
  return (
    `no seat holds the name \`${to}\`, so a message written there would wait in a directory ` +
    `nothing drains. Refused rather than landed, because a send nobody receives must not answer ` +
    `as one that arrived`
  )
}

export function writeMessage(stated: {
  readonly to: string
  readonly from: string
  readonly warrant: Warrant
  readonly body: string
}): Written {
  const refused = recipientRefused(stated.to)
  if (refused !== null) return { kind: "refused", detail: refused }
  const unknown = unknownRecipient(stated.to)
  if (unknown !== null) return { kind: "refused", detail: unknown }
  const id = Bun.randomUUIDv7()
  const relPath = messageRelPath(stated.to, id)
  const landed = landBodies(
    { repo: AKASHA, writer: WRITER, message: `message to ${stated.to} from ${stated.from}` },
    [{ relPath, body: composeMessage({ ...stated, slug: id }) }]
  )
  return landed.ok
    ? { kind: "written", id, relPath }
    : { kind: "refused", detail: whyRefused(landed.why) }
}

function claimedAtMsOf(absolute: string): number | null {
  const held = readUncommitted(absolute)?.[CLAIMED_AT]
  if (typeof held !== "string") return null
  const ms = Date.parse(held)
  return Number.isFinite(ms) ? ms : null
}

function messageAt(to: string, id: string, absolute: string): Message | null {
  let text: string
  try {
    text = readFileSync(absolute, "utf8")
  } catch {
    return null
  }
  const parsed = parseFrontmatter(text)
  const fields = Object.fromEntries(parsed.fields)
  const from = typeof fields.from === "string" ? fields.from : ""
  const stated = typeof fields.warrant === "string" ? fields.warrant : ""
  const warrant: Warrant = stated === "blocked" ? "blocked" : "announce"
  const body = text.replace(/\r\n/g, "\n").split("\n").slice(parsed.lineCount).join("\n")
  return {
    id,
    to,
    from,
    warrant,
    body,
    claimedAtMs: claimedAtMsOf(absolute),
    relPath: messageRelPath(to, id),
  }
}

export function messagesTo(to: string): readonly Message[] {
  if (recipientRefused(to) !== null) return []
  const dir = `${akashaRoot()}/${messageDirRelPath(to)}`
  let names: readonly string[]
  try {
    names = readdirSync(dir)
  } catch {
    return []
  }
  const held: Message[] = []
  for (const name of names) {
    if (!name.endsWith(PAGE_SUFFIX)) continue
    const one = messageAt(to, name.slice(0, -PAGE_SUFFIX.length), `${dir}/${name}`)
    if (one !== null) held.push(one)
  }
  return held.sort((a, b) => (a.id < b.id ? -1 : a.id > b.id ? 1 : 0))
}

export function unclaimedTo(to: string): readonly Message[] {
  return messagesTo(to).filter((one) => one.claimedAtMs === null)
}

export function everyRecipient(): readonly string[] {
  const dir = `${akashaRoot()}/${MESSAGES}`
  let names: readonly string[]
  try {
    names = readdirSync(dir)
  } catch {
    return []
  }
  return names
    .filter((name) => {
      if (recipientRefused(name) !== null) return false
      try {
        return statSync(`${dir}/${name}`).isDirectory()
      } catch {
        return false
      }
    })
    .sort()
}

export function messagesFrom(from: string): readonly Message[] {
  const held: Message[] = []
  for (const to of everyRecipient()) {
    for (const one of messagesTo(to)) if (one.from === from) held.push(one)
  }
  return held
}

export function claimedBefore(to: string, beforeMs: number): readonly Message[] {
  return messagesTo(to).filter((one) => one.claimedAtMs !== null && one.claimedAtMs < beforeMs)
}

export function claimMessage(to: string, id: string, atMs: number = Date.now()): boolean {
  const absolute = `${akashaRoot()}/${messageRelPath(to, id)}`
  if (!existsSync(absolute)) return false
  if (claimedAtMsOf(absolute) !== null) return false
  patchUncommitted(absolute, { [CLAIMED_AT]: new Date(atMs).toISOString() })
  return true
}

export function releaseClaim(to: string, id: string): void {
  removeUncommitted(`${akashaRoot()}/${messageRelPath(to, id)}`)
}

export function takeMessage(to: string, id: string): Taken {
  const relPath = messageRelPath(to, id)
  const absolute = `${akashaRoot()}/${relPath}`
  if (!existsSync(absolute)) {
    removeUncommitted(absolute)
    return { kind: "gone" }
  }
  const taken = landRemovals(
    {
      repo: AKASHA,
      writer: WRITER,
      message: `message to ${to} is read, and read is the file's absence`,
    },
    [relPath]
  )
  if (!taken.ok) return { kind: "refused", detail: whyRefused(taken.why) }
  removeUncommitted(absolute)
  return { kind: "taken" }
}
