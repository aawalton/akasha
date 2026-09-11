import type { Tab } from "akasha/temper/progressions/temper-completion-categories/properties/tab.text-property.types.ts"
import type { NodeId } from "akasha/temper/progressions/things/properties/node-id.text-property.types.ts"
import type { TemperProgressThing } from "akasha/temper/progressions/things/temper-progress-thing.page-type.types.ts"
import type { DisplayOrder } from "akasha/temper/things/properties/display-order.number-property.types.ts"

export type TemperCompletionCategory = TemperProgressThing & {
  nodeId: NodeId
  tab: Tab
  displayOrder: DisplayOrder
}
