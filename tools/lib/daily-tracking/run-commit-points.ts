import { z } from "zod"
import { codeRoot } from "../code-root.ts"
import { rollupActiveCaloriesForDay } from "./active-calories.ts"
import { rollupBreathingForDay } from "./breathing-points.ts"
import { getEsoDayStrOffset, readSessionPages } from "./tracking-modules.ts"
import { writeEngineTotalPoints } from "./engine-total-points.ts"
import { writeHealthTotalPoints } from "./health-total-points.ts"
import { rollupNutritionForDay } from "./nutrition-points.ts"
import { writeDailySourcePointsForPersonas } from "./points-source-engine.ts"
import { rescoreDriftedPersonas } from "./points-source-rescore.ts"
import {
  PRAYER_SESSION_SPEC,
  ROMANCE_SESSION_SPEC,
  VISUAL_ARTS_SESSION_SPEC,
  writeSessionPointsDailyForPersona,
  writeSessionPointsTotalForPersona,
} from "./session-points-totals.ts"
import { rollupSleepForDay } from "./sleep-points.ts"
import { rollupStrengthForDay } from "./strength-points.ts"
import { rollupHealthTaskPointsForDay } from "./task-points.ts"
import { writeTotalPointsForPersonas } from "./totals.ts"
import type { SessionPage } from "./tracking-types.ts"

const EnvSchema = z.object({
  REPO_ROOT: z.string().min(1).optional(),
})

const READING_SCAN_DAYS = 14
const READING_SCAN_DAY_OFFSETS: readonly number[] = Array.from(
  { length: READING_SCAN_DAYS },
  (_, index) => index - (READING_SCAN_DAYS - 1)
)

const POINTS_SOURCE_DAY_OFFSETS = [-1, 0] as const

const SESSION_PASSES = [
  { label: "visual-arts", spec: VISUAL_ARTS_SESSION_SPEC },
  { label: "prayer", spec: PRAYER_SESSION_SPEC },
  { label: "romance", spec: ROMANCE_SESSION_SPEC },
] as const

export async function runCommitPoints(): Promise<void> {
  const env = EnvSchema.parse(process.env)
  const repoRoot = env.REPO_ROOT ?? codeRoot()

  const now = new Date()
  const sessions = (await readSessionPages()) as readonly SessionPage[]
  for (const offset of READING_SCAN_DAY_OFFSETS) {
    const dayStr = getEsoDayStrOffset(now, offset)
    const strength = await rollupStrengthForDay(dayStr)
    console.log(
      `commit-points ${dayStr}: strengthVolume=${strength.strengthVolume} (${strength.outcome})`
    )
    const cardio = await rollupActiveCaloriesForDay(dayStr, sessions)
    console.log(
      `commit-points ${dayStr}: activeCalories=${cardio.activeCalories} (${cardio.outcome})`
    )
    const sleep = await rollupSleepForDay(dayStr)
    console.log(`commit-points ${dayStr}: sleepPoints=${sleep.sleepPoints} (${sleep.outcome})`)
    const nutrition = await rollupNutritionForDay(dayStr)
    console.log(
      `commit-points ${dayStr}: nutritionPoints=${nutrition.nutritionPoints} (${nutrition.outcome})`
    )
    const tasks = await rollupHealthTaskPointsForDay(dayStr)
    console.log(`commit-points ${dayStr}: taskPoints=${tasks.taskPoints} (${tasks.outcome})`)
    const breathing = await rollupBreathingForDay(dayStr)
    console.log(
      `commit-points ${dayStr}: breathingPoints=${breathing.breathingPoints} (${breathing.outcome})`
    )
  }

  const pointsSourceDayStrs = POINTS_SOURCE_DAY_OFFSETS.map((offset) =>
    getEsoDayStrOffset(now, offset)
  )
  const pointsSourcePersonaDays = await writeDailySourcePointsForPersonas(
    repoRoot,
    pointsSourceDayStrs
  )
  for (const f of pointsSourcePersonaDays) {
    console.log(
      `commit-points daily-points-source ${f.dayStr}: ${f.personaTitle} sourcePoints=${f.sourcePoints} (${f.outcome})`
    )
  }

  const rescored = await rescoreDriftedPersonas()
  for (const r of rescored) {
    console.log(
      `commit-points rescore: ${r.slug} bar=${r.currentBar} rewrote ${r.written} of ${r.examined} stored day(s)`
    )
  }

  const totals = await writeTotalPointsForPersonas(repoRoot)
  for (const t of totals.personas) {
    console.log(
      `commit-points totals: ${t.personaTitle} totalPoints=${t.totalPoints} persona=${t.personaWritten ? "written" : "skipped"}`
    )
  }

  const engineTotals = await writeEngineTotalPoints(repoRoot)
  console.log(
    `commit-points engine-totals: ${engineTotals.examined} persona page(s) examined, ` +
      `${engineTotals.personas.length} metered` +
      (engineTotals.noFigure.length > 0
        ? `, no figure for ${engineTotals.noFigure.join(", ")}`
        : "")
  )
  for (const t of engineTotals.personas) {
    console.log(
      `commit-points engine-totals: ${t.slug} totalPoints=${t.totalPoints} over ${t.population} — ${t.personaWritten ? "written" : "skipped"}`
    )
  }

  const health = await writeHealthTotalPoints()
  for (const p of health.personas) {
    console.log(
      `commit-points totals: ${p.personaTitle} totalPoints=${p.totalPoints} persona=${p.personaWritten ? "written" : "skipped"}`
    )
  }

  for (const pass of SESSION_PASSES) {
    const totalsReport = await writeSessionPointsTotalForPersona(pass.spec)
    if (totalsReport.undeclared !== null) {
      console.log(
        `commit-points ${pass.label}-totals: nothing written for ${pass.spec.personaSlug} — ${totalsReport.undeclared}`
      )
      continue
    }
    for (const t of totalsReport.outcomes) {
      console.log(
        `commit-points ${pass.label}-totals: ${t.personaTitle} totalPoints=${t.total} persona=${t.personaWritten ? "written" : "skipped"}`
      )
    }
    const dailyReport = await writeSessionPointsDailyForPersona(pass.spec, pointsSourceDayStrs)
    for (const d of dailyReport.days) {
      console.log(
        `commit-points ${pass.label}-daily ${d.dayStr}: ${d.personaTitle} sourcePoints=${d.sourcePoints} (${d.outcome})`
      )
    }
  }
}
