import { valuesOfType } from "akasha/page/index/modules/reading/index-reading.module.code.ts"
import { mighty } from "akasha/temper/catalog/champion-point/temper-champion-star/pages/mighty.temper-champion-star.ts"
import { warMage } from "akasha/temper/catalog/champion-point/temper-champion-star/pages/war-mage.temper-champion-star.ts"
import { slayer } from "akasha/temper/catalog/skill/pages/slayer/slayer.temper-skill.ts"
import { temperScribedSkill } from "akasha/temper/catalog/skill/temper-scribed-skill/temper-scribed-skill.page-type.ts"
import { temperSkill } from "akasha/temper/catalog/skill/temper-skill.page-type.ts"
import { decodeBuild } from "akasha/temper/player/character/build/build-codec/modules/build-codec/build-codec.module.code.ts"
import { buildHash } from "akasha/temper/player/character/formula-framework/modules/branded-id/branded-id.module.code.ts"
import {
  countArmorPiecesByWeight,
  getWeaponTypeIdsForBar,
} from "akasha/temper/player/character/skill/modules/passive-queries/passive-queries.module.code.ts"
import { calculateReadingStatsByBar } from "akasha/temper/player/character/stat/modules/metric-calculator/metric-calculator.module.code.ts"
import { onsetPercentByName } from "akasha/temper/player/character/stat/modules/onset-scaled-buff/onset-scaled-buff.module.code.ts"
import { healingDoneOfSkill } from "akasha/temper/player/character/stat/modules/scoped-healing/scoped-healing.module.code.ts"
import {
  type ActiveHeld,
  type EquationStats,
  equationStatsOf,
  tooltipPairingOf,
} from "akasha/temper/player/character/stat/modules/skill-equation/skill-equation.module.code.ts"
import { healingDoneBase } from "akasha/temper/player/character/stat/temper-metric/pages/healing-done-base/healing-done-base.temper-metric.ts"
import { temperTooltipCase } from "akasha/temper/player/character/stat/temper-tooltip-case/temper-tooltip-case.page-type.ts"
import { z } from "zod"

export type Equations = ReadonlyMap<number, readonly string[]>

export type SkillLines = ReadonlyMap<number, string>

const NO_LINES: SkillLines = new Map()

const numbersByName = z.record(z.string(), z.number())

const caseSkill = z.strictObject({
  abilityId: z.number(),
  name: z.string(),
  description: z.string(),
  durationMs: z.number().optional(),
  rank: z.number().optional(),
})

export const tooltipCaseShape = z.strictObject({
  character: z.string(),
  bar: z.enum(["primary-weapon-bar", "backup-weapon-bar"]),
  capturedAt: z.number(),
  esoVersion: z.string(),
  stats: numbersByName,
  passives: z.array(z.string()).optional(),
  ranks: numbersByName.optional(),
  stars: z.array(z.string()).optional(),
  buffs: z.array(z.string()).optional(),
  stacks: numbersByName.optional(),
  shares: numbersByName.optional(),
  championPoints: numbersByName.optional(),
  mediumPieces: z.number().optional(),
  weapons: z.array(z.string()).optional(),
  healingDone: z.number().optional(),
  skills: z.array(caseSkill),
  pinned: numbersByName,
  gaps: numbersByName,
})

export type TooltipCase = z.infer<typeof tooltipCaseShape>

type TooltipCaseRead = Omit<TooltipCase, "pinned" | "gaps">

type Worked = { readonly game: number; readonly temper: number | null }

const skillHeld = z.object({
  esoSkillId: z.number(),
  equations: z.array(z.string()),
  variants: z
    .array(z.object({ esoSkillId: z.number(), equations: z.array(z.string()).optional() }))
    .optional(),
})

