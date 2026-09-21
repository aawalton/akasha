export function getQuestLocation(questId: number): string {
  const zoneId = GetQuestZoneId(questId)
  if (zoneId === 0) return ""
  return zo_strformat(SI_WINDOW_TITLE_WORLD_MAP, GetZoneNameById(zoneId))
}
