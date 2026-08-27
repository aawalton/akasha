import { esoDayOf } from "./session-time.ts"
import { getMountainEveningDayStr } from "./mountain-times.ts"
import { titleMatchesAnyWord } from "./title-words.ts"

export interface DayAttributionInput {
  readonly explicitDay: string | undefined
  readonly title: string
  readonly dayTurnWords: readonly string[]
  readonly finishInstant: Date | undefined
  readonly previousBlockDay: string | undefined
  readonly startInstant: Date
}

export function resolveAttributedDay(input: DayAttributionInput): string {
  if (input.explicitDay !== undefined) return input.explicitDay
  if (titleMatchesAnyWord(input.title, input.dayTurnWords) && input.finishInstant !== undefined) {
    return getMountainEveningDayStr(input.finishInstant)
  }
  return input.previousBlockDay ?? esoDayOf(input.startInstant)
}
