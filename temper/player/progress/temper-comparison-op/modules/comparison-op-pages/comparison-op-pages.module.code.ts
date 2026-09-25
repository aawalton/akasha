import { atLeast } from "akasha/temper/player/progress/temper-comparison-op/pages/at-least.temper-comparison-op.ts"
import { atMost } from "akasha/temper/player/progress/temper-comparison-op/pages/at-most.temper-comparison-op.ts"
import { equalTo } from "akasha/temper/player/progress/temper-comparison-op/pages/equal-to.temper-comparison-op.ts"
import { greaterThan } from "akasha/temper/player/progress/temper-comparison-op/pages/greater-than.temper-comparison-op.ts"
import { lessThan } from "akasha/temper/player/progress/temper-comparison-op/pages/less-than.temper-comparison-op.ts"
import { notEqualTo } from "akasha/temper/player/progress/temper-comparison-op/pages/not-equal-to.temper-comparison-op.ts"
import type { TemperComparisonOp } from "akasha/temper/player/progress/temper-comparison-op/temper-comparison-op.page-type.types.ts"

export const COMPARISON_OP_PAGES = [
  atMost,
  lessThan,
  atLeast,
  greaterThan,
  equalTo,
  notEqualTo,
] as const satisfies readonly TemperComparisonOp[]
