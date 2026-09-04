import { getEsoDateString } from "@akasha/temper-formula-framework/eso-date"
import type { CompletionCharacterRow } from "../completion-character-row/completion-character-row.module.code.ts"
import { isCharacterMeasured } from "../completion-measured/completion-measured.module.code.ts"
import type { CharacterDailyWritsProgress } from "../completion-ui-types/completion-ui-types.module.code.ts"

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
