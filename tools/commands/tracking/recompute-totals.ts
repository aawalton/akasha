export const summary =
  "Recompute + high-water write the cumulative Health total onto the Aelwyn persona/value (forward-only; --force allows downward recalibration)"

import type { CommandHelp } from "@akasha/command-system/command-declaring"
import { parseArgs } from "@akasha/command-system/parse-args"
import { dataError } from "../../lib/exit.ts"
import { healthTotalPoints } from "../../lib/tracking-pillars.ts"

export const help: CommandHelp = {
  flags: [
    {
      name: "--slug",
      argLabel: "<slug>",
      valueShape: "token",
      repeat: true,
      description:
        "Restrict the write to this persona, by slug; repeatable. Omitted, every persona in the population is written. A slug naming nobody in it is an error rather than a silent no-op — including a Health persona excluded for carrying an `unavailable` points source, who is not addressable here at all.",
    },
    {
      name: "--dry-run",
      description:
        "Compute and report every total, and write none. The high-water guard is consulted as on a real run, so what is reported is the decision rather than the arithmetic.",
    },
    {
      name: "--force",
      description:
        "Bypass the high-water guard and write the recomputed total even when it is lower (downward recalibration)",
    },
    { name: "--json", description: "Emit a JSON envelope instead of TSV lines" },
  ],
  exits: [
    { code: 0, meaning: "cumulative Health total recomputed and high-water written" },
    { code: 1, meaning: "input error — a --slug naming no Health persona" },
  ],
  examples: [
    "ops tracking recompute-totals --dry-run",
    "ops tracking recompute-totals --slug amy --dry-run",
    "ops tracking recompute-totals --slug amy --force",
    "ops tracking recompute-totals --force",
  ],
}

export default async function trackingRecomputeTotals(args: readonly string[]): Promise<void> {
  const parsed = parseArgs(help, args)
  const force = parsed.boolean("--force")
  const dryRun = parsed.boolean("--dry-run")
  const json = parsed.boolean("--json")
  const slugs = parsed.repeated("--slug")

  const { writeHealthTotalPoints } = await healthTotalPoints()

  const scope = slugs.length === 0 ? "every Health persona" : slugs.join(", ")
  console.error(
    `${dryRun ? "DRY RUN — " : ""}Recomputing per-persona Health totalPoints for ${scope}${
      force ? " (force: downward writes allowed)" : ""
    }…`
  )
  const outcome = await writeHealthTotalPoints({ force, dryRun, slugs })

  if (outcome.unmatchedSlugs.length > 0) {
    throw dataError(
      `no Health persona carries ${outcome.unmatchedSlugs.join(", ")} — the Health population is ${outcome.healthPopulation.join(", ")}`
    )
  }

  if (json) {
    process.stdout.write(`${JSON.stringify(outcome)}\n`)
    return
  }
  process.stdout.write(
    `# ${outcome.dryRun ? "dry run — nothing written" : "wrote"}: ${outcome.personas.length} of ${outcome.healthPopulation.length} Health persona(s) in scope\n`
  )
  process.stdout.write("slug\tstored\tcomputed\twouldWrite\toutcome\n")
  for (const p of outcome.personas) {
    const verdict = p.personaWritten
      ? "written"
      : p.wouldWrite === null
        ? "skipped by the high-water guard"
        : outcome.dryRun
          ? "would write"
          : "skipped"
    process.stdout.write(
      `${p.personaSlug}\t${p.storedTotalPoints ?? "(none)"}\t${p.totalPoints}\t${p.wouldWrite ?? "(none)"}\t${verdict}\n`
    )
  }
}
