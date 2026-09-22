import type { Tab } from "akasha/temper/player/progress/temper-completion-category/properties/tab.text-property.types.ts"
import type { NodeId } from "akasha/temper/player/progress/thing/properties/node-id.text-property.types.ts"
import type { TemperProgressThing } from "akasha/temper/player/progress/thing/temper-progress-thing.page-type.types.ts"
import type { DisplayOrder } from "akasha/temper/thing/properties/display-order.number-property.types.ts"
import type { Parent } from "akasha/temper/thing/properties/parent.text-property.types.ts"

export type TemperCompletionCategory = TemperProgressThing & {
  nodeId: NodeId
  tab: Tab
  displayOrder: DisplayOrder
  parent?: Parent
}
