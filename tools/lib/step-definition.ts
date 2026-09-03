import type { Roots } from "@akasha/pages-system/markdown-page-at"
import { readUncommitted } from "../../page/uncommitted/uncommitted.ts"
import { whereFor } from "./page-write-where.ts"

const STEP = "step"

function isRecord(one: unknown): one is Record<string, unknown> {
  return one !== null && typeof one === "object" && !Array.isArray(one)
}

/**
 * A step's definition, out of the uncommitted sidecar beside its markdown page.
 *
 * This is the one value about a step no page query answers: the definition is a nested mapping,
 * and `withUncommitted` in page-file-values flattens a nested value to text. The sidecar store is
 * page/uncommitted/uncommitted.ts, which stands outside akasha in a directory that is no
 * workspace package, so there is no specifier an akasha module could reach it by. The reading
 * therefore stays out here, and `@akasha/ci-containers/ci-dispatch-candidates` takes it as its
 * `StepDefinitions`. It moves in when `page/` does.
 */
export function stepDefinition(roots: Roots, stepSeq: string): Readonly<Record<string, unknown>> {
  const at = whereFor(roots, STEP, stepSeq)
  if (at === null) return {}
  const stated = readUncommitted(at.path)?.definition
  return isRecord(stated) ? stated : {}
}
