import { join } from "node:path"
import { type FileTree } from "../../page/file-tree.ts"
import { diskFileTree } from "../../page/file-tree.ts"
import { registryOf } from "../../page/property/registry.ts"
import { newPageNameFor, placeDirOf, placesIn, scanIn, soleRepoOf } from "../../page/page-types.ts"
import { stemOf as slugOf } from "../../page/name/name.ts"
import { type Roots } from "../../page/page.ts"
import { isAddressable } from "../../repo/roots/roots.ts"

export interface Where {
  readonly root: string
  readonly repo: string
  readonly relPath: string
  readonly path: string
}

export function whereFor(
  roots: Roots,
  pageType: string,
  name: string,
  tree: FileTree = diskFileTree(roots)
): Where | null {
  const type = registryOf(tree).find((one) => one.slug === pageType)
  if (type === undefined) return null
  const repo = soleRepoOf(type)
  if (repo === null || !isAddressable(repo)) return null
  const root = roots[repo]
  if (root === undefined) return null
  const stands = (one: string): boolean => {
    const last = one.split("/").at(-1) ?? one
    return last === `${name}.md` || slugOf(last) === name
  }
  const held = scanIn(root, placesIn(type, repo), repo).find(stands)
  const relPath = held ?? `${placeDirOf(type.slug)}/${newPageNameFor(type, name)}`
  return { root, repo, relPath, path: join(root, relPath) }
}
