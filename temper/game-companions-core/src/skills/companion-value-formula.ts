export type CompanionScalingMetricId = "companion-weapon-damage" | "companion-health-maximum"

type CoefficientType = "total" | "per-tick"

export type CompanionValueFormula =
  | {
      type: "metric-scaling"
      metricId: CompanionScalingMetricId
      coefficient: number
      coefficientType?: CoefficientType
    }
  | {
      type: "metric-percent"
      metricId: CompanionScalingMetricId
      percent: number
      coefficientType?: CoefficientType
    }
  | {
      type: "player-health-percent"
      percent: number
      coefficientType?: CoefficientType
    }
  | {
      type: "fixed"
      value: number
      coefficientType?: CoefficientType
    }

export function getFormulaCoefficientType(formula: CompanionValueFormula): CoefficientType {
  return formula.coefficientType ?? "total"
}
