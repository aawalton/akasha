import type { SkillHealing } from "akasha/temper/player/character/stat/modules/skill-healing/skill-healing.module.code.ts"

export type RotationSkill = {
  readonly name: string
  readonly durationMs: number
  readonly castMs: number
  readonly cooldownMs: number
  readonly healing: SkillHealing
}

export type SkillHealed = {
  readonly name: string
  readonly casts: number
  readonly healing: number
}

export type RotationHealed = {
  readonly fightSeconds: number
  readonly healingPerSecond: number
  readonly lightAttacks: number
  readonly skills: readonly SkillHealed[]
}

const GLOBAL_COOLDOWN_SECONDS = 1

const MILLIS = 1000

function ticksWithin(skill: RotationSkill, castAt: number, fightSeconds: number): number {
  const { tick, tickSeconds } = skill.healing
  if (tick === 0 || tickSeconds <= 0) return 0
  const lasts = skill.durationMs / MILLIS
  let ticks = 0
  for (
    let at = castAt + tickSeconds;
    at <= castAt + lasts && at <= fightSeconds;
    at += tickSeconds
  ) {
    ticks += 1
  }
  return ticks
}

export function healingOverRotation(
  skills: readonly RotationSkill[],
  fightSeconds: number
): RotationHealed {
  const runsUntil = skills.map(() => 0)
  const readyAt = skills.map(() => 0)
  const casts = skills.map(() => 0)
  const healed = skills.map(() => 0)
  let lightAttacks = 0
  let now = 0
  while (now < fightSeconds) {
    const next = skills.findIndex(
      (_, at) => (runsUntil[at] ?? 0) <= now && (readyAt[at] ?? 0) <= now
    )
    const skill = skills[next]
    if (skill === undefined) {
      lightAttacks += 1
      now += GLOBAL_COOLDOWN_SECONDS
      continue
    }
    const { direct, shield, tick } = skill.healing
    healed[next] =
      (healed[next] ?? 0) + direct + shield + tick * ticksWithin(skill, now, fightSeconds)
    casts[next] = (casts[next] ?? 0) + 1
    runsUntil[next] = now + skill.durationMs / MILLIS
    readyAt[next] = now + skill.cooldownMs / MILLIS
    now += Math.max(GLOBAL_COOLDOWN_SECONDS, skill.castMs / MILLIS)
  }
  const total = healed.reduce((sum, one) => sum + one, 0)
  return {
    fightSeconds,
    healingPerSecond: total / fightSeconds,
    lightAttacks,
    skills: skills.map((skill, at) => ({
      name: skill.name,
      casts: casts[at] ?? 0,
      healing: healed[at] ?? 0,
    })),
  }
}
