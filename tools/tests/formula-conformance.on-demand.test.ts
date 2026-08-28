import { describe, expect, it } from "bun:test"
import { evaluateFormula } from "@shared/pages-core/formula/evaluate"
import { parseExpression } from "@shared/pages-core/formula/parser"
import {
  type Case,
  type CodeErrorCode,
  type Finding,
  type Json,
  type RanCode,
  type RanOurs,
  type RefusedCode,
  type Run,
  judge,
  pose,
  read,
  render,
} from "../lib/formula-conformance.ts"
import { evaluate } from "../lib/page-expression.ts"
import { ExpressionRefused } from "../lib/page-expression-value.ts"
import { CONFORMANCE_CASES } from "./formula-conformance/cases.ts"
import { DIVERGENT_CASES } from "./formula-conformance/divergent.ts"

const EVALUATION_CODES: ReadonlySet<string> = new Set([
  "comparison_type_mismatch",
  "equality_non_scalar",
  "arithmetic_nan",
  "divide_by_zero",
  "bracket_access_type_error",
  "ref_lookup_type_error",
  "unknown_function",
  "function_argument_type_error",
])

function said(err: unknown): string {
  return err instanceof Error ? err.message : String(err)
}

function referenceCode(err: unknown): CodeErrorCode | null {
  if (!(err instanceof Error)) return null
  if (err.name === "FormulaParseError") return "parse_error"
  if (err.name !== "FormulaEvaluationError") return null
  const code = (err as Error & { readonly code?: unknown }).code
  return typeof code === "string" && EVALUATION_CODES.has(code) ? (code as CodeErrorCode) : null
}

function runOurs(one: Case): RanOurs {
  try {
    return { kind: "value", held: evaluate(one.expression, pose(one).reads) }
  } catch (err) {
    if (err instanceof ExpressionRefused) return { kind: "refused", code: err.code, says: err.message }
    return { kind: "threw", says: `${err instanceof Error ? err.name : "unknown"}: ${said(err)}` }
  }
}

function runCode(one: Case): RanCode {
  try {
    const ast = parseExpression(one.expression)
    return { kind: "value", json: evaluateFormula(ast, pose(one).values) as Json }
  } catch (err) {
    const code = referenceCode(err)
    if (code === null) return { kind: "threw", says: `${err instanceof Error ? err.name : "unknown"}: ${said(err)}` }
    return { kind: "error", code, says: said(err) }
  }
}

function runner(one: Case): Run {
  return { ours: runOurs(one), code: one.code === undefined ? null : runCode(one) }
}

function ofKind(findings: readonly Finding[], kind: Finding["kind"]): readonly Finding[] {
  return findings.filter(function isKind(found) {
    return found.kind === kind
  })
}

const reading = read(CONFORMANCE_CASES, runner)
process.stdout.write(`\n${render(reading)}\n`)

describe("formula conformance — the table against both implementations", () => {
  it("poses every case it holds", () => {
    expect(reading.total).toBe(CONFORMANCE_CASES.length)
    expect(reading.total).toBeGreaterThan(0)
  })

  it("holds no case the table itself has built wrong", () => {
    expect(ofKind(reading.findings, "defect").map(function named(found) {
      return `${found.id}: ${found.said}`
    })).toEqual([])
  })

  it("finds our evaluator where the table records it", () => {
    expect(ofKind(reading.findings, "drift-ours").map(function named(found) {
      return `${found.id}: ${found.ours}`
    })).toEqual([])
  })

  it("finds the reference where the table records it", () => {
    expect(ofKind(reading.findings, "drift-code").map(function named(found) {
      return `${found.id}: ${found.code}`
    })).toEqual([])
  })

  it("reports every divergence between the two implementations", () => {
    expect(ofKind(reading.findings, "divergence").map(function named(found) {
      return `${found.id}: ${found.said} — ours ${found.ours}, reference ${found.code}`
    })).toEqual([])
  })
})

const divergent = read(DIVERGENT_CASES, runner)
process.stdout.write(
  `\nNEGATIVE CONTROL — the same runner over ${DIVERGENT_CASES.length} case(s) built to diverge, ` +
    `so that a clean run above is worth something\n\n${render(divergent)}\n`
)

describe("formula conformance — the runner against cases built to diverge", () => {

  it("catches a case that answers where the reference rejects", () => {
    const found = ofKind(divergent.findings, "divergence").map(function id(one) {
      return one.id
    })
    expect(found).toContain("divergent-answered-where-the-reference-rejected")
  })

  it("catches two answers that are not the same", () => {
    const found = ofKind(divergent.findings, "divergence").map(function id(one) {
      return one.id
    })
    expect(found).toContain("divergent-two-answers-that-are-not-the-same")
  })

  it("catches two rejections that are not for the same reason", () => {
    const found = ofKind(divergent.findings, "divergence").map(function id(one) {
      return one.id
    })
    expect(found).toContain("divergent-two-rejections-that-are-not-for-the-same-reason")
  })

  it("catches a case that rejects where the reference answers", () => {
    const found = ofKind(divergent.findings, "divergence").map(function id(one) {
      return one.id
    })
    expect(found).toContain("divergent-rejected-where-the-reference-answered")
  })

  it("reports a divergence for every case in the divergent fixture, and no drift", () => {
    expect(ofKind(divergent.findings, "divergence")).toHaveLength(DIVERGENT_CASES.length)
    expect(ofKind(divergent.findings, "drift-ours")).toHaveLength(0)
    expect(ofKind(divergent.findings, "drift-code")).toHaveLength(0)
  })
})

const REJECTED_ALIKE: Case = {
  id: "control-a-fault-both-implementations-name",
  category: "agreed",
  covers: "a division by zero, which both reject and both call by the same name",
  expression: "a / b",
  values: { a: 1, b: 0 },
  ours: { kind: "refused", says: "the right side of `/` is zero" },
  code: { kind: "error", code: "divide_by_zero" },
}

function miscoded(one: Case, code: RefusedCode): Run {
  const run = runner(one)
  if (run.ours.kind !== "refused") throw new Error(`the control case ${one.id} no longer refuses`)
  return { ...run, ours: { ...run.ours, code } }
}

describe("formula conformance — the control on comparing one rejection against the other", () => {
  it("finds our evaluator naming the reference's own code where the fault is shared", () => {
    const run = runner(REJECTED_ALIKE)
    expect(run.ours.kind === "refused" ? run.ours.code : run.ours.kind).toBe("divide_by_zero")
    expect(judge(REJECTED_ALIKE, run)).toEqual([])
  })

  it("goes red where our evaluator names a code the reference did not", () => {
    const found = judge(REJECTED_ALIKE, miscoded(REJECTED_ALIKE, "arithmetic_nan"))
    expect(found.map(function kindOf(one) {
      return one.kind
    })).toEqual(["divergence"])
    expect(found[0]?.said).toBe(
      "both rejected, and the reasons are not the same: ours named `arithmetic_nan` and the reference named `divide_by_zero`"
    )
  })

  it("goes red where our evaluator names a code the reference has none for", () => {
    const found = judge(REJECTED_ALIKE, miscoded(REJECTED_ALIKE, "not_implemented"))
    expect(found[0]?.said).toBe(
      "both rejected, and ours refused for want of a construct it does not implement where the reference named `divide_by_zero`"
    )
  })
})
