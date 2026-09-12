import { currentCharacterEntry } from "akasha/temper/characters-addon/modules/characters-current-entry/characters-current-entry.module.code.ts"

export function collectBagSize(this: void): undefined {
  const charEntry = currentCharacterEntry()
  if (charEntry === undefined) return
  charEntry.bagSize = GetBagSize(BAG_BACKPACK)
}
