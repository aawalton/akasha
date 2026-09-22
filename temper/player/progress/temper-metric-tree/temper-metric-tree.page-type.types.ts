import type { IncludeInChildAggregates } from "akasha/temper/player/progress/temper-metric-tree/properties/include-in-child-aggregates.boolean-property.types.ts"
import type { MetricTreeParent } from "akasha/temper/player/progress/temper-metric-tree/properties/metric-tree-parent.relation-property.types.ts"
import type { NodeType } from "akasha/temper/player/progress/temper-metric-tree/properties/node-type.text-property.types.ts"
import type { UseAccentColor } from "akasha/temper/player/progress/temper-metric-tree/properties/use-accent-color.boolean-property.types.ts"
import type { NodeId } from "akasha/temper/player/progress/thing/properties/node-id.text-property.types.ts"
import type { TemperProgressThing } from "akasha/temper/player/progress/thing/temper-progress-thing.page-type.types.ts"
import type { DisplayOrder } from "akasha/temper/thing/properties/display-order.number-property.types.ts"

export type TemperMetricTree = TemperProgressThing & {
  nodeId: NodeId
  nodeType: NodeType
  displayOrder: DisplayOrder
  includeInChildAggregates?: IncludeInChildAggregates
  useAccentColor?: UseAccentColor
  parent?: MetricTreeParent
}
