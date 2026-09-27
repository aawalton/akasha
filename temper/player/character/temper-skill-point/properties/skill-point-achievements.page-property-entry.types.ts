import type { Id } from "akasha/page/properties/id.text-property.types.ts"
import type { EsoAchievementId } from "akasha/temper/catalog/world/skyshard/temper-world-skyshard/properties/eso-achievement-id.number-property.types.ts"

export type SkillPointAchievements = "jsonl"

export type SkillPointAchievementsRow = {
  id: Id
  esoAchievementId: EsoAchievementId
}
