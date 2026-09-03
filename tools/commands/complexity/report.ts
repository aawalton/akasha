export const summary = "Workspace-wide complexity roll-up: percentiles + top outliers"

import {
  type CyclomaticRow,
  collectCyclomaticRows,
  collectHalsteadRows,
  collectMaintainabilityRows,
  type HalsteadRow,
  type MaintainabilityRow,
  percentile,
  resolveAnalysisInputs,
} from "@akasha/analysis-complexity/complexity-rows"
import { parseArgs } from "../../lib/parse-args.ts"
import type { CommandHelp } from "../../ops/surface.ts"

export const help: CommandHelp = {
  flags: [
    {
      name: "--top",
      argLabel: "<n>",
      valueShape: "token",
      default: "10",
      description: "Number of outliers to include per metric.",
    },
    { name: "--json", description: "Emit JSON instead of TSV." },
  ],
  examples: ["ops complexity report", "ops complexity report --top 25 --json"],
}

interface MetricSummary {
  readonly p50: number
  readonly p75: number
  readonly p90: number
  readonly p95: number
  readonly p99: number
  readonly max: number
  readonly count: number
}

interface ReportShape {
  readonly cyclomatic: MetricSummary & { readonly top: readonly CyclomaticRow[] }
  readonly halstead: MetricSummary & { readonly top: readonly HalsteadRow[] }
  readonly maintainability: MetricSummary & { readonly top: readonly MaintainabilityRow[] }
}

function fmt(n: number, digits = 2): string {
  return n.toFixed(digits)
}

function renderSection(title: string, summary: MetricSummary, digits: number): string {
  const lines = [
    `# ${title}  (n=${summary.count})`,
    `p50\t${fmt(summary.p50, digits)}`,
    `p75\t${fmt(summary.p75, digits)}`,
    `p90\t${fmt(summary.p90, digits)}`,
    `p95\t${fmt(summary.p95, digits)}`,
    `p99\t${fmt(summary.p99, digits)}`,
    `max\t${fmt(summary.max, digits)}`,
  ]
  return lines.join("\n")
}

export default async function complexityReport(args: readonly string[]): Promise<void> {
  const parsed = parseArgs(help, args)
  const top = parsed.nonNegativeInt("--top") ?? 10
  const json = parsed.boolean("--json")

  const summarize = (values: readonly number[]): MetricSummary => {
    const sorted = [...values].sort((a, b) => a - b)
    return {
      p50: percentile(sorted, 50),
      p75: percentile(sorted, 75),
      p90: percentile(sorted, 90),
      p95: percentile(sorted, 95),
      p99: percentile(sorted, 99),
      max: sorted[sorted.length - 1] ?? 0,
      count: sorted.length,
    }
  }

  const inputs = resolveAnalysisInputs(undefined)
  const ccRows = collectCyclomaticRows(inputs)
  const hsRows = collectHalsteadRows(inputs)
  const miRows = collectMaintainabilityRows(inputs)

  const ccTop = [...ccRows].sort((a, b) => b.cc - a.cc).slice(0, top)
  const hsTop = [...hsRows].sort((a, b) => b.volume - a.volume).slice(0, top)
  const miTop = [...miRows].sort((a, b) => a.mi - b.mi).slice(0, top)

  const cyclomaticSummary = summarize(ccRows.map((r) => r.cc))
  const halsteadSummary = summarize(hsRows.map((r) => r.volume))
  const maintainabilitySummary = summarize(miRows.map((r) => r.mi))

  if (json) {
    const out: ReportShape = {
      cyclomatic: { ...cyclomaticSummary, top: ccTop },
      halstead: { ...halsteadSummary, top: hsTop },
      maintainability: { ...maintainabilitySummary, top: miTop },
    }
    process.stdout.write(`${JSON.stringify(out)}\n`)
    return
  }

  const blocks: string[] = []
  blocks.push(renderSection("Cyclomatic Complexity (per function)", cyclomaticSummary, 0))
  if (ccTop.length > 0) {
    blocks.push(
      ["## top by cc", ...ccTop.map((r) => `${r.cc}\t${r.file}\t${r.function}:${r.line}`)].join(
        "\n"
      )
    )
  }
  blocks.push(renderSection("Halstead Volume (per function)", halsteadSummary, 2))
  if (hsTop.length > 0) {
    blocks.push(
      [
        "## top by volume",
        ...hsTop.map((r) => `${fmt(r.volume)}\t${r.file}\t${r.function}:${r.line}`),
      ].join("\n")
    )
  }
  blocks.push(renderSection("Maintainability Index (per file)", maintainabilitySummary, 1))
  if (miTop.length > 0) {
    blocks.push(["## bottom by mi", ...miTop.map((r) => `${fmt(r.mi, 1)}\t${r.file}`)].join("\n"))
  }
  process.stdout.write(`${blocks.join("\n\n")}\n`)
}
