import { existsSync, readdirSync, readFileSync, statSync } from "node:fs"
import { landBodies, landRemovals } from "@akasha/command-system/gated-landing"
import { parseFrontmatter } from "@akasha/markdown-pages/frontmatter"
import { MARKDOWN } from "@akasha/markdown-pages/page-file"
import { placeDirOf } from "@akasha/markdown-pages/page-types"
import {
  patchUncommitted,
  readUncommitted,
  removeUncommitted as removeBesideMarkdown,
} from "@akasha/markdown-pages/uncommitted"
import { AKASHA, akashaRoot } from "@akasha/pages-system/checkout-roots"
import {
  mergeUncommitted,
  removeUncommitted as removeBesidePage,
  uncommittedIn,
} from "@akasha/pages-system/page-uncommitted"
import { valueAt } from "@akasha/pages-system/page-value"
import { composedFor } from "@akasha/pages-system-service/composing"
import { akashaSeatIdForName } from "../../akasha/seat-system/seat-akasha-beside/seat-akasha-beside.module.code.ts"

const PAGE_TYPE = "message"

const WRITER = "message-file-writer"

// WHERE A MESSAGE IS WRITTEN NOW. A message is a page under the akasha `message` page type,
// named for the last twelve hex of its id behind the page type slug, because a uuid's camelCase
// form opens with a digit and no `export const` may be declared under such a name.
const PAGES_AT = "akasha/seat-system/messages/pages"

const PAGE_EXT = `.${PAGE_TYPE}.ts`

const CLAIMED_AT_KEY = "claimedAt"

// WHERE A MESSAGE WAS WRITTEN BEFORE. Read still, never written, so that no message already
// waiting is lost while the two stores both hold mail. This goes once the old store is empty.
const MESSAGES = placeDirOf(PAGE_TYPE)

const PAGE_SUFFIX = `.${PAGE_TYPE}${MARKDOWN}`

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

// THE STORE WATCHED IS THE STORE READ. Both of these name a directory handed to `fs.watch` by
// message-file-watch and pending-maintaining. They answer where a message is written now, so a
// watch fires on the store a message actually arrives in.
export function messagesDirRelPath(): string {
  return PAGES_AT
}

export function messageDirRelPath(_to: string): string {
  return PAGES_AT
}

export function slugForId(id: string): string {
  return `${PAGE_TYPE}-${id.slice(-12)}`
}

export function messageRelPath(_to: string, id: string): string {
  const stem = id.startsWith(`${PAGE_TYPE}-`) ? id : slugForId(id)
  return `${PAGES_AT}/${stem}${PAGE_EXT}`
}

export function markdownRelPath(to: string, id: string): string {
  return `${MESSAGES}/${to}/${id}${PAGE_SUFFIX}`
}

const FAILED = /^\s*\[[a-z-]+\]\s+fail\b/

export function whyRefused(report: string): string {
  const failed = report.split("\n").filter((line) => FAILED.test(line))
  return (failed.length === 0 ? report.trim() : failed.join("; ")).trim()
}

// A DELIVERY THAT MAKES ITS OWN DESTINATION CANNOT FAIL, so a misspelled recipient was not a
// failed send but a new mailbox holding one message. Where the seat index cannot be read at all
// this writes rather than refusing: refusing there would take every message in the tree down with
// one unreadable checkout, which is a worse failure than the one being answered.
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
  const slug = slugForId(id)
  const root = akashaRoot()
  const body = stated.body.endsWith("\n") ? stated.body : `${stated.body}\n`
  const composed = composedFor(root, {
    pageTypeSlug: PAGE_TYPE,
    slug,
    values: {
      id,
      pageTypeSlug: PAGE_TYPE,
      slug,
      to: stated.to,
      from: stated.from,
      warrant: stated.warrant,
      body,
    },
  })
  if ("refused" in composed) return { kind: "refused", detail: composed.refused }
  if (!composed.put.path.startsWith(`${PAGES_AT}/`)) {
    return {
      kind: "refused",
      detail:
        `a message page would land at ${composed.put.path}, outside ${PAGES_AT}, which is ` +
        `the only place read here, so nothing would ever drain it`,
    }
  }
  const landed = landBodies(
    { repo: AKASHA, writer: WRITER, message: `message to ${stated.to} from ${stated.from}` },
    [{ relPath: composed.put.path, body: composed.put.content }]
  )
  return landed.ok
    ? { kind: "written", id: slug, relPath: composed.put.path }
    : { kind: "refused", detail: whyRefused(landed.why) }
}

function msOf(said: unknown): number | null {
  if (typeof said !== "string") return null
  const ms = Date.parse(said)
  return Number.isFinite(ms) ? ms : null
}

