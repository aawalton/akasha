import { decodeBuild } from "akasha/temper/player/character/build/build-codec/modules/build-codec/build-codec.module.code.ts"
import type { CharacterState } from "akasha/temper/player/character/build/modules/build-types/build-types.module.code.ts"
import { buildHash } from "akasha/temper/player/character/formula-framework/modules/branded-id/branded-id.module.code.ts"
import type { EffectSource } from "akasha/temper/player/character/formula-framework/modules/effect-source/effect-source.module.code.ts"
import { calculateReadingStatsByBar } from "akasha/temper/player/character/stat/modules/metric-calculator/metric-calculator.module.code.ts"
import { metrics } from "akasha/temper/player/character/stat/modules/metrics/metrics.module.code.ts"
import { onsetPercentByName } from "akasha/temper/player/character/stat/modules/onset-scaled-buff/onset-scaled-buff.module.code.ts"
import { z } from "zod"

const SHEET_ROW = "ADVANCED_STAT_DISPLAY_TYPE_"

const PERCENT = 100

type SheetValue = { readonly flat?: number | undefined; readonly percent?: number | undefined }

const statsByName = z.record(z.string(), z.number())

const listedBuff = z.strictObject({
  abilityId: z.number(),
  name: z.string(),
  stacks: z.number().optional(),
  powerAtOnset: z.strictObject({ weapon: z.number(), spell: z.number() }).optional(),
})

const spentStar = z.strictObject({
  championSkillId: z.number(),
  points: z.number(),
  maxPoints: z.number(),
})

export const statCaseShape = z.strictObject({
  character: z.string(),
  bar: z.enum(["primary-weapon-bar", "backup-weapon-bar"]),
  buildHash: z.string(),
  capturedAt: z.number(),
  esoVersion: z.string(),
  inCombat: z.boolean(),
  ultimate: z.number().optional(),
  health: z.number().optional(),
  elderDragonAmount: z.number().optional(),
  activeBuffs: z.array(listedBuff),
  championPoints: z.array(spentStar),
  pinned: statsByName,
  gaps: statsByName,
})

type StatCase = z.infer<typeof statCaseShape>

type CaseRead = Omit<StatCase, "pinned" | "gaps"> & { readonly stats: Record<string, number> }

type Estimated = {
  readonly estimate: (stat: string) => number
  readonly unmatchedBuffNames: readonly string[]
  readonly sources: readonly EffectSource[]
}

export function estimatedOf(read: Omit<StatCase, "pinned" | "gaps">): Estimated {
  const build = decodeBuild(buildHash(read.buildHash))
  if (build === null) throw new Error(`the build of the ${read.character} case does not decode`)
  return estimatedOfBuild(build, read)
}

export function estimatedOfBuild(
  build: CharacterState,
  read: Omit<StatCase, "pinned" | "gaps">
): Estimated {
  const estimated = calculateReadingStatsByBar(
    build,
    read.bar,
    read.activeBuffs,
    read.championPoints,
    read.ultimate,
    { health: read.health, amount: read.elderDragonAmount }
  )
  const metrics = estimated.metrics as Record<string, { value: number } | undefined>
  return {
    estimate: (stat) => metrics[stat]?.value ?? 0,
    unmatchedBuffNames: estimated.unmatchedBuffNames,
    sources: estimated.sources,
  }
}

const ELDER_DRAGON_RANKS: ReadonlySet<number> = new Set([29460, 44951])

const AMOUNT_MARK = "Current amount: |cffffff"

type AmountHeld = {
  readonly elderDragonAmount?: number | undefined
  readonly classPassives?:
    | readonly { readonly abilityId: number; readonly description: string }[]
    | undefined
}

export function elderDragonAmountOf(reading: AmountHeld): number | undefined {
  if (reading.elderDragonAmount !== undefined) return reading.elderDragonAmount
  const passive = reading.classPassives?.find((one) => ELDER_DRAGON_RANKS.has(one.abilityId))
  if (passive === undefined) return undefined
  const at = passive.description.indexOf(AMOUNT_MARK)
  if (at < 0) return undefined
  const rest = passive.description.slice(at + AMOUNT_MARK.length)
  const amount = Number(rest.slice(0, rest.indexOf("|r")))
  return Number.isInteger(amount) ? amount : undefined
}

export function elderDragonHeldOf(reading: AmountHeld & { readonly health?: number | undefined }): {
  readonly health?: number
  readonly elderDragonAmount?: number
} {
  const amount = elderDragonAmountOf(reading)
  if (amount === undefined) return {}
  return {
    ...(reading.health === undefined ? {} : { health: reading.health }),
    elderDragonAmount: amount,
  }
}

export function estimatesOf(read: Omit<StatCase, "pinned" | "gaps">): (stat: string) => number {
  return estimatedOf(read).estimate
}

