import { codeModuleSync } from "../../code-import.ts"

const held = codeModuleSync<{
  TEMPER_DUNGEONS: readonly { readonly key: string; readonly label: string; readonly soloDifficulty: string; readonly questGiverId: string; readonly rotationPosition: number }[]
}>("@temper/shared-foundation-misc-dungeons")

export const TEMPER_DUNGEONS = held.TEMPER_DUNGEONS
