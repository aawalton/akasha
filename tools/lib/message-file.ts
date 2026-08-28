import {
  existsSync,
  mkdtempSync,
  readFileSync,
  readdirSync,
  rmSync,
  statSync,
  writeFileSync,
} from "node:fs"
import { dirname, join } from "node:path"
import { parseFrontmatter } from "../../page/frontmatter.ts"
import { MARKDOWN } from "../../page/page-file.ts"
import { AKASHA, akashaRoot } from "../../repo/roots/roots.ts"
import { toolArgv } from "./tool-argv.ts"
import { patchUncommitted, readUncommitted, removeUncommitted } from "../../page/uncommitted/uncommitted.ts"
import { placeDirOf } from "../../page/page-types.ts"

const PAGE_TYPE = "message"

const MESSAGES = placeDirOf(PAGE_TYPE)


const PAGE_SUFFIX = `.${PAGE_TYPE}${MARKDOWN}`

const SCRATCH = "/var/tmp"

const WRITER = "message-file-writer"

const TOOLS = dirname(import.meta.dir)

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

export interface Run {
  readonly code: number
  readonly output: string
}

export function runWriteTool(tool: string, args: readonly string[], writer: string): Run {
  const dir = mkdtempSync(join(SCRATCH, "message-file-"))
  const outPath = join(dir, "out.txt")
  try {
    const proc = Bun.spawnSync([process.execPath, ...toolArgv(tool, args, dirname(TOOLS))], {
      stdout: Bun.file(outPath),
      stderr: "pipe",
      env: { ...process.env, AGENT_ID: writer, ACTING_AGENT_ID: "" },
    })
    let output = ""
    try {
      output = readFileSync(outPath, "utf8")
    } catch {
      output = ""
    }
    const stderr = proc.stderr === null ? "" : new TextDecoder().decode(proc.stderr)
    return { code: proc.exitCode ?? 1, output: `${output}${stderr}` }
  } finally {
    rmSync(dir, { recursive: true, force: true })
  }
}

const FAILED = /^\s*\[[a-z-]+\]\s+fail\b/

export function whyRefused(report: string): string {
  const failed = report.split("\n").filter((line) => FAILED.test(line))
  return (failed.length === 0 ? report.trim() : failed.join("; ")).trim()
}

export function writeMessage(stated: {
  readonly to: string
  readonly from: string
  readonly warrant: Warrant
  readonly body: string
}): Written {
  const refused = recipientRefused(stated.to)
  if (refused !== null) return { kind: "refused", detail: refused }
  const id = Bun.randomUUIDv7()
  const relPath = messageRelPath(stated.to, id)
  const dir = mkdtempSync(join(SCRATCH, "message-file-"))
  try {
    const bodyPath = join(dir, "body.md")
    writeFileSync(bodyPath, composeMessage({ ...stated, slug: id }), "utf8")
    const wrote = runWriteTool("write.ts", [
      "--repo",
      AKASHA,
      "--file-path",
      join(akashaRoot(), relPath),
      "--content-file",
      bodyPath,
      "--mechanical",
      "--message",
      `message to ${stated.to} from ${stated.from}`,
    ], WRITER)
    return wrote.code === 0
      ? { kind: "written", id, relPath }
      : { kind: "refused", detail: whyRefused(wrote.output) }
  } finally {
    rmSync(dir, { recursive: true, force: true })
  }
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
  const taken = runWriteTool("rm.ts", [
    absolute,
    "--repo",
    AKASHA,
    "--message",
    `message to ${to} is read, and read is the file's absence`,
  ], WRITER)
  if (taken.code !== 0) return { kind: "refused", detail: whyRefused(taken.output) }
  removeUncommitted(absolute)
  return { kind: "taken" }
}
