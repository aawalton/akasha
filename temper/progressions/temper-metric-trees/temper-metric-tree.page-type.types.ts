import type { DisplayOrder } from "../../things/properties/display-order.number-property.ts"
import type { NodeId } from "../things/properties/node-id.text-property.ts"
import type { TemperProgressThing } from "../things/temper-progress-thing.page-type.types.ts"
import type { IncludeInChildAggregates } from "./properties/include-in-child-aggregates.boolean-property.ts"
import type { NodeType } from "./properties/node-type.text-property.ts"
import type { UseAccentColor } from "./properties/use-accent-color.boolean-property.ts"

export type TemperMetricTree = TemperProgressThing & {
  nodeId: NodeId
  nodeType: NodeType
  displayOrder: DisplayOrder
  includeInChildAggregates?: IncludeInChildAggregates
  useAccentColor?: UseAccentColor
}
