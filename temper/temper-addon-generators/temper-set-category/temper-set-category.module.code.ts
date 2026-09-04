import { z } from "zod"
import type { Page } from "../addon-data-page/addon-data-page.module.code.ts"

const SET_CATEGORY_EAV_SCHEMA = z
  .object({
    key: z.string().min(1),
    displayOrder: z.number().int().nonnegative(),
  })
  .strict()

interface ParsedSetCategory {
  key: string
  name: string
  displayOrder: number
}

function parseSetCategory(row: Page): ParsedSetCategory {
  if (row.title === null) {
    throw new Error(`temper-set-category row ${row.id} has null title`)
  }
  const eav = SET_CATEGORY_EAV_SCHEMA.parse({
    key: row.key,
    displayOrder: row.displayOrder,
  })
  return {
    key: eav.key,
    name: row.title,
    displayOrder: eav.displayOrder,
  }
}

export function generateTemperSetCategory(rows: readonly Page[]): string {
  const parsed = rows.map(parseSetCategory)

  const sorted = [...parsed].sort((a, b) => a.displayOrder - b.displayOrder)

  const seen = new Set<number>()
  for (const c of sorted) {
    if (seen.has(c.displayOrder)) {
      throw new Error(
        `temper-set-category ${c.key}: duplicate displayOrder ${c.displayOrder} (group ordering would be ambiguous)`
      )
    }
    seen.add(c.displayOrder)
  }

  const entries = sorted.map((c) => {
    const keyLiteral = JSON.stringify(c.key)
    return `  ${keyLiteral}: { id: ${keyLiteral} as const, name: ${JSON.stringify(c.name)}, displayOrder: ${c.displayOrder} },`
  })

  return `\
/**
 * Temper Set Categories (Generated)
 *
 * ESO equipment set categories / sources (Trial, Dungeon, Arena, ...)
 * sourced from the universal pages table (page type: temper-set-category).
 *
 * DO NOT EDIT — regenerate with: ops temper addon-data generate
 */

import type { SetCategoryTemplate } from "../set-categories-data"

/**
 * Keyed record. \`SetCategoryId\` is declared in
 * \`@akasha/temper-equipment/set-category-ids\`, and \`setCategories\` is
 * annotated against that union, so a key here the union does not name
 * is a type error rather than a silent widening.
 */
export const TEMPER_SET_CATEGORIES_BY_ID = {
${entries.join("\n")}
} as const satisfies Record<string, SetCategoryTemplate>
`
}
