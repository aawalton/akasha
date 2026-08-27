import { captureCharacterBuild } from "./character-codec"
import { encodeCharacterBuild } from "./character-encoder"

export interface CapturedCharacterBuild {
  buildHash: string
  curseState: string
}

export function captureCharacterBuildHash(): CapturedCharacterBuild {
  const buildData = captureCharacterBuild()
  const buildHash = encodeCharacterBuild(buildData)

  const curseType = GetPlayerCurseType()
  let curseState = "no-curse"
  if (curseType === CURSE_TYPE_VAMPIRE) {
    curseState = "vampire"
  } else if (curseType === CURSE_TYPE_WEREWOLF) {
    curseState = "werewolf"
  }

  return { buildHash, curseState }
}
