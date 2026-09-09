import "akasha/temper/temper-eso-types/eso-enums-12/eso-enums-12.type-declaration.d.ts"
import "akasha/temper/temper-eso-types/eso-functions-01/eso-functions-01.type-declaration.d.ts"
import { captureCharacterBuild } from "../character-capture-codec/character-capture-codec.module.code.ts"
import { encodeCharacterBuild } from "../character-capture-encoder/character-capture-encoder.module.code.ts"

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
