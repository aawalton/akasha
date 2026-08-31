import { existsSync, readFileSync } from "node:fs"

import { exclusively } from "../../exclusive/exclusive.ts"
import { uncommittedPathFor, readUncommitted, writeUncommitted } from "../../page/uncommitted/uncommitted.ts"
import { akashaUncommittedKeys } from "./claude-account-akasha.ts"
import { type GatedAct, type Landed, landBodies, recordReading } from "./gated-landing.ts"
import { accountPage, pagesRoot } from "./oauth-page-push.ts"

const OPENER = "---"

const KEY_SHAPE = /^([a-z0-9][a-z0-9-]*):(?:\s|$)/

const WRITER = "claude-account-mark-writer"

export type Marks = Readonly<Record<string, string | null>>

export type MarkedText = { readonly text: string } | { readonly why: string }

export type PageMark =
  | { readonly kind: "held"; readonly account: string; readonly keys: readonly string[] }
  | { readonly kind: "unchanged"; readonly account: string }
  | { readonly kind: "skipped"; readonly account: string; readonly why: string }
  | { readonly kind: "refused"; readonly account: string; readonly why: string }

function unfit(key: string, value: string): string | null {
  if (value.includes("\n")) return `\`${key}\` holds a newline, and a mark is one line`
  if (value.trim() === "") return `\`${key}\` arrived empty, and a mark with no value is a removal`
  return null
}

export function markedFrontmatter(text: string, marks: Marks): MarkedText {
  const body = text.replace(/\r\n/g, "\n")
  if (!body.startsWith(`${OPENER}\n`)) return { why: "the page opens with no frontmatter block" }
  const lines = body.split("\n")
  const closer = lines.indexOf(OPENER, 1)
  if (closer === -1) return { why: "the page's frontmatter block is never closed" }

  for (const [key, value] of Object.entries(marks)) {
    if (!KEY_SHAPE.test(`${key}:`)) return { why: `\`${key}\` is not a key this writes` }
    if (value !== null) {
      const wrong = unfit(key, value)
      if (wrong !== null) return { why: wrong }
    }
  }

  const kept: string[] = []
  const written = new Set<string>()
  for (let i = 1; i < closer; i++) {
    const line = lines[i] ?? ""
    const named = KEY_SHAPE.exec(line)
    const key = named?.[1]
    if (key === undefined || !(key in marks)) {
      kept.push(line)
      continue
    }
    const next = lines[i + 1] ?? ""
    if (i + 1 < closer && !KEY_SHAPE.test(next)) {
      return { why: `\`${key}\` stands over more than one line, and a mark replaces one` }
    }
    const value = marks[key]
    written.add(key)
    if (value !== null && value !== undefined) kept.push(`${key}: ${value}`)
  }

  for (const [key, value] of Object.entries(marks)) {
    if (written.has(key) || value === null) continue
    kept.push(`${key}: ${value}`)
  }

  const rebuilt = [OPENER, ...kept, ...lines.slice(closer)].join("\n")
  return rebuilt === body ? { text: body } : { text: rebuilt }
}

function heldUncommitted(at: string, marks: Marks): string | null {
  try {
    exclusively(uncommittedPathFor(at), () => {
      const standing: Record<string, unknown> = { ...(readUncommitted(at) ?? {}) }
      for (const [key, value] of Object.entries(marks)) {
        if (value === null) delete standing[key]
        else standing[key] = value
      }
      writeUncommitted(at, standing)
    })
    return null
  } catch (thrown) {
    return `the volatile marks beside the page were not held: ${thrown instanceof Error ? thrown.message : thrown}`
  }
}

type Landing = Landed

function landedThroughTheGate(root: string, relPath: string, marks: Marks): Landing {
  const act: GatedAct = {
    repo: "akasha",
    writer: WRITER,
    message: `akasha: mark ${relPath}`,
    root,
  }
  const unrecorded = recordReading(act, [relPath])
  if (unrecorded !== null) return { ok: false, why: unrecorded }
  const standing = readFileSync(`${root}/${relPath}`, "utf8")
  const next = markedFrontmatter(standing, marks)
  if ("why" in next) return { ok: false, why: `${relPath}: ${next.why}` }
  if (next.text === standing) return { ok: true, sha: null, unpushed: null }
  return landBodies(act, [{ relPath, body: next.text }])
}

export function holdMarksOnPage(
  account: string,
  marks: Marks,
  root = pagesRoot()
): PageMark {
  try {
    const relPath = accountPage(account, root)
    const at = `${root}/${relPath}`
    if (!existsSync(at)) {
      return { kind: "skipped", account, why: `no page stands at ${relPath}, and a mark belongs to one` }
    }

    // Where each mark goes is declared on the claude-account page type and nowhere else. This
    // throws where that cannot be read, and the catch below answers it as a refusal, because a
    // mark written to the wrong side of the commit is worse than a mark not written at all.
    const uncommittedKeys = akashaUncommittedKeys()
    const uncommitted: Record<string, string | null> = {}
    const onPage: Record<string, string | null> = {}
    for (const [key, value] of Object.entries(marks)) {
      if (uncommittedKeys.has(key)) {
        uncommitted[key] = value
        onPage[key] = null
      } else {
        onPage[key] = value
      }
    }

    if (Object.keys(uncommitted).length > 0) {
      const wrong = heldUncommitted(at, uncommitted)
      if (wrong !== null) return { kind: "refused", account, why: wrong }
    }

    const standing = readFileSync(at, "utf8")
    const next = markedFrontmatter(standing, onPage)
    if ("why" in next) return { kind: "refused", account, why: `${relPath}: ${next.why}` }
    if (next.text === standing) {
      return Object.keys(uncommitted).length > 0
        ? { kind: "held", account, keys: Object.keys(marks) }
        : { kind: "unchanged", account }
    }

    const landed = landedThroughTheGate(root, relPath, onPage)
    if (!landed.ok) return { kind: "refused", account, why: landed.why }
    return { kind: "held", account, keys: Object.keys(marks) }
  } catch (thrown) {
    return {
      kind: "refused",
      account,
      why: `the page mark threw, which it is written never to do: ${thrown instanceof Error ? thrown.message : thrown}`,
    }
  }
}
