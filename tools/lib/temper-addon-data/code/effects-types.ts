import { codeModuleSync } from "../../code-import.ts"

const held = codeModuleSync<{
  isMetricEffect: <T>(effect: T) => effect is T & { readonly metricId: string }
}>("@temper/shared-formula-framework/effects-types")

export const isMetricEffect = held.isMetricEffect
