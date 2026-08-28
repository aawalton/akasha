import { existsSync, mkdtempSync, readFileSync, readdirSync, rmSync, statSync, writeFileSync } from "node:fs"
import { join } from "node:path"
import { parseFrontmatter } from "../../page/frontmatter.ts"
import { type Warrant, recipientRefused, runWriteTool, whyRefused } from "./message-file.ts"
import { AKASHA, akashaRoot } from "../../repo/roots/roots"
import { removeUncommitted } from "../../page/uncommitted/uncommitted.ts"
import { pageStemOf } from "../../page/name/name"
import { placeDirOf } from "../../page/page-types.ts"

const PAGE_TYPE = "reminder"

export const REMINDERS = placeDirOf(PAGE_TYPE)

const PAGE_SUFFIX = ".md"


const SCRATCH = "/var/tmp"

const WRITER = "reminder-file-writer"

export interface Reminder {
  readonly id: string
  readonly to: string
  readonly from: string
  readonly warrant: Warrant
  readonly schedule: string
  readonly body: string
  readonly absolute: string
  readonly relPath: string
}

export type Written =
  | { readonly kind: "written"; readonly id: string; readonly relPath: string }
  | { readonly kind: "refused"; readonly detail: string }

export type Taken =
  | { readonly kind: "taken" }
  | { readonly kind: "gone" }
  | { readonly kind: "refused"; readonly detail: string }

export function reminderDirRelPath(to: string): string {
  return `${REMINDERS}/${to}`
}

export function reminderRelPath(to: string, id: string): string {
  return `${reminderDirRelPath(to)}/${id}.${PAGE_TYPE}${PAGE_SUFFIX}`
}

// A reminder states the name it is addressed by. That name is the id its file is placed under by
// `reminderRelPath`, which is the file's stem.
export function composeReminder(stated: {
  readonly slug: string
  readonly to: string
  readonly from: string
  readonly warrant: Warrant
  readonly schedule: string
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
    `schedule: ${stated.schedule}`,
    "---",
    "",
    body,
  ].join("\n")
}

export function reminderAt(absolute: string, relPath: string, id: string): Reminder | null {
  let text: string
  try {
    text = readFileSync(absolute, "utf8")
  } catch {
    return null
  }
  const parsed = parseFrontmatter(text)
  const fields = Object.fromEntries(parsed.fields)
  const to = typeof fields.to === "string" ? fields.to : ""
  const schedule = typeof fields.schedule === "string" ? fields.schedule : ""
  if (to === "" || schedule === "") return null
  const stated = typeof fields.warrant === "string" ? fields.warrant : ""
  return {
    id,
    to,
    from: typeof fields.from === "string" ? fields.from : "",
    warrant: stated === "blocked" ? "blocked" : "announce",
    schedule,
    body: text.replace(/\r\n/g, "\n").split("\n").slice(parsed.lineCount).join("\n"),
    absolute,
    relPath,
  }
}

function namesUnder(dir: string): readonly string[] {
  try {
    return readdirSync(dir)
  } catch {
    return []
  }
}

function inPathOrder(held: readonly Reminder[]): readonly Reminder[] {
  return [...held].sort((a, b) => (a.relPath < b.relPath ? -1 : a.relPath > b.relPath ? 1 : 0))
}

export function remindersTo(recipient: string): readonly Reminder[] {
  if (recipient === "") return []
  const dir = `${akashaRoot()}/${reminderDirRelPath(recipient)}`
  try {
    if (!statSync(dir).isDirectory()) return []
  } catch {
    return []
  }
  const held: Reminder[] = []
  for (const name of namesUnder(dir)) {
    if (!name.endsWith(`.${PAGE_TYPE}${PAGE_SUFFIX}`)) continue
    const one = reminderAt(`${dir}/${name}`, `${reminderDirRelPath(recipient)}/${name}`, pageStemOf(name))
    if (one !== null) held.push(one)
  }
  return inPathOrder(held)
}

export function everyReminder(): readonly Reminder[] {
  const root = `${akashaRoot()}/${REMINDERS}`
  const held: Reminder[] = []
  for (const recipient of namesUnder(root)) held.push(...remindersTo(recipient))
  return inPathOrder(held)
}

export function selfRemindersOf(seat: string): readonly Reminder[] {
  return remindersTo(seat).filter((one) => one.from === seat)
}

export function writeReminder(stated: {
  readonly to: string
  readonly from: string
  readonly warrant: Warrant
  readonly schedule: string
  readonly body: string
}): Written {
  const refused = recipientRefused(stated.to)
  if (refused !== null) return { kind: "refused", detail: refused }
  const id = Bun.randomUUIDv7()
  const relPath = reminderRelPath(stated.to, id)
  const dir = mkdtempSync(join(SCRATCH, "reminder-file-"))
  try {
    const bodyPath = join(dir, "body.md")
    writeFileSync(bodyPath, composeReminder({ ...stated, slug: id }), "utf8")
    const wrote = runWriteTool(
      "write.ts",
      [
        "--repo",
        AKASHA,
        "--file-path",
        join(akashaRoot(), relPath),
        "--content-file",
        bodyPath,
        "--mechanical",
        "--message",
        `reminder to ${stated.to} on ${stated.schedule}`,
      ],
      WRITER
    )
    return wrote.code === 0
      ? { kind: "written", id, relPath }
      : { kind: "refused", detail: whyRefused(wrote.output) }
  } finally {
    rmSync(dir, { recursive: true, force: true })
  }
}

export function takeReminder(to: string, id: string, why: string): Taken {
  const absolute = `${akashaRoot()}/${reminderRelPath(to, id)}`
  if (!existsSync(absolute)) {
    removeUncommitted(absolute)
    return { kind: "gone" }
  }
  const taken = runWriteTool("rm.ts", [absolute, "--repo", AKASHA, "--message", why], WRITER)
  if (taken.code !== 0) return { kind: "refused", detail: whyRefused(taken.output) }
  removeUncommitted(absolute)
  return { kind: "taken" }
}

export type Elapse =
  | { readonly kind: "at"; readonly ms: number }
  | { readonly kind: "never" }
  | { readonly kind: "invalid"; readonly detail: string }

export function nextElapse(schedule: string): Elapse {
  const proc = Bun.spawnSync(["systemd-analyze", "calendar", schedule, "--iterations=1"], {
    stdout: "pipe",
    stderr: "pipe",
  })
  const out = new TextDecoder().decode(proc.stdout)
  if ((proc.exitCode ?? 1) !== 0) {
    const why = new TextDecoder().decode(proc.stderr).trim()
    return { kind: "invalid", detail: why === "" ? out.trim() : why }
  }
  if (/Next elapse:\s*never/i.test(out)) return { kind: "never" }
  const named = out.match(/\(in UTC\):\s*\S+\s+(\d{4}-\d{2}-\d{2})\s+(\d{2}:\d{2}:\d{2})/)
  if (named === null) {
    return { kind: "invalid", detail: "systemd named no next elapse in a form this could read" }
  }
  const ms = Date.parse(`${named[1]}T${named[2]}Z`)
  return Number.isFinite(ms)
    ? { kind: "at", ms }
    : { kind: "invalid", detail: `systemd named ${named[1]} ${named[2]}, which is no instant` }
}