function pageMessages(): readonly Message[] {
  const root = akashaRoot()
  let names: readonly string[]
  try {
    names = readdirSync(`${root}/${PAGES_AT}`)
  } catch {
    return []
  }
  const held: Message[] = []
  for (const name of names) {
    if (!name.endsWith(PAGE_EXT)) continue
    const relPath = `${PAGES_AT}/${name}`
    let value
    try {
      value = valueAt(relPath, root)
    } catch {
      continue
    }
    if (value === null || value === undefined) continue
    const stated = value["warrant"]
    held.push({
      id: name.slice(0, -PAGE_EXT.length),
      to: typeof value["to"] === "string" ? value["to"] : "",
      from: typeof value["from"] === "string" ? value["from"] : "",
      warrant: stated === "blocked" ? "blocked" : "announce",
      body: typeof value["body"] === "string" ? value["body"] : "",
      claimedAtMs: msOf(uncommittedIn(root, relPath)?.[CLAIMED_AT_KEY]),
      relPath,
    })
  }
  return held
}

function markdownMessageAt(to: string, id: string, absolute: string): Message | null {
  let text: string
  try {
    text = readFileSync(absolute, "utf8")
  } catch {
    return null
  }
  const parsed = parseFrontmatter(text)
  const fields = Object.fromEntries(parsed.fields)
  const stated = typeof fields.warrant === "string" ? fields.warrant : ""
  return {
    id,
    to,
    from: typeof fields.from === "string" ? fields.from : "",
    warrant: stated === "blocked" ? "blocked" : "announce",
    body: text.replace(/\r\n/g, "\n").split("\n").slice(parsed.lineCount).join("\n"),
    claimedAtMs: msOf(readUncommitted(absolute)?.[CLAIMED_AT]),
    relPath: markdownRelPath(to, id),
  }
}

function markdownMessagesTo(to: string): readonly Message[] {
  const dir = `${akashaRoot()}/${MESSAGES}/${to}`
  let names: readonly string[]
  try {
    names = readdirSync(dir)
  } catch {
    return []
  }
  const held: Message[] = []
  for (const name of names) {
    if (!name.endsWith(PAGE_SUFFIX)) continue
    const one = markdownMessageAt(to, name.slice(0, -PAGE_SUFFIX.length), `${dir}/${name}`)
    if (one !== null) held.push(one)
  }
  return held
}

// BOTH STORES ARE DRAINED. A message waiting in the old store is delivered as it always was, so
// moving where a message is written loses nobody's mail.
export function messagesTo(to: string): readonly Message[] {
  if (recipientRefused(to) !== null) return []
  const held = [...pageMessages().filter((one) => one.to === to), ...markdownMessagesTo(to)]
  return held.sort((a, b) => (a.id < b.id ? -1 : a.id > b.id ? 1 : 0))
}

export function unclaimedTo(to: string): readonly Message[] {
  return messagesTo(to).filter((one) => one.claimedAtMs === null)
}

function markdownRecipients(): readonly string[] {
  const dir = `${akashaRoot()}/${MESSAGES}`
  let names: readonly string[]
  try {
    names = readdirSync(dir)
  } catch {
    return []
  }
  return names.filter((name) => {
    if (recipientRefused(name) !== null) return false
    try {
      return statSync(`${dir}/${name}`).isDirectory()
    } catch {
      return false
    }
  })
}

export function everyRecipient(): readonly string[] {
  const held = new Set<string>(markdownRecipients())
  for (const one of pageMessages()) if (one.to !== "") held.add(one.to)
  return [...held].sort()
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

// WHICH STORE HOLDS IT is answered by the page file being there, never by the shape of the id,
// so a stem that could be read either way is still resolved by what is on disk.
function heldAt(to: string, id: string): { readonly relPath: string; readonly page: boolean } {
  const asPage = messageRelPath(to, id)
  if (existsSync(`${akashaRoot()}/${asPage}`)) return { relPath: asPage, page: true }
  return { relPath: markdownRelPath(to, id), page: false }
}

export function claimMessage(to: string, id: string, atMs: number = Date.now()): boolean {
  const root = akashaRoot()
  const held = heldAt(to, id)
  const absolute = `${root}/${held.relPath}`
  if (!existsSync(absolute)) return false
  const said = new Date(atMs).toISOString()
  if (held.page) {
    if (msOf(uncommittedIn(root, held.relPath)?.[CLAIMED_AT_KEY]) !== null) return false
    mergeUncommitted(root, held.relPath, { [CLAIMED_AT_KEY]: said })
    return true
  }
  if (msOf(readUncommitted(absolute)?.[CLAIMED_AT]) !== null) return false
  patchUncommitted(absolute, { [CLAIMED_AT]: said })
  return true
}

export function releaseClaim(to: string, id: string): void {
  const root = akashaRoot()
  const held = heldAt(to, id)
  if (held.page) {
    removeBesidePage(root, held.relPath)
    return
  }
  removeBesideMarkdown(`${root}/${held.relPath}`)
}

export function takeMessage(to: string, id: string): Taken {
  const root = akashaRoot()
  const held = heldAt(to, id)
  const absolute = `${root}/${held.relPath}`
  if (!existsSync(absolute)) {
    releaseClaim(to, id)
    return { kind: "gone" }
  }
  const taken = landRemovals(
    {
      repo: AKASHA,
      writer: WRITER,
      message: `message to ${to} is read, and read is the file's absence`,
    },
    [held.relPath]
  )
  if (!taken.ok) return { kind: "refused", detail: whyRefused(taken.why) }
  releaseClaim(to, id)
  return { kind: "taken" }
}
