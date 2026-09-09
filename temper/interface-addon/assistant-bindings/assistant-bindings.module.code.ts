import { ASSISTANT_COLLECTIBLES } from "../assistant-collectibles/assistant-collectibles.module.code.ts"

declare const _G: Record<string, number | undefined>

export function createBindings(this: void): undefined {
  for (const collectibleId of Object.values(ASSISTANT_COLLECTIBLES)) {
    const [name, , , , unlocked] = GetCollectibleInfo(collectibleId)
    if (unlocked) {
      const stringId = `SI_BINDING_NAME_PERSONNALASSISTANT_${collectibleId}`
      const existing = _G[stringId]
      if (existing === undefined || GetString(existing) === "") {
        ZO_CreateStringId(stringId, ZO_CachedStrFormat(SI_COLLECTIBLE_NAME_FORMATTER, name))
      }
    }
  }
  return undefined
}
