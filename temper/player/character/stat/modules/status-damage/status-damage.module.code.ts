import {
  equationOf,
  equationStatsOf,
  flooredSumOf,
  isDamage,
} from "akasha/temper/player/character/stat/modules/skill-equation/skill-equation.module.code.ts"

const DAMAGE_DONE: readonly Readonly<Record<string, string>>[] = [
  {
    Bleed: "damage-done-bleed-without-base",
    Disease: "damage-done-disease-without-base",
    Flame: "damage-done-flame-without-base",
    Frost: "damage-done-frost-without-base",
    Magic: "damage-done-magic-without-base",
    Physical: "damage-done-physical-without-base",
    Poison: "damage-done-poison-without-base",
    Shock: "damage-done-shock-without-base",
  },
  { DOT: "damage-done-dot", Direct: "damage-done-direct" },
  { SingleTarget: "damage-done-single-target", AOE: "damage-done-aoe" },
]

const BASE = "damage-done-base"

export function statusDamageOf(
  line: string,
  stats: Readonly<Record<string, number>>
): number | undefined {
  const equation = equationOf(line)
  if (equation === undefined || !equation.read || !isDamage(equation)) return undefined
  const single = Math.fround
  const held: Record<string, number> = {}
  for (const [stat, value] of Object.entries(stats)) held[stat] = single(value)
  const done = [
    ...DAMAGE_DONE.flatMap((step) => equation.tags.flatMap((tag) => step[tag] ?? [])),
    BASE,
  ]
  const bonus = done.reduce((sum, stat) => single(sum + (held[stat] ?? 0)), 1)
  return Math.round(single(flooredSumOf(equation, equationStatsOf(held)) * bonus))
}
