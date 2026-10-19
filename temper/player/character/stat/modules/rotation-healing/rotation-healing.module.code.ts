import type { SkillDamage } from "akasha/temper/player/character/stat/modules/skill-damage/skill-damage.module.code.ts"
import type { SkillHealing } from "akasha/temper/player/character/stat/modules/skill-healing/skill-healing.module.code.ts"

export type RotationSkill = {
  readonly name: string
  readonly durationMs: number
  readonly castMs: number
  readonly cooldownMs: number
  readonly healing: SkillHealing
  readonly damage?: SkillDamage
  readonly heroism?: Heroism
}

export type Heroism = {
  readonly ultimate: number
  readonly everySeconds: number
  readonly lastsSeconds: number
}

type RotationAttacks = {
  readonly light: number
  readonly heavy: number
}

const NO_ATTACKS: RotationAttacks = { light: 0, heavy: 0 }

export type RotationUltimate = {
  readonly name: string
  readonly cost: number
  readonly healingPerPoint: number
}

export function meanUltimate(ultimates: readonly RotationUltimate[]): RotationUltimate | undefined {
  const first = ultimates[0]
  if (first === undefined) return undefined
  const mean = (pick: (one: RotationUltimate) => number) =>
    ultimates.reduce((sum, one) => sum + pick(one), 0) / ultimates.length
  return {
    name: first.name,
    cost: mean((one) => one.cost),
    healingPerPoint: mean((one) => one.healingPerPoint),
  }
}

type UltimateSpent = {
  readonly name: string
  readonly casts: number
  readonly gained: number
  readonly healing: number
}

const ULTIMATE_MAX = 500

const LIGHT_ATTACK_ULTIMATE_PER_SECOND = 3

type SkillHealed = {
  readonly name: string
  readonly casts: number
  readonly healing: number
}

export type RotationHealed = {
  readonly fightSeconds: number
  readonly healingPerSecond: number
  readonly lightAttacks: number
  readonly heavyAttacks: number
  readonly directDamage: number
  readonly shielded: number
  readonly skills: readonly SkillHealed[]
  readonly ultimate: UltimateSpent | undefined
  readonly healingByTick: readonly number[]
  readonly shieldByTick: readonly number[]
  readonly damageByTick: readonly number[]
}

function zeros(count: number): number[] {
  const each: number[] = []
  for (let at = 0; at < count; at += 1) each.push(0)
  return each
}

function addAt(each: number[], at: number, amount: number): undefined {
  each[at] = (each[at] ?? 0) + amount
  return undefined
}

const GLOBAL_COOLDOWN_SECONDS = 1

const MILLIS = 1000

function lastsOf(skill: RotationSkill): number {
  return Math.max(skill.durationMs / MILLIS, skill.healing.lastsSeconds)
}

function tickTimes(
  skill: RotationSkill,
  everySeconds: number,
  castAt: number,
  fightSeconds: number
): number[] {
  if (everySeconds <= 0) return []
  const lasts = lastsOf(skill)
  const times: number[] = []
  for (
    let at = castAt + everySeconds;
    at <= castAt + lasts && at <= fightSeconds;
    at += everySeconds
  ) {
    times.push(at)
  }
  return times
}

