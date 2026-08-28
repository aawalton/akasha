import { readFileSync } from "node:fs"
import { DOMAIN_SLUG_KEY } from "./domain.ts"
import { pageStemOf } from "../../page/name/name.ts"
import { parseFrontmatter, textField } from "../../page/frontmatter.ts"
import { pageTypeOf } from "../../pages-system/page-type/page-type.ts"
import { isDirty } from "../../repo/roots/roots.ts"

const SLOTS = ["role", "persona", "task", "domain"] as const

export type Slot = (typeof SLOTS)[number]

export type Vocabulary = Readonly<Record<Slot, readonly string[]>>

type Named = Exclude<Slot, "domain">

const NAMED = ["role", "persona", "task"] as const

function isNamed(kind: string | null): kind is Named {
  return NAMED.some((one) => one === kind)
}

export function vocabularyOf(root: string): Vocabulary {
  const found: Record<Slot, string[]> = { role: [], persona: [], task: [], domain: [] }
  for (const relPath of new Bun.Glob("**/*.md").scanSync({ cwd: root, dot: true })) {
    if (relPath.startsWith(".git/") || isDirty(relPath)) continue
    const slug = textField(
      parseFrontmatter(readFileSync(`${root}/${relPath}`, "utf8")),
      DOMAIN_SLUG_KEY
    )
    if (slug !== null) found.domain.push(slug)
    const kind = pageTypeOf(relPath)
    if (isNamed(kind)) found[kind].push(pageStemOf(relPath))
  }
  return {
    role: found.role.sort(),
    persona: found.persona.sort(),
    task: found.task.sort(),
    domain: found.domain.sort(),
  }
}
