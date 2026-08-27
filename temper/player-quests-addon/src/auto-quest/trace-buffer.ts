export const TRACE_CAP = 300

export interface AutoQuestTraceOption {
  readonly index: number
  readonly optionType: number
  readonly optionTypeName?: string
  readonly kind: string
  readonly important: boolean
  readonly chosenBefore: boolean
  readonly text: string
}

export type AutoQuestTraceEntry =
  | {
      readonly kind: "menu"
      readonly at: number
      readonly interactionType: number
      readonly interactionTypeName?: string
      readonly offerPending: boolean
      readonly pendingCompletion: boolean
      readonly options: readonly AutoQuestTraceOption[]
      readonly decision: string
    }
  | {
      readonly kind: "action"
      readonly at: number
      readonly action: string
    }
  | {
      readonly kind: "complete-dialog"
      readonly at: number
      readonly journalIndex: number
      readonly numRewards: number
    }

export function appendBounded(
  buffer: readonly AutoQuestTraceEntry[],
  entry: AutoQuestTraceEntry,
  cap: number
): AutoQuestTraceEntry[] {
  const next = [...buffer, entry]
  if (next.length <= cap) return next
  return next.slice(next.length - cap)
}
