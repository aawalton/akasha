import { reavingBlows } from "akasha/temper/catalog/champion-point/temper-champion-star/pages/reaving-blows.temper-champion-star.ts"
import { decodeBuild } from "akasha/temper/player/character/build/build-codec/modules/build-codec/build-codec.module.code.ts"
import { loadSetCatalog } from "akasha/temper/player/character/characters-equipment/modules/set-catalog-loading/set-catalog-loading.module.code.ts"
import { loadSkillCatalog } from "akasha/temper/player/character/skill/modules/skill-catalog-loading/skill-catalog-loading.module.code.ts"
import {
  type EnchantProc,
  procsIn,
  readEnchantProc,
} from "akasha/temper/player/character/stat/modules/enchant-proc/enchant-proc.module.code.ts"
import { calculateReadingStatsByBar } from "akasha/temper/player/character/stat/modules/metric-calculator/metric-calculator.module.code.ts"
import { loadMetricCatalog } from "akasha/temper/player/character/stat/modules/metric-catalog-loading/metric-catalog-loading.module.code.ts"
import {
  healingOverRotation,
  meanUltimate,
  type RotationHealed,
  type RotationSkill,
  type RotationUltimate,
} from "akasha/temper/player/character/stat/modules/rotation-healing/rotation-healing.module.code.ts"
import { readSkillDamage } from "akasha/temper/player/character/stat/modules/skill-damage/skill-damage.module.code.ts"
import { readSkillHealing } from "akasha/temper/player/character/stat/modules/skill-healing/skill-healing.module.code.ts"
import {
  readHealingPerUltimatePoint,
  readHeroism,
} from "akasha/temper/player/character/stat/modules/skill-ultimate/skill-ultimate.module.code.ts"
import {
  armorShareOf,
  type Toughness,
  toughnessPerSecond,
} from "akasha/temper/player/character/stat/modules/toughness-per-second/toughness-per-second.module.code.ts"
import {
  type WeaponAttack,
  weaponAttackOf,
  weaponStyleOf,
} from "akasha/temper/player/character/stat/modules/weapon-attacks/weapon-attacks.module.code.ts"
import { criticalRating } from "akasha/temper/player/character/stat/temper-metric/pages/critical-rating/critical-rating.temper-metric.ts"
import type { CharacterCompletion } from "akasha/temper/player/completion/modules/completion-record/completion-record.module.code.ts"

const FIGHT_SECONDS = 60

const PERCENT_OF_DAMAGE = /(\d+)% of the damage/

function reavingBlowsShare(): number {
  const read = PERCENT_OF_DAMAGE.exec(reavingBlows.description)
  if (read === null) throw new Error("the Reaving Blows page names no percent of the damage done")
  return Number(read[1]) / 100
}

type Build = NonNullable<ReturnType<typeof decodeBuild>>

type Multipliers = Toughness & { readonly healing: number; readonly damage: number }

const PLAIN: Multipliers = {
  healing: 1,
  damage: 1,
  healthMaximum: 0,
  armorShare: 0,
  damageTaken: 0,
}

const READING_BARS = [
  ["frontBar", "primary-weapon-bar"],
  ["backBar", "backup-weapon-bar"],
] as const

const ULTIMATE_SLOT = 8

type Unread = { readonly name: string; readonly sentences: readonly string[] }

type RotationReading = {
  readonly fightSeconds: number
  readonly healed: RotationHealed
  readonly multipliers: Multipliers
  readonly attack: WeaponAttack
  readonly toughnessPerSecond: number
  readonly damagePerSecond: number
  readonly healingPerSecond: number
  readonly healingLandedPerSecond: number
  readonly shieldsPerSecond: number
  readonly shieldUp: number
  readonly directDamage: number
  readonly reavingBlowsHealing: number
  readonly enchantProcs: number
  readonly enchantHealing: number
  readonly unread: readonly Unread[]
}

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

function meanOf<T>(each: readonly T[], pick: (one: T) => number): number {
  return each.reduce((sum, one) => sum + pick(one), 0) / each.length
}

function multipliersOf(build: Build | null, completion: CharacterCompletion): Multipliers {
  if (build === null) return PLAIN
  const each: Multipliers[] = []
  for (const [readingKey, bar] of READING_BARS) {
    const reading = completion.reportedStats?.[readingKey]
    if (reading?.activeBuffs === undefined) continue
    const metrics = calculateReadingStatsByBar(
      build,
      bar,
      reading.activeBuffs,
      reading.championPoints
    ).metrics as Record<string, { value: number } | undefined>
    const value = (metric: string) => metrics[metric]?.value ?? 0
    const chance = Math.min(1, value("critical-rating") / criticalRating.divisor)
    each.push({
      healing: (1 + value("healing-total")) * (1 + chance * value("healing-critical-bonus")),
      damage: 1 + chance * value("critical-damage"),
      healthMaximum: value("health-maximum"),
      armorShare: armorShareOf(value("resistance-physical"), value("resistance-spell")),
      damageTaken: value("damage-taken"),
    })
  }
  if (each.length === 0) return PLAIN
  return {
    healing: meanOf(each, (one) => one.healing),
    damage: meanOf(each, (one) => one.damage),
    healthMaximum: meanOf(each, (one) => one.healthMaximum),
    armorShare: meanOf(each, (one) => one.armorShare),
    damageTaken: meanOf(each, (one) => one.damageTaken),
  }
}

