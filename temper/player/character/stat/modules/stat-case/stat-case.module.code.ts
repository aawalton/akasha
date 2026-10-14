import { decodeBuild } from "akasha/temper/player/character/build/build-codec/modules/build-codec/build-codec.module.code.ts"
import { buildHash } from "akasha/temper/player/character/formula-framework/modules/branded-id/branded-id.module.code.ts"
import { calculateReadingStatsByBar } from "akasha/temper/player/character/stat/modules/metric-calculator/metric-calculator.module.code.ts"
import { z } from "zod"

const statsByName = z.record(z.string(), z.number())

export const statCaseShape = z.strictObject({
  character: z.string(),
  bar: z.enum(["primary-weapon-bar", "backup-weapon-bar"]),
  buildHash: z.string(),
  capturedAt: z.number(),
  inCombat: z.boolean(),
  activeBuffs: z.array(z.strictObject({ abilityId: z.number(), name: z.string() })),
  championPoints: z.array(
    z.strictObject({ championSkillId: z.number(), points: z.number(), maxPoints: z.number() })
  ),
  pinned: statsByName,
  gaps: statsByName,
})

type StatCase = z.infer<typeof statCaseShape>

type StatMiss = { readonly stat: string; readonly game: number; readonly estimate: number }

type StatCaseJudgement = {
  readonly drifted: readonly StatMiss[]
  readonly closed: readonly string[]
}

function estimatesOf(statCase: StatCase): (stat: string) => number {
  const build = decodeBuild(buildHash(statCase.buildHash))
  if (build === null) throw new Error(`the build of the ${statCase.character} case does not decode`)
  const estimated = calculateReadingStatsByBar(
    build,
    statCase.bar,
    statCase.activeBuffs,
    statCase.championPoints
  )
  const metrics = estimated.metrics as Record<string, { value: number } | undefined>
  return (stat) => metrics[stat]?.value ?? 0
}

export function judgeStatCase(statCase: StatCase): StatCaseJudgement {
  const estimate = estimatesOf(statCase)
  const drifted: StatMiss[] = []
  for (const [stat, game] of Object.entries(statCase.pinned)) {
    const value = estimate(stat)
    if (value !== game) drifted.push({ stat, game, estimate: value })
  }
  const closed = Object.entries(statCase.gaps)
    .filter(([stat, game]) => estimate(stat) === game)
    .map(([stat]) => stat)
  return { drifted, closed }
}
