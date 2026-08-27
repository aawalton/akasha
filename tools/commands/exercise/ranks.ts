
export const summary = "Rank movements by the weighted selection objective with a per-goal (Longevity/Energy/Functionality/Aesthetics) breakdown"

import { displayTitle } from "@collections/exercises/cli/fields"
import { resolveExercise } from "@collections/exercises/cli/resolve"
import { getPages } from "@collections/exercises/pages/access"
import type { Page } from "@collections/exercises/pages/page"
import { movementFeaturesFromPage } from "@collections/exercises/selection/movement-features"
import type { GoalScores, GoalWeights } from "@collections/exercises/selection/scorer"
import { scoreMovement } from "@collections/exercises/selection/scorer"
import type { CommandHelp } from "../../ops/surface.ts"
import { readSelectionPolicy } from "../../lib/exercise-pages.ts"
import { inputError } from "../../lib/exit.ts"
import { parseArgs } from "../../lib/parse-args.ts"

export const help: CommandHelp = {
  flags: [
    {
      name: "--exercises",
      argLabel: "<csv>",
      valueShape: "token",
      description: "Comma-separated movements to rank (id / title / unique substring)",
    },
    {
      name: "--limit",
      argLabel: "<n>",
      valueShape: "token",
      description: "Top-N to show when ranking the whole catalog (default 15)",
    },
    { name: "--json", description: "Emit a JSON envelope instead of TSV" },
  ],
  exits: [
    { code: 0, meaning: "ranking printed" },
    { code: 1, meaning: "bad input or query failure" },
  ],
  examples: [
    'ops exercise ranks --exercises "Dumbbell Bench Press, One-Arm Kettlebell Swings, Concentration Curls"',
    "ops exercise ranks --limit 20",
    "ops exercise ranks --json",
  ],
}

const CATALOG_READ_LIMIT = 2000

interface RankedMovement {
  readonly id: string
  readonly name: string
  readonly scores: GoalScores
}

function rankMovements(
  pages: readonly Page[],
  weights: GoalWeights,
  name: (page: Page) => string,
  score: (page: Page, weights: GoalWeights) => GoalScores
): readonly RankedMovement[] {
  return pages
    .map((page) => ({ id: page.id, name: name(page), scores: score(page, weights) }))
    .sort((a, b) => b.scores.blend - a.scores.blend)
}

const SELECT_FIELDS = [
  "id",
  "title",
  "category",
  "mechanic",
  "primaryMuscles",
  "secondaryMuscles",
  "movementPattern",
  "secondaryPattern",
  "laterality",
  "isBallistic",
  "skillCost",
  "trainsLengthenedRange",
  "gripDemand",
  "sfrScore",
]

export default async function exerciseRanks(args: readonly string[]): Promise<void> {
  const parsed = parseArgs(help, args)
  const exercisesCsv = parsed.string("--exercises")
  const limit = parsed.nonNegativeInt("--limit") ?? 15
  const json = parsed.boolean("--json")

  const weights = readSelectionPolicy().weights

  let pages: readonly Page[]
  if (exercisesCsv !== undefined) {
    const refs = exercisesCsv
      .split(",")
      .map((r) => r.trim())
      .filter((r) => r !== "")
    if (refs.length === 0) throw inputError("--exercises listed no movements")
    pages = await Promise.all(refs.map((ref) => resolveExercise(ref)))
  } else {
    const all = await getPages({
      pageTypeSlug: "exercise",
      select: SELECT_FIELDS,
      limit: CATALOG_READ_LIMIT,
    })
    pages = all.rows
  }

  const ranked = rankMovements(pages, weights, displayTitle, (page, w) =>
    scoreMovement(movementFeaturesFromPage(page), w)
  )
  const shown = exercisesCsv !== undefined ? ranked : ranked.slice(0, limit)

  if (json) {
    process.stdout.write(`${JSON.stringify({ weights, movements: shown })}\n`)
    return
  }

  let out = `weights\tL ${weights.longevity} / E ${weights.energy} / F ${weights.functionality} / A ${weights.aesthetics}\n`
  out += "#\tblend\tL\tE\tF\tA\tmovement\n"
  shown.forEach((m, i) => {
    const s = m.scores
    out += `${i + 1}\t${s.blend.toFixed(3)}\t${s.longevity.toFixed(2)}\t${s.energy.toFixed(2)}\t${s.functionality.toFixed(2)}\t${s.aesthetics.toFixed(2)}\t${m.name}\n`
  })
  process.stdout.write(out)
}
