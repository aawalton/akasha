import { slugOf } from "akasha/page/modules/value-reading/page-value-reading.module.code.ts"
import { isAnyCompletionCardId } from "akasha/temper/player/completion/temper-player-completion/modules/completion-card-id/completion-card-id.module.code.ts"
import type { CompletionOverride } from "akasha/temper/player/completion/temper-player-completion/modules/completion-override/completion-override.module.code.ts"

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
  const named = typeof characterValue === "string" ? characterValue : null
  if (named === null || named === "") return null
  const characterId = slugOf(named)

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
