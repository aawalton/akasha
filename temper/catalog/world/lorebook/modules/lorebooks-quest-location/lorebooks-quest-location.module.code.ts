import "akasha/temper/eso/type/eso-functions-09/eso-functions-09.type-declaration.d.ts"
import "akasha/temper/eso/type/eso-globals/eso-globals.type-declaration.d.ts"
import "akasha/temper/eso/type/eso-lore-library/eso-lore-library.type-declaration.d.ts"

export function getQuestLocation(questId: number): string {
  const zoneId = GetQuestZoneId(questId)
  if (zoneId === 0) return ""
  return zo_strformat(SI_WINDOW_TITLE_WORLD_MAP, GetZoneNameById(zoneId))
}
