import { currentCharacterEntry } from "../characters-current-entry/characters-current-entry.module.code.ts"

export function collectBagSize(this: void): undefined {
  const charEntry = currentCharacterEntry()
  if (charEntry === undefined) return
  charEntry.bagSize = GetBagSize(BAG_BACKPACK)
}
