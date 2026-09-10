import type { DisplayOrder } from "../../things/properties/display-order.number-property.ts"
import type { NodeId } from "../things/properties/node-id.text-property.ts"
import type { TemperProgressThing } from "../things/temper-progress-thing.page-type.types.ts"
import type { Tab } from "./properties/tab.text-property.ts"

export type TemperCompletionCategory = TemperProgressThing & {
  nodeId: NodeId
  tab: Tab
  displayOrder: DisplayOrder
}
