import { getEsoDateString } from "@temper/shared-formula-framework/eso-date"
import type { CompletionCharacterRow } from "./completion-character-row-type"
import { isCharacterMeasured } from "./completion-measured"
import type { CharacterDailyWritsProgress } from "./completion-ui-types"

export function transformDailyWritsProgress(
  rows: readonly CompletionCharacterRow[]
): readonly CharacterDailyWritsProgress[] {
  const today = getEsoDateString()
  const result: CharacterDailyWritsProgress[] = []

  for (const row of rows) {
    const completion = row.completion
    if (!completion || !isCharacterMeasured(completion)) continue

    const dw = completion.dailyWrits
    const isCurrentDay = dw?.date === today

    result.push({
      characterId: row.id,
      completed: isCurrentDay ? (dw?.completed ?? 0) : 0,
      total: 7,
      date: dw?.date ?? null,
    })
  }

  return result
}
