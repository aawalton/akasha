import type {
  VerdictCoverage,
  VerdictFinding,
} from "akasha/verdict/shape/verdict-shape.module.code.ts"
import { renderCoverage } from "akasha/verdict/text/verdict-text.module.code.ts"

export type ReadingCoverage = VerdictCoverage

export type ReadingFinding = VerdictFinding

export interface AnyReading {
  readonly subject: string
  readonly state: string
  readonly reason: string
  readonly coverage: ReadingCoverage
  readonly findings: readonly ReadingFinding[]
}

const READING_ANCHOR = "READING: "

const FOLD_LINE_BREAKS = /\s*[\r\n]+\s*/g

function readingHeadline(reading: AnyReading): string {
  const head = `${reading.state.toUpperCase()} — ${reading.subject}`
  return `${head}: ${reading.reason} [over ${renderCoverage(reading.coverage)}]`
}

function readingFindingLines(reading: AnyReading): readonly string[] {
  return reading.findings.map((finding) => `  [${finding.at ?? "unattributed"}] ${finding.detail}`)
}

function readingLine(reading: AnyReading): string {
  return `${READING_ANCHOR}${readingHeadline(reading).replace(FOLD_LINE_BREAKS, " ")}`
}

export function emitReading(reading: AnyReading, detail: readonly string[] = []): undefined {
  for (const line of readingFindingLines(reading)) process.stderr.write(`${line}\n`)
  for (const line of detail) process.stderr.write(`${line}\n`)
  process.stdout.write(`${readingLine(reading)}\n`)
}
