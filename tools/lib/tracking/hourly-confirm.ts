export const TRACKING_HOURLY_CONFIRM_SOURCE = "tracking-hourly-confirm"

export const ANSWERED_QUESTION_STATUS = "answered"

export const OPEN_QUESTION_STATUS = "open"

export interface AutomationQuestion {
  readonly id: string
  readonly sourceContext: string | undefined
  readonly status: string
  readonly answeredAtMs: number | null
  readonly reconciledAtMs: number | null
  readonly createdAtMs: number | null
  readonly answeredOptionIndex: number | null
}

export type ConfirmStreamQuestion<Q extends AutomationQuestion = AutomationQuestion> = Q & {
  readonly __brand: "ConfirmStreamQuestion"
}

export function ConfirmStreamQuestion<Q extends AutomationQuestion>(
  q: Q
): ConfirmStreamQuestion<Q> {
  return q as ConfirmStreamQuestion<Q>
}

export function selectUnreconciledQuestions<Q extends ConfirmStreamQuestion>(
  questions: readonly Q[]
): readonly Q[] {
  return questions.filter(
    (q) =>
      q.sourceContext === TRACKING_HOURLY_CONFIRM_SOURCE &&
      q.status === ANSWERED_QUESTION_STATUS &&
      q.answeredAtMs !== null &&
      q.reconciledAtMs === null
  )
}

export interface OpenBlock {
  readonly activity: string
  readonly safetyLevel: string | undefined
  readonly difficultyLevel: string | undefined
  readonly startTimeMs: number
}

export type HourlyConfirmDeclineReason =
  | "no-open-block"
  | "question-already-open"
  | "awaiting-reconciliation"

export type HourlyConfirmDecision =
  | { readonly fire: true; readonly title: string; readonly option: string | null }
  | { readonly fire: false; readonly reason: HourlyConfirmDeclineReason; readonly detail: string }

function renderConfirmQuestion(block: OpenBlock): {
  readonly title: string
  readonly option: string | null
} {
  const { activity, safetyLevel, difficultyLevel } = block
  if (safetyLevel === undefined || difficultyLevel === undefined) {
    return { title: `Still ${activity}?`, option: null }
  }
  const rating = `s${safetyLevel}d${difficultyLevel}`
  return { title: `Still ${activity} ${rating}?`, option: `Yes — ${activity} ${rating}` }
}

export function decideHourlyConfirm(inputs: {
  readonly openBlock: OpenBlock | null
  readonly personaQuestions: readonly ConfirmStreamQuestion[]
}): HourlyConfirmDecision {
  const { openBlock } = inputs

  if (openBlock === null) {
    return { fire: false, reason: "no-open-block", detail: "no session is open to confirm" }
  }

  const mine = inputs.personaQuestions.filter(
    (q) => q.sourceContext === TRACKING_HOURLY_CONFIRM_SOURCE
  )

  const open = mine.find((q) => q.status === OPEN_QUESTION_STATUS)
  if (open !== undefined) {
    return {
      fire: false,
      reason: "question-already-open",
      detail: `question ${open.id} is still unanswered — the stream waits on Alan, never nags`,
    }
  }

  const unreconciled = selectUnreconciledQuestions(mine)[0]
  if (unreconciled !== undefined) {
    return {
      fire: false,
      reason: "awaiting-reconciliation",
      detail: `question ${unreconciled.id} carries an answer that has not been applied to the ledger — clears when whoever applies it stamps the question as reconciled`,
    }
  }

  return { fire: true, ...renderConfirmQuestion(openBlock) }
}
