
export const summary = "Emit the ONE next set to perform (movement, set, reps, load, RIR, why), re-derived from live session state on every call"

import { fieldBool, fieldNum, fieldStr } from "@collections/exercises/cli/fields"
import { resolveExercise, resolveOpenSession } from "@collections/exercises/cli/resolve"
import { normalizeSelectValue } from "@collections/exercises/cli/select-values"
import { getPages } from "@collections/exercises/pages/access"
import type { SessionSet } from "@collections/exercises/selection/next-set"
import { decideNextSet, partitionSkips } from "@collections/exercises/selection/next-set"
import type { SelectionEnvelope, SelectorInputs } from "@collections/exercises/selection/selector"
import { selectSession } from "@collections/exercises/selection/selector"
import { loadSelectorInputs } from "@collections/exercises/selection/selector-load"
import type { CommandHelp } from "../../ops/surface.ts"
import { readSelectionPolicy } from "../../lib/exercise-pages.ts"
import { inputError } from "../../lib/exit.ts"
import { parseArgs } from "../../lib/parse-args.ts"
import { FOCUS_OPTIONS } from "../../lib/exercise-vocabularies.ts"

export const help: CommandHelp = {
  flags: [
    {
      name: "--session",
      argLabel: "<ref>",
      valueShape: "token",
      description: "Session (id / title / substring; default: today's open session)",
    },
    {
      name: "--focus",
      argLabel: `<${FOCUS_OPTIONS.join("|")}>`,
      valueShape: "token",
      description: "Focus to plan against (default: today's scheduled focus)",
    },
    {
      name: "--skip",
      argLabel: "<ref>",
      valueShape: "token",
      repeat: true,
      description:
        "Skip a movement. Not yet worked: it leaves the pool and the plan " +
        "re-derives around it (equipment in use). Already worked this session: " +
        "that slot ends for the day, with no substitute",
    },
    { name: "--json", description: "Emit a JSON envelope instead of TSV lines" },
  ],
  exits: [
    { code: 0, meaning: "next set printed, or the session is complete" },
    { code: 1, meaning: "no open session, no schedulable focus, or resolution failure" },
  ],
  examples: [
    "ops exercise next-set",
    'ops exercise next-set --skip "Dumbbell Bench Press"',
    "ops exercise next-set --json",
  ],
}

const SESSION_SET_LIMIT = 200

function withoutSkipped(inputs: SelectorInputs, skipped: ReadonlySet<string>): SelectorInputs {
  if (skipped.size === 0) return inputs
  return { ...inputs, candidates: inputs.candidates.filter((c) => !skipped.has(c.id)) }
}

function coverageLine(envelope: SelectionEnvelope): string {
  const { covered, gaps } = envelope.coverage
  const coveredStr = covered.length > 0 ? covered.join(", ") : "none yet"
  const gapsStr = gaps.length > 0 ? gaps.join(", ") : "none"
  return `covered this week: ${coveredStr} · still open: ${gapsStr}`
}

async function loadSessionSets(
  sessionSlug: string
): Promise<ReadonlyMap<string, readonly SessionSet[]>> {
  const rows = await getPages({
    pageTypeSlug: "set-log",
    where: [{ key: "sessionSlug", eq: sessionSlug }],
    select: ["id", "exerciseSlug", "setNumber", "reps", "rpe", "isWarmup"],
    limit: SESSION_SET_LIMIT,
  })
  const byExercise = new Map<string, SessionSet[]>()
  for (const row of rows.rows) {
    if (fieldBool(row, "isWarmup") === true) continue
    const exerciseSlug = fieldStr(row, "exerciseSlug")
    if (exerciseSlug === undefined) continue
    const list = byExercise.get(exerciseSlug) ?? []
    list.push({
      setNumber: fieldNum(row, "setNumber") ?? list.length + 1,
      reps: fieldNum(row, "reps") ?? null,
      rpe: fieldNum(row, "rpe") ?? null,
    })
    byExercise.set(exerciseSlug, list)
  }
  for (const sets of byExercise.values()) sets.sort((a, b) => a.setNumber - b.setNumber)
  return byExercise
}

export default async function exerciseNextSet(args: readonly string[]): Promise<void> {
  const parsed = parseArgs(help, args)
  const focusRaw = parsed.string("--focus")

  const focus =
    focusRaw !== undefined ? normalizeSelectValue(focusRaw, FOCUS_OPTIONS, "--focus") : undefined
  const json = parsed.boolean("--json")

  const session = await resolveOpenSession(parsed.string("--session"))
  if (session.slug === null) throw new Error(`session ${session.id} carries no slug`)
  const skipRefs = parsed.repeated("--skip")
  const skipped = new Set(
    (await Promise.all(skipRefs.map((ref) => resolveExercise(ref))))
      .map((page) => page.slug)
      .filter((slug): slug is string => slug !== null)
  )

  const [{ focus: resolvedFocus, dayStr, inputs }, loggedByExercise] = await Promise.all([
    loadSelectorInputs(focus, new Date(), readSelectionPolicy()),
    loadSessionSets(session.slug),
  ])
  if (inputs === null) {
    throw inputError(
      `no focus scheduled for ${dayStr} — pass --focus <${FOCUS_OPTIONS.join("|")}> to train anyway`
    )
  }

  const skips = partitionSkips(skipped, inputs.sessionPerformed)
  const { plan, envelope } = selectSession(withoutSkipped(inputs, skips.toExclude))
  const decision = decideNextSet({
    plan,
    loggedByExercise,
    skippedAfterPerforming: skips.afterPerforming,
  })

  if (decision.kind === "done") {
    if (json) {
      process.stdout.write(
        `${JSON.stringify({
          status: "done",
          focus: resolvedFocus,
          why: decision.why,
          coverage: envelope.coverage,
        })}\n`
      )
      return
    }
    process.stdout.write(`status\tdone\nwhy\t${decision.why}\ncoverage\t${coverageLine(envelope)}\n`)
    return
  }

  const { slot, setNumber, why } = decision
  const reps =
    slot.repRangeLow === 0 && slot.repRangeHigh === 0
      ? "time-based"
      : slot.repRangeLow === slot.repRangeHigh
        ? `${slot.repRangeLow}`
        : `${slot.repRangeLow}-${slot.repRangeHigh}`
  const load = slot.progression.prescribedLoad

  if (json) {
    process.stdout.write(
      `${JSON.stringify({
        status: "set",
        movement: slot.exerciseName,
        exerciseId: slot.exerciseId,
        set: setNumber,
        ofSets: slot.targetSets,
        reps,
        load,
        rir: slot.targetRir,
        why,
      })}\n`
    )
    return
  }

  process.stdout.write(
    `movement\t${slot.exerciseName}\n` +
      `set\t${setNumber} of ${slot.targetSets}\n` +
      `reps\t${reps}\n` +
      `load\t${load ?? "pick one allowing the range at the RIR target"}\n` +
      `rir\t${slot.targetRir}\n` +
      `why\t${why}\n`
  )
}
