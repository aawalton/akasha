import { type Row } from "../page-derive-shape.ts"
import { listOf as listIn, textOf as textIn } from "../page-query-values.ts"

/**
 * Reading values off a CI page's row.
 *
 * This file used to hold the reads as well — `readPages` and nine callers of it, each asking the
 * checkout query engine in `../page-query.ts` for pipelines, workflows and steps by seq and
 * status. Every one of those was reached only from `trigger.ts`, `loaders.ts`, `main-line.ts`,
 * `step-filter.ts` and `closure-seeds.ts`, and those five were reachable from nothing at all:
 * the sole way into this folder is `../main-pipeline-creator/code.ts`, which imports `config.ts`,
 * which takes only the two accessors below. The five went, and the queries with them.
 *
 * What is left reaches no page. It reads keys out of a row somebody else has already read.
 */
export function textOf(row: Row, key: string): string | null {
  const one = textIn(row.values, key)
  return one === null || one.trim() === "" ? null : one
}

export function listOf(row: Row, key: string): readonly string[] {
  return listIn(row.values, key)
}
