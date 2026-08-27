import { exclusively } from "../../exclusive/exclusive.ts"
import { whereFor } from "./page-write-where.ts"
import type { Roots } from "../../page/page"
import { readUncommitted, uncommittedPathFor, writeUncommitted } from "../../page/uncommitted/uncommitted.ts"

const STEP = "step"

const PENDING = "pending"

export function takeStepIfStatus(
  roots: Roots,
  stepSeq: string,
  was: string,
  values: Readonly<Record<string, unknown>>
): boolean {
  const at = whereFor(roots, STEP, stepSeq)
  if (at === null) return false
  return exclusively(uncommittedPathFor(at.path), () => {
    const standing = readUncommitted(at.path) ?? {}
    const stands = typeof standing.status === "string" ? standing.status : PENDING
    if (stands !== was) return false
    writeUncommitted(at.path, { ...standing, ...values })
    return true
  })
}
