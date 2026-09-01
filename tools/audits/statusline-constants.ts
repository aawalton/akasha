import { AKASHA, rootFor } from "@akasha/pages-system/checkout-roots"
import { judge, over } from "@akasha/verdict/outcome"
import { refusalText } from "../../refusal/refusal.ts"
import type { Check, RepoView } from "../lib/check.ts"

const NAME = "statusline-constants"

const SCRIPT = "akasha/code-system/shell-scripts/pages/statusline.shell-script.shell.sh"

const READER = "akasha/seat-system/seat-reading/seat-reading.module.code.ts"

const STORE = "tools/lib/attributes.ts"

const SCRIPT_SLOTS = /^SEAT_RENDER=\(([^)]*)\)/m
const STORE_ATTRIBUTES = /export const ATTRIBUTES = \[([^\]]*)\]/
const STORE_ASSIGNMENTS = /export const ASSIGNMENTS = \[([^\]]*)\]/
const READER_STATED = /const STATED: [^=]*= \{([^}]*)\}/
const STATED_KEY = /^\s*"?([A-Za-z][A-Za-z0-9-]*)"?:/gm

const VALUED: ReadonlySet<string> = new Set(["initiative", "on-call"])

// The keys the reader can answer for. A slot the script renders is asked for as `<slot>-slug`, so
// a slot with no such key here reads as a seat that states nothing rather than as a wrong name.
function statedKeys(body: string): ReadonlySet<string> {
  return new Set([...body.matchAll(STATED_KEY)].map((found) => found[1] as string))
}

function renderedSlots(body: string): readonly string[] {
  return body
    .trim()
    .split(/\s+/)
    .filter((word) => word !== "")
}

function readOr(repo: RepoView, relPath: string): string | null {
  try {
    return repo.read(relPath)
  } catch {
    return null
  }
}

function capture(body: string, pattern: RegExp): string | null {
  return pattern.exec(body)?.[1] ?? null
}

// THE SLOTS ARE COMPARED AS A SET AND NOT AS A SEQUENCE, so they are sorted before they are
// joined. The script turns each slot into `<slot>-slug` and asks the reader for it by name, so
// where a slot stands on the line decides only where it is printed.
//
// This compared them in order and refused a line that had been deliberately reordered — the role
// was put before the assignment so the line settles where it changes least, which is a display
// choice and no business of the declaration. What must agree is which slots are rendered.
function slugSlots(body: string): string {
  return body
    .trim()
    .split(/\s+/)
    .filter((word) => word !== "" && !VALUED.has(word))
    .sort()
    .join(" ")
}

function tsSlots(body: string): string {
  return [...body.matchAll(/"([^"]*)"/g)].map((found) => found[1]).join(" ")
}

export const statuslineConstants: Check = (repo) => {
  const root = rootFor(repo.roots, AKASHA)
  const sides = [SCRIPT, READER, STORE]
  const bodies = new Map<string, string>()
  for (const relPath of sides) {
    if (bodies.has(relPath)) continue
    const body = readOr(repo, relPath)
    if (body === null) {
      return {
        ...judge(NAME, `${relPath} could not be read`, [
          refusalText("statusline-side-unreadable", { path: relPath }, root),
        ]),
        population: over(0, "constant(s)"),
      }
    }
    bodies.set(relPath, body)
  }

  const found = new Map<string, string | null>()
  found.set(`ATTRIBUTES in ${STORE}`, capture(bodies.get(STORE) as string, STORE_ATTRIBUTES))
  found.set(`ASSIGNMENTS in ${STORE}`, capture(bodies.get(STORE) as string, STORE_ASSIGNMENTS))
  found.set(`SEAT_RENDER in ${SCRIPT}`, capture(bodies.get(SCRIPT) as string, SCRIPT_SLOTS))
  found.set(`STATED in ${READER}`, capture(bodies.get(READER) as string, READER_STATED))

  const unreadable = [...found]
    .filter(([, value]) => value === null)
    .map(([where]) => refusalText("statusline-constant-unlocated", { where }, root))
  if (unreadable.length > 0) {
    return {
      ...judge(NAME, "a constant could not be located", unreadable),
      population: over(found.size - unreadable.length, "constant(s)"),
    }
  }

  const renders = slugSlots(found.get(`SEAT_RENDER in ${SCRIPT}`) as string)
  const stated = [
    tsSlots(found.get(`ATTRIBUTES in ${STORE}`) as string),
    tsSlots(found.get(`ASSIGNMENTS in ${STORE}`) as string),
  ].join(" ")
  const declares = slugSlots(stated)
  const messages: string[] = []
  if (renders !== declares) {
    messages.push(refusalText("statusline-slots-disagree", { renders, declares }, root))
  }
  const answers = statedKeys(found.get(`STATED in ${READER}`) as string)
  for (const slot of renderedSlots(found.get(`SEAT_RENDER in ${SCRIPT}`) as string)) {
    const key = `${slot}-slug`
    if (answers.has(key)) continue
    messages.push(refusalText("statusline-slot-unanswerable", { slot, key, reader: READER }, root))
  }

  return {
    ...judge(NAME, `${renders} in \`${SCRIPT}\`, over ${answers.size} key(s)`, messages),
    population: over(found.size, "constant(s)"),
  }
}
