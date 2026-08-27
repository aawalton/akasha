import { z } from "zod"

export type RecoveryRate = {
  readonly token: string
  readonly hoursPerHour: number
}

export const RECOVERY_RATES: readonly RecoveryRate[] = [
  { token: "Bath", hoursPerHour: 3 },
  { token: "Pod", hoursPerHour: 3 },
  { token: "Breathing", hoursPerHour: 1 },
  { token: "Sleep", hoursPerHour: 1 },
  { token: "Rest", hoursPerHour: 1 },
]

export const NotesTextSchema = z.string().min(1)

export type RecoveryNotesViolation = {
  readonly kind: "UndocumentedRate"
  readonly token: string
  readonly message: string
}

export function findUndocumentedRecoveryRates(input: {
  readonly rates: readonly RecoveryRate[]
  readonly notesText: string
}): readonly RecoveryNotesViolation[] {
  const haystack = input.notesText.toLowerCase()
  return input.rates
    .filter((rate) => !haystack.includes(rate.token.toLowerCase()))
    .map((rate) => ({
      kind: "UndocumentedRate" as const,
      token: rate.token,
      message:
        `"${rate.token}" credits ${String(rate.hoursPerHour)} capacity-hour(s) per hour and is named nowhere ` +
        "in the notes — a rate is being applied to Alan's ledger that his own record of his body does not carry",
    }))
}
