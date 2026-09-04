import { z } from "zod"
import type { Page } from "../addon-data-page/addon-data-page.module.code.ts"
import {
  renderConstEffect,
  renderEffects,
} from "../render-metric-effect/render-metric-effect.module.code.ts"
import { renderQualityComponents } from "../render-quality-values/render-quality-values.module.code.ts"

const METRIC_EFFECT_SCHEMA = z
  .object({
    metricId: z.string().min(1),
    effectType: z.union([z.literal("integer"), z.literal("fractional-change")]),
    effectValue: z.number(),
  })
  .strict()

const QUALITY_VALUES_SCHEMA = z
  .object({
    normal: z.number(),
    fine: z.number(),
    superior: z.number(),
    epic: z.number(),
    legendary: z.number(),
  })
  .strict()

const ARMOR_ENCHANT_EAV_SCHEMA = z
  .object({
    key: z.string().min(1),
    displayOrder: z.number().int().nonnegative(),
    glyphName: z.string().default(""),
    essenceRune: z.string().default(""),
    effect: z.string().default(""),
    effects: z.array(METRIC_EFFECT_SCHEMA),
    esoEnchantConstantName: z.string().min(1),
    qualityValues: z.record(z.string().min(1), QUALITY_VALUES_SCHEMA),
  })
  .strict()

interface ParsedArmorEnchant {
  key: string
  name: string
  displayOrder: number
  glyphName: string
  essenceRune: string
  effect: string
  effects: readonly z.infer<typeof METRIC_EFFECT_SCHEMA>[]
  esoEnchantConstantName: string
  qualityValues: Readonly<Record<string, z.infer<typeof QUALITY_VALUES_SCHEMA>>>
}

function parseArmorEnchant(row: Page): ParsedArmorEnchant {
  if (row.title === null) {
    throw new Error(`temper-armor-enchant row ${row.id} has null title`)
  }
  const eav = ARMOR_ENCHANT_EAV_SCHEMA.parse({
    key: row.key,
    displayOrder: row.displayOrder,
    glyphName: row.glyphName,
    essenceRune: row.essenceRune,
    effect: row.effect,
    effects: row.effects,
    esoEnchantConstantName: row.esoEnchantConstantName,
    qualityValues: row.qualityValues,
  })
  return {
    key: eav.key,
    name: row.title,
    displayOrder: eav.displayOrder,
    glyphName: eav.glyphName,
    essenceRune: eav.essenceRune,
    effect: eav.effect,
    effects: eav.effects,
    esoEnchantConstantName: eav.esoEnchantConstantName,
    qualityValues: eav.qualityValues,
  }
}

export function generateTemperArmorEnchant(rows: readonly Page[]): string {
  const parsed = rows.map(parseArmorEnchant)

  const sorted = [...parsed].sort((a, b) => a.displayOrder - b.displayOrder)

  const seenOrder = new Set<number>()
  for (const enchant of sorted) {
    if (seenOrder.has(enchant.displayOrder)) {
      throw new Error(
        `temper-armor-enchant: duplicate displayOrder ${enchant.displayOrder} (key=${enchant.key})`
      )
    }
    seenOrder.add(enchant.displayOrder)
  }

  const templateEntries = sorted.map((e) => {
    return `  ${JSON.stringify(e.key)}: { id: ${JSON.stringify(e.key)} as const, name: ${JSON.stringify(e.name)}, glyphName: ${JSON.stringify(e.glyphName)}, essenceRune: ${JSON.stringify(e.essenceRune)}, effect: ${JSON.stringify(e.effect)}, effects: ${renderEffects(e.effects, renderConstEffect)}, esoEnchantConstantName: ${JSON.stringify(e.esoEnchantConstantName)} },`
  })

  const qualityEntries = sorted
    .filter((e) => Object.keys(e.qualityValues).length > 0)
    .map((e) => `  ${JSON.stringify(e.key)}: ${renderQualityComponents(e.qualityValues)},`)

  return `\
/**
 * Temper Armor Enchants (Generated)
 *
 * ESO armor enchantments (glyphs) — the 4 functional enchants (health,
 * magicka, stamina, prismatic-defense) plus the no-enchant sentinel,
 * sourced from the universal pages table (page type:
 * temper-armor-enchant).
 *
 * Row order matches the legacy \`armorEnchants.ids\` iteration order,
 * which the character codec uses as an append-only index map.
 * Reordering rows would invalidate every existing shared build URL.
 *
 * \`TEMPER_ARMOR_ENCHANT_QUALITY_VALUES\` is a per-enchant
 * \`Record<componentKey, QualityValues>\` map. For most enchants the
 * single component key equals the enchant id; \`prismatic-defense\` has
 * two component sub-tables, \`prismatic-health\` and
 * \`prismatic-resource\`. \`no-enchant\` is omitted because it has no
 * quality scaling.
 *
 * DO NOT EDIT — regenerate with: ops temper addon-data generate
 */

import type {
  ArmorEnchantQualityComponents,
  ArmorEnchantTemplate,
} from "../armor-enchants-data"

/**
 * Keyed record. The literal-id keys flow into \`createDataFile\`'s
 * \`armorEnchants.ids\` so \`(typeof armorEnchants.ids)[number]\` stays
 * a literal-union typed for callers (codec, schema, UI).
 */
export const TEMPER_ARMOR_ENCHANTS_BY_ID = {
${templateEntries.join("\n")}
} as const satisfies Record<string, ArmorEnchantTemplate>

/**
 * Per-enchant, per-component, per-quality numeric values. The
 * no-enchant sentinel is omitted because it has no quality table.
 */
export const TEMPER_ARMOR_ENCHANT_QUALITY_VALUES = {
${qualityEntries.join("\n")}
} as const satisfies Record<string, ArmorEnchantQualityComponents>
`
}
