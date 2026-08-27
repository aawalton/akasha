import type { Check } from "../lib/check.ts"
import { listField, parseFrontmatter } from "../../page/frontmatter.ts"
import { judge, over } from "../../outcome/outcome"
import { documentsOfType } from "../lib/pages-of-type.ts"
import { fromDisk, refusalText } from "../lib/refusal.ts"

const NAME = "graph-attributes-claimed"

const TYPES = ["old-graph-node-attribute", "old-graph-edge-attribute"]

const RECORDED = "attributes-slugs"

const COMPUTED = "writes-slugs"

const slugOf = (relPath: string): string => relPath.slice(relPath.lastIndexOf("/") + 1, -".md".length)

export const graphAttributesClaimed: Check = (repo) => {
  const attributes = new Set<string>()
  const recorded = new Map<string, string[]>()
  const computed = new Map<string, string[]>()
  const named = new Set(TYPES.flatMap((slug) => documentsOfType(repo.roots, repo.name, repo.documents, slug)))
  for (const relPath of repo.documents) {
    if (!relPath.endsWith(".md")) continue
    if (named.has(relPath)) attributes.add(slugOf(relPath))
    const frontmatter = parseFrontmatter(repo.read(relPath))
    for (const [key, claims] of [
      [RECORDED, recorded],
      [COMPUTED, computed],
    ] as const) {
      for (const named of listField(frontmatter, key)) {
        const held = claims.get(named)
        if (held === undefined) claims.set(named, [relPath])
        else held.push(relPath)
      }
    }
  }
  const messages: string[] = []
  for (const attribute of [...attributes].sort()) {
    const asRecorded = recorded.get(attribute) ?? []
    const asComputed = computed.get(attribute) ?? []
    if (asRecorded.length > 0 && asComputed.length > 0) {
      messages.push(
        refusalText(
          "graph-attribute-claimed-by-both",
          { attribute, recorded: asRecorded.join(", "), computed: asComputed.join(", ") },
          repo.roots.akasha,
          fromDisk
        )
      )
      continue
    }
    if (asRecorded.length === 0 && asComputed.length === 0) {
      messages.push(
        refusalText("graph-attribute-claimed-by-neither", { attribute }, repo.roots.akasha, fromDisk)
      )
    }
  }
  return {
    ...judge(NAME, `${attributes.size} graph attribute(s), ${messages.length} claimed by neither half or by both`, messages),
    population: over(attributes.size, "graph attribute domain"),
  }
}
