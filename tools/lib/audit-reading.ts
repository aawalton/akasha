export const SCAN_COVERAGES = ["complete", "truncated"] as const
export type ScanCoverage = (typeof SCAN_COVERAGES)[number]

export type AuditReading =
  | { readonly kind: "no-population" }
  | {
      readonly kind: "measured"
      readonly scanned: number
      readonly compared: number
      readonly findings: number
      readonly coverage: ScanCoverage
    }

export interface AuditMeasurement {
  readonly scanned: number
  readonly compared: number
  readonly findings: number
  readonly coverage: ScanCoverage
}

export function summarizeAudit(input: AuditMeasurement): AuditReading {
  if (input.scanned === 0) return { kind: "no-population" }
  return {
    kind: "measured",
    scanned: input.scanned,
    compared: input.compared,
    findings: input.findings,
    coverage: input.coverage,
  }
}

const NOT_A_ZERO = "this is not a zero"

export function renderAuditReading(subject: string, reading: AuditReading): readonly string[] {
  if (reading.kind === "no-population") {
    return [
      `${subject}\tno-population`,
      `  Nothing was scanned, so nothing is known — ${NOT_A_ZERO}.`,
    ]
  }
  const head =
    `${subject}\tmeasured\tscanned=${reading.scanned}\t` +
    `compared=${reading.compared}\tfindings=${reading.findings}\t` +
    `coverage=${reading.coverage}`
  return [head, secondLine(reading), ...truncationLines(reading.coverage)]
}

function secondLine(reading: Extract<AuditReading, { kind: "measured" }>): string {
  if (reading.compared === 0) {
    return `  ${reading.scanned} scanned and none could be weighed — ${NOT_A_ZERO}.`
  }
  if (reading.findings === 0) {
    return `  ${reading.compared} weighed and none is the class — a zero from a comparison that ran.`
  }
  return `  ${reading.findings} of ${reading.compared} weighed are the class.`
}

function truncationLines(coverage: ScanCoverage): readonly string[] {
  if (coverage === "complete") return []
  return ["  The scan came back full, so every count above is a FLOOR rather than a census."]
}
