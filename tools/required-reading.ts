export const tool = {
  summary: "Print what binds a path — the documents required for it and the page type specifying it",
  path: "domain required-reading",
} as const

import { existsSync, readFileSync } from "node:fs"
import type { Repo } from "../page/document/types.ts"
import { listDocuments } from "./lib/check.ts"
import { closure } from "./lib/closure.ts"
import { onceInCall } from "../during-call/during-call.ts"
import {
  type Documents,
  FILE_KIND_EXTENSION_KEY,
  FILE_PURPOSE_ENDING_KEY,
  PAGE_BODY_SECTION_HEADING_KEY,
  domainsAbove,
  requiredReadingClosure,
  domainNamed,
  slugsIn,
} from "./lib/domain.ts"
import { type Frontmatter, parseFrontmatter, textField } from "../page/frontmatter.ts"
import { type Manifests, manifestsUnder } from "./lib/package-manifest.ts"
import { fileIn } from "../page/repo-claim.ts"
import { placedElsewhere } from "./lib/page-type-repo.ts"
import { locatePath, printed } from "./lib/required-reading-cli.ts"
import { diskFileTree } from "../page/file-tree.ts"
import { pageTypeChain } from "../page/property/frontmatter.ts"
import { outOfBounds } from "../repo/path/path.ts"
import { AKASHA, isDirty, resolveRoots, rootFor } from "../repo/roots/roots.ts"

export interface Pending {
  readonly paths: ReadonlySet<string>
  readonly read: (relPath: string) => string | null
}

export interface RequiredReading {
  readonly whole: readonly string[]
  readonly sections: ReadonlyMap<string, readonly string[]>
}

interface Scan {
  readonly frontmatter: ReadonlyMap<string, Frontmatter>
  readonly docs: Documents
  readonly kinds: ReadonlyMap<string, string>
  readonly endings: ReadonlyMap<string, string>
  readonly named: ReadonlyMap<string, string>
  readonly headings: ReadonlyMap<string, string>
}

const FILE_KEY_TYPE = "file"

const PACKAGE_REPO_KEY = "repo"

function rootOf(repo: Repo, root: string): string {
  if (repo === AKASHA) return root
  const roots = resolveRoots()
  return roots[repo] === undefined ? root : rootFor(roots, repo)
}

function fileKeysIn(frontmatter: ReadonlyMap<string, Frontmatter>): ReadonlySet<string> {
  const keys = new Set<string>()
  for (const [, fm] of frontmatter) {
    if (textField(fm, "type") !== FILE_KEY_TYPE) continue
    const key = textField(fm, "key")
    if (key !== null) keys.add(key)
  }
  return keys
}

function extensionOf(relPath: string): string | null {
  const name = relPath.slice(relPath.lastIndexOf("/") + 1)
  const dot = name.lastIndexOf(".")
  return dot <= 0 ? null : name.slice(dot + 1)
}

function scan(root: string, pending: Pending | null): Scan {
  const named = pending === null ? "disk" : [...pending.paths].sort().join("\n")
  return onceInCall(`required-reading:${root}:${named}`, () => readScan(root, pending))
}

function readScan(root: string, pending: Pending | null): Scan {
  const frontmatter = new Map<string, Frontmatter>()
  const paths = new Set(listDocuments(root))
  for (const at of pending?.paths ?? []) if (at.endsWith(".md")) paths.add(at)
  for (const relPath of [...paths].sort()) {
    if (isDirty(relPath)) continue
    const body = pending === null ? readFileSync(`${root}/${relPath}`, "utf8") : pending.read(relPath)
    if (body === null) continue
    frontmatter.set(relPath, parseFrontmatter(body))
  }
  const { slugs } = slugsIn(frontmatter)
  const kinds = new Map<string, string>()
  const endings = new Map<string, string>()
  const headings = new Map<string, string>()
  for (const [at, fm] of frontmatter) {
    const extension = textField(fm, FILE_KIND_EXTENSION_KEY)
    if (extension !== null) kinds.set(extension, at)
    const ending = textField(fm, FILE_PURPOSE_ENDING_KEY)
    if (ending !== null) endings.set(ending, at)
    const heading = textField(fm, PAGE_BODY_SECTION_HEADING_KEY)
    if (heading !== null) headings.set(heading, at)
  }
  const named = new Map<string, string>()
  for (const fileKey of fileKeysIn(frontmatter)) {
    for (const [at, fm] of frontmatter) {
      const stated = textField(fm, fileKey)
      if (stated === null) continue
      const claim = fileIn(stated)
      named.set(`${claim.repo}:${claim.path}`, at)
    }
  }
  const roots = { ...resolveRoots(), akasha: root }
  const foreign = new Map<string, Frontmatter | null>()
  const foreignAt = (absolute: string): Frontmatter | null => {
    const held = foreign.get(absolute)
    if (held !== undefined) return held
    let parsed: Frontmatter | null = null
    try {
      parsed = parseFrontmatter(readFileSync(absolute, "utf8"))
    } catch {
      parsed = null
    }
    foreign.set(absolute, parsed)
    return parsed
  }
  const elsewhereAt = (slug: string): string | null => {
    const found = placedElsewhere(slug, root, roots)
    return found !== null && existsSync(found.absolute) ? found.absolute : null
  }
  return {
    frontmatter,
    docs: {
      frontmatterOf: (at) => (at.startsWith("/") ? foreignAt(at) : (frontmatter.get(at) ?? null)),
      domainAt: (slug) => domainNamed(slugs, slug) ?? elsewhereAt(slug),
    },
    kinds,
    endings,
    named,
    headings,
  }
}

