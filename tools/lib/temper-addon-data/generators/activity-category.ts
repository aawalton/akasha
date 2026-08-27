import type { Page } from "../page.ts"
import type { BadgeVariant } from "../badge-variant.ts"
import { z } from "zod"

const BADGE_VARIANT_VALUES = [
  "accent",
  "destructive",
  "elevation",
  "elevation-muted",
  "surface",
  "normal",
  "fine",
  "superior",
  "epic",
  "legendary",
  "mythic",
  "radiant",
  "green",
  "blue",
  "purple",
  "yellow",
  "orange",
  "red",
] as const satisfies readonly BadgeVariant[]

const ACTIVITY_CATEGORY_EAV_SCHEMA = z
  .object({
    key: z.string(),
    badgeVariant: z.enum(BADGE_VARIANT_VALUES),
  })
  .strict()

interface ParsedActivityCategory {
  key: string
  name: string
  badgeVariant: BadgeVariant
}

function parseActivityCategory(row: Page): ParsedActivityCategory {
  if (row.title === null) {
    throw new Error(`temper-activity-category row ${row.id} has null title`)
  }
  const eav = ACTIVITY_CATEGORY_EAV_SCHEMA.parse({
    key: row.key,
    badgeVariant: row.badgeVariant,
  })
  return {
    key: eav.key,
    name: row.title,
    badgeVariant: eav.badgeVariant,
  }
}

export function generateTemperActivityCategory(rows: readonly Page[]): string {
  const parsed = rows.map(parseActivityCategory)

  const sorted = [...parsed].sort((a, b) => a.key.localeCompare(b.key))

  const entries = sorted.map(
    (c) =>
      `  ${JSON.stringify(c.key)}: { id: ${JSON.stringify(c.key)}, name: ${JSON.stringify(c.name)}, badgeVariant: ${JSON.stringify(c.badgeVariant)} },`
  )

  return `\
/**
 * Temper Activity Category (Generated)
 *
 * ESO activity-category catalog used by the completion UI's filter chips
 * and cross-domain lookup maps, sourced from the universal pages table
 * (page type: temper-activity-category).
 *
 * Each entry's \`id\` is the stable filter/lookup identifier
 * ("pvp" / "group-dungeons" / ...) and the same string is used as the
 * record key, so \`TEMPER_ACTIVITY_CATEGORIES["group-dungeons"]\` is
 * well-typed and feeds the \`ActivityCategoryId\` union and the
 * \`activityCategories.data\` lookup in @temper/player-completion.
 *
 * DO NOT EDIT — regenerate with: ops temper addon-data generate
 */

import type { ActivityCategoryTemplate } from "../activity-category-data"

export const TEMPER_ACTIVITY_CATEGORIES = {
${entries.join("\n")}
} as const satisfies Record<string, ActivityCategoryTemplate>
`
}