function sheetPartOf(stat: string): "flat" | "percent" | undefined {
  const catalog = metrics()
  if (!catalog.has(stat)) return undefined
  const metric = catalog.data[stat]
  return metric.category === "advanced" ? metric.esoStatValuePart : undefined
}

export type SheetRowStat = {
  readonly row: string
  readonly stat: string
  readonly part: "flat" | "percent"
  readonly game: number
}

export function sheetRowStatsOf(
  sheet: Readonly<Record<string, SheetValue>> | undefined
): readonly SheetRowStat[] {
  const found: SheetRowStat[] = []
  if (sheet === undefined) return found
  for (const metric of Object.values(metrics().data)) {
    const named = metric.advancedSheetRow
    const flat = named === undefined ? undefined : sheet[named]?.flat
    if (named !== undefined && flat !== undefined) {
      found.push({ row: named, stat: metric.id, part: "flat", game: flat })
    }
    if (metric.category !== "advanced") continue
    const row = metric.esoStatConstantName.replace(SHEET_ROW, "").toLowerCase().replaceAll("_", "-")
    const part = metric.esoStatValuePart
    const value = sheet[row]?.[part]
    if (value !== undefined) found.push({ row, stat: metric.id, part, game: value })
  }
  return found
}

export function sheetStatsOf(
  sheet: Readonly<Record<string, SheetValue>> | undefined
): Record<string, number> {
  const stats: Record<string, number> = {}
  for (const one of sheetRowStatsOf(sheet)) stats[one.stat] = one.game
  return stats
}

export function statsInOrder(stats: Readonly<Record<string, number>>): Record<string, number> {
  const ordered: Record<string, number> = {}
  for (const stat of Object.keys(stats).sort()) ordered[stat] = stats[stat] ?? 0
  return ordered
}

export function reproduces(stat: string, estimate: number, game: number): boolean {
  if (sheetPartOf(stat) === "percent") return Math.fround(game / PERCENT) === estimate
  return estimate === game
}

export function pinnedCaseOf(read: CaseRead): StatCase {
  const { stats, ...rest } = read
  const estimate = estimatesOf(rest)
  const pinned: Record<string, number> = {}
  const gaps: Record<string, number> = {}
  for (const stat of Object.keys(stats).sort()) {
    const game = stats[stat] ?? 0
    if (reproduces(stat, estimate(stat), game)) pinned[stat] = game
    else gaps[stat] = game
  }
  return {
    ...rest,
    activeBuffs: rest.activeBuffs.map(({ abilityId, name, stacks, powerAtOnset }) => ({
      abilityId,
      name,
      ...(stacks === undefined || stacks === 0 ? {} : { stacks }),
      ...(powerAtOnset === undefined || onsetPercentByName(name, powerAtOnset) === undefined
        ? {}
        : { powerAtOnset: { weapon: powerAtOnset.weapon, spell: powerAtOnset.spell } }),
    })),
    championPoints: rest.championPoints.map(({ championSkillId, points, maxPoints }) => ({
      championSkillId,
      points,
      maxPoints,
    })),
    pinned,
    gaps,
  }
}

function inline(one: object): string {
  const fields = Object.entries(one).map(([key, value]) => `"${key}": ${JSON.stringify(value)}`)
  return `{ ${fields.join(", ")} }`
}

function listed(many: readonly object[]): string {
  return `[\n${many.map((one) => `    ${inline(one)}`).join(",\n")}\n  ]`
}

function byStat(stats: Record<string, number>): string {
  const lines = Object.entries(stats).map(([stat, game]) => `    "${stat}": ${String(game)}`)
  return lines.length === 0 ? "{}" : `{\n${lines.join(",\n")}\n  }`
}

export function statCaseText(statCase: StatCase): string {
  return [
    "{",
    `  "character": ${JSON.stringify(statCase.character)},`,
    `  "bar": ${JSON.stringify(statCase.bar)},`,
    `  "buildHash": ${JSON.stringify(statCase.buildHash)},`,
    `  "capturedAt": ${String(statCase.capturedAt)},`,
    `  "esoVersion": ${JSON.stringify(statCase.esoVersion)},`,
    `  "inCombat": ${String(statCase.inCombat)},`,
    ...(statCase.ultimate === undefined ? [] : [`  "ultimate": ${String(statCase.ultimate)},`]),
    ...(statCase.health === undefined ? [] : [`  "health": ${String(statCase.health)},`]),
    ...(statCase.elderDragonAmount === undefined
      ? []
      : [`  "elderDragonAmount": ${String(statCase.elderDragonAmount)},`]),
    `  "activeBuffs": ${listed(statCase.activeBuffs)},`,
    `  "championPoints": ${listed(statCase.championPoints)},`,
    `  "pinned": ${byStat(statCase.pinned)},`,
    `  "gaps": ${byStat(statCase.gaps)}`,
    "}",
    "",
  ].join("\n")
}
