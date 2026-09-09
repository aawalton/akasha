import type { SavedCharacterEntry } from "@akasha/temper-player-completion-state/completion-saved-variables"
import { getSavedVariables } from "@akasha/temper-player-completion-state/completion-saved-variables"

export function saveCharacterList(this: void): undefined {
  const savedVars = getSavedVariables()
  const numCharacters = GetNumCharacters()

  for (let i = 1; i <= numCharacters; i++) {
    const [name, gender, level, classId, raceId, allianceId, characterId] = GetCharacterInfo(i)

    const cleanName = zo_strformat("<<1>>", name)
    const entry: SavedCharacterEntry = savedVars.characters[characterId] ?? { name: cleanName }

    entry.name = cleanName
    entry.priorityOrder = i
    entry.gender = gender
    entry.level = level
    entry.classId = classId
    entry.allianceId = allianceId
    entry.raceId = raceId
    entry.className = GetClassName(gender, classId)
    entry.classIcon = ZO_GetClassIcon(classId)

    savedVars.characters[characterId] = entry
  }
}
