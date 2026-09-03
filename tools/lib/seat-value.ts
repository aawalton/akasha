import { textField } from "@akasha/markdown-pages/frontmatter"
import type { Documents } from "./domain.ts"

export const VALUE_KEY = "value-slug"

export const COLOR_KEY = "color"

export interface ValueHeld {
  readonly slug: string
  readonly color: string
}

export function valueHeldBy(relPath: string, docs: Documents): ValueHeld | null {
  const fm = docs.frontmatterOf(relPath)
  if (fm === null) return null
  const slug = textField(fm, VALUE_KEY)
  if (slug === null) return null
  const at = docs.domainAt(slug)
  if (at === null) return null
  const valueFm = docs.frontmatterOf(at)
  if (valueFm === null) return null
  const color = textField(valueFm, COLOR_KEY)
  if (color === null) return null
  return { slug, color }
}
