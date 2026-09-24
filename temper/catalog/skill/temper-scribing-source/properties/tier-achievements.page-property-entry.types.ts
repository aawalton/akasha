import type { Id } from "akasha/page/properties/id.text-property.types.ts"
import type { AchievementId } from "akasha/temper/catalog/skill/temper-scribing-source/properties/achievement-id.number-property.types.ts"
import type { AchievementName } from "akasha/temper/catalog/thing/properties/achievement-name.text-property.types.ts"

export type TierAchievements = "jsonl"

export type TierAchievementsRow = {
  id: Id
  name: AchievementName
  achievementId: AchievementId
}
