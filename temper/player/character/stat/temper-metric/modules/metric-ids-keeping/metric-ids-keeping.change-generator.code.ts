import type { Change } from "akasha/page/modules/change/change.module.code.ts"
import {
  type Keeping,
  keepingTurns,
  slugUnionsKept,
  type Written,
} from "akasha/temper/modules/slug-union-keeping/slug-union-keeping.module.code.ts"
import { temperMetric } from "akasha/temper/player/character/stat/temper-metric/temper-metric.page-type.ts"

const COMPANION = "companion"

const KEEPING: Keeping = {
  at: "temper/player/character/stat/temper-metric/modules/metric-ids/metric-ids.data-table.code.ts",
  pageTypeSlug: temperMetric.slug,
  from: "stat pages",
  unions: [
    { name: "MetricId", holds: (page) => page.subject !== COMPANION },
    { name: "CompanionMetricId", holds: (page) => page.subject === COMPANION },
  ],
}

export function couldTurn(change: Change): boolean {
  return keepingTurns(KEEPING, change)
}

export function generateChange(change: Change): Written {
  return slugUnionsKept(KEEPING, change)
}
