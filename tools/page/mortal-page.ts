
import { type Roots } from "../../page/page"
import { locate, REPOS } from "../../repo/roots/roots"
import { parseFrontmatter, textField } from "../../page/frontmatter.ts"
import { diskFileTree } from "../../page/file-tree.ts"
import { registryOf } from "../../page/property/registry.ts"
import { claimant, type PageType } from "../../page/page-types.ts"
import { textAt } from "../../page/text/text.ts"
export const MORTAL_KEY = "mortal"

const registries = new Map<string, readonly PageType[]>()

function pageTypesOnDisk(roots: Roots): readonly PageType[] {
  const at = REPOS.map((repo) => roots[repo]).join("\n")
  const held = registries.get(at)
  if (held !== undefined) return held
  const made = registryOf(diskFileTree(roots))
  registries.set(at, made)
  return made
}

const mortality = new Map<string, boolean>()

function statesMortal(one: PageType, roots: Roots): boolean {
  const at = `${roots.instructions}/${one.relPath}`
  const held = mortality.get(at)
  if (held !== undefined) return held
  const text = textAt(roots.instructions, one.relPath)
  const says = text !== null && textField(parseFrontmatter(text), MORTAL_KEY) === "true"
  mortality.set(at, says)
  return says
}

export function isMortalPage(absolute: string, roots: Roots): boolean {
  const at = locate(absolute, roots)
  if (at === null) return false
  const claim = claimant(at.relPath, at.repo, pageTypesOnDisk(roots))
  return claim.type !== null && statesMortal(claim.type, roots)
}
