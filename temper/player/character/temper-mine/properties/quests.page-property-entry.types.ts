import type { Id } from "akasha/page/properties/id.text-property.types.ts"
import type { Title } from "akasha/page/properties/title.text-property.types.ts"
import type { MinedAt } from "akasha/temper/player/character/temper-mine/properties/mined-at.instant-property.types.ts"
import type { QuestId } from "akasha/temper/player/character/temper-mine/properties/quest-id.number-property.types.ts"
import type { QuestType } from "akasha/temper/player/character/temper-mine/properties/quest-type.number-property.types.ts"
import type { RepeatableType } from "akasha/temper/player/character/temper-mine/properties/repeatable-type.number-property.types.ts"
import type { ZoneId } from "akasha/temper/player/character/temper-mine/properties/zone-id.number-property.types.ts"
import type { ZoneName } from "akasha/temper/thing/properties/zone-name.text-property.types.ts"

export type Quests = "jsonl"

export type QuestsRow = {
  id: Id
  title: Title
  minedAt: MinedAt
  questId: QuestId
  questType: QuestType
  repeatableType: RepeatableType
  zoneId: ZoneId
  zoneName: ZoneName
}
