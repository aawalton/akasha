import { z } from "zod"
import type { Page } from "../addon-data-page/addon-data-page.module.code.ts"
import { renderConstOrNull } from "../render-const-or-null/render-const-or-null.module.code.ts"

const PASSIVE_EFFECT_SCHEMA = z
  .object({
    metricId: z.string().min(1),
    value: z.number(),
  })
  .strict()

const COMPANION_EAV_SCHEMA = z
  .object({
    key: z.string().min(1),
    subtitle: z.string().default(""),
    alliance: z.union([
      z.literal("aldmeri-dominion"),
      z.literal("daggerfall-covenant"),
      z.literal("ebonheart-pact"),
      z.literal("none"),
    ]),
    icon: z.string().min(1).nullable(),
    esoCompanionId: z.number().int().nonnegative(),
    classPassiveId: z.string().min(1).nullable(),
    passiveEffects: z.array(PASSIVE_EFFECT_SCHEMA),
  })
  .strict()

type PassiveEffect = z.infer<typeof PASSIVE_EFFECT_SCHEMA>

interface ParsedCompanion {
  key: string
  name: string
  subtitle: string
  alliance: "aldmeri-dominion" | "daggerfall-covenant" | "ebonheart-pact" | "none"
  icon: string | null
  esoCompanionId: number
  classPassiveId: string | null
  passiveEffects: readonly PassiveEffect[]
}

function parseCompanion(row: Page): ParsedCompanion {
  if (row.title === null) {
    throw new Error(`temper-eso-companion row ${row.id} has null title`)
  }
  const eav = COMPANION_EAV_SCHEMA.parse({
    key: row.key,
    subtitle: row.subtitle,
    alliance: row.alliance,
    icon: row.icon ?? null,
    esoCompanionId: row.esoCompanionId,
    classPassiveId: row.classPassiveId ?? null,
    passiveEffects: row.passiveEffects,
  })
  return {
    key: eav.key,
    name: row.title,
    subtitle: eav.subtitle,
    alliance: eav.alliance,
    icon: eav.icon,
    esoCompanionId: eav.esoCompanionId,
    classPassiveId: eav.classPassiveId,
    passiveEffects: eav.passiveEffects,
  }
}

function renderIcon(icon: string | null): string {
  return icon === null ? "null" : JSON.stringify(icon)
}

function renderPassiveEffects(passiveEffects: readonly PassiveEffect[]): string {
  if (passiveEffects.length === 0) return "[] as const"
  const entries = passiveEffects.map(
    (e) => `{ metricId: ${JSON.stringify(e.metricId)} as const, value: ${e.value} }`
  )
  return `[${entries.join(", ")}] as const`
}

export function generateTemperEsoCompanion(rows: readonly Page[]): string {
  const parsed = rows.map(parseCompanion)

  const sorted = [...parsed].sort((a, b) => {
    if (a.esoCompanionId !== b.esoCompanionId) return a.esoCompanionId - b.esoCompanionId
    return a.key.localeCompare(b.key)
  })

  const entries = sorted.map((c) => {
    const keyLiteral = JSON.stringify(c.key)
    const fields: string[] = []
    fields.push(`    id: ${keyLiteral} as const`)
    fields.push(`    name: ${JSON.stringify(c.name)}`)
    fields.push(`    title: ${JSON.stringify(c.subtitle)}`)
    fields.push(`    alliance: ${JSON.stringify(c.alliance)} as const`)
    fields.push(`    icon: ${renderIcon(c.icon)}`)
    fields.push(`    esoCompanionId: ${c.esoCompanionId}`)
    fields.push(`    classPassiveId: ${renderConstOrNull(c.classPassiveId)}`)
    fields.push(`    passiveEffects: ${renderPassiveEffects(c.passiveEffects)}`)
    return `  ${keyLiteral}: {
${fields.join(",\n")},
  },`
  })

  return `\
/**
 * Temper Companions (Generated)
 *
 * All 9 companion identities sourced from the universal pages table
 * (page type: temper-eso-companion). The 8 player-facing ESO companions
 * (Bastian, Mirri, Ember, Isobel, Sharp-as-Night, Azandar, Tanlorin,
 * Zerith-var) plus the \`no-companion\` sentinel that represents an
 * unselected companion.
 *
 * Rows emit in \`esoCompanionId\` ascending order so the
 * \`no-companion\` sentinel (esoCompanionId 0) stays at
 * \`companions.ids[0]\`. \`@temper/game-codec\` indexes that array for the
 * \`COMPANION_BITS\`-wide companion-build slot; reordering invalidates
 * every shared companion build URL.
 *
 * Each entry's \`id\` is the stable codec-facing identifier and the
 * same string is used as the record key, so
 * \`companionsFromPages.data["bastian"]\` is well-typed and feeds the
 * \`companions\` lookup in @temper/game-companions-core.
 *
 * DO NOT EDIT -- regenerate with: ops temper addon-data generate
 */

import { createDataFile } from "@akasha/utils-narrow/create-data-file"
import type { CompanionTemplate } from "@akasha/temper-companions-core/companions"

const COMPANIONS_DATA = {
${entries.join("\n")}
} satisfies Record<string, CompanionTemplate>

export const companionsFromPages = createDataFile<CompanionTemplate>()(COMPANIONS_DATA)
`
}
