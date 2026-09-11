import type { IncludeInChildAggregates } from "akasha/temper/progressions/temper-metric-trees/properties/include-in-child-aggregates.boolean-property.types.ts"
import type { NodeType } from "akasha/temper/progressions/temper-metric-trees/properties/node-type.text-property.types.ts"
import type { UseAccentColor } from "akasha/temper/progressions/temper-metric-trees/properties/use-accent-color.boolean-property.types.ts"
import type { NodeId } from "akasha/temper/progressions/things/properties/node-id.text-property.types.ts"
import type { TemperProgressThing } from "akasha/temper/progressions/things/temper-progress-thing.page-type.types.ts"
import type { DisplayOrder } from "akasha/temper/things/properties/display-order.number-property.types.ts"

export type TemperMetricTree = TemperProgressThing & {
  nodeId: NodeId
  nodeType: NodeType
  displayOrder: DisplayOrder
  includeInChildAggregates?: IncludeInChildAggregates
  useAccentColor?: UseAccentColor
}
