import type { CompletionCategoryParent } from "akasha/temper/player/progress/temper-completion-category/properties/completion-category-parent.relation-property.types.ts"
import type { CompletionMost } from "akasha/temper/player/progress/temper-completion-category/properties/completion-most.number-property.types.ts"
import type { FreeSlotMost } from "akasha/temper/player/progress/temper-completion-category/properties/free-slot-most.number-property.types.ts"
import type { MorphRankMost } from "akasha/temper/player/progress/temper-completion-category/properties/morph-rank-most.number-property.types.ts"
import type { Tab } from "akasha/temper/player/progress/temper-completion-category/properties/tab.text-property.types.ts"
import type { NodeId } from "akasha/temper/player/progress/thing/properties/node-id.text-property.types.ts"
import type { TemperProgressThing } from "akasha/temper/player/progress/thing/temper-progress-thing.page-type.types.ts"
import type { DisplayOrder } from "akasha/temper/thing/properties/display-order.number-property.types.ts"

export type TemperCompletionCategory = TemperProgressThing & {
  completionMost?: CompletionMost
  morphRankMost?: MorphRankMost
  freeSlotMost?: FreeSlotMost
  nodeId: NodeId
  tab: Tab
  displayOrder: DisplayOrder
  parent?: CompletionCategoryParent
}
