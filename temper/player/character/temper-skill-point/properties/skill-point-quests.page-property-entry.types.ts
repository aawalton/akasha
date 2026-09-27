import type { Id } from "akasha/page/properties/id.text-property.types.ts"
import type { EsoQuestId } from "akasha/temper/catalog/world/zone/properties/eso-quest-id.number-property.types.ts"

export type SkillPointQuests = "jsonl"

export type SkillPointQuestsRow = {
  id: Id
  esoQuestId: EsoQuestId
}
