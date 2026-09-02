import type { Check } from "../lib/check.ts"
import { judge, over } from "@akasha/verdict/outcome"

const NAME = "seat-values-declared"

const TABLES = "tools/lib/seat-akasha-beside.ts"

// The one value carried by neither table, because it alone is built from a value and its stamp
// rather than copied. It is named in the writer, so the writer is read for it.
const WRITER = "tools/lib/seat-beside.ts"

const PAGE_TYPE = "akasha/seat-system/seat/seat.page-type.ts"

const CARRIED_BLOCK = /export const CARRIED[^=]*=\s*\{([\s\S]*?)\n\}/
const RECORDS_BLOCK = /export const RECORDS[^=]*=\s*\{([\s\S]*?)\n\}/
const PROPERTIES_BLOCK = /\n {2}properties: \[([\s\S]*?)\n {2}\]/
const REPLACED_LINE = /const REPLACED = "([^"]+)"/

const CARRIED_ENTRY = /at: \[([^\]]*)\]/g
const RECORDS_ENTRY = /:\s*"([A-Za-z][A-Za-z0-9]*)"/g
const DECLARED_ENTRY = /pagePropertySlug: "([^"]+)"/

function camel(slug: string): string {
  return slug.replace(/-([a-z0-9])/g, (_, one: string) => one.toUpperCase())
}

function firstOf(said: string): string | null {
  const found = /"([^"]+)"/.exec(said)
  return found === null ? null : (found[1] as string)
}

// WHAT THE TOOLS WRITE BESIDE A SEAT, BY THE NAME IT LANDS UNDER IN AKASHA. A record and a nested
// value both land under the first name in their path, which is the one akasha declares; the fields
// beneath it are the record property's own business and are declared there.
//
// Each name is kept with the file it was read out of. Two files write here, not one: the tables in
// TABLES, and the single name WRITER builds — TABLES:34 says in so many words that `context-replaced`
// is absent from it. A refusal that named TABLES for every value told whoever read it to go looking
// in a file that does not carry the name it quoted.
function carriedNames(body: string, writer: string): ReadonlyMap<string, string> {
  const found = new Map<string, string>()
  const carried = CARRIED_BLOCK.exec(body)?.[1]
  if (carried !== undefined) {
    for (const one of carried.matchAll(CARRIED_ENTRY)) {
      const first = firstOf(one[1] as string)
      if (first !== null && !found.has(first)) found.set(first, TABLES)
    }
  }
  const records = RECORDS_BLOCK.exec(body)?.[1]
  if (records !== undefined) {
    for (const one of records.matchAll(RECORDS_ENTRY)) {
      const name = one[1] as string
      if (!found.has(name)) found.set(name, TABLES)
    }
  }
  const replaced = REPLACED_LINE.exec(writer)?.[1]
  if (replaced !== undefined) {
    const name = camel(replaced)
    if (!found.has(name)) found.set(name, WRITER)
  }
  return found
}

// WHAT AKASHA DECLARES OF A SEAT, SPLIT BY WHERE THE VALUE STANDS. A declaration states the flag or
// it does not, and the properties page states what the silence means: a value stands in the commit
// unless the declaration carrying it says it does not. So the absence of the flag is read as the
// committed answer rather than as an unknown one.
function declaredNames(body: string): { beside: ReadonlySet<string>; committed: ReadonlySet<string> } {
  const beside = new Set<string>()
  const committed = new Set<string>()
  const block = PROPERTIES_BLOCK.exec(body)?.[1]
  if (block === undefined) return { beside, committed }
  for (const chunk of block.split("pagePropertySlug:").slice(1)) {
    const slug = DECLARED_ENTRY.exec(`pagePropertySlug:${chunk}`)?.[1]
    if (slug === undefined) continue
    const upTo = chunk.split("\n").slice(0, 6).join("\n")
    if (/uncommitted: true/.test(upTo)) beside.add(camel(slug))
    else committed.add(camel(slug))
  }
  return { beside, committed }
}

// EVERY VALUE OBSERVED OF A SEAT IS DECLARED ON ITS PAGE TYPE. `seat-system` states that as upkeep
// and nothing enforced it, so the table the tools write through and the declaration akasha keeps
// could disagree indefinitely without anything saying so.
//
// NOTHING BENEATH THIS CATCHES IT. `mergeUncommitted` validates no key against any page type, and
// the check that would — `page-matches-its-type` — never sees the file, because `pageNamed` excludes
// the `uncommitted` tail and the sidecar is gitignored besides. A value written under a name akasha
// does not declare lands and is read back by nothing.
//
// That is not hypothetical. `transcript-path` was declared committed and written beside for as long
// as both existed, and five keys were written to a store nothing read while their reads answered
// null. This is what would have said so on the first run.
export const seatValuesDeclared: Check = (repo) => {
  const bodies = new Map<string, string>()
  for (const relPath of [TABLES, WRITER, PAGE_TYPE]) {
    try {
      bodies.set(relPath, repo.read(relPath))
    } catch {
      return {
        ...judge(NAME, `${relPath} could not be read`, [
          `${relPath} could not be read, so what a seat carries cannot be judged against what akasha declares`,
        ]),
        population: over(0, "value(s)"),
      }
    }
  }

  const carried = carriedNames(bodies.get(TABLES) as string, bodies.get(WRITER) as string)
  const { beside, committed } = declaredNames(bodies.get(PAGE_TYPE) as string)
  if (carried.size === 0 || beside.size === 0) {
    return {
      ...judge(NAME, "a table could not be located", [
        `${carried.size} value(s) carried and ${beside.size} declared beside — one of the two could not be parsed`,
      ]),
      population: over(carried.size, "value(s)"),
    }
  }

  const messages: string[] = []
  for (const one of [...carried.keys()].sort()) {
    const wroteIt = carried.get(one) as string
    if (beside.has(one)) continue
    if (committed.has(one)) {
      messages.push(
        `${one} is written beside a seat's page by ${wroteIt} and declared committed by ${PAGE_TYPE} — ` +
          "a value that commits cannot be one observed of a seat"
      )
      continue
    }
    messages.push(
      `${one} is written beside a seat's page by ${wroteIt} and declared nowhere on ${PAGE_TYPE} — ` +
        "it lands under a name akasha carries nothing for and is read back by nothing"
    )
  }
  for (const one of [...beside].sort()) {
    if (carried.has(one)) continue
    messages.push(
      `${one} is declared beside a seat's page by ${PAGE_TYPE} and written by nothing in ` +
        `${TABLES} or ${WRITER}`
    )
  }

  return {
    ...judge(
      NAME,
      `${carried.size} value(s) written beside a seat agree with ${beside.size} declared beside it on its page type`,
      messages
    ),
    population: over(carried.size + beside.size, "value(s)"),
  }
}
