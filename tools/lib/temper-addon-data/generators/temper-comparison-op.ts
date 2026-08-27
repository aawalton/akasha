import type { Page } from "../page.ts"
import { z } from "zod"

const COMPARISON_OP_EAV_SCHEMA = z
  .object({
    key: z.string(),
  })
  .strict()

interface ParsedComparisonOp {
  key: string
  name: string
}

function parseComparisonOp(row: Page): ParsedComparisonOp {
  if (row.title === null) {
    throw new Error(`temper-comparison-op row ${row.id} has null title`)
  }
  const eav = COMPARISON_OP_EAV_SCHEMA.parse({
    key: row.key,
  })
  return {
    key: eav.key,
    name: row.title,
  }
}

export function generateTemperComparisonOp(rows: readonly Page[]): string {
  const parsed = rows.map(parseComparisonOp)

  const PRECEDENCE: Record<string, number> = {
    "<=": 0,
    "<": 1,
    ">=": 2,
    ">": 3,
    "=": 4,
    "!=": 5,
  }
  const sorted = [...parsed].sort((a, b) => {
    const pa = PRECEDENCE[a.key] ?? 1_000
    const pb = PRECEDENCE[b.key] ?? 1_000
    if (pa !== pb) return pa - pb
    return a.key.localeCompare(b.key)
  })

  const entries = sorted.map(
    (s) =>
      `  ${JSON.stringify(s.key)}: { id: ${JSON.stringify(s.key)}, name: ${JSON.stringify(s.name)} },`
  )

  return `\
/**
 * Temper Comparison Ops (Generated)
 *
 * Six numeric comparison operators — \`<=\`, \`<\`, \`>=\`, \`>\`, \`=\`,
 * \`!=\` — sourced from the universal pages table (page type:
 * temper-comparison-op).
 *
 * Each entry's \`id\` is the stable codec-facing identifier (also the
 * record key), so \`TEMPER_COMPARISON_OPS["<="]\` is well-typed and feeds
 * the \`comparisonOps\` lookup in
 * @temper/game-items-rules-core/filters/comparison-op-data.
 *
 * DO NOT EDIT — regenerate with: ops temper addon-data generate
 */

import type { ComparisonOpTemplate } from "../filters/comparison-op-data"

export const TEMPER_COMPARISON_OPS = {
${entries.join("\n")}
} as const satisfies Record<string, ComparisonOpTemplate>
`
}
