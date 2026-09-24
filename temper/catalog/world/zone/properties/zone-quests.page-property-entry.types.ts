import type { Id } from "akasha/page/properties/id.text-property.types.ts"
import type { EsoQuestId } from "akasha/temper/catalog/world/zone/properties/eso-quest-id.number-property.types.ts"
import type { QuestName } from "akasha/temper/catalog/world/zone/properties/quest-name.text-property.types.ts"

export type ZoneQuests = "jsonl"

export type ZoneQuestsRow = {
  id: Id
  esoQuestId: EsoQuestId
  questName: QuestName
}
