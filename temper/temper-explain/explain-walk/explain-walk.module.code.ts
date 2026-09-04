export interface RuleTraceRow {
  readonly index: number
  readonly ruleId: string | null
  readonly categoryId: string
  readonly action: string
  readonly destination: string | null
  readonly verdict: "matched" | "rejected" | "indeterminate"
  readonly verdictDetail: string | null
  readonly resolvedDestination: string | null
}

export interface OutcomeJson {
  readonly kind: "matched" | "implicit-terminal" | "indeterminate"
  readonly action: string | null
  readonly destination: string | null
  readonly label: string | null
  readonly indeterminateRules: ReadonlyArray<RuleTraceRow>
}

export interface TtcBreakdown {
  readonly saleAvg: number | null
  readonly minPrice: number | null
  readonly amountCount: number | null
  readonly saleAmountCount: number | null
  readonly estimatedValue: number | null
  readonly merchantValue: number | null
  readonly replacementCost: number | null
}

export interface JsonOutput {
  readonly itemId: number
  readonly itemName: string | null
  readonly itemLink: string | null
  readonly categoryNodeIds: ReadonlyArray<string> | null
  readonly itemKey: string | null
  readonly ttc: TtcBreakdown | null
  readonly perRule: ReadonlyArray<RuleTraceRow>
  readonly outcome: OutcomeJson
}

function deriveStr(amountCount: number | null, saleAmountCount: number | null): number | undefined {
  if (amountCount === null || saleAmountCount === null) return undefined
  if (saleAmountCount === 0) return undefined
  if (amountCount > 0) return Math.min(1, saleAmountCount / amountCount)
  return 1
}

function num(n: number | null): string {
  return n === null ? "" : String(n)
}

export function formatExplainWalk(out: JsonOutput): string {
  const lines: string[] = [
    `itemId\t${out.itemId}`,
    `itemName\t${out.itemName ?? ""}`,
    `itemLink\t${out.itemLink ?? ""}`,
    `itemKey\t${out.itemKey ?? ""}`,
    `categoryNodeIds\t${out.categoryNodeIds === null ? "" : out.categoryNodeIds.join(",")}`,
  ]
  if (out.ttc !== null) {
    const t = out.ttc
    const str = deriveStr(t.amountCount, t.saleAmountCount)
    lines.push("")
    lines.push(
      "# TTC pricing: saleAvg\tminPrice\tamountCount\tsaleAmountCount\tstr\testimatedValue\tmerchantValue\treplacementCost"
    )
    lines.push(
      [
        "ttc",
        num(t.saleAvg),
        num(t.minPrice),
        num(t.amountCount),
        num(t.saleAmountCount),
        str === undefined ? "" : str.toFixed(4),
        num(t.estimatedValue),
        num(t.merchantValue),
        num(t.replacementCost),
      ].join("\t")
    )
  }
  lines.push("")
  lines.push(
    "# rule walk: index\truleId\tcategoryId\taction\tdestination\tverdict\tdetail\tresolved"
  )
  for (const r of out.perRule) {
    lines.push(
      [
        r.index,
        r.ruleId ?? "",
        r.categoryId,
        r.action,
        r.destination ?? "",
        r.verdict,
        r.verdictDetail ?? "",
        r.resolvedDestination ?? "",
      ].join("\t")
    )
  }
  lines.push("")
  lines.push(`outcome\t${out.outcome.kind}`)
  lines.push(`outcomeAction\t${out.outcome.action ?? ""}`)
  lines.push(`outcomeDestination\t${out.outcome.destination ?? ""}`)
  lines.push(`outcomeLabel\t${out.outcome.label ?? ""}`)
  if (out.outcome.indeterminateRules.length > 0) {
    lines.push("")
    lines.push("# indeterminate rules (the verdict could change with more state):")
    for (const r of out.outcome.indeterminateRules) {
      lines.push(`- #${r.index} ${r.action}\t${r.verdictDetail ?? ""}`)
    }
  }
  return `${lines.join("\n")}\n`
}
