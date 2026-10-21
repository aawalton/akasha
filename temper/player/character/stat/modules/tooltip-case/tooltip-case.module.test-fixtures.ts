import {
  type Equations,
  type TooltipCase,
  workedOf,
} from "akasha/temper/player/character/stat/modules/tooltip-case/tooltip-case.module.code.ts"

type TooltipMiss = {
  readonly formula: string
  readonly game: number
  readonly temper: number | null
}

type TooltipCaseJudgement = {
  readonly drifted: readonly TooltipMiss[]
  readonly closed: readonly string[]
}

export function judgeTooltipCase(
  tooltipCase: TooltipCase,
  equations: Equations
): TooltipCaseJudgement {
  const worked = workedOf(tooltipCase, equations)
  const drifted: TooltipMiss[] = []
  for (const [formula, game] of Object.entries(tooltipCase.pinned)) {
    const one = worked.get(formula)
    if (one?.game !== game || one.temper !== game) {
      drifted.push({ formula, game, temper: one?.temper ?? null })
    }
  }
  const closed = Object.entries(tooltipCase.gaps)
    .filter(([formula, game]) => {
      const one = worked.get(formula)
      return one?.game === game && one.temper === game
    })
    .map(([formula]) => formula)
  return { drifted, closed }
}
