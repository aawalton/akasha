import { existsSync, readFileSync, statSync } from "node:fs"
import { slugNamed } from "../../page/page-address.ts"
import { frontmatter as readBlock } from "../../page/document/frontmatter.ts"
import { Source } from "../../page/document/position.ts"
import type { FileTree } from "../../page/file-tree.ts"
import { DEFINED_ON, PROPERTY_GLOBS } from "../../page/page-types.ts"
import { PROPERTY_KEY } from "../../page/property/declarations.ts"
import { kebabized } from "../../page/property/key-spelling.ts"
import { chainOf, compiledPageTypeFor } from "../../page/property/frontmatter.ts"
import { mentionPatches } from "../../repoint/mention.ts"
import { claimant, newPageNameFor, type PageType, pagesOf, reposOf } from "../../page/page-types.ts"
import { blockOf, stringAt, textAt } from "../../page/text/text.ts"
import { pageNameOf, pageStemOf } from "../../page/name/name.ts"
import type { Roots } from "../../page/page.ts"
import type { Landing } from "../../repo/land/land.ts"

export const DEFINING_REPO = "akasha"

export const DEFINITION_TYPE = "page-property-definition"

export const KEY_FALLBACK = /^[A-Za-z][A-Za-z0-9-]*$/

const TERM = /^- \*\*(.+?)\*\* — /m

const TOKEN_EDGE = /[A-Za-z0-9_-]/

export type Chains = Map<string, readonly string[] | null>

export interface Patch {
  readonly start: number
  readonly end: number
  readonly text: string
}

export interface Composed extends Landing {
  readonly at: number | null
  readonly authored: boolean
}

export interface Carrier {
  readonly relPath: string
  readonly repo: string
}

export interface Site {
  readonly relPath: string
  readonly line: number
  readonly text: string
}

export interface Rekeyed {
  readonly patched: ReadonlyMap<string, string>
  readonly twice: readonly string[]
}

export function applied(body: string, patches: readonly Patch[]): string {
  let out = body
  for (const patch of [...patches].sort((a, b) => b.start - a.start)) {
    out = out.slice(0, patch.start) + patch.text + out.slice(patch.end)
  }
  return out
}

export function frontmatterKeyAt(body: string, key: string): readonly number[] {
  const found: number[] = []
  for (const one of readBlock(Source(body)).keys) {
    if (one.name !== key) continue
    const at = one.span.start.offset
    if (body.slice(at, at + key.length) === key) found.push(at)
  }
  return found
}

export function rekeyedCarriers(
  paths: readonly string[],
  bodyFor: (relPath: string) => string,
  supplied: ReadonlySet<string>,
  old: string,
  next: string
): Rekeyed {
  const patched = new Map<string, string>()
  const twice: string[] = []
  for (const relPath of paths) {
    const body = bodyFor(relPath)
    const at = frontmatterKeyAt(body, old)
    const only = at[0]
    if (at.length === 0 && supplied.has(relPath) && frontmatterKeyAt(body, next).length === 1) continue
    if (at.length !== 1 || only === undefined) {
      twice.push(`        ${relPath} states \`${old}:\` ${at.length} time(s) at the top level`)
      continue
    }
    patched.set(relPath, applied(body, [{ start: only, end: only + old.length, text: next }]))
  }
  return { patched, twice }
}

function opensAt(body: string, at: number): boolean {
  if (at === 0) return true
  if (!TOKEN_EDGE.test(body[at - 1] as string)) return true
  return body[at - 2] === "\\"
}

export function sitesIn(body: string, key: string): readonly number[] {
  const found: number[] = []
  for (let at = body.indexOf(key); at !== -1; at = body.indexOf(key, at + 1)) {
    if (opensAt(body, at) && !TOKEN_EDGE.test(body[at + key.length] ?? "")) found.push(at)
  }
  return found
}

export function lineOf(body: string, at: number): number {
  return body.slice(0, at).split("\n").length
}

export function lineTextAt(body: string, at: number): string {
  const from = body.lastIndexOf("\n", at) + 1
  const to = body.indexOf("\n", at)
  return body.slice(from, to === -1 ? body.length : to).trim()
}

export function chainSlugs(type: PageType, tree: FileTree, cache: Chains): readonly string[] | null {
  const held = cache.get(type.slug)
  if (held !== undefined) return held
  const { relPaths } = chainOf(type, tree)
  const slugs = relPaths === null ? null : relPaths.map((at) => pageStemOf(at))
  cache.set(type.slug, slugs)
  return slugs
}

export function keyPatternOf(tree: FileTree, types: readonly PageType[]): RegExp {
  const declaring = types.find((one) => one.slug === DEFINITION_TYPE)
  if (declaring === undefined) return KEY_FALLBACK
  const { properties } = compiledPageTypeFor(declaring, tree)
  const stated = properties?.find((one) => one.name === PROPERTY_KEY)?.stated.pattern ?? null
  if (stated === null) return KEY_FALLBACK
  try {
    return new RegExp(stated)
  } catch {
    return KEY_FALLBACK
  }
}

