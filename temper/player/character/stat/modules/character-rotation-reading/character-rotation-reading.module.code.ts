import { reavingBlows } from "akasha/temper/catalog/champion-point/temper-champion-star/pages/reaving-blows.temper-champion-star.ts"
import { decodeBuild } from "akasha/temper/player/character/build/build-codec/modules/build-codec/build-codec.module.code.ts"
import { loadSetCatalog } from "akasha/temper/player/character/characters-equipment/modules/set-catalog-loading/set-catalog-loading.module.code.ts"
import { loadSkillCatalog } from "akasha/temper/player/character/skill/modules/skill-catalog-loading/skill-catalog-loading.module.code.ts"
import { calculateReadingStatsByBar } from "akasha/temper/player/character/stat/modules/metric-calculator/metric-calculator.module.code.ts"
import { loadMetricCatalog } from "akasha/temper/player/character/stat/modules/metric-catalog-loading/metric-catalog-loading.module.code.ts"
import {
  type Multipliers,
  type RotationBar,
  type RotationReading,
  reavingBlowsShareOf,
  rotationReading,
} from "akasha/temper/player/character/stat/modules/rotation-reading/rotation-reading.module.code.ts"
import {
  physicalShareOf,
  spellShareOf,
} from "akasha/temper/player/character/stat/modules/toughness-per-second/toughness-per-second.module.code.ts"
import { weaponStyleOf } from "akasha/temper/player/character/stat/modules/weapon-attacks/weapon-attacks.module.code.ts"
import { criticalRating } from "akasha/temper/player/character/stat/temper-metric/pages/critical-rating/critical-rating.temper-metric.ts"
import type { CharacterCompletion } from "akasha/temper/player/completion/modules/completion-record/completion-record.module.code.ts"

type Build = NonNullable<ReturnType<typeof decodeBuild>>

type Reading = NonNullable<NonNullable<CharacterCompletion["reportedStats"]>["frontBar"]>

const READING_BARS = [
  ["frontBar", "primary-weapon-bar"],
  ["backBar", "backup-weapon-bar"],
] as const

type WeaponBar = (typeof READING_BARS)[number][1]

async function buildOf(completion: CharacterCompletion): Promise<Build | null> {
  if (completion.buildHash === undefined) return null
  await Promise.all([loadSkillCatalog(), loadSetCatalog(), loadMetricCatalog()])
  return decodeBuild(completion.buildHash)
}

function slotsReavingBlows(build: Build | null): boolean {
  if (build === null) return false
  const slotted: readonly string[] = build.championPoints.warfare.slotted
  return slotted.includes(reavingBlows.slug)
}

function catalogMultipliers(
  build: Build | null,
  bar: WeaponBar,
  reading: Reading
): Multipliers | undefined {
  if (build === null || reading.activeBuffs === undefined) return undefined
  const metrics = calculateReadingStatsByBar(
    build,
    bar,
    reading.activeBuffs,
    reading.championPoints
  ).metrics as Record<string, { value: number } | undefined>
  const value = (metric: string) => metrics[metric]?.value ?? 0
  const chance = Math.min(1, value("critical-rating") / criticalRating.divisor)
  return {
    healing: (1 + value("healing-total")) * (1 + chance * value("healing-critical-bonus")),
    damage: 1 + chance * value("critical-damage-total"),
    healthMaximum: value("health-maximum"),
    physicalShare: physicalShareOf(value("resistance-physical")),
    spellShare: spellShareOf(value("resistance-spell")),
    damageTakenMartial: value("damage-taken-martial"),
    damageTakenMagical: value("damage-taken-magical"),
  }
}

function rotationBarOf(build: Build | null, bar: WeaponBar, reading: Reading): RotationBar {
  const stats = reading.stats
  return {
    skills: reading.skills ?? [],
    classPassives: (reading.classPassives ?? []).map((passive) => passive.description),
    enchants: (reading.worn ?? []).map((piece) => piece.enchant),
    weaponStyle: build === null ? undefined : weaponStyleOf(build.equipment[bar]),
    weaponStats: {
      magickaMaximum: stats["magicka-maximum"] ?? 0,
      staminaMaximum: stats["stamina-maximum"] ?? 0,
      powerWeapon: stats["power-weapon"] ?? 0,
      powerSpell: stats["power-spell"] ?? 0,
    },
    multipliers: catalogMultipliers(build, bar, reading),
  }
}

export type CatalogBar = {
  readonly bar: (typeof READING_BARS)[number][0]
  readonly weaponStyle: string | undefined
  readonly multipliers: Multipliers | undefined
}

export async function catalogBarsOf(completion: CharacterCompletion): Promise<CatalogBar[]> {
  const build = await buildOf(completion)
  const bars: CatalogBar[] = []
  for (const [readingKey, bar] of READING_BARS) {
    const reading = completion.reportedStats?.[readingKey]
    if (reading === undefined) continue
    bars.push({
      bar: readingKey,
      weaponStyle: build === null ? undefined : weaponStyleOf(build.equipment[bar]),
      multipliers: catalogMultipliers(build, bar, reading),
    })
  }
  return bars
}

export async function rotationReadingOf(
  completion: CharacterCompletion
): Promise<RotationReading | { readonly refused: string }> {
  const readings: [WeaponBar, Reading][] = []
  for (const [readingKey, bar] of READING_BARS) {
    const reading = completion.reportedStats?.[readingKey]
    if (reading?.skills === undefined) {
      return {
        refused: `the ${readingKey} reading kept no skills, so a reload on that bar is taken first`,
      }
    }
    readings.push([bar, reading])
  }
  const build = await buildOf(completion)
  const share = slotsReavingBlows(build) ? reavingBlowsShareOf(reavingBlows.description) : 0
  return rotationReading(
    readings.map(([bar, reading]) => rotationBarOf(build, bar, reading)),
    share
  )
}
