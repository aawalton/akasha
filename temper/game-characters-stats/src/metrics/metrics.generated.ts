/**
 * Metrics Module - Centralized exports for all metrics
 *
 * THIS FILE IS AUTO-GENERATED. Do not edit manually.
 * Run: bun run generate-metrics
 *
 * Driver/entry: composes the partial METRICS_DATA partitions from
 * sibling `metrics-data-{group}.ts` modules and exposes the public
 * surface (data files, derived types, helper functions). Splitting
 * the data partitions into siblings keeps each module under the
 * 500-line cap.
 */

import { createDataFile } from "@akasha/utils-narrow/create-data-file"
import type { MetricId } from "@akasha/temper-formula-framework/metric-id"
import type { MetricTemplate } from "./metric-template"
import { METRICS_DATA_AD } from "./metrics-data-ad.generated"
import { METRICS_DATA_EH } from "./metrics-data-eh.generated"
import { METRICS_DATA_IP } from "./metrics-data-ip.generated"
import { METRICS_DATA_RU } from "./metrics-data-ru.generated"

// Re-export types

// =============================================================================
// Build Data File from Partition Imports
// =============================================================================

/**
 * Brand-style boundary helper: TS can't prove that the four `Partial<Record>`
 * partitions cover the full `MetricId` keyset, but the generator emits each
 * id into exactly one partition by first letter, so totality holds by
 * construction. Encapsulates the single permitted cast at the partition-
 * assembly boundary.
 */
type MetricsRecord = Record<MetricId, MetricTemplate>
function asMetricsRecord(value: unknown): MetricsRecord {
  return value as MetricsRecord
}

const METRICS_DATA = asMetricsRecord({
  ...METRICS_DATA_AD,
  ...METRICS_DATA_EH,
  ...METRICS_DATA_IP,
  ...METRICS_DATA_RU,
})

// Separate metrics by formula presence
const METRICS_DATA_WITH_FORMULAS = asMetricsRecord(
  Object.fromEntries(Object.entries(METRICS_DATA).filter(([, m]) => m.formula !== undefined))
)

// =============================================================================
// Data File Export
// =============================================================================

export const metrics = createDataFile<MetricTemplate>()(METRICS_DATA)

const metricsWithFormulasDataFile = createDataFile<MetricTemplate>()(METRICS_DATA_WITH_FORMULAS)

// =============================================================================
// Derived Types
// =============================================================================

/** Metric type derived from metrics data file */
export type Metric = MetricTemplate & { id: MetricId }

/**
 * Type representing a metric that has a formula
 */
export type MetricWithFormula = Metric & {
  formula: NonNullable<MetricTemplate["formula"]>
}

/**
 * Type-safe array of all metrics that have formulas.
 */
export const metricsWithFormulas: readonly MetricWithFormula[] =
  metricsWithFormulasDataFile.list.filter(hasFormula)

// =============================================================================
// Helper Functions
// =============================================================================

/**
 * Get display name for a metric from its definition
 */
export function getMetricDisplayName(metricId: MetricId): string {
  return metrics.data[metricId].name
}

/**
 * Type guard to check if a metric has a formula
 */
export function hasFormula(
  metric: MetricTemplate
): metric is MetricTemplate & { formula: NonNullable<MetricTemplate["formula"]> } {
  return metric.formula !== undefined
}
