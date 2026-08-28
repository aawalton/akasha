
import { existsSync } from "node:fs"
import { scanGlob } from "../../page/glob/glob.ts"
import { isAttachmentFile } from "../../page/attachment-file.ts"
import { type Roots } from "../../page/page.ts"
import { AKASHA, isDirty, resolveRoots, rootFor } from "../../repo/roots/roots.ts"
import { pagePrefixOf, placeDirOf } from "../../page/page-types.ts"
import { pageTypeOf } from "../../pages-system/page-type/page-type.ts"
import { fileStemOf } from "../../page/name/name.ts"
import { pageTextOf } from "./seat-page-values.ts"
import { frontmatterOf } from "./seat-presence-read.ts"

const KEY = "initiative"

export const INITIATIVE_SLUG_KEY = "initiative-slug"

const SLUG_KEY = "slug"

const PLACES = [placeDirOf(KEY)]

export interface InitiativeRecord {
  readonly value: string
}

export interface InitiativePlace {
  readonly relPath: string
  readonly pageTypeSlug: string
}

function initiativeFiles(root: string): readonly string[] {
  const found: string[] = []
  for (const dir of PLACES) {
    if (!existsSync(`${root}/${dir}`)) continue
    for (const name of scanGlob("**/*.md", `${root}/${dir}`)) {
      const at = `${dir}/${name}`
      if (!isAttachmentFile(at)) found.push(at)
    }
  }
  return found.sort()
}

export function initiativeStemOf(bare: string, root: string): string | null {
  for (const [spelling, at] of initiativesIn(root)) {
    const [only] = at
    if (at.length !== 1 || only === undefined) continue
    if (frontmatterOf(`${root}/${only}`)?.[SLUG_KEY] === bare) return spelling
  }
  return null
}

export function initiativePlaceOf(bare: string, root: string): InitiativePlace | null {
  for (const at of initiativeFiles(root)) {
    const held = frontmatterOf(`${root}/${at}`)
    if (held === null || held[SLUG_KEY] !== bare) continue
    // THE NAME SETTLES THE PAGE TYPE. This read the file’s own `page-type-slug:` and handed that
    // on as the initiative’s page type, so a file under initiatives/ claiming another kind sent
    // `initiativeWarrant` to that kind’s page type page for its required reading, and the page type
    // the name carries went unread. The path that decides it was already in hand a line above.
    return { relPath: at, pageTypeSlug: pageTypeOf(at) ?? KEY }
  }
  return null
}

/**
 * What the seat states, spelled the way the files under initiatives/ spell it.
 *
 * A LOOKUP THAT MISSES KEEPS THE STATED SLUG rather than answering null. The seat page is composed
 * from this on every heartbeat, so a null does not read here as "could not resolve" — it takes the
 * assignment off the page, and the next heartbeat composes from the page it just emptied. Measured
 * on 2026-08-27: seven seats lost their initiative that way, none of them told. A slug naming no
 * file is a dangling relation, which the checks refuse out loud; forgetting it says nothing at all.
 */
export function initiativeOf(agent: string, roots: Roots = resolveRoots()): InitiativeRecord | null {
  const bare = pageTextOf(agent, INITIATIVE_SLUG_KEY)
  if (bare === null) return null
  return { value: initiativeStemOf(bare, rootFor(roots, AKASHA)) ?? bare }
}

export function spellingOf(at: string): string | null {
  const where = pagePrefixOf(at, "initiative")
  if (where === null) return null
  const parts = at.slice(where.length).split("/")
  return [...parts.slice(0, -1), fileStemOf(parts.at(-1) as string)].join("/")
}

export function initiativesIn(root: string): ReadonlyMap<string, readonly string[]> {
  const bySpelling = new Map<string, string[]>()
  for (const at of initiativeFiles(root)) {
    const whole = spellingOf(at)
    if (whole === null || isDirty(at)) continue
    const segments = whole.split("/")
    for (let from = segments.length - 1; from >= 0; from--) {
      const spelling = segments.slice(from).join("/")
      bySpelling.set(spelling, [...(bySpelling.get(spelling) ?? []), at])
    }
  }
  return bySpelling
}

export function refuseInitiative(slug: string, root: string): readonly string[] {
  const found = initiativesIn(root)
  const at = found.get(slug) ?? []
  if (at.length === 1) return []
  if (at.length > 1) {
    const apart = at.map((one) => spellingOf(one) ?? fileStemOf(one))
    return [
      `initiative: \`${slug}\` names ${at.join(" and ")} — a spelling reaching two files is ` +
        `refused rather than guessed apart. State one of: ${apart.join(", ")}`,
    ]
  }
  const known = [...found].filter(([, one]) => one.length === 1).map(([spelling]) => spelling)
  return [
    `initiative: nothing under ${placeDirOf(KEY)}/ is named \`${slug}\`, so the seat would name no ` +
      `initiative at all. There: ${known.length === 0 ? "nothing yet" : known.sort().join(", ")}`,
  ]
}

export function initiativeLine(record: InitiativeRecord | null): string {
  return `  ${KEY.padEnd(8)} ${record === null ? "— none stated" : record.value}`
}
