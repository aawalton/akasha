import { SHOW_TRAIT_HIDDEN_COLUMNS } from "../writ-mark-constants/writ-mark-constants.module.code.ts"

export function safeGetTabFilterInfo(
  this: void,
  base: (this: void) => LuaMultiReturn<unknown[]>,
  applyTrait: boolean
): LuaMultiReturn<unknown[]> {
  const [ok, packed] = pcall((): unknown[] => {
    const results = [...base()]
    if (applyTrait && results[0] === ITEM_TYPE_DISPLAY_CATEGORY_CONSUMABLE) {
      results[2] = SHOW_TRAIT_HIDDEN_COLUMNS
    }
    return results
  })
  if (!ok) {
    return $multi(undefined, undefined, undefined)
  }
  return $multi(...packed)
}
