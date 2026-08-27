
export const summary = "Select an ordered session plan (pattern coverage + anchor/accessory + double progression) and print it with the per-pick decision envelope"

import { normalizeSelectValue } from "@collections/exercises/cli/select-values"
import type {
  PlannedSlot,
  SelectionDecision,
  SelectionEnvelope,
} from "@collections/exercises/selection/selector"
import { selectSession } from "@collections/exercises/selection/selector"
import { loadSelectorInputs } from "@collections/exercises/selection/selector-load"
import type { CommandHelp } from "../../ops/surface.ts"
import { readSelectionPolicy } from "../../lib/exercise-pages.ts"
import { parseArgs } from "../../lib/parse-args.ts"
import { FOCUS_OPTIONS } from "../../lib/exercise-vocabularies.ts"

export const help: CommandHelp = {
  flags: [
    {
      name: "--focus",
      argLabel: `<${FOCUS_OPTIONS.join("|")}>`,
      valueShape: "token",
      description: "Focus to plan (default: today's scheduled focus)",
    },
    { name: "--json", description: "Emit the full plan + envelope as a JSON envelope" },
  ],
  exits: [
    { code: 0, meaning: "plan printed (or no focus scheduled)" },
    { code: 1, meaning: "bad input or query failure" },
  ],
  examples: [
    "ops exercise select",
    "ops exercise select --focus push",
    "ops exercise select --json",
  ],
}

function repRangeStr(slot: PlannedSlot): string {
  if (slot.repRangeLow === 0 && slot.repRangeHigh === 0) return "time-based"
  if (slot.repRangeLow === slot.repRangeHigh) return `${slot.repRangeLow}`
  return `${slot.repRangeLow}-${slot.repRangeHigh}`
}

function progressionStr(slot: PlannedSlot): string {
  const load = slot.progression.prescribedLoad
  const loadStr = load === null ? "" : `@${load}`
  return `${slot.progression.action}${loadStr}`
}

function decisionBlock(d: SelectionDecision): string {
  const s = d.scores
  const scoreLine = `blend ${s.blend.toFixed(3)}  L${s.longevity.toFixed(2)} E${s.energy.toFixed(2)} F${s.functionality.toFixed(2)} A${s.aesthetics.toFixed(2)}`
  const f = d.featuresUsed
  const feat = `pattern=${f.movementPattern} focus=${f.muscleFocus} laterality=${f.laterality} skill=${f.skillCost} ballistic=${f.isBallistic}`
  const rejected =
    d.rejected.length > 0
      ? d.rejected.map((r) => `${r.name} (${r.blend.toFixed(3)}, ${r.reason})`).join("; ")
      : "-"
  let out = `[${d.sortOrder + 1}] ${d.role} ${d.exerciseName}\t${scoreLine}\n`
  out += `    features: ${feat}\n`
  out += `    rules: ${d.rulesFired.join(", ")}\n`
  if (d.anchorState !== null) out += `    anchor: ${d.anchorState}\n`
  out += `    progression: ${d.progression.rationale}\n`
  out += `    rationale: ${d.rationale}\n`
  out += `    rejected: ${rejected}\n`
  return out
}

function coverageBlock(env: SelectionEnvelope): string {
  const c = env.coverage
  const yn = (b: boolean): string => (b ? "yes" : "NO")
  let out = "\n# coverage (week-to-date)\n"
  out += `covered\t${c.covered.length > 0 ? c.covered.join(", ") : "-"}\n`
  out += `gaps\t${c.gaps.length > 0 ? c.gaps.join(", ") : "-"}\n`
  out += `core-anti\t${yn(c.coreAntiCovered)}\n`
  out += `unilateral-upper\t${yn(c.unilateralUpperCovered)}\n`
  out += `unilateral-lower\t${yn(c.unilateralLowerCovered)}\n`
  return out
}

export default async function exerciseSelect(args: readonly string[]): Promise<void> {
  const parsed = parseArgs(help, args)
  const focusRaw = parsed.string("--focus")

  const focus =
    focusRaw !== undefined ? normalizeSelectValue(focusRaw, FOCUS_OPTIONS, "--focus") : undefined
  const json = parsed.boolean("--json")

  const {
    focus: resolvedFocus,
    dayStr,
    inputs,
  } = await loadSelectorInputs(focus, new Date(), readSelectionPolicy())

  if (inputs === null) {
    if (json) {
      process.stdout.write(
        `${JSON.stringify({ date: dayStr, focus: null, plan: null, envelope: null })}\n`
      )
      return
    }
    process.stdout.write(
      `date\t${dayStr}\nfocus\t(none scheduled — rest day)\nPass --focus <${FOCUS_OPTIONS.join("|")}> to plan anyway.\n`
    )
    return
  }

  const { plan, envelope } = selectSession(inputs)

  if (json) {
    process.stdout.write(
      `${JSON.stringify({ date: dayStr, focus: resolvedFocus, plan, envelope })}\n`
    )
    return
  }

  let out = `date\t${dayStr}\n`
  out += `focus\t${resolvedFocus}\n`
  out += `daySeed\t${envelope.daySeed}\n`
  out += `weights\tL ${envelope.weights.longevity} / E ${envelope.weights.energy} / F ${envelope.weights.functionality} / A ${envelope.weights.aesthetics}\n`
  out += coverageBlock(envelope)

  out += "\n# plan\n"
  out += "#\trole\tmovement\tpattern\tsets\treps\trir\tprogression\n"
  for (const slot of plan.slots) {
    out += `${slot.sortOrder + 1}\t${slot.role}\t${slot.exerciseName}\t${slot.movementPattern}\t${slot.targetSets}\t${repRangeStr(slot)}\tRIR${slot.targetRir}\t${progressionStr(slot)}\n`
  }
  if (plan.slots.length === 0) out += "(no in-kit candidates matched this focus)\n"

  out += "\n# decisions (why)\n"
  for (const d of envelope.decisions) out += decisionBlock(d)

  if (envelope.unfilledSlots.length > 0) {
    out += "\n# unfilled slots (with why)\n"
    for (const u of envelope.unfilledSlots) out += `${u.slot}\t${u.reason}\n`
  }

  process.stdout.write(out)
}
