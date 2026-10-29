import { metricTree } from "akasha/temper/player/character/stat/modules/metric-tree/metric-tree.module.code.ts"
import {
  isStatusEffectNode,
  type MetricTreeNode,
  type StatusEffectNode,
} from "akasha/temper/player/character/stat/modules/metric-tree-types/metric-tree-types.module.code.ts"
import {
  equationOf,
  equationStatsOf,
  equationValue,
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

const STATUS_EFFECT = "damage-done-status-effect"

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
    STATUS_EFFECT,
  ]
  const bonus = done.reduce((sum, stat) => single(sum + (held[stat] ?? 0)), 1)
  const summed = equationValue(equation, equationStatsOf(held)) ?? 0
  return Math.round(single(summed * bonus))
}

function statusEffectsIn(
  nodes: readonly MetricTreeNode[] | undefined
): readonly StatusEffectNode[] {
  return (nodes ?? []).flatMap((node) =>
    isStatusEffectNode(node) ? [node] : statusEffectsIn(node.children)
  )
}

export function statusDamagesOf(
  stats: ReadonlyMap<string, number>
): Readonly<Record<string, number>> {
  const held = Object.fromEntries(stats)
  const dealt: Record<string, number> = {}
  for (const category of Object.values(metricTree())) {
    for (const node of statusEffectsIn(category.children)) {
      const damage = node.equations
        .map((line) => statusDamageOf(line, held))
        .find((one) => one !== undefined)
      if (damage !== undefined && damage !== 0) dealt[node.id] = damage
    }
  }
  return dealt
}
