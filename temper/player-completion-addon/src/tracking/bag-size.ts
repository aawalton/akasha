import { getSavedVariables } from "../saved-variables"
export function collectBagSize(): undefined {
  const charId = GetCurrentCharacterId()
  const charEntry = getSavedVariables().characters[charId]
  if (charEntry === undefined) return
  charEntry.bagSize = GetBagSize(BAG_BACKPACK)
}

export function updateBagSize(): undefined {
  collectBagSize()
}
