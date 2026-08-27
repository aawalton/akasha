import { codeModuleSync } from "../../code-import.ts"

const held = codeModuleSync<{
  CHARACTER_BUILD_TYPE: number
}>("@temper/game-codec/character/build-codec-v48")

export const CHARACTER_BUILD_TYPE = held.CHARACTER_BUILD_TYPE
