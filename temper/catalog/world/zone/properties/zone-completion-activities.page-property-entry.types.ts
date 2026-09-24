import type { Id } from "akasha/page/properties/id.text-property.types.ts"
import type { ActivityIndex } from "akasha/temper/catalog/world/zone/properties/activity-index.number-property.types.ts"
import type { ActivityName } from "akasha/temper/catalog/world/zone/properties/activity-name.text-property.types.ts"
import type { CompletionType } from "akasha/temper/catalog/world/zone/properties/completion-type.number-property.types.ts"
import type { CompletionTypeLabel } from "akasha/temper/catalog/world/zone/properties/completion-type-label.text-property.types.ts"
import type { EsoActivityId } from "akasha/temper/catalog/world/zone/properties/eso-activity-id.number-property.types.ts"

export type ZoneCompletionActivities = "jsonl"

export type ZoneCompletionActivitiesRow = {
  id: Id
  completionType: CompletionType
  completionTypeLabel: CompletionTypeLabel
  activityIndex: ActivityIndex
  esoActivityId: EsoActivityId
  activityName: ActivityName
}
