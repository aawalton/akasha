import type { Check } from "../lib/check.ts"
import { linkWords, readFromDisk, resolveLinks, unresolved } from "../lib/links.ts"
import { judge, over } from "../../outcome/outcome.ts"
import { AKASHA, isDirty, rootFor, targetRoot } from "../../repo/roots/roots.ts"
import { isMortalPage } from "../page/mortal-page.ts"
import { fromElsewhereIn } from "../../checks-system/check/links-resolve/links-resolve.check.code.attachment.ts"
import { diskFileTree } from "../../page/file-tree.ts"
import { registryOf } from "../../page/property/registry.ts"

export const linksResolve: Check = (repo) => {
  const roots = { ...repo.roots, target: repo.name }
  const root = targetRoot(roots)
  const definitions = diskFileTree(roots)
  const fromElsewhere = fromElsewhereIn(definitions, registryOf(definitions))
  let total = 0
  let waived = 0
  let elsewhere = 0
  const cleanFailures: string[] = []
  const dirtyFailures: string[] = []
  for (const relPath of repo.documents) {
    if (fromElsewhere(`${repo.name}/${relPath}`)) {
      elsewhere += 1
      continue
    }
    const quotedOnly = isMortalPage(`${root}/${relPath}`, roots)
    if (quotedOnly) waived += 1
    const links = resolveLinks({
      relPath,
      body: repo.read(relPath),
      roots,
      exists: repo.exists,
      readAt: readFromDisk,
    })
    total += links.length
    for (const link of unresolved(links)) {
      if (quotedOnly && link.status !== "missing-quote") continue
      if (link.absolutePath !== null && isMortalPage(link.absolutePath, roots)) continue
      const message = linkWords(link, `${relPath}:${link.line}`, rootFor(repo.roots, AKASHA))
      if (isDirty(relPath)) dirtyFailures.push(message)
      else cleanFailures.push(message)
    }
  }
  const broken = cleanFailures.length + dirtyFailures.length
  const verdict = judge(
    "links-resolve",
    `${total - broken} of ${total} links resolve across ${repo.documents.length} documents — ${repo.documents.length - waived - elsewhere} judged whole, ${waived} mortal and judged on quoted text alone, ${elsewhere} carrying a body from elsewhere and not judged; ${cleanFailures.length} broken among the live documents, ${dirtyFailures.length} under quarantine`,
    cleanFailures
  )
  return {
    ...verdict,
    messages: [...cleanFailures, ...dirtyFailures],
    population: over(total, "link(s)"),
  }
}
