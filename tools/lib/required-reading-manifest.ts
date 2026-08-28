
import { DOMAIN_REQUIRED_READING_KEY } from "./domain.ts"
import { bullets } from "./markdown.ts"
import { type Manifest, manifestOf } from "./manifest.ts"
import { sectionNamed } from "./section.ts"

const NOUN = "term"

export const requiredReadingManifestOf = (body: string): Manifest => manifestOf(body, DOMAIN_REQUIRED_READING_KEY, NOUN)

export interface Definition {
  readonly term: string
  readonly definition: string
}

export function definitionOf(body: string): Definition | null {
  const section = sectionNamed(body, "Definition")
  const first = section === null ? undefined : bullets(section.body)[0]?.text
  const found = first === undefined ? null : /^- \*\*(.+?)\*\* — (.+)$/.exec(first.trim())
  const term = found?.[1]
  const definition = found?.[2]
  return term === undefined || definition === undefined ? null : { term, definition }
}
