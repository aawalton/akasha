import type { CharacterCompletion } from "akasha/temper/player/completion/modules/completion-progress/completion-progress.module.code.ts"
import type { AccountCheckerInput } from "akasha/temper/player/completion/temper-player-completion/modules/completion-card-checker-types/completion-card-checker-types.module.code.ts"
import { NO_COMPLETION_CATALOGS } from "akasha/temper/player/completion/temper-player-completion/modules/completion-catalogs/completion-catalogs.module.code.ts"
import type { CompletionCharacterEntry } from "akasha/temper/player/completion/temper-player-completion/modules/completion-next-character/completion-next-character.module.code.ts"

function mkMount(
  speed: number,
  stamina: number,
  carry: number,
  max = 60
): CharacterCompletion["mountTraining"] {
  return {
    speed,
    maxSpeed: max,
    stamina,
    maxStamina: max,
    carryCapacity: carry,
    maxCarryCapacity: max,
  }
}

export const CHAR_FULL: CharacterCompletion = { mountTraining: mkMount(60, 60, 60) }
export const CHAR_PARTIAL: CharacterCompletion = { mountTraining: mkMount(30, 0, 0) }
export const CHAR_EMPTY: CharacterCompletion = { mountTraining: mkMount(0, 0, 0) }

export function mkRosterEntry(
  id: string,
  name: string,
  sortOrder: number | null,
  completion: CharacterCompletion | null
): CompletionCharacterEntry {
  return { id, name, firstName: name, sortOrder, completion }
}

export const EMPTY_ACCOUNT: AccountCheckerInput = {
  account: { achievements: {} },
  rows: [],
  catalogs: NO_COMPLETION_CATALOGS,
}

export const CHAR_MORPHS: CharacterCompletion = {
  classId: 1,
  raceId: 1,
  skillLineProgress: { 35: { currentRank: 0, currentXP: 0, nextRankXP: 0, skills: {} } },
}
