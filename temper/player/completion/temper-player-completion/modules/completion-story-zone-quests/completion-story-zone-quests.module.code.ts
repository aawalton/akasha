import { SKILL_POINT_STORY_ZONE_SOURCES } from "akasha/temper/player/completion/temper-player-completion/modules/skill-point-zone-sources/skill-point-zone-sources.module.code.ts"

export interface OwedStoryZone {
  readonly key: string
  readonly label: string
  readonly completedQuests: number
  readonly totalQuests: number
}

export function findFirstIncompleteStoryZone(
  zoneQuests: Readonly<Record<string, number>> | undefined
): OwedStoryZone | undefined {
  for (const zone of SKILL_POINT_STORY_ZONE_SOURCES) {
    const completedQuests = zoneQuests?.[zone.key] ?? 0
    if (completedQuests < zone.maxQuests) {
      return {
        key: zone.key,
        label: zone.label,
        completedQuests,
        totalQuests: zone.maxQuests,
      }
    }
  }
  return undefined
}