export function equationsOf(values: Iterable<unknown>): Equations {
  const found = new Map<number, readonly string[]>()
  for (const value of values) {
    const said = skillHeld.safeParse(value)
    if (!said.success) continue
    const { esoSkillId, equations, variants } = said.data
    found.set(esoSkillId, equations)
    for (const variant of variants ?? []) {
      found.set(variant.esoSkillId, variant.equations ?? equations)
    }
  }
  return found
}

const skillLined = z.object({
  esoSkillId: z.number(),
  skillLineId: z.string(),
  variants: z.array(z.object({ esoSkillId: z.number() })).optional(),
})

export function skillLinesOf(values: Iterable<unknown>): SkillLines {
  const found = new Map<number, string>()
  for (const value of values) {
    const said = skillLined.safeParse(value)
    if (!said.success) continue
    const { esoSkillId, skillLineId, variants } = said.data
    found.set(esoSkillId, skillLineId)
    for (const variant of variants ?? []) found.set(variant.esoSkillId, skillLineId)
  }
  return found
}

export function skillValuesIn(root: string): readonly unknown[] {
  return [temperSkill.slug, temperScribedSkill.slug].flatMap((type) =>
    valuesOfType(root, type).map((one) => one.value)
  )
}

export function skillStatsOf(
  stats: EquationStats,
  abilityId: number,
  skills: readonly { readonly abilityId: number }[],
  held: ReadonlySet<string>,
  lines: SkillLines,
  ranks: Readonly<Record<string, number>> = {}
): EquationStats {
  const slotted = skills.map((one) => lines.get(one.abilityId))
  const healingDone = healingDoneOfSkill(stats.healingDone, lines.get(abilityId), slotted, held)
  const powerShare = SLOTTED_POWER.filter((one) => held.has(one.held)).reduce(
    (sum, one) =>
      sum +
      (one.shareByRank[ranks[one.held] ?? 0] ?? 0) *
        slotted.filter((line) => line === one.line).length,
    0
  )
  return { ...stats, healingDone, buildHealingDone: stats.healingDone, powerShare }
}

const SLOTTED_POWER: readonly {
  readonly held: string
  readonly line: string
  readonly shareByRank: Readonly<Record<number, number>>
}[] = [{ held: slayer.slug, line: slayer.skillLineId, shareByRank: { 1: 0.01, 2: 0.02, 3: 0.03 } }]

export type CaseListed = { readonly path: string; readonly slug: string }

export function everyTooltipCase(root: string): readonly CaseListed[] {
  return valuesOfType(root, temperTooltipCase.slug).map((one) => ({
    path: one.path,
    slug: String(one.value.slug),
  }))
}

export type Bar = TooltipCase["bar"]

const RANKS_KEPT: readonly string[] = [slayer.slug]

function ranksOf(
  stated: Readonly<Partial<Record<string, number>>> | undefined
): Pick<BuildHeld, "ranks"> {
  const kept = RANKS_KEPT.flatMap((slug) => {
    const rank = stated?.[slug]
    return rank === undefined ? [] : [[slug, rank] as const]
  })
  return kept.length === 0 ? {} : { ranks: Object.fromEntries(kept) }
}

export type BuildHeld = {
  readonly passives: string[]
  readonly ranks?: Readonly<Record<string, number>>
  readonly stars: string[]
  readonly mediumPieces: number
  readonly weapons?: Readonly<Record<Bar, readonly string[]>>
}

export function heldOfBuild(hash: string): BuildHeld | undefined {
  let build: ReturnType<typeof decodeBuild> | undefined
  try {
    build = decodeBuild(buildHash(hash))
  } catch {
    return undefined
  }
  if (build === null || build === undefined) return undefined
  const { warfare, fitness, craft } = build.championPoints
  return {
    passives: [...build.passives],
    ...ranksOf(build.passiveRanks),
    stars: [...warfare.slotted, ...fitness.slotted, ...craft.slotted],
    mediumPieces: countArmorPiecesByWeight(build.equipment.armor).medium,
    weapons: {
      "primary-weapon-bar": getWeaponTypeIdsForBar(build.equipment["primary-weapon-bar"]),
      "backup-weapon-bar": getWeaponTypeIdsForBar(build.equipment["backup-weapon-bar"]),
    },
  }
}

