export const summary = "Measurement coverage of the Book of Everything (audit phase): fraction assessed at all (status != \"unopened\", not D), with both the stable 177-section headline and the live materialized detail, per Part/Division"

import type { CommandHelp } from "../../ops/surface.ts"
import {
  buildCoverageReport,
  type CoverageReport,
  coveragePercent,
  type MeasuredCount,
} from "../../lib/book-of-everything-coverage-status.ts"
import { readStatusTree } from "../../lib/book-of-everything-status-tree.ts"
import { operationalError } from "../../lib/exit.ts"
import { parseArgs } from "../../lib/parse-args.ts"

export const help: CommandHelp = {
  flags: [
    {
      name: "--json",
      description: "Emit the coverage report as single-line JSON instead of the prose tables",
    },
  ],
  exits: [
    { code: 0, meaning: "coverage report computed and printed" },
    { code: 3, meaning: "operational error — the Book tree could not be read" },
  ],
  examples: ["ops ali coverage", "ops ali coverage --json"],
}

export default async function aliCoverage(args: readonly string[]): Promise<void> {
  const parsed = parseArgs(help, args)
  const json = parsed.boolean("--json")

  const pct = (c: MeasuredCount): string => `${coveragePercent(c).toFixed(2)}%`
  const frac = (c: MeasuredCount): string => `${c.measured} / ${c.total}`

  const renderProse = (r: CoverageReport): string => {
    const lines: string[] = []
    lines.push('Book of Everything — Measurement Coverage (audit phase: status != "unopened")')
    lines.push("")
    lines.push(
      `Section headline (STABLE):  ${frac(r.sectionHeadline)} sections opened = ${pct(r.sectionHeadline)}`
    )
    lines.push("  ^ canonical 177-section denominator; monotonic-up as sections open.")
    lines.push(
      `Materialized detail (LIVE): ${frac(r.materializedDetail)} nodes opened = ${pct(r.materializedDetail)}`
    )
    lines.push(
      "  ^ all materialized nodes incl. JIT expansions; NON-monotonic (expansion adds unopened nodes)."
    )
    lines.push("")
    lines.push("By Part:")
    lines.push("| # | Part | Sections | Materialized |")
    lines.push("| --- | --- | --- | --- |")
    r.parts.forEach((p, i) => {
      lines.push(
        `| ${i + 1} | ${p.title} | ${frac(p.sections)} (${pct(p.sections)}) | ${frac(p.materialized)} (${pct(p.materialized)}) |`
      )
    })
    lines.push("")
    lines.push("By Division:")
    lines.push("| Part | Division | Sections | Materialized |")
    lines.push("| --- | --- | --- | --- |")
    for (const d of r.divisions) {
      lines.push(
        `| ${d.partTitle} | ${d.title} | ${frac(d.sections)} (${pct(d.sections)}) | ${frac(d.materialized)} (${pct(d.materialized)}) |`
      )
    }
    return `${lines.join("\n")}\n`
  }

  let report: CoverageReport
  try {
    report = buildCoverageReport(readStatusTree())
  } catch (e) {
    throw operationalError(e instanceof Error ? e.message : String(e))
  }

  process.stdout.write(json ? `${JSON.stringify(report)}\n` : renderProse(report))
}
