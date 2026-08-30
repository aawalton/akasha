import { existsSync, readFileSync } from "node:fs"
import { relative } from "node:path"
import { diskFileTree } from "../../page/file-tree.ts"
import { type Frontmatter, parseFrontmatter } from "../../page/frontmatter.ts"
import { fileStemOf } from "../../page/name/name.ts"
import { placeDirOf, placesIn, reposOf, scanIn } from "../../page/page-types.ts"
import { compiledPageTypeFor } from "../../page/property/frontmatter.ts"
import { registryOf } from "../../page/property/registry.ts"
import { isDirty, resolveRoots } from "../../repo/roots/roots.ts"
import { domainsStanding } from "./akasha-domains.ts"
import { personaAt, personasStanding } from "./akasha-personas.ts"
import { ATTRIBUTES, type AttributeKey, DECLARATIONS, type Declaration } from "./attributes.ts"
import { listDocuments } from "./check.ts"
import { DOMAIN_SLUG_KEY, type Documents, domainNamed, slugsIn } from "./domain.ts"

export interface Found {
  readonly docs: Documents
  readonly slugs: ReadonlyMap<string, string>
  readonly frontmatter: ReadonlyMap<string, Frontmatter>
}

export function scan(root: string): Found {
  const frontmatter = new Map<string, Frontmatter>()
  for (const relPath of listDocuments(root)) {
    if (isDirty(relPath)) continue
    frontmatter.set(relPath, parseFrontmatter(readFileSync(`${root}/${relPath}`, "utf8")))
  }
  const standing = domainsStanding(root)
  for (const one of standing) frontmatter.set(one.relPath, one.frontmatter)
  const { slugs: fromMarkdown } = slugsIn(frontmatter)
  const slugs = new Map(fromMarkdown)
  // A page that has moved is read where it now lives, so the new system takes the
  // address. A bare slug is left where it stands, because it names whatever claimed
  // it first and a seat already resolves some of those to something else entirely.
  for (const one of standing) {
    slugs.set(one.address, one.relPath)
    if (!slugs.has(one.slug)) slugs.set(one.slug, one.relPath)
  }
  return {
    docs: {
      frontmatterOf: (at) => frontmatter.get(at) ?? null,
      domainAt: (slug) => domainNamed(slugs, slug),
    },
    slugs,
    frontmatter,
  }
}

function foldersFor(slot: Exclude<Declaration, "domain">): readonly string[] {
  return [placeDirOf(slot)]
}

function under(at: string, dirs: readonly string[]): boolean {
  return dirs.some((dir) => at.startsWith(`${dir}/`))
}

function stemsIn(
  root: string,
  dirs: readonly string[],
  slot: Exclude<Declaration, "domain">
): ReadonlyMap<string, readonly string[]> {
  const byStem = new Map<string, Set<string>>()
  const add = (at: string): void => {
    const stem = fileStemOf(at)
    const held = byStem.get(stem) ?? new Set<string>()
    held.add(at)
    byStem.set(stem, held)
  }
  const roots: Readonly<Record<string, string | undefined>> = { ...resolveRoots(), akasha: root }
  const type = registryOf(diskFileTree(roots)).find((one) => one.slug === slot)
  if (type !== undefined) {
    for (const repo of reposOf(type)) {
      const home = roots[repo]
      if (home === undefined || !existsSync(home)) continue
      for (const rel of scanIn(home, placesIn(type, repo), repo)) {
        if (isDirty(rel)) continue
        add(home === root ? rel : relative(root, `${home}/${rel}`))
      }
    }
  }
  if (byStem.size === 0) {
    for (const at of listDocuments(root)) {
      if (!under(at, dirs) || isDirty(at)) continue
      add(at)
    }
  }
  return new Map(
    [...byStem].map(([stem, held]): [string, readonly string[]] => [stem, [...held].sort()])
  )
}

export function documentFor(
  slot: Exclude<Declaration, "domain">,
  slug: string,
  root: string
): string | null {
  if (slot === "persona") return personaAt(root, slug)?.path ?? null
  const at = stemsIn(root, foldersFor(slot), slot).get(slug) ?? []
  return at.length === 1 ? (at[0] as string) : null
}

const SLUG_SUFFIX = "-slug"

const SEAT_TYPE = "seat"

const defaults = new Map<string, ReadonlyMap<string, string>>()

