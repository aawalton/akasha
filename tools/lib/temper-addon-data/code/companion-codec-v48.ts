import { codeModuleSync } from "../../code-import.ts"

const held = codeModuleSync<{
  COMPANION_BUILD_TYPE: number
  ESO_VERSION_48: number
}>("@temper/game-codec/companions/companion-codec-v48")

export const COMPANION_BUILD_TYPE = held.COMPANION_BUILD_TYPE
export const ESO_VERSION_48 = held.ESO_VERSION_48
