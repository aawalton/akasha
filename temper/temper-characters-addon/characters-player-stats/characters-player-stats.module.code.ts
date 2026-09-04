import { captureCharacterBuildHash } from "@akasha/temper-characters-capture-addon/character-capture-build"
import { getSavedVariables } from "@akasha/temper-player-completion-state/completion-saved-variables"
import { currentCharacterEntry } from "../characters-current-entry/characters-current-entry.module.code.ts"

export function captureAndSaveCharacterStats(): undefined {
  const { buildHash, curseState } = captureCharacterBuildHash()
  const name = zo_strformat("<<1>>", GetRawUnitName("player"))

  const charEntry = currentCharacterEntry()
  if (charEntry !== undefined) {
    charEntry.name = name
    charEntry.buildHash = buildHash
    charEntry.curseState = curseState
  } else {
    getSavedVariables().characters[GetCurrentCharacterId()] = { name, buildHash, curseState }
  }

  CALLBACK_MANAGER.FireCallbacks("Temper_CharacterBuildCaptured", buildHash)
}