type Calculating = Parameters<typeof calculateReadingStatsByBar>

export type ReadingCalculated = {
  readonly activeBuffs?: Calculating[2]
  readonly championPoints?: Calculating[3]
}

export function healingDoneOf(hash: string, bar: Bar, reading: ReadingCalculated): number {
  let build: ReturnType<typeof decodeBuild> | undefined
  try {
    build = decodeBuild(buildHash(hash))
  } catch {
    return 0
  }
  if (build === null || build === undefined) return 0
  const worked = calculateReadingStatsByBar(
    build,
    bar,
    reading.activeBuffs ?? [],
    reading.championPoints ?? []
  )
  return worked.metrics[healingDoneBase.slug]?.value ?? 0
}

type Onset = { readonly weapon: number; readonly spell: number }

type ReadingHeld = {
  readonly activeBuffs?: readonly {
    readonly name: string
    readonly stacks?: number
    readonly powerAtOnset?: Onset | undefined
  }[]
  readonly championPoints?: readonly { readonly championSkillId: number; readonly points: number }[]
}

const POINTS_KEPT = [warMage, mighty]

function heldOfReading(
  reading: ReadingHeld
): Pick<TooltipCaseRead, "buffs" | "stacks" | "shares" | "championPoints"> {
  const { activeBuffs, championPoints } = reading
  const stacked = (activeBuffs ?? []).filter((one) => (one.stacks ?? 0) > 0)
  const shared = (activeBuffs ?? []).flatMap((one) => {
    const percent = onsetPercentByName(one.name, one.powerAtOnset)
    return percent === undefined ? [] : [[one.name, percent] as const]
  })
  const pointsOf = (id: number) =>
    championPoints?.find((one) => one.championSkillId === id)?.points ?? 0
  return {
    ...(activeBuffs === undefined
      ? {}
      : { buffs: [...new Set(activeBuffs.map((one) => one.name))] }),
    ...(stacked.length === 0
      ? {}
      : { stacks: Object.fromEntries(stacked.map((one) => [one.name, one.stacks ?? 0])) }),
    ...(shared.length === 0 ? {} : { shares: Object.fromEntries(shared) }),
    ...(championPoints === undefined
      ? {}
      : {
          championPoints: Object.fromEntries(
            POINTS_KEPT.map((star) => [star.slug, pointsOf(star.esoChampionSkillId)])
          ),
        }),
  }
}

export function heldOfCase(
  build: BuildHeld | undefined,
  reading: ReadingHeld,
  bar?: Bar
): Pick<
  TooltipCaseRead,
  | "passives"
  | "ranks"
  | "stars"
  | "buffs"
  | "stacks"
  | "shares"
  | "championPoints"
  | "mediumPieces"
  | "weapons"
> {
  if (build === undefined) return heldOfReading(reading)
  const { weapons, ...worn } = build
  const onBar = bar === undefined || weapons === undefined ? undefined : weapons[bar]
  return {
    ...worn,
    ...(onBar === undefined ? {} : { weapons: [...onBar] }),
    ...heldOfReading(reading),
  }
}

export function heldSetOf(
  read: Pick<TooltipCaseRead, "passives" | "stars" | "weapons">
): ReadonlySet<string> {
  return new Set([...(read.passives ?? []), ...(read.stars ?? []), ...(read.weapons ?? [])])
}

export function activeOf(
  read: Pick<TooltipCaseRead, "buffs" | "stacks" | "shares" | "championPoints" | "mediumPieces">
): ActiveHeld {
  return {
    buffs: new Set(read.buffs ?? []),
    stacks: read.stacks ?? {},
    shares: read.shares ?? {},
    championPoints: read.championPoints ?? {},
    mediumPieces: read.mediumPieces ?? 0,
  }
}

