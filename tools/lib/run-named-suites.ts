#!/usr/bin/env bun

import type { AnyVerdict, VerdictFinding } from "./verdict-channel.ts"
import { z } from "zod"
import { classifyRun, parseBunSummary, type RunVerdict } from "./gate-bun-exit.ts"

export type NamedSuitesSubject = "the-named-test-suites"

export const UNTYPED = "(no type suffix)"

export const AS_GIVEN = "(as given)"

export interface SuiteGroup {
  readonly label: string
  readonly paths: readonly string[]
}

export interface ResolvedSuiteArg {
  readonly arg: string
  readonly files: readonly string[] | null
}

export interface SuiteRun {
  readonly label: string
  readonly bunExitCode: number
  readonly output: string
}

export interface SuiteRunEvidence {
  readonly label: string
  readonly bunExitCode: number
  readonly runVerdict: RunVerdict
  readonly failTotals: readonly number[]
}

export type NamedSuitesEvidence = readonly SuiteRunEvidence[]

interface NamedSuitesResultClaim extends AnyVerdict {
  readonly subject: NamedSuitesSubject
  readonly observedAtMs: number
  readonly evidence: NamedSuitesEvidence
}

export type NamedSuitesResult =
  | (NamedSuitesResultClaim & { readonly kind: "pass" })
  | (NamedSuitesResultClaim & {
      readonly kind: "fail"
      readonly findings: readonly [VerdictFinding, ...(readonly VerdictFinding[])]
    })

const SUBJECT: NamedSuitesSubject = "the-named-test-suites"

const TYPE_SUFFIX_RE = /\.([a-z0-9]+)\.(?:test|spec)\.[cm]?[jt]sx?$/

const TYPE_SUFFIX_MATCH_SCHEMA = z.tuple([z.string(), z.string()])

function labelForFile(file: string): string {
  const matched = TYPE_SUFFIX_MATCH_SCHEMA.safeParse(TYPE_SUFFIX_RE.exec(file))
  return matched.success ? matched.data[1] : UNTYPED
}

export function planSuiteRuns(resolved: readonly ResolvedSuiteArg[]): readonly SuiteGroup[] {
  const byLabel = new Map<string, Set<string>>()
  const add = (label: string, path: string): undefined => {
    const paths = byLabel.get(label) ?? new Set<string>()
    paths.add(path)
    byLabel.set(label, paths)
  }
  for (const { arg, files } of resolved) {
    if (files === null) {
      add(AS_GIVEN, arg)
      continue
    }
    for (const file of files) add(labelForFile(file), file)
  }
  if (byLabel.size === 0) return [{ label: AS_GIVEN, paths: resolved.map((r) => r.arg) }]
  return [...byLabel]
    .sort(([a], [b]) => a.localeCompare(b))
    .map(([label, paths]) => ({ label, paths: [...paths].sort() }))
}

function readRun(run: SuiteRun): SuiteRunEvidence & { readonly filesRan: number | null } {
  const { failTotals, filesRan } = parseBunSummary(run.output)
  return {
    label: run.label,
    bunExitCode: run.bunExitCode,
    runVerdict: classifyRun(run),
    failTotals,
    filesRan,
  }
}

const tally = (failTotals: readonly number[]): number => failTotals.reduce((n, f) => n + f, 0)

export function verdictForNamedSuites(input: {
  readonly runs: readonly SuiteRun[]
  readonly observedAtMs: number
}): NamedSuitesResult {
  const groups = input.runs.map(readRun)
  const totalFail = groups.reduce((sum, g) => sum + tally(g.failTotals), 0)

  const claim = {
    subject: SUBJECT,
    observedAtMs: input.observedAtMs,
    coverage: {
      observed: groups.reduce((sum, g) => sum + (g.filesRan ?? 0), 0),
      declared: null,
      unit: "test files",
    },
    evidence: groups.map(
      ({ label, bunExitCode, runVerdict, failTotals }): SuiteRunEvidence => ({
        label,
        bunExitCode,
        runVerdict,
        failTotals,
      })
    ),
  } as const

  const unobserved = groups.filter((g) => g.filesRan === null)
  const [firstSilent, ...restSilent] = unobserved
  if (firstSilent !== undefined) {
    const silent = (g: SuiteRunEvidence): VerdictFinding => ({
      detail:
        g.runVerdict === "crash"
          ? `bun died on a signal (exit ${g.bunExitCode}) before printing a test-result summary, so nothing it was handed is accounted for`
          : `printed no test-result summary (bun exited ${g.bunExitCode}), so nothing it was handed is accounted for`,
      at: g.label,
    })
    const counted = groups
      .filter((g) => tally(g.failTotals) > 0)
      .map(
        (g): VerdictFinding => ({
          detail: `${tally(g.failTotals)} failing test(s) — bun's own output is on stderr above`,
          at: g.label,
        })
      )
    return {
      ...claim,
      kind: "fail",
      reason:
        `this run certifies nothing: ${unobserved.length} group(s) printed no test-result ` +
        `summary — ${unobserved.map((g) => g.label).join(", ")}`,
      findings: [silent(firstSilent), ...restSilent.map(silent), ...counted],
    }
  }

  const [firstFailed, ...restFailed] = groups.filter((g) => g.runVerdict === "fail")
  if (firstFailed !== undefined) {
    const finding = (g: SuiteRunEvidence): VerdictFinding => ({
      detail:
        tally(g.failTotals) > 0
          ? `${tally(g.failTotals)} failing test(s) — bun's own output is on stderr above`
          : `bun exited ${g.bunExitCode} without printing a test-result summary`,
      at: g.label,
    })
    const findings: readonly [VerdictFinding, ...VerdictFinding[]] = [
      finding(firstFailed),
      ...restFailed.map(finding),
    ]
    return {
      ...claim,
      kind: "fail",
      reason:
        totalFail > 0
          ? `${totalFail} failing test(s)`
          : `${findings.length} group(s) exited nonzero with no test-result summary (fail-closed)`,
      findings,
    }
  }

  const [firstCrashed, ...restCrashed] = groups.filter((g) => g.runVerdict === "crash")
  if (firstCrashed !== undefined) {
    const crashed = [firstCrashed, ...restCrashed]
    return {
      ...claim,
      kind: "fail",
      reason: `bun died on a signal before printing a test-result summary in ${crashed.length} group(s)`,
      findings: [
        {
          detail: `bun died on a signal (exit ${firstCrashed.bunExitCode})`,
          at: firstCrashed.label,
        },
        ...restCrashed.map((g) => ({
          detail: `bun died on a signal (exit ${g.bunExitCode})`,
          at: g.label,
        })),
      ],
    }
  }

  const forgiven = groups.filter((g) => g.bunExitCode !== 0)
  return {
    ...claim,
    kind: "pass",
    reason:
      forgiven.length === 0
        ? "bun exited 0"
        : `every fail tally is 0; forgave ${forgiven
            .map((g) => `${g.label} exiting ${g.bunExitCode}`)
            .join(", ")} over a green summary`,
  }
}

export function isEnumerableTestPath(relativePath: string): boolean {
  const segments = relativePath.split("/")
  return !segments.includes("node_modules") && !segments.includes("__fixtures__")
}

export function decideNamedSuitesExit(verdict: NamedSuitesResult): 0 | 1 | 2 {
  if (verdict.kind === "pass") return 0
  return verdict.evidence.some((g) => g.runVerdict === "fail") ? 1 : 2
}
