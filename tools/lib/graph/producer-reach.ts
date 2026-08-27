import type { Repo } from "../../../page/document/types.ts"
import { parseFrontmatter } from "../../../page/frontmatter.ts"

/**
 * Where the pages declaring what each producer reads stand.
 *
 * THE PAGE TYPE IS `old-graph-node-producer` NOW, and these folders are named for it. Pointing at a
 * folder that is not there found no producer page, which left the reach at the two globs seeded in
 * `readProducerReach` — and narrowing the instructions reading to those took it to no files at all,
 * so every producer over that repository built from an empty tree and said nothing.
 */
export const PRODUCER_PAGE_DIR = "pages/old-graph-node-producer"

export const EDGE_PRODUCER_PAGE_DIR = "pages/old-graph-edge-producer"

const PRODUCER_PAGE_DIRS: readonly string[] = [PRODUCER_PAGE_DIR, EDGE_PRODUCER_PAGE_DIR]

export const READS_KEY = "reads-instructions-path"

export const REACHED_REPO: Repo = "instructions"

export type ReachTree = {
  readonly files: readonly string[]
  readonly read: (path: string) => string | null
}

export type Reach = ReadonlyMap<Repo, readonly string[]>

const globsIn = (value: unknown): readonly string[] => {
  if (typeof value === "string") return [value]
  if (!Array.isArray(value)) return []
  return value.filter((entry): entry is string => typeof entry === "string")
}

export const readProducerReach = (tree: ReachTree): Reach => {
  const globs = new Set<string>(PRODUCER_PAGE_DIRS.map((dir) => `${dir}/**`))
  for (const rel of tree.files) {
    const under = PRODUCER_PAGE_DIRS.some((dir) => rel.startsWith(`${dir}/`))
    if (!under || !rel.endsWith(".md")) continue
    const body = tree.read(rel)
    if (body === null) {
      throw new Error(`graph: ${rel} names a producer and the snapshot carries no body for it`)
    }
    const front = parseFrontmatter(body)
    if (front.error !== null) {
      throw new Error(`graph: ${rel} names a producer and its frontmatter ${front.error}`)
    }
    for (const glob of globsIn(front.fields.get(READS_KEY))) globs.add(glob)
  }
  return new Map([[REACHED_REPO, [...globs].sort()]])
}

export const withinReach = (path: string, globs: readonly string[]): boolean => {
  for (const glob of globs) {
    if (new Bun.Glob(glob).match(path)) return true
  }
  return false
}

export const narrowedTo = (
  files: readonly string[],
  globs: readonly string[] | undefined
): readonly string[] => (globs === undefined ? files : files.filter((path) => withinReach(path, globs)))
