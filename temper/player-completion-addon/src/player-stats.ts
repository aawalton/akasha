import { captureCharacterBuildHash } from "@temper/game-characters-capture-addon/build"
import { getSavedVariables } from "./saved-variables"
export function captureAndSaveCharacterStats(): undefined {
  const { buildHash, curseState } = captureCharacterBuildHash()

  const savedVars = getSavedVariables()
  const charId = GetCurrentCharacterId()
  const existing = savedVars.characters[charId]
  if (existing !== undefined) {
    existing.name = zo_strformat("<<1>>", GetRawUnitName("player"))
    existing.buildHash = buildHash
    existing.curseState = curseState
  } else {
    savedVars.characters[charId] = {
      name: zo_strformat("<<1>>", GetRawUnitName("player")),
      buildHash,
      curseState,
    }
  }

  CALLBACK_MANAGER.FireCallbacks("Temper_CharacterBuildCaptured", buildHash)
}
