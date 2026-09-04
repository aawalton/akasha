import { z } from "zod"
import type { Page } from "../addon-data-page/addon-data-page.module.code.ts"

const METRIC_EFFECT_SCHEMA = z
  .object({
    metricId: z.string(),
    effectType: z.string(),
    effectValue: z.object({ value: z.number(), seconds: z.number() }).strict(),
  })
  .strict()

const BUFF_EFFECT_SCHEMA = z
  .object({
    buffId: z.string(),
    seconds: z.number(),
  })
  .strict()

const DEBUFF_EFFECT_SCHEMA = z
  .object({
    debuffId: z.string(),
    seconds: z.number(),
  })
  .strict()

const POISON_EFFECT_ENTRY_SCHEMA = z.union([
  METRIC_EFFECT_SCHEMA,
  BUFF_EFFECT_SCHEMA,
  DEBUFF_EFFECT_SCHEMA,
])

const POISON_EFFECT_EAV_SCHEMA = z
  .object({
    key: z.string(),
    cooldown: z.number().optional(),
    icon: z.string().nullable().optional(),
    isPositive: z.boolean().optional(),
    oppositeId: z.string().optional(),
    effects: z.array(POISON_EFFECT_ENTRY_SCHEMA),
  })
  .strict()

type ParsedEntry = z.infer<typeof POISON_EFFECT_ENTRY_SCHEMA>

interface ParsedPoisonEffect {
  key: string
  name: string
  cooldown: number | undefined
  icon: string | undefined
  isPositive: boolean | undefined
  oppositeId: string | undefined
  effects: readonly ParsedEntry[]
}

function parsePoisonEffect(row: Page): ParsedPoisonEffect {
  if (row.title === null) {
    throw new Error(`temper-poison-effect row ${row.id} has null title`)
  }
  const eav = POISON_EFFECT_EAV_SCHEMA.parse({
    key: row.key,
    cooldown: row.cooldown,
    icon: row.icon,
    isPositive: row.isPositive,
    oppositeId: row.oppositeId,
    effects: row.effects,
  })
  return {
    key: eav.key,
    name: row.title,
    cooldown: eav.cooldown,
    icon: eav.icon ?? undefined,
    isPositive: eav.isPositive,
    oppositeId: eav.oppositeId,
    effects: eav.effects,
  }
}

function renderEntry(entry: ParsedEntry): string {
  if ("buffId" in entry) {
    return `{ buffId: ${JSON.stringify(entry.buffId)}, seconds: ${entry.seconds} }`
  }
  if ("debuffId" in entry) {
    return `{ debuffId: ${JSON.stringify(entry.debuffId)}, seconds: ${entry.seconds} }`
  }
  return `{ metricId: ${JSON.stringify(entry.metricId)}, effectType: ${JSON.stringify(entry.effectType)}, effectValue: { value: ${entry.effectValue.value}, seconds: ${entry.effectValue.seconds} } }`
}

function renderEffect(effect: ParsedPoisonEffect): string {
  const fields: string[] = [
    `id: ${JSON.stringify(effect.key)}`,
    `name: ${JSON.stringify(effect.name)}`,
  ]
  if (effect.cooldown !== undefined) fields.push(`cooldown: ${effect.cooldown}`)
  if (effect.icon !== undefined) fields.push(`icon: ${JSON.stringify(effect.icon)}`)
  if (effect.isPositive !== undefined) fields.push(`isPositive: ${effect.isPositive}`)
  if (effect.oppositeId !== undefined)
    fields.push(`oppositeId: ${JSON.stringify(effect.oppositeId)}`)
  const entriesRendered = effect.effects.map(renderEntry).join(", ")
  fields.push(`effects: [${entriesRendered}]`)
  return `  { ${fields.join(", ")} },`
}

export function generateTemperPoisonEffects(rows: readonly Page[]): string {
  const effects = rows.map(parsePoisonEffect)

  const sorted = [...effects].sort((a, b) => a.key.localeCompare(b.key))

  const lines = sorted.map(renderEffect)

  return `\
/**
 * Temper Poison Effects (Generated)
 *
 * ESO alchemy poison/potion effects sourced from the universal pages
 * table (page type: temper-poison-effect).
 *
 * DO NOT EDIT — regenerate with: ops temper addon-data generate
 */

import type { PoisonEffect } from "../poison-effect-registry"

export const TEMPER_POISON_EFFECTS = [
${lines.join("\n")}
] as const satisfies readonly PoisonEffect[]
`
}
