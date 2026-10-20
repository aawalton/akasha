import {
  type EnchantProc,
  procsIn,
  readEnchantProc,
} from "akasha/temper/player/character/stat/modules/enchant-proc/enchant-proc.module.code.ts"
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
  findIn,
  textPattern,
} from "akasha/temper/player/character/stat/modules/text-pattern/text-pattern.module.code.ts"
import {
  type Toughness,
  toughnessPerSecond,
} from "akasha/temper/player/character/stat/modules/toughness-per-second/toughness-per-second.module.code.ts"
import {
  type WeaponAttack,
  type WeaponStats,
  type WeaponStyle,
  weaponAttackOf,
} from "akasha/temper/player/character/stat/modules/weapon-attacks/weapon-attacks.module.code.ts"

const FIGHT_SECONDS = 600

const ULTIMATE_SLOT = 8

const PERCENT_OF_THE_DAMAGE = textPattern("<n>% of the damage")

export type Multipliers = Toughness & { readonly healing: number; readonly damage: number }

const PLAIN: Multipliers = {
  healing: 1,
  damage: 1,
  healthMaximum: 0,
  physicalShare: 0,
  spellShare: 0,
  damageTakenMartial: 0,
  damageTakenMagical: 0,
}

type BarSkill = {
  readonly slot: number
  readonly name: string
  readonly description: string
  readonly durationMs: number
  readonly castMs: number
  readonly cooldownMs: number
  readonly ultimateCost?: number | undefined
}

export type RotationBar = {
  readonly skills: readonly BarSkill[]
  readonly classPassives: readonly string[]
  readonly enchants: readonly string[]
  readonly weaponStyle: WeaponStyle | undefined
  readonly weaponStats: WeaponStats
  readonly multipliers: Multipliers | undefined
}

type Unread = { readonly name: string; readonly sentences: readonly string[] }

export type RotationReading = {
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

export function reavingBlowsShareOf(description: string): number {
  return (findIn(PERCENT_OF_THE_DAMAGE, description)?.[0] ?? 0) / 100
}

function meanOf<T>(each: readonly T[], pick: (this: void, one: T) => number): number {
  if (each.length === 0) return 0
  return each.reduce((sum, one) => sum + pick(one), 0) / each.length
}

function meanMultipliers(bars: readonly RotationBar[]): Multipliers {
  const each: Multipliers[] = []
  for (const bar of bars) {
    if (bar.multipliers !== undefined) each.push(bar.multipliers)
  }
  if (each.length === 0) return PLAIN
  return {
    healing: meanOf(each, (one) => one.healing),
    damage: meanOf(each, (one) => one.damage),
    healthMaximum: meanOf(each, (one) => one.healthMaximum),
    physicalShare: meanOf(each, (one) => one.physicalShare),
    spellShare: meanOf(each, (one) => one.spellShare),
    damageTakenMartial: meanOf(each, (one) => one.damageTakenMartial),
    damageTakenMagical: meanOf(each, (one) => one.damageTakenMagical),
  }
}

function meanAttack(bars: readonly RotationBar[]): WeaponAttack {
  const each = bars.map((bar) => weaponAttackOf(bar.weaponStyle, bar.weaponStats))
  return { light: meanOf(each, (one) => one.light), heavy: meanOf(each, (one) => one.heavy) }
}

function enchantProcOf(bars: readonly RotationBar[]): EnchantProc | undefined {
  const procs: EnchantProc[] = []
  for (const bar of bars) {
    for (const enchant of bar.enchants) {
      const proc = readEnchantProc(enchant)
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

function ultimateOf(skill: BarSkill, bar: RotationBar): RotationUltimate | undefined {
  let perPoint: number | undefined
  for (const passive of bar.classPassives) {
    perPoint = perPoint ?? readHealingPerUltimatePoint(passive)
  }
  if (skill.ultimateCost === undefined || perPoint === undefined) return undefined
  return { name: skill.name, cost: skill.ultimateCost, healingPerPoint: perPoint }
}

function barSkillsOf(bars: readonly RotationBar[]): BarSkills {
  const skills: RotationSkill[] = []
  const unread: Unread[] = []
  const ultimates: RotationUltimate[] = []
  for (const bar of bars) {
    for (const skill of bar.skills) {
      if (skill.slot === ULTIMATE_SLOT) {
        const ultimate = ultimateOf(skill, bar)
        if (ultimate !== undefined) ultimates.push(ultimate)
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

export function rotationReading(
  bars: readonly RotationBar[],
  reavingBlowsShare: number
): RotationReading {
  const barSkills = barSkillsOf(bars)
  const attack = meanAttack(bars)
  const healed = healingOverRotation(
    barSkills.skills,
    FIGHT_SECONDS,
    meanUltimate(barSkills.ultimates),
    attack
  )
  const proc = enchantProcOf(bars)
  const multipliers = meanMultipliers(bars)
  let procs = 0
  let directDamage = 0
  let reaving = 0
  const ticks = healed.healingByTick.map((heal, at) => {
    const procHere = procsIn(at) ? proc : undefined
    if (procHere !== undefined) procs += 1
    const hit = ((healed.damageByTick[at] ?? 0) + (procHere?.damage ?? 0)) * multipliers.damage
    directDamage += hit
    reaving += reavingBlowsShare * hit
    const healing =
      (heal + (procHere?.healing ?? 0) + reavingBlowsShare * hit) * multipliers.healing
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
    unread: barSkills.unread,
  }
}
