import { z } from "zod"
import type { Page } from "../addon-data-page/addon-data-page.module.code.ts"

const COMPANION_PASSIVE_METRIC_EAV_SCHEMA = z
  .object({
    key: z.string(),
  })
  .strict()

interface ParsedCompanionPassiveMetric {
  key: string
  name: string
}

function parseCompanionPassiveMetric(row: Page): ParsedCompanionPassiveMetric {
  if (row.title === null) {
    throw new Error(`temper-companion-passive-metric row ${row.id} has null title`)
  }
  const eav = COMPANION_PASSIVE_METRIC_EAV_SCHEMA.parse({
    key: row.key,
  })
  return {
    key: eav.key,
    name: row.title,
  }
}

export function generateTemperCompanionPassiveMetric(rows: readonly Page[]): string {
  const parsed = rows.map(parseCompanionPassiveMetric)

  const sorted = [...parsed].sort((a, b) => a.key.localeCompare(b.key))

  const entries = sorted.map(
    (s) =>
      `  ${JSON.stringify(s.key)}: { id: ${JSON.stringify(s.key)}, name: ${JSON.stringify(s.name)} },`
  )

  return `\
/**
 * Temper Companion Passive Metrics (Generated)
 *
 * 17 companion passive-effect metric labels — the subset of companion
 * metrics that appear in passive effect descriptions and need
 * human-readable display names. Sourced from the universal pages table
 * (page type: temper-companion-passive-metric).
 *
 * Each entry's \`id\` is the stable identifier and the same string is
 * used as the record key, so
 * \`TEMPER_COMPANION_PASSIVE_METRICS["companion-armor"]\` is well-typed
 * and feeds the \`companionPassiveMetrics\` lookup in
 * @temper/game-companions-core.
 *
 * DO NOT EDIT — regenerate with: ops temper addon-data generate
 */

import type { CompanionPassiveMetricTemplate } from "../stats/companion-passive-metric-data"

export const TEMPER_COMPANION_PASSIVE_METRICS = {
${entries.join("\n")}
} as const satisfies Record<string, CompanionPassiveMetricTemplate>
`
}