function statedDefaults(root: string): ReadonlyMap<string, string> {
  const held = defaults.get(root)
  if (held !== undefined) return held
  const tree = diskFileTree({ ...resolveRoots(), akasha: root })
  const seat = registryOf(tree).find((one) => one.slug === SEAT_TYPE)
  const made = new Map<string, string>()
  for (const one of seat === undefined ? [] : (compiledPageTypeFor(seat, tree).properties ?? [])) {
    const value = one.default
    if (typeof value === "string" && one.name.endsWith(SLUG_SUFFIX))
      made.set(one.name.slice(0, -SLUG_SUFFIX.length), value)
  }
  defaults.set(root, made)
  return made
}

export function defaultSlots(root: string): readonly AttributeKey[] {
  const held = statedDefaults(root)
  return ATTRIBUTES.filter((slot) => held.has(slot))
}

export function defaultFor(slot: Declaration, root: string): string | null {
  return statedDefaults(root).get(slot) ?? null
}

export function personaIsDefault(root: string, persona: string): boolean {
  return defaultFor("persona", root) === persona
}

export function resolveSlot(
  slot: Declaration,
  slug: string,
  root: string,
  found: Found
): { readonly relPath: string } | { readonly refusal: string } {
  if (slot === "domain") {
    const at = found.slugs.get(slug)
    if (at !== undefined) return { relPath: at }
    const known = [...found.slugs.keys()].sort()
    return {
      refusal:
        `no document declares \`${DOMAIN_SLUG_KEY}: ${slug}\`, so a statement of domain \`${slug}\` could ` +
        `never be read for. Declared here: ${known.length === 0 ? "none" : known.join(", ")}`,
    }
  }
  // The personas moved into the akasha system, where each stands as a `.persona.ts` page read
  // through the index rather than as a document under `pages/persona/`. She is read where she
  // now lives; the old folder holds none of them.
  if (slot === "persona") {
    const held = personaAt(root, slug)
    if (held !== null) return { relPath: held.path }
    const known = personasStanding(root).map((one) => one.slug)
    return {
      refusal:
        `no persona in the akasha system is named \`${slug}\`, so a statement of persona \`${slug}\` ` +
        `could never be read for. Standing there: ${known.join(", ")}`,
    }
  }
  const dirs = foldersFor(slot)
  const byStem = stemsIn(root, dirs, slot)
  const at = byStem.get(slug) ?? []
  if (at.length === 1) return { relPath: at[0] as string }
  if (at.length > 1) {
    return {
      refusal:
        `\`${slug}\` names ${at.length} documents under ${dirs.join("/, ")}/ — ${at.join(", ")} — and a seat ` +
        `holds one ${slot}. Rename one rather than having this choose.`,
    }
  }
  const known = [...byStem.keys()].sort()
  return {
    refusal:
      `nothing under ${dirs.join("/, ")}/ is named \`${slug}\`, so a statement of ${slot} \`${slug}\` could never be ` +
      `read for. In ${dirs.join("/, ")}/: ${known.length === 0 ? "nothing yet" : known.join(", ")}`,
  }
}

export interface Claimed {
  readonly slot: Declaration
  readonly slug: string
  readonly relPath: string | null
}

export function resolveAttributes(
  stated: Partial<Record<Declaration, string>>,
  tokens: readonly string[],
  root: string,
  found: Found
): { readonly assigned: readonly Claimed[] } | { readonly refusals: readonly string[] } {
  const claimed = new Map<Declaration, Claimed>()
  const refusals: string[] = []

  const claim = (slot: Declaration, slug: string, relPath: string | null): void => {
    const standing = claimed.get(slot)
    if (standing !== undefined) {
      refusals.push(
        `\`${standing.slug}\` and \`${slug}\` both name the ${slot}, and a seat holds one — ` +
          `state the slots with --persona, --domain and --role rather than as tokens`
      )
      return
    }
    claimed.set(slot, { slot, slug, relPath })
  }

  for (const slot of DECLARATIONS) {
    const slug = stated[slot]
    if (slug === undefined) continue
    if (slot === "role") {
      claim(slot, slug, null)
      continue
    }
    const resolved = resolveSlot(slot, slug, root, found)
    if ("refusal" in resolved) refusals.push(`${slot}: ${resolved.refusal}`)
    else claim(slot, slug, resolved.relPath)
  }

  for (const token of tokens) {
    const asDomain = resolveSlot("domain", token, root, found)
    if (!("refusal" in asDomain)) {
      claim("domain", token, asDomain.relPath)
      continue
    }
    refusals.push(`\`${token}\` names no domain. ${asDomain.refusal}`)
  }

  if (refusals.length > 0) return { refusals }
  return {
    assigned: DECLARATIONS.filter((slot) => claimed.has(slot)).map(
      (slot) => claimed.get(slot) as Claimed
    ),
  }
}
