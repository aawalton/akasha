import type {
  AccountCompletion,
  CharacterCompletion,
  CompanionCompletion,
} from "@akasha/temper-completion/completion-progress"

type EmptyBlob = object | null | undefined

const ROSTER_IDENTITY_KEYS: ReadonlySet<string> = new Set([
  "gender",
  "level",
  "classId",
  "allianceId",
  "raceId",
  "className",
  "classIcon",
])

export function isCharacterMeasured(completion: CharacterCompletion | null | undefined): boolean {
  if (!completion) return false
  for (const key of Object.keys(completion)) {
    if (!ROSTER_IDENTITY_KEYS.has(key)) return true
  }
  return false
}

export function isAccountMeasured(account: AccountCompletion | EmptyBlob): boolean {
  if (!account) return false
  return Object.keys(account).length > 0
}

export function isCompanionMeasured(companion: CompanionCompletion | EmptyBlob): boolean {
  if (!companion) return false
  return Object.keys(companion).length > 0
}
