import { whereFor } from "@akasha/markdown-pages/page-write-where"
import { readUncommitted } from "@akasha/markdown-pages/uncommitted"
import type { Roots } from "@akasha/pages-system/markdown-page-at"

const STEP = "step"

function isRecord(one: unknown): one is Record<string, unknown> {
  return one !== null && typeof one === "object" && !Array.isArray(one)
}

/**
 * A step's definition, out of the uncommitted sidecar beside its markdown page.
 *
 * This is the one value about a step no page query answers: the definition is a nested mapping,
 * and `withUncommitted` in `@akasha/markdown-pages/page-file-values` flattens a nested value to
 * text. `@akasha/ci-containers/ci-dispatch-candidates` takes this as its `StepDefinitions`.
 */
export function stepDefinition(roots: Roots, stepSeq: string): Readonly<Record<string, unknown>> {
  const at = whereFor(roots, STEP, stepSeq)
  if (at === null) return {}
  const stated = readUncommitted(at.path)?.definition
  return isRecord(stated) ? stated : {}
}
