import { z } from "zod"
import type { Page } from "../addon-data-page/addon-data-page.module.code.ts"

const COMPANION_SKILL_EAV_SCHEMA = z
  .object({
    key: z.string().min(1),
    abilityId: z.number().int().nonnegative(),
    companionId: z.string().min(1),
    skillLineId: z.string().min(1),
    skillType: z.string().min(1),
    description: z.string(),
    icon: z.string().min(1).nullable(),
    effects: z.array(z.unknown()).nullable().optional(),
    validRoles: z.array(z.string()).nullable().optional(),
    castConditions: z.array(z.unknown()).nullable().optional(),
    tags: z.array(z.string()).nullable().optional(),
    alternateAbilityIds: z.array(z.number().int().nonnegative()).nullable().optional(),
  })
  .strict()

interface ParsedCompanionSkill {
  key: string
  name: string
  abilityId: number
  companionId: string
  skillLineId: string
  skillType: string
  description: string
  icon: string | null
  effects: readonly unknown[]
  validRoles: readonly string[]
  castConditions: readonly unknown[] | undefined
  tags: readonly string[] | undefined
  alternateAbilityIds: readonly number[] | undefined
}

function withoutId(held: unknown): unknown {
  if (held === null || typeof held !== "object") return held
  const kept = Object.entries(held as Record<string, unknown>).filter(([key]) => key !== "id")
  return Object.fromEntries(kept)
}

function entriesWithoutId(held: unknown): unknown {
  if (!Array.isArray(held)) return held
  return held.map(withoutId)
}

function parseCompanionSkill(row: Page): ParsedCompanionSkill {
  if (row.title === null) {
    throw new Error(`temper-companion-skill row ${row.id} has null title`)
  }
  const eav = COMPANION_SKILL_EAV_SCHEMA.parse({
    key: row.key,
    abilityId: row.abilityId,
    companionId: row.companionId,
    skillLineId: row.skillLineId,
    skillType: row.skillType,
    description: row.description,
    icon: row.icon ?? null,
    effects: entriesWithoutId(row.skillEffects),
    validRoles: row.validRoles,
    castConditions: entriesWithoutId(row.castConditions),
    tags: row.tags,
    alternateAbilityIds: row.alternateAbilityIds,
  })
  return {
    key: eav.key,
    name: row.title,
    abilityId: eav.abilityId,
    companionId: eav.companionId,
    skillLineId: eav.skillLineId,
    skillType: eav.skillType,
    description: eav.description,
    icon: eav.icon,
    effects: eav.effects ?? [],
    validRoles: eav.validRoles ?? [],
    castConditions: eav.castConditions === null ? undefined : eav.castConditions,
    tags: eav.tags === null ? undefined : eav.tags,
    alternateAbilityIds: eav.alternateAbilityIds === null ? undefined : eav.alternateAbilityIds,
  }
}

export function generateTemperCompanionSkill(rows: readonly Page[]): string {
  const parsed = rows.map(parseCompanionSkill)

  const sorted = [...parsed].sort((a, b) => {
    const sa = a.key === "no-skill" ? 0 : 1
    const sb = b.key === "no-skill" ? 0 : 1
    if (sa !== sb) return sa - sb
    return a.key.localeCompare(b.key)
  })

  const entryLines = sorted.map((r) => {
    const keyLiteral = JSON.stringify(r.key)
    const fields: string[] = []
    fields.push(`    id: ${keyLiteral} as const`)
    fields.push(`    abilityId: ${r.abilityId}`)
    fields.push(`    name: ${JSON.stringify(r.name)}`)
    fields.push(`    companionId: ${JSON.stringify(r.companionId)} as const`)
    fields.push(`    skillLineId: ${JSON.stringify(r.skillLineId)} as const`)
    fields.push(`    skillType: ${JSON.stringify(r.skillType)} as const`)
    fields.push(`    description: ${JSON.stringify(r.description)}`)
    fields.push(`    icon: ${r.icon === null ? "null" : JSON.stringify(r.icon)}`)
    fields.push(`    effects: ${JSON.stringify(r.effects)} as const`)
    fields.push(`    validRoles: ${JSON.stringify(r.validRoles)} as const`)
    if (r.castConditions !== undefined) {
      fields.push(`    castConditions: ${JSON.stringify(r.castConditions)} as const`)
    }
    if (r.tags !== undefined) {
      fields.push(`    tags: ${JSON.stringify(r.tags)} as const`)
    }
    if (r.alternateAbilityIds !== undefined) {
      fields.push(`    alternateAbilityIds: ${JSON.stringify(r.alternateAbilityIds)} as const`)
    }
    return `  ${keyLiteral}: {
${fields.join(",\n")},
  },`
  })

  return `\
/**
 * Temper Companion Skills (Generated)
 *
 * All companion skills sourced from the universal pages table (page
 * type: temper-companion-skill). At parent #9967 bootstrap, only the
 * no-skill sentinel lives here; the follow-on row-only child projects
 * (companion / armor / guild / weapon) append per-category rows as
 * they cut over their respective \`skill-lines/*-data.ts\` files.
 *
 * The \`no-skill\` row is sorted to index 0; everything else is
 * alphabetical by \`key\`. Index 0 is the codec-facing sentinel value
 * for the companion build codec (encoded value 0 = empty slot) and is
 * mirrored into \`companion-skill-mappings.generated.ts\` on the addon
 * side. Inserting any row before \`no-skill\` would invalidate every
 * existing shared companion build URL.
 *
 * Optional fields (\`castConditions\`, \`tags\`, \`alternateAbilityIds\`)
 * are present only on rows whose source declared them.
 *
 * DO NOT EDIT -- regenerate with: ops temper addon-data generate
 */

import { createDataFile } from "@akasha/utils-narrow/create-data-file"
import type { CompanionSkillTemplate } from "../skills/companion-skill-activation-effect-types"

const COMPANION_SKILLS_DATA = {
${entryLines.join("\n")}
} satisfies Record<string, CompanionSkillTemplate>

export const companionSkillsFromPages = createDataFile<CompanionSkillTemplate>()(
  COMPANION_SKILLS_DATA
)
`
}
