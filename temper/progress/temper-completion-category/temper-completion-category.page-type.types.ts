import type { Tab } from "akasha/temper/progress/temper-completion-category/properties/tab.text-property.types.ts"
import type { NodeId } from "akasha/temper/progress/thing/properties/node-id.text-property.types.ts"
import type { TemperProgressThing } from "akasha/temper/progress/thing/temper-progress-thing.page-type.types.ts"
import type { DisplayOrder } from "akasha/temper/thing/properties/display-order.number-property.types.ts"

export type TemperCompletionCategory = TemperProgressThing & {
  nodeId: NodeId
  tab: Tab
  displayOrder: DisplayOrder
}
