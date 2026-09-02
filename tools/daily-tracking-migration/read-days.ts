/**
 * The file edge: markdown days and their jsonl sidecars read off a directory.
 *
 * This is the only file here that touches a disk. It answers a refusal rather than an empty day
 * where a file cannot be read, so a corpus half-read never passes for a corpus converted.
 */

import { readdirSync, readFileSync, statSync } from "node:fs"
import { join } from "node:path"
import { parse as parseYaml } from "yaml"
import type { DaySource, JsonObject } from "./convert.ts"
import { COMPLETED_TASKS_SLUG, SESSIONS_SLUG } from "./shape.ts"

const MD = ".daily-tracking.md"

export type ReadFault = {
  readonly at: string
  readonly why: string
}

export type Read = {
  readonly root: string
  readonly days: readonly DaySource[]
  readonly faults: readonly ReadFault[]
}

/**
 * Every row a sidecar holds, as the objects the lines parsed to.
 *
 * The line's own bytes are not kept. They were, while the rows moved across untouched; a row beside
 * an akasha page is re-keyed, so every line is written afresh and the bytes it arrived as are read
 * by nothing.
 */
function rowsIn(text: string, at: string, faults: ReadFault[]): readonly JsonObject[] {
  const out: JsonObject[] = []
  const lines = text.split("\n")
  for (let index = 0; index < lines.length; index += 1) {
    const raw = lines[index] ?? ""
    if (raw.trim() === "") {
      if (raw.length > 0) faults.push({ at: `${at}#${index + 1}`, why: "a line of whitespace" })
      continue
    }
    let held: unknown
    try {
      held = JSON.parse(raw)
    } catch (error) {
      faults.push({ at: `${at}#${index + 1}`, why: `no JSON (${(error as Error).message})` })
      continue
    }
    if (held === null || typeof held !== "object" || Array.isArray(held)) {
      faults.push({ at: `${at}#${index + 1}`, why: "no JSON object" })
      continue
    }
    out.push(held as JsonObject)
  }
  return out
}

function sidecar(
  root: string,
  day: string,
  propertySlug: string,
  faults: ReadFault[]
): readonly JsonObject[] {
  const at = `${day}.daily-tracking.${propertySlug}.jsonl`
  const full = join(root, at)
  const found = statSync(full, { throwIfNoEntry: false })
  if (found === undefined || !found.isFile()) return []
  return rowsIn(readFileSync(full, "utf8"), at, faults)
}

export function readDays(root: string): Read {
  const found = statSync(root, { throwIfNoEntry: false })
  if (found === undefined || !found.isDirectory()) {
    throw new Error(`'${root}' is no directory, so the corpus there is unknown rather than empty`)
  }
  const faults: ReadFault[] = []
  const days: DaySource[] = []
  for (const name of readdirSync(root).sort()) {
    if (!name.endsWith(MD)) continue
    const day = name.slice(0, -MD.length)
    const text = readFileSync(join(root, name), "utf8")
    const fenced = /^---\n([\s\S]*?)\n---\n?([\s\S]*)$/.exec(text)
    if (fenced === null) {
      faults.push({ at: name, why: "no frontmatter fence" })
      continue
    }
    if ((fenced[2] ?? "").trim() !== "") {
      faults.push({ at: name, why: "a body, and a day page carries none" })
      continue
    }
    let parsed: unknown
    try {
      parsed = parseYaml(fenced[1] ?? "")
    } catch (error) {
      faults.push({ at: name, why: `frontmatter is no yaml (${(error as Error).message})` })
      continue
    }
    if (parsed === null || typeof parsed !== "object" || Array.isArray(parsed)) {
      faults.push({ at: name, why: "frontmatter is no mapping" })
      continue
    }
    days.push({
      day,
      frontmatter: parsed as JsonObject,
      sessions: sidecar(root, day, SESSIONS_SLUG, faults),
      completedTasks: sidecar(root, day, COMPLETED_TASKS_SLUG, faults),
    })
  }
  return { root, days, faults }
}