function formulaOf(abilityId: number, placeholder: number): string {
  return `${String(abilityId)} <<${String(placeholder)}>>`
}

export function workedOf(
  read: TooltipCaseRead,
  equations: Equations,
  lines: SkillLines = NO_LINES
): ReadonlyMap<string, Worked> {
  const stats = equationStatsOf(read.stats, read.healingDone)
  const built = heldSetOf(read)
  const active = activeOf(read)
  const found = new Map<string, Worked>()
  for (const skill of read.skills) {
    const held = equations.get(skill.abilityId)
    if (held === undefined) continue
    const pairing = tooltipPairingOf(
      skill.description,
      held,
      skillStatsOf(stats, skill.abilityId, read.skills, built, lines, read.ranks),
      built,
      active,
      skill.durationMs,
      skill.rank
    )
    if (!pairing.paired) continue
    for (const one of pairing.numbers) {
      const formula = formulaOf(skill.abilityId, one.placeholder)
      const before = found.get(formula)
      const agrees =
        before === undefined || (before.game === one.game && before.temper === one.temper)
      found.set(
        formula,
        agrees ? { game: one.game, temper: one.temper } : { game: before.game, temper: null }
      )
    }
  }
  return found
}

export function inNameOrder(numbers: Readonly<Record<string, number>>): Record<string, number> {
  return Object.fromEntries(Object.entries(numbers).sort(([one], [two]) => one.localeCompare(two)))
}

export function pinnedTooltipCaseOf(
  read: TooltipCaseRead,
  equations: Equations,
  lines: SkillLines = NO_LINES
): TooltipCase {
  const pinned: Record<string, number> = {}
  const gaps: Record<string, number> = {}
  for (const [formula, worked] of workedOf(read, equations, lines)) {
    if (worked.temper === worked.game) pinned[formula] = worked.game
    else gaps[formula] = worked.game
  }
  return tooltipCaseOf(read, pinned, gaps)
}

export function tooltipCaseOf(
  read: TooltipCaseRead,
  pinned: Readonly<Record<string, number>>,
  gaps: Readonly<Record<string, number>>
): TooltipCase {
  return {
    character: read.character,
    bar: read.bar,
    capturedAt: read.capturedAt,
    esoVersion: read.esoVersion,
    stats: inNameOrder(read.stats),
    ...(read.passives === undefined ? {} : { passives: [...read.passives].sort() }),
    ...(read.ranks === undefined ? {} : { ranks: inNameOrder(read.ranks) }),
    ...(read.stars === undefined ? {} : { stars: [...read.stars].sort() }),
    ...(read.buffs === undefined ? {} : { buffs: [...read.buffs].sort() }),
    ...(read.stacks === undefined ? {} : { stacks: inNameOrder(read.stacks) }),
    ...(read.shares === undefined ? {} : { shares: inNameOrder(read.shares) }),
    ...(read.championPoints === undefined
      ? {}
      : { championPoints: inNameOrder(read.championPoints) }),
    ...(read.mediumPieces === undefined ? {} : { mediumPieces: read.mediumPieces }),
    ...(read.weapons === undefined ? {} : { weapons: [...read.weapons].sort() }),
    ...(read.healingDone === undefined ? {} : { healingDone: read.healingDone }),
    skills: read.skills.map(({ abilityId, name, description, durationMs, rank }) => ({
      abilityId,
      name,
      description,
      ...(durationMs === undefined ? {} : { durationMs }),
      ...(rank === undefined ? {} : { rank }),
    })),
    pinned: inNameOrder(pinned),
    gaps: inNameOrder(gaps),
  }
}

export function tooltipCaseText(tooltipCase: TooltipCase): string {
  return `${JSON.stringify(tooltipCase, null, 2)}\n`
}
