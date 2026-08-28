
import { readFileSync } from "node:fs"
import { DOMAIN_SLUG_KEY } from "./domain.ts"
import { stemOf } from "../../page/name/name.ts"
import { parseFrontmatter, textField } from "../../page/frontmatter.ts"
import { pageTypeOf } from "../../pages-system/page-type/page-type.ts"
import { isDirty } from "../../repo/roots/roots"

const SLOTS = ["role", "persona", "task", "domain"] as const

export type Slot = (typeof SLOTS)[number]

export type Vocabulary = Readonly<Record<Slot, readonly string[]>>

type Named = Exclude<Slot, "domain">

const NAMED = ["role", "persona", "task"] as const

function isNamed(kind: string | null): kind is Named {
  return NAMED.some((one) => one === kind)
}

/**
 * Every name a seat may state for each of its slots, off one walk of the repository.
 *
 * A SLOT'S PAGES ARE FOUND BY THE KIND THEIR NAMES CARRY, never by the directory they sit in.
 * This matched the path prefix `pages/<slot>/`, which is where a slot's pages stand only until
 * something moves them — and personas stand under `alan/persona/`. So this answered zero
 * personas and said nothing about it, and a seat naming its own persona was told the name was
 * not there. A page type states where its pages are written and that may change; the kind a
 * page's name carries settles what the page is and cannot drift from it.
 */
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
    if (isNamed(kind)) found[kind].push(stemOf(relPath))
  }
  return {
    role: found.role.sort(),
    persona: found.persona.sort(),
    task: found.task.sort(),
    domain: found.domain.sort(),
  }
}