export function requiredReadingFor(
  relPath: string,
  root: string,
  repo: Repo = "instructions",
  pending: Pending | null = null
): RequiredReading {
  const bad = outOfBounds(relPath)
  if (bad !== null) throw new TypeError(bad)
  return against(relPath, repo, scan(root, pending), manifestsUnder(rootOf(repo, root)))
}

export function requiredReadingWhole(
  relPath: string,
  root: string,
  repo: Repo = "instructions",
  pending: Pending | null = null
): readonly string[] {
  return requiredReadingFor(relPath, root, repo, pending).whole
}

export function requiredReadingForEach(
  relPaths: readonly string[],
  root: string,
  repo: Repo = "instructions",
  pending: Pending | null = null
): ReadonlyMap<string, readonly string[]> {
  for (const relPath of relPaths) {
    const bad = outOfBounds(relPath)
    if (bad !== null) throw new TypeError(bad)
  }
  const scanned = scan(root, pending)
  const manifests = manifestsUnder(rootOf(repo, root))
  const answered = new Map<string, readonly string[]>()
  for (const relPath of relPaths) answered.set(relPath, against(relPath, repo, scanned, manifests).whole)
  return answered
}

function packageAt(relPath: string, repo: Repo, docs: Documents, manifests: Manifests): string | null {
  const slug = manifests.slugFor(relPath)
  if (slug === null) return null
  const at = docs.domainAt(slug)
  if (at === null) return null
  const fm = docs.frontmatterOf(at)
  if (fm === null) return null
  return textField(fm, PACKAGE_REPO_KEY) === repo ? at : null
}

function against(relPath: string, repo: Repo, scanned: Scan, manifests: Manifests): RequiredReading {
  const sections = new Map<string, readonly string[]>()
  if (repo === "instructions" && isDirty(relPath)) return { whole: [], sections }
  const { docs } = scanned
  const seeds: string[] = []
  const anchored = new Map<string, string[]>()
  if (repo === "instructions") seeds.push(...domainsAbove(relPath, docs), ...requiredReadingClosure([relPath], docs))
  const standsIn = docs.domainAt(`${repo}-repo`)
  if (standsIn !== null) seeds.push(standsIn)
  const declaredBy = packageAt(relPath, repo, docs, manifests)
  if (declaredBy !== null) seeds.push(declaredBy)
  const extension = extensionOf(relPath)
  const kind = extension === null ? undefined : scanned.kinds.get(extension)
  if (kind !== undefined) seeds.push(kind)
  for (const [ending, at] of scanned.endings) if (relPath.endsWith(`.${ending}`)) seeds.push(at)
  const names = scanned.named.get(`${repo}:${relPath}`)
  if (names !== undefined) seeds.push(names)
  if (relPath.endsWith(".md")) {
    for (const [heading, at] of scanned.headings) {
      anchored.set(heading, [...(anchored.get(heading) ?? []), at])
    }
  }
  const above = (from: readonly string[]): readonly string[] =>
    [...closure(from, (at) => requiredReadingClosure([at], docs))].sort()
  for (const [section, ats] of anchored) sections.set(section, above([...new Set(ats)]))
  return { whole: above(seeds), sections }
}

if (import.meta.main) {
  const roots = resolveRoots()
  const located = locatePath(process.argv.slice(2), roots)
  process.stdout.write(
    printed(
      located.relPath,
      located.repo,
      requiredReadingFor(located.relPath, rootFor(roots, AKASHA), located.repo),
      pageTypeChain(located.relPath, located.repo, diskFileTree(roots)).relPaths ?? []
    )
  )
}
