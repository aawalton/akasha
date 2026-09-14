import type { VerdictCoverage } from "akasha/verdict/modules/shape/verdict-shape.module.code.ts"

export function renderCoverage(coverage: VerdictCoverage): string {
  const { observed, declared, unit } = coverage
  if (declared === null) return `${observed} ${unit} (denominator not computed)`
  return `${observed} of ${declared} ${unit}`
}