export function healingOverRotation(
  skills: readonly RotationSkill[],
  fightSeconds: number,
  ultimateSlotted?: RotationUltimate,
  attacks: RotationAttacks = NO_ATTACKS
): RotationHealed {
  let ultimate = 0
  let ultimateGained = 0
  let ultimateCasts = 0
  let heroismUntil = 0
  let heroismPerSecond = 0
  const runsUntil = skills.map(() => 0)
  const readyAt = skills.map(() => 0)
  const casts = skills.map(() => 0)
  const healed = skills.map(() => 0)
  const lasting = (at: number): number => {
    const skill = skills[at]
    return skill !== undefined && lastsOf(skill) > 0 ? 0 : 1
  }
  const queue = skills.map((_, at) => at).sort((one, two) => lasting(one) - lasting(two))
  let lightAttacks = 0
  let heavyAttacks = 0
  let shielded = 0
  let now = 0
  const tickCount = Math.ceil(fightSeconds)
  const healingByTick = zeros(tickCount)
  const shieldByTick = zeros(tickCount)
  const damageByTick = zeros(tickCount)
  const tickOf = (at: number) => Math.min(tickCount - 1, Math.floor(at))
  const step = (seconds: number): undefined => {
    const heroic = Math.max(0, Math.min(seconds, heroismUntil - now))
    const earned = seconds * LIGHT_ATTACK_ULTIMATE_PER_SECOND + heroic * heroismPerSecond
    const kept = Math.min(ULTIMATE_MAX - ultimate, earned)
    ultimate += kept
    ultimateGained += kept
    now += seconds
    return undefined
  }
  while (now < fightSeconds) {
    if (
      ultimateSlotted !== undefined &&
      ultimateSlotted.cost > 0 &&
      ultimate >= ultimateSlotted.cost
    ) {
      ultimate -= ultimateSlotted.cost
      ultimateCasts += 1
      addAt(healingByTick, tickOf(now), ultimateSlotted.cost * ultimateSlotted.healingPerPoint)
      lightAttacks += 1
      addAt(damageByTick, tickOf(now), attacks.light)
      step(GLOBAL_COOLDOWN_SECONDS)
      continue
    }
    const next = queue.find((at) => (runsUntil[at] ?? 0) <= now && (readyAt[at] ?? 0) <= now) ?? -1
    const skill = skills[next]
    if (skill === undefined) {
      heavyAttacks += 1
      addAt(damageByTick, tickOf(now), attacks.heavy)
      step(GLOBAL_COOLDOWN_SECONDS)
      continue
    }
    lightAttacks += 1
    addAt(damageByTick, tickOf(now), attacks.light)
    if (skill.heroism !== undefined) {
      heroismUntil = now + skill.heroism.lastsSeconds
      heroismPerSecond = skill.heroism.ultimate / skill.heroism.everySeconds
    }
    const { direct, shield, tick, tickSeconds } = skill.healing
    const times = tick === 0 ? [] : tickTimes(skill, tickSeconds, now, fightSeconds)
    healed[next] = (healed[next] ?? 0) + direct + shield + tick * times.length
    addAt(healingByTick, tickOf(now), direct)
    for (const at of times) addAt(healingByTick, tickOf(at), tick)
    const shieldLasts = skill.healing.lastsSeconds > 0 ? skill.healing.lastsSeconds : lastsOf(skill)
    const shieldUntil = Math.max(now + shieldLasts, Math.floor(now) + 1)
    for (let at = Math.floor(now); at < shieldUntil && at < tickCount; at += 1) {
      addAt(shieldByTick, at, shield)
    }
    const damage = skill.damage
    if (damage !== undefined) {
      addAt(damageByTick, tickOf(now), damage.hit)
      for (const at of tickTimes(skill, damage.waveSeconds, now, fightSeconds)) {
        addAt(damageByTick, tickOf(at), damage.wave)
      }
    }
    shielded += shield
    casts[next] = (casts[next] ?? 0) + 1
    runsUntil[next] = now + lastsOf(skill)
    readyAt[next] = now + skill.cooldownMs / MILLIS
    step(Math.max(GLOBAL_COOLDOWN_SECONDS, skill.castMs / MILLIS))
  }
  const ultimateHealing =
    ultimateSlotted === undefined
      ? 0
      : ultimateCasts * ultimateSlotted.cost * ultimateSlotted.healingPerPoint
  const total = healed.reduce((sum, one) => sum + one, 0) + ultimateHealing
  return {
    fightSeconds,
    healingPerSecond: total / fightSeconds,
    lightAttacks,
    heavyAttacks,
    directDamage: damageByTick.reduce((sum, one) => sum + one, 0),
    shielded,
    healingByTick,
    shieldByTick,
    damageByTick,
    skills: skills.map((skill, at) => ({
      name: skill.name,
      casts: casts[at] ?? 0,
      healing: healed[at] ?? 0,
    })),
    ultimate:
      ultimateSlotted === undefined
        ? undefined
        : {
            name: ultimateSlotted.name,
            casts: ultimateCasts,
            gained: ultimateGained,
            healing: ultimateHealing,
          },
  }
}
