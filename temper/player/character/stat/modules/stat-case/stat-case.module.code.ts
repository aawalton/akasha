import { decodeBuild } from "akasha/temper/player/character/build/build-codec/modules/build-codec/build-codec.module.code.ts"
import { buildHash } from "akasha/temper/player/character/formula-framework/modules/branded-id/branded-id.module.code.ts"
import { calculateReadingStatsByBar } from "akasha/temper/player/character/stat/modules/metric-calculator/metric-calculator.module.code.ts"
import { z } from "zod"

const statsByName = z.record(z.string(), z.number())

const listedBuff = z.strictObject({ abilityId: z.number(), name: z.string() })

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
  activeBuffs: z.array(listedBuff),
  championPoints: z.array(spentStar),
  pinned: statsByName,
  gaps: statsByName,
})

type StatCase = z.infer<typeof statCaseShape>

type CaseRead = Omit<StatCase, "pinned" | "gaps"> & { readonly stats: Record<string, number> }

export function estimatesOf(read: Omit<StatCase, "pinned" | "gaps">): (stat: string) => number {
  const build = decodeBuild(buildHash(read.buildHash))
  if (build === null) throw new Error(`the build of the ${read.character} case does not decode`)
  const estimated = calculateReadingStatsByBar(
    build,
    read.bar,
    read.activeBuffs,
    read.championPoints
  )
  const metrics = estimated.metrics as Record<string, { value: number } | undefined>
  return (stat) => metrics[stat]?.value ?? 0
}

export function pinnedCaseOf(read: CaseRead): StatCase {
  const { stats, ...rest } = read
  const estimate = estimatesOf(rest)
  const pinned: Record<string, number> = {}
  const gaps: Record<string, number> = {}
  for (const stat of Object.keys(stats).sort()) {
    const game = stats[stat] ?? 0
    if (estimate(stat) === game) pinned[stat] = game
    else gaps[stat] = game
  }
  return {
    ...rest,
    activeBuffs: rest.activeBuffs.map(({ abilityId, name }) => ({ abilityId, name })),
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
    `  "activeBuffs": ${listed(statCase.activeBuffs)},`,
    `  "championPoints": ${listed(statCase.championPoints)},`,
    `  "pinned": ${byStat(statCase.pinned)},`,
    `  "gaps": ${byStat(statCase.gaps)}`,
    "}",
    "",
  ].join("\n")
}
