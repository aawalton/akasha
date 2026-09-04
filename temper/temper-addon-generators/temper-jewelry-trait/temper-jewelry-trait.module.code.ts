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

const FLAT_QUALITY_VALUES_SCHEMA = z
  .object({
    normal: z.number(),
    fine: z.number(),
    superior: z.number(),
    epic: z.number(),
    legendary: z.number(),
  })
  .strict()

const TRIUNE_QUALITY_VALUES_SCHEMA = z
  .object({
    health: FLAT_QUALITY_VALUES_SCHEMA,
    resource: FLAT_QUALITY_VALUES_SCHEMA,
  })
  .strict()

const QUALITY_VALUES_SCHEMA = z.union([FLAT_QUALITY_VALUES_SCHEMA, TRIUNE_QUALITY_VALUES_SCHEMA])

const JEWELRY_TRAIT_EAV_SCHEMA = z
  .object({
    key: z.string().min(1),
    displayOrder: z.number().int().nonnegative(),
    esoTraitConstantName: z.string().min(1),
    material: z.string().default(""),
    effect: z.string().default(""),
    effects: z.array(METRIC_EFFECT_SCHEMA),
    qualityValues: QUALITY_VALUES_SCHEMA.nullable().default(null),
  })
  .strict()

interface ParsedJewelryTrait {
  key: string
  name: string
  displayOrder: number
  esoTraitConstantName: string
  material: string
  effect: string
  effects: readonly z.infer<typeof METRIC_EFFECT_SCHEMA>[]
  qualityValues: z.infer<typeof QUALITY_VALUES_SCHEMA> | null
}

function parseJewelryTrait(row: Page): ParsedJewelryTrait {
  if (row.title === null) {
    throw new Error(`temper-jewelry-trait row ${row.id} has null title`)
  }
  const eav = JEWELRY_TRAIT_EAV_SCHEMA.parse({
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

function isTriuneQualityValues(
  qv: z.infer<typeof QUALITY_VALUES_SCHEMA>
): qv is z.infer<typeof TRIUNE_QUALITY_VALUES_SCHEMA> {
  return "health" in qv && "resource" in qv
}

export function generateTemperJewelryTrait(rows: readonly Page[]): string {
  const parsed = rows.map(parseJewelryTrait)

  const sorted = [...parsed].sort((a, b) => a.displayOrder - b.displayOrder)

  const seenOrder = new Set<number>()
  for (const trait of sorted) {
    if (seenOrder.has(trait.displayOrder)) {
      throw new Error(
        `temper-jewelry-trait: duplicate displayOrder ${trait.displayOrder} (key=${trait.key})`
      )
    }
    seenOrder.add(trait.displayOrder)
  }

  const templateEntries = sorted.map((t) => {
    return `  ${JSON.stringify(t.key)}: { id: ${JSON.stringify(t.key)} as const, name: ${JSON.stringify(t.name)}, material: ${JSON.stringify(t.material)}, effect: ${JSON.stringify(t.effect)}, effects: ${renderEffects(t.effects, renderPlainEffect)}, esoTraitConstantName: ${JSON.stringify(t.esoTraitConstantName)} },`
  })

  const qualityEntries: string[] = []
  for (const t of sorted) {
    if (t.qualityValues === null) continue
    if (isTriuneQualityValues(t.qualityValues)) {
      qualityEntries.push(`  "${t.key}-health": ${renderQualityValues(t.qualityValues.health)},`)
      qualityEntries.push(
        `  "${t.key}-resource": ${renderQualityValues(t.qualityValues.resource)},`
      )
    } else {
      qualityEntries.push(`  ${JSON.stringify(t.key)}: ${renderQualityValues(t.qualityValues)},`)
    }
  }

  return `\
/**
 * Temper Jewelry Traits (Generated)
 *
 * ESO jewelry traits — the 9 functional traits (arcane, bloodthirsty,
 * harmony, healthy, infused, protective, robust, swift, triune) plus
 * the no-trait sentinel and the two decorative traits (ornate,
 * intricate), sourced from the universal pages table (page type:
 * temper-jewelry-trait).
 *
 * Row order matches the legacy \`jewelryTraits.ids\` iteration order,
 * which the character codec uses as an append-only index map.
 * Reordering rows would invalidate every existing shared build URL.
 *
 * Triune's two parallel quality tables are unpacked back into the
 * synthetic \`"triune-health"\` / \`"triune-resource"\` keys the legacy
 * consumer expects.
 *
 * DO NOT EDIT — regenerate with: ops temper addon-data generate
 */

import type { JewelryTraitQualityValues, JewelryTraitTemplate } from "../jewelry-traits-data"

/**
 * Keyed record. The literal-id keys flow into \`createDataFile\`'s
 * \`jewelryTraits.ids\` so \`(typeof jewelryTraits.ids)[number]\` stays a
 * literal-union typed for callers (codec, schema, build engine, UI).
 */
export const TEMPER_JEWELRY_TRAITS_BY_ID = {
${templateEntries.join("\n")}
} as const satisfies Record<string, JewelryTraitTemplate>

/**
 * Per-quality numeric values for the 8 jewelry traits that have a
 * quality-keyed value table (arcane, bloodthirsty, harmony, healthy,
 * infused, protective, robust, swift) plus the two Triune sub-values
 * ("triune-health" and "triune-resource"). The no-trait sentinel and
 * the two decorative traits (ornate, intricate) are omitted because
 * they have no quality-keyed value table in the legacy data file.
 */
export const TEMPER_JEWELRY_TRAIT_QUALITY_VALUES = {
${qualityEntries.join("\n")}
} as const satisfies Record<string, JewelryTraitQualityValues>
`
}
