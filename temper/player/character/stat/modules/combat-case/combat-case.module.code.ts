import { readFileSync } from "node:fs"
import { join } from "node:path"
import { listedAt } from "akasha/page/index/modules/reading/index-reading.module.code.ts"
import { besideAt } from "akasha/page/modules/file-name/page-file-name.module.code.ts"
import { decodeBuild } from "akasha/temper/player/character/build/build-codec/modules/build-codec/build-codec.module.code.ts"
import { buildHash } from "akasha/temper/player/character/formula-framework/modules/branded-id/branded-id.module.code.ts"
import { buffOrDebuff } from "akasha/temper/player/character/formula-framework/modules/buff-or-debuff-source/buff-or-debuff-source.module.code.ts"
import { isMetricEffect } from "akasha/temper/player/character/formula-framework/modules/effect/effect.module.code.ts"
import { glyphHitOf } from "akasha/temper/player/character/stat/modules/glyph-hit/glyph-hit.module.code.ts"
import { calculateReadingStatsByBar } from "akasha/temper/player/character/stat/modules/metric-calculator/metric-calculator.module.code.ts"
import { damageDoneDirectMonsters } from "akasha/temper/player/character/stat/temper-metric/pages/damage-done-direct-monsters/damage-done-direct-monsters.temper-metric.ts"
import { targetDamageTaken } from "akasha/temper/player/character/stat/temper-metric/pages/target-damage-taken/target-damage-taken.temper-metric.ts"
import { readings } from "akasha/temper/player/character/temper-account-character/properties/readings.file-property.ts"
import { temperAccountCharacter } from "akasha/temper/player/character/temper-account-character/temper-account-character.page-type.ts"
import { z } from "zod"

const hitShape = z.strictObject({
  fight: z.number(),
  ms: z.number(),
  abilityId: z.number(),
  target: z.string(),
  hit: z.number(),
  overflow: z.number(),
  targetEffects: z.array(z.number()),
  debuffs: z.array(z.string()),
})

export type Hit = z.infer<typeof hitShape>

export const combatCaseShape = z.strictObject({
  character: z.string(),
  buildHash: z.string(),
  reading: z.string(),
  readingsAgreeing: z.number(),
  esoVersion: z.string(),
  bar: z.enum(["primary-weapon-bar", "backup-weapon-bar"]),
  enchant: z.string(),
  pinned: z.array(hitShape),
  unexplained: z.array(hitShape),
})

export type CombatCase = z.infer<typeof combatCaseShape>

const TOOLTIP_NUMBER = /\|cffffff(\d+)\|r/

export function glyphTooltipOf(enchant: string): number | null {
  const found = TOOLTIP_NUMBER.exec(enchant)
  return found?.[1] === undefined ? null : Number(found[1])
}

export function directDamageMonstersOf(hash: string, bar: CombatCase["bar"]): number | null {
  let build: ReturnType<typeof decodeBuild> | undefined
  try {
    build = decodeBuild(buildHash(hash))
  } catch {
    return null
  }
  if (build === null || build === undefined) return null
  const worked = calculateReadingStatsByBar(build, bar, [], [])
  return worked.metrics[damageDoneDirectMonsters.slug]?.value ?? 0
}

export function targetDamageTakenOf(debuffs: readonly string[]): number {
  let taken = 0
  for (const key of debuffs) {
    const debuff = buffOrDebuff().data[key]
    if (debuff === undefined) throw new Error(`no debuff page states the key \`${key}\``)
    for (const effect of debuff.effects) {
      if (!isMetricEffect(effect) || effect.metricId !== targetDamageTaken.slug) continue
      if (effect.effectType === "fractional-change") taken += effect.effectValue
    }
  }
  return taken
}

export function hitLanded(hit: Hit): number {
  return hit.hit + hit.overflow
}

export function workedHitOf(combatCase: CombatCase, hit: Hit): number | null {
  const tooltip = glyphTooltipOf(combatCase.enchant)
  const directDamage = directDamageMonstersOf(combatCase.buildHash, combatCase.bar)
  if (tooltip === null || directDamage === null) return null
  return glyphHitOf({
    tooltip,
    directDamageMonsters: directDamage,
    targetDamageTaken: targetDamageTakenOf(hit.debuffs),
  })
}

const GLYPH_SLOTS: ReadonlySet<number> = new Set([4, 5, 20, 21])

const readingLineShape = z.looseObject({
  id: z.string(),
  buildHash: z.string(),
  reading: z.looseObject({
    worn: z
      .record(
        z.string(),
        z.looseObject({ slot: z.number().optional(), enchant: z.string().optional() })
      )
      .optional(),
  }),
})

export type BuildReadings = {
  readonly ids: readonly string[]
  readonly enchants: readonly string[]
}

function isGlyphEnchant(enchant: string | undefined): enchant is string {
  return enchant?.startsWith("Deals") === true && glyphTooltipOf(enchant) !== null
}

export function buildReadingsIn(body: string, hash: string): BuildReadings {
  const ids: string[] = []
  const enchants = new Set<string>()
  for (const line of body.split("\n")) {
    if (!line.includes(hash)) continue
    const parsed = readingLineShape.safeParse(JSON.parse(line))
    if (!parsed.success || parsed.data.buildHash !== hash) continue
    ids.push(parsed.data.id)
    for (const piece of Object.values(parsed.data.reading.worn ?? {})) {
      if (piece.slot === undefined || !GLYPH_SLOTS.has(piece.slot)) continue
      if (isGlyphEnchant(piece.enchant)) enchants.add(piece.enchant)
    }
  }
  return { ids, enchants: [...enchants].sort() }
}

export function buildReadingsOf(root: string, combatCase: CombatCase): BuildReadings {
  const found = listedAt(root, temperAccountCharacter.slug, combatCase.character)[0]
  if (found === undefined) throw new Error(`\`${combatCase.character}\` names no character page`)
  const at = besideAt(found.path, readings.propertySlug, "jsonl")
  if (at === null) throw new Error(`\`${combatCase.character}\` sits where no readings file can`)
  return buildReadingsIn(readFileSync(join(root, at), "utf8"), combatCase.buildHash)
}

export function combatCaseText(combatCase: CombatCase): string {
  return `${JSON.stringify(combatCase, null, 2)}\n`
}
