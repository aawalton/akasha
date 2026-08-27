
import type { Check } from "../lib/check.ts"
import { parseFrontmatter, textField } from "../../page/frontmatter.ts"
import { judge, over } from "../../outcome/outcome"
import { findingsDirIn } from "../lib/finding.ts"
import { fromDisk, refusalText } from "../lib/refusal.ts"

const DOMAIN_KEY = "domain-slug"
const STORE = "findings"

export const findingsSorted: Check = (repo) => {
  const root = repo.roots.akasha
  const store = findingsDirIn(repo.roots.memory)
  const failures: string[] = []
  const folders = new Set<string>()
  let sorted = 0
  let examined = 0

  for (const relPath of repo.documents) {
    if (!relPath.startsWith(`${store}/`)) continue
    const segments = relPath.slice(store.length + 1).split("/")
    examined += 1

    if (segments.length === 1) {
      failures.push(refusalText("finding-unfoldered", { path: relPath, store }, root, fromDisk))
      continue
    }
    if (segments.length > 2) {
      failures.push(
        refusalText("finding-too-deep", { path: relPath, depth: `${segments.length - 1}`, store }, root, fromDisk)
      )
      continue
    }

    const folder = segments[0] as string
    const leaf = segments[1] as string
    const owner = textField(parseFrontmatter(repo.read(relPath)), DOMAIN_KEY)
    if (owner === null) continue

    if (owner !== folder) {
      failures.push(
        refusalText("finding-misfiled", { path: relPath, owner, leaf, store }, root, fromDisk)
      )
      continue
    }

    folders.add(folder)
    sorted += 1
  }

  return {
    ...judge(
      `${STORE}-sorted`,
      `${sorted} finding(s) sorted under ${folders.size} domain folder(s)`,
      failures
    ),
    population: over(examined, `finding(s) under \`${store}/\``),
  }
}
