import { isAnyCompletionCardId } from "../completion-card-id/completion-card-id.module.code.ts"
import type { CompletionOverride } from "../completion-override/completion-override.module.code.ts"

export interface ParsedCompletionOverrideRow {
  readonly characterId: string
  readonly override: CompletionOverride
}

function parseItemPath(value: unknown): readonly (string | number)[] | null {
  if (!Array.isArray(value)) return null
  const out: (string | number)[] = []
  for (const segment of value) {
    if (typeof segment !== "string" && typeof segment !== "number") return null
    out.push(segment)
  }
  return out
}

export function parseCompletionOverrideRow(
  row: Readonly<Record<string, unknown>>
): ParsedCompletionOverrideRow | null {
  const characterValue = row.character
  const characterId = typeof characterValue === "string" ? characterValue : null
  if (characterId === null || characterId === "") return null

  const cardValue = row.completionCardId
  if (typeof cardValue !== "string" || !isAnyCompletionCardId(cardValue)) return null
  const completionCardId = cardValue

  const completionItemPath = parseItemPath(row.completionItemPath)
  if (completionItemPath === null) return null

  const floorValue = row.floor
  if (typeof floorValue !== "number" || !Number.isFinite(floorValue)) return null

  return {
    characterId,
    override: { completionCardId, completionItemPath, floor: floorValue },
  }
}
