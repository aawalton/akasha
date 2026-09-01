import { readFileSync } from "node:fs"
import { personasStanding } from "./akasha-personas.ts"
import { DOMAIN_SLUG_KEY } from "./domain.ts"
import { parseFrontmatter, textField } from "../../page/frontmatter.ts"
import { isDirty } from "@akasha/pages-system/checkout-roots"

const SLOTS = ["persona", "domain"] as const

export type Slot = (typeof SLOTS)[number]

export type Vocabulary = Readonly<Record<Slot, readonly string[]>>

function domainsIn(root: string): readonly string[] {
  const found: string[] = []
  for (const relPath of new Bun.Glob("**/*.md").scanSync({ cwd: root, dot: true })) {
    if (relPath.startsWith(".git/") || isDirty(relPath)) continue
    const slug = textField(
      parseFrontmatter(readFileSync(`${root}/${relPath}`, "utf8")),
      DOMAIN_SLUG_KEY
    )
    if (slug !== null) found.push(slug)
  }
  return found.sort()
}

export function vocabularyOf(root: string): Vocabulary {
  return {
    persona: personasStanding(root)
      .map((one) => one.slug)
      .sort(),
    domain: domainsIn(root),
  }
}
