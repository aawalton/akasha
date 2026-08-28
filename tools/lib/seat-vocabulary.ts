
import { readFileSync } from "node:fs"
import { DOMAIN_SLUG_KEY } from "./domain.ts"
import { stemOf } from "../../page/name/name.ts"
import { parseFrontmatter, textField } from "../../page/frontmatter.ts"
import { placeDirOf } from "../../page/page-types.ts"
import { isDirty } from "../../repo/roots/roots"

const SLOTS = ["role", "persona", "task", "domain"] as const

export type Slot = (typeof SLOTS)[number]

export type Vocabulary = Readonly<Record<Slot, readonly string[]>>

type Named = Exclude<Slot, "domain">

const NAMED = ["role", "persona", "task"] as const

function placesFor(slot: Named): readonly string[] {
  return [`${placeDirOf(slot)}/`]
}

export function vocabularyOf(root: string): Vocabulary {
  const found: Record<Slot, string[]> = { role: [], persona: [], task: [], domain: [] }
  const places: Readonly<Record<Named, readonly string[]>> = {
    role: placesFor("role"),
    persona: placesFor("persona"),
    task: placesFor("task"),
  }
  for (const relPath of new Bun.Glob("**/*.md").scanSync({ cwd: root, dot: true })) {
    if (relPath.startsWith(".git/") || isDirty(relPath)) continue
    const slug = textField(
      parseFrontmatter(readFileSync(`${root}/${relPath}`, "utf8")),
      DOMAIN_SLUG_KEY
    )
    if (slug !== null) found.domain.push(slug)
    for (const slot of NAMED) {
      if (places[slot].some((dir) => relPath.startsWith(dir))) found[slot].push(stemOf(relPath))
    }
  }
  return {
    role: found.role.sort(),
    persona: found.persona.sort(),
    task: found.task.sort(),
    domain: found.domain.sort(),
  }
}