function attackOf(build: Build | null, completion: CharacterCompletion): WeaponAttack {
  if (build === null) return { light: 0, heavy: 0 }
  const each: WeaponAttack[] = []
  for (const [readingKey, bar] of READING_BARS) {
    const stats = completion.reportedStats?.[readingKey]?.stats
    if (stats === undefined) continue
    const style = weaponStyleOf(build.equipment[bar])
    each.push(
      weaponAttackOf(style, {
        magickaMaximum: stats["magicka-maximum"] ?? 0,
        staminaMaximum: stats["stamina-maximum"] ?? 0,
        powerWeapon: stats["power-weapon"] ?? 0,
        powerSpell: stats["power-spell"] ?? 0,
      })
    )
  }
  if (each.length === 0) return { light: 0, heavy: 0 }
  return { light: meanOf(each, (one) => one.light), heavy: meanOf(each, (one) => one.heavy) }
}

function enchantProcOf(completion: CharacterCompletion): EnchantProc | undefined {
  const procs: EnchantProc[] = []
  for (const [readingKey] of READING_BARS) {
    for (const piece of completion.reportedStats?.[readingKey]?.worn ?? []) {
      const proc = readEnchantProc(piece.enchant)
      if (proc !== undefined) procs.push(proc)
    }
  }
  if (procs.length === 0) return undefined
  return {
    damage: meanOf(procs, (proc) => proc.damage),
    healing: meanOf(procs, (proc) => proc.healing),
  }
}

type BarSkills = {
  readonly skills: readonly RotationSkill[]
  readonly ultimates: readonly RotationUltimate[]
  readonly unread: readonly Unread[]
}

function barSkillsOf(completion: CharacterCompletion): BarSkills | { readonly refused: string } {
  const skills: RotationSkill[] = []
  const unread: Unread[] = []
  const ultimates: RotationUltimate[] = []
  for (const [readingKey] of READING_BARS) {
    const reading = completion.reportedStats?.[readingKey]
    const kept = reading?.skills
    if (kept === undefined) {
      return {
        refused: `the ${readingKey} reading kept no skills, so a reload on that bar is taken first`,
      }
    }
    for (const skill of kept) {
      if (skill.slot === ULTIMATE_SLOT) {
        const perPoint = (reading?.classPassives ?? [])
          .map((passive) => readHealingPerUltimatePoint(passive.description))
          .find((one) => one !== undefined)
        if (skill.ultimateCost !== undefined && perPoint !== undefined) {
          ultimates.push({ name: skill.name, cost: skill.ultimateCost, healingPerPoint: perPoint })
        }
        continue
      }
      const healing = readSkillHealing(skill.description)
      skills.push({
        name: skill.name,
        durationMs: skill.durationMs,
        castMs: skill.castMs,
        cooldownMs: skill.cooldownMs,
        healing,
        damage: readSkillDamage(skill.description),
        heroism: readHeroism(skill.description),
      })
      if (healing.unread.length > 0) unread.push({ name: skill.name, sentences: healing.unread })
    }
  }
  return { skills, ultimates, unread }
}

export async function rotationReadingOf(
  completion: CharacterCompletion
): Promise<RotationReading | { readonly refused: string }> {
  const bars = barSkillsOf(completion)
  if ("refused" in bars) return bars
  const build = await buildOf(completion)
  const attack = attackOf(build, completion)
  const healed = healingOverRotation(
    bars.skills,
    FIGHT_SECONDS,
    meanUltimate(bars.ultimates),
    attack
  )
  const proc = enchantProcOf(completion)
  const multipliers = multipliersOf(build, completion)
  const share = slotsReavingBlows(build) ? reavingBlowsShare() : 0
  let procs = 0
  let directDamage = 0
  let reaving = 0
  const ticks = healed.healingByTick.map((heal, at) => {
    const procHere = procsIn(at) ? proc : undefined
    if (procHere !== undefined) procs += 1
    const hit = ((healed.damageByTick[at] ?? 0) + (procHere?.damage ?? 0)) * multipliers.damage
    directDamage += hit
    reaving += share * hit
    const healing = (heal + (procHere?.healing ?? 0) + share * hit) * multipliers.healing
    return { healing, shield: healed.shieldByTick[at] ?? 0 }
  })
  const healingLandedPerSecond = meanOf(ticks, (one) => one.healing)
  const shieldsPerSecond = healed.shielded / FIGHT_SECONDS
  return {
    fightSeconds: FIGHT_SECONDS,
    healed,
    multipliers,
    attack,
    toughnessPerSecond: toughnessPerSecond(multipliers, ticks),
    damagePerSecond: directDamage / FIGHT_SECONDS,
    healingPerSecond: healingLandedPerSecond + shieldsPerSecond,
    healingLandedPerSecond,
    shieldsPerSecond,
    shieldUp: meanOf(ticks, (one) => one.shield),
    directDamage,
    reavingBlowsHealing: reaving,
    enchantProcs: procs,
    enchantHealing: procs * (proc?.healing ?? 0),
    unread: bars.unread,
  }
}
