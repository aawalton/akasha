import { z } from "zod"
import type { Page } from "../addon-data-page/addon-data-page.module.code.ts"
import {
  renderEffects,
  renderPlainEffect,
} from "../render-metric-effect/render-metric-effect.module.code.ts"
import { renderQualityValues } from "../render-quality-values/render-quality-values.module.code.ts"

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

const ARMOR_TRAIT_EAV_SCHEMA = z
  .object({
    key: z.string().min(1),
    displayOrder: z.number().int().nonnegative(),
    esoTraitConstantName: z.string().min(1),
    material: z.string().default(""),
    effect: z.string().default(""),
    effects: z.array(METRIC_EFFECT_SCHEMA),
    qualityValues: QUALITY_VALUES_SCHEMA.nullable(),
  })
  .strict()

interface ParsedArmorTrait {
  key: string
  name: string
  displayOrder: number
  esoTraitConstantName: string
  material: string
  effect: string
  effects: readonly z.infer<typeof METRIC_EFFECT_SCHEMA>[]
  qualityValues: z.infer<typeof QUALITY_VALUES_SCHEMA> | null
}

function parseArmorTrait(row: Page): ParsedArmorTrait {
  if (row.title === null) {
    throw new Error(`temper-armor-trait row ${row.id} has null title`)
  }
  const eav = ARMOR_TRAIT_EAV_SCHEMA.parse({
    key: row.key,
    displayOrder: row.displayOrder,
    esoTraitConstantName: row.esoTraitConstantName,
    material: row.material,
    effect: row.effect,
    effects: row.effects,
    qualityValues: row.qualityValues,
  })
  return {
    key: eav.key,
    name: row.title,
    displayOrder: eav.displayOrder,
    esoTraitConstantName: eav.esoTraitConstantName,
    material: eav.material,
    effect: eav.effect,
    effects: eav.effects,
    qualityValues: eav.qualityValues,
  }
}

export function generateTemperArmorTrait(rows: readonly Page[]): string {
  const parsed = rows.map(parseArmorTrait)

  const sorted = [...parsed].sort((a, b) => a.displayOrder - b.displayOrder)

  const seenOrder = new Set<number>()
  for (const trait of sorted) {
    if (seenOrder.has(trait.displayOrder)) {
      throw new Error(
        `temper-armor-trait: duplicate displayOrder ${trait.displayOrder} (key=${trait.key})`
      )
    }
    seenOrder.add(trait.displayOrder)
  }

  const templateEntries = sorted.map((t) => {
    return `  ${JSON.stringify(t.key)}: { id: ${JSON.stringify(t.key)} as const, name: ${JSON.stringify(t.name)}, esoTraitConstantName: ${JSON.stringify(t.esoTraitConstantName)}, material: ${JSON.stringify(t.material)}, effect: ${JSON.stringify(t.effect)}, effects: ${renderEffects(t.effects, renderPlainEffect)} },`
  })

  const qualityEntries = sorted
    .filter((t) => t.qualityValues !== null)
    .map((t) => {
      const qv = t.qualityValues
      if (qv === null) throw new Error("unreachable: qualityValues null after filter")
      return `  ${JSON.stringify(t.key)}: ${renderQualityValues(qv)},`
    })

  return `\
/**
 * Temper Armor Traits (Generated)
 *
 * ESO armor traits — the 9 functional traits (sturdy, impenetrable,
 * reinforced, well-fitted, training, infused, invigorating, divines,
 * nirnhoned) plus the no-trait sentinel and the two decorative traits
 * (ornate, intricate), sourced from the universal pages table (page
 * type: temper-armor-trait).
 *
 * Row order matches the legacy \`armorTraits.ids\` iteration order, which
 * the character codec uses as an append-only index map. Reordering rows
 * would invalidate every existing shared build URL.
 *
 * DO NOT EDIT — regenerate with: ops temper addon-data generate
 */

import type { ArmorTraitTemplate, ArmorTraitQualityValues } from "../armor-traits-data"

/**
 * Keyed record. The literal-id keys flow into \`createDataFile\`'s
 * \`armorTraits.ids\` so \`(typeof armorTraits.ids)[number]\` stays a
 * literal-union typed for callers (codec, schema, build engine, UI).
 */
export const TEMPER_ARMOR_TRAITS_BY_ID = {
${templateEntries.join("\n")}
} as const satisfies Record<string, ArmorTraitTemplate>

/**
 * Per-quality numeric values for the 9 functional armor traits. The
 * no-trait sentinel and the two decorative traits (ornate, intricate)
 * are omitted because they have no quality-keyed value table in the
 * legacy data file.
 */
export const TEMPER_ARMOR_TRAIT_QUALITY_VALUES = {
${qualityEntries.join("\n")}
} as const satisfies Record<string, ArmorTraitQualityValues>
`
}
