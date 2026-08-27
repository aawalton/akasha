/**
 * Temper Comparison Ops (Generated)
 *
 * Six numeric comparison operators — `<=`, `<`, `>=`, `>`, `=`,
 * `!=` — sourced from the universal pages table (page type:
 * temper-comparison-op).
 *
 * Each entry's `id` is the stable codec-facing identifier (also the
 * record key), so `TEMPER_COMPARISON_OPS["<="]` is well-typed and feeds
 * the `comparisonOps` lookup in
 * @temper/game-items-rules-core/filters/comparison-op-data.
 *
 * DO NOT EDIT — regenerate with: ops temper addon-data generate
 */

import type { ComparisonOpTemplate } from "../filters/comparison-op-data"

export const TEMPER_COMPARISON_OPS = {
  "<=": { id: "<=", name: "≤" },
  "<": { id: "<", name: "<" },
  ">=": { id: ">=", name: "≥" },
  ">": { id: ">", name: ">" },
  "=": { id: "=", name: "=" },
  "!=": { id: "!=", name: "≠" },
} as const satisfies Record<string, ComparisonOpTemplate>
