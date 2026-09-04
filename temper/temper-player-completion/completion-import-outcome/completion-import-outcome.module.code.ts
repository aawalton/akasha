import { asRecord } from "@akasha/utils-narrow/as-record"
import { deepForward } from "../completion-merge-forward/completion-merge-forward.module.code.ts"

export type CompletionImportOutcome = "created" | "updated" | "unchanged" | "preserved"

export interface CompletionImportVerdict {
  readonly outcome: CompletionImportOutcome
  readonly preservedFields: readonly string[]
}

function canonical(value: unknown): unknown {
  return deepForward(value, value)
}

function equalsCanonical(left: unknown, right: unknown): boolean {
  if (left === right) return true
  if (left === undefined || right === undefined) return false
  if (Array.isArray(left) || Array.isArray(right)) {
    if (!Array.isArray(left) || !Array.isArray(right) || left.length !== right.length) return false
    return left.every((entry, index) => equalsCanonical(entry, right[index]))
  }
  const leftRecord = asRecord(left)
  const rightRecord = asRecord(right)
  if (leftRecord !== undefined && rightRecord !== undefined) {
    const keys = new Set<string>([...Object.keys(leftRecord), ...Object.keys(rightRecord)])
    for (const key of keys) {
      if (!equalsCanonical(leftRecord[key], rightRecord[key])) return false
    }
    return true
  }
  return false
}

function fieldsMergeHeldBack(incoming: unknown, merged: unknown): readonly string[] {
  const mergedRecord = asRecord(merged)
  if (mergedRecord === undefined) return []
  const incomingRecord = asRecord(incoming) ?? {}
  return Object.keys(mergedRecord)
    .filter((key) => !equalsCanonical(canonical(mergedRecord[key]), canonical(incomingRecord[key])))
    .sort()
}

export function classifyCompletionImport(
  existing: unknown,
  incoming: unknown,
  merged: unknown
): CompletionImportVerdict {
  if (existing === undefined) return { outcome: "created", preservedFields: [] }

  const canonicalMerged = canonical(merged)
  if (incoming !== undefined && !equalsCanonical(canonicalMerged, canonical(incoming))) {
    return { outcome: "preserved", preservedFields: fieldsMergeHeldBack(incoming, merged) }
  }
  if (!equalsCanonical(canonicalMerged, canonical(existing))) {
    return { outcome: "updated", preservedFields: [] }
  }
  return { outcome: "unchanged", preservedFields: [] }
}
