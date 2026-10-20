import {
  estimatesOf,
  reproduces,
  type statCaseShape,
} from "akasha/temper/player/character/stat/modules/stat-case/stat-case.module.code.ts"
import type { z } from "zod"

type StatCase = z.infer<typeof statCaseShape>

type StatMiss = { readonly stat: string; readonly game: number; readonly estimate: number }

type StatCaseJudgement = {
  readonly drifted: readonly StatMiss[]
  readonly closed: readonly string[]
}

export function judgeStatCase(statCase: StatCase): StatCaseJudgement {
  const estimate = estimatesOf(statCase)
  const drifted: StatMiss[] = []
  for (const [stat, game] of Object.entries(statCase.pinned)) {
    const value = estimate(stat)
    if (!reproduces(stat, value, game)) drifted.push({ stat, game, estimate: value })
  }
  const closed = Object.entries(statCase.gaps)
    .filter(([stat, game]) => reproduces(stat, estimate(stat), game))
    .map(([stat]) => stat)
  return { drifted, closed }
}