export function definitionsOf(tree: FileTree, onType: string, key: string): readonly string[] {
  const found: string[] = []
  for (const relPath of tree.paths(PROPERTY_GLOBS)) {
    const text = tree.open(relPath)
    if (text === null) continue
    const { fm, why } = blockOf(text)
    if (why !== null) continue
    const held = stringAt(fm, DEFINED_ON)
    if (held === null || slugNamed(held) !== onType) continue
    if ((stringAt(fm, PROPERTY_KEY) ?? pageStemOf(relPath)) === key) found.push(relPath)
  }
  return found
}

export const propertyFileName = (on: string, key: string): string => {
  const named = kebabized(key)
  return named === on || named.startsWith(`${on}-`) ? named : `${on}-${named}`
}

export function definitionDestination(
  definition: string,
  types: readonly PageType[],
  on: string,
  key: string
): string | null {
  const carried = types.find((one) => one.slug === pageNameOf(definition)?.type)
  if (carried === undefined) return null
  return `${definition.slice(0, definition.lastIndexOf("/"))}/${newPageNameFor(carried, propertyFileName(on, key))}`
}

export function collidingTypes(
  types: readonly PageType[],
  tree: FileTree,
  cache: Chains,
  onType: string,
  key: string
): readonly string[] {
  const self = types.find((one) => one.slug === onType)
  const above = new Set(self === undefined ? [] : (chainSlugs(self, tree, cache) ?? []))
  above.delete(onType)
  const clash: string[] = []
  for (const type of types) {
    const chain = chainSlugs(type, tree, cache)
    if (chain === null || !chain.includes(onType)) continue
    const { properties } = compiledPageTypeFor(type, tree)
    for (const one of properties ?? [])
      if (one.name === key && !above.has(one.on)) clash.push(`${one.at} declares it on \`${one.on}\``)
  }
  return [...new Set(clash)]
}

export function carriersOf(
  roots: Roots,
  types: readonly PageType[],
  tree: FileTree,
  cache: Chains,
  onType: string,
  key: string
): readonly Carrier[] {
  const found: Carrier[] = []
  const seen = new Set<string>()
  for (const type of types) {
    for (const repo of reposOf(type)) {
      const root = (roots as unknown as Record<string, string>)[repo]
      if (root === undefined || !existsSync(root)) continue
      for (const relPath of pagesOf(root, type, repo)) {
        const mark = `${repo}:${relPath}`
        if (seen.has(mark)) continue
        seen.add(mark)
        let text: string
        try {
          text = readFileSync(`${root}/${relPath}`, "utf8")
        } catch {
          continue
        }
        const claim = claimant(relPath, types)
        if (claim.type === null) continue
        const chain = chainSlugs(claim.type, tree, cache)
        if (chain === null || !chain.includes(onType)) continue
        const { fm, why } = blockOf(text)
        if (why !== null || !fm.fields.has(key)) continue
        found.push({ relPath, repo })
      }
    }
  }
  return found
}

export function bodiesUnder(dir: string): ReadonlyMap<string, string> {
  const found = new Map<string, string>()
  for (const relPath of new Bun.Glob("**/*").scanSync({ cwd: dir, dot: true, onlyFiles: true })) {
    found.set(relPath, readFileSync(`${dir}/${relPath}`, "utf8"))
  }
  return found
}

export function currentMtime(root: string, relPath: string): number | null {
  try {
    return statSync(`${root}/${relPath}`).mtimeMs
  } catch {
    return null
  }
}

export function keyValuePatch(body: string, relPath: string, next: string): Patch | string {
  const stated = readBlock(Source(body)).keys.find((one) => one.name === PROPERTY_KEY)
  if (stated === undefined || stated.value.kind !== "scalar") {
    return `${relPath} states no scalar \`${PROPERTY_KEY}:\`, so nothing here names the key it governs`
  }
  return { start: stated.value.value.span.start.offset, end: stated.value.value.span.end.offset, text: next }
}

export function termOf(body: string): string | null {
  return TERM.exec(body)?.[1] ?? null
}

export interface Freshened {
  readonly refreshed: readonly Composed[]
  readonly rederived: number
  readonly gone: number
}

export function freshlyDerived(
  entries: readonly Composed[],
  root: string,
  carriers: ReadonlySet<string>,
  moves: ReadonlyMap<string, string>,
  roots: Roots,
  old: string,
  next: string
): Freshened {
  const derive = (current: string, relPath: string): string => {
    const rekeyed = carriers.has(relPath)
      ? (rekeyedCarriers([relPath], () => current, new Set<string>(), old, next).patched.get(relPath) ?? current)
      : current
    return applied(rekeyed, mentionPatches(rekeyed, moves, roots))
  }
  const refreshed: Composed[] = []
  let rederived = 0
  let gone = 0
  for (const one of entries) {
    if (one.authored || currentMtime(root, one.relPath) === one.at) {
      refreshed.push(one)
      continue
    }
    const current = textAt(root, one.relPath)
    if (current === null) {
      gone += 1
      continue
    }
    const body = derive(current, one.relPath)
    if (body !== one.body) rederived += 1
    refreshed.push({ ...one, body, at: currentMtime(root, one.relPath) })
  }
  return { refreshed, rederived, gone }
}
