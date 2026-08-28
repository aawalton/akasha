import { assertNever } from "@shared/utils-narrow/assert-never"
import type { MetricChange } from "@temper/game-characters-stats/compare-stats"
import { getMetricDisplayName } from "@temper/game-characters-stats/metrics/metrics.generated"
import {
  type BuffOrDebuffId,
  buffOrDebuff,
} from "@temper/shared-formula-framework/buff-or-debuff-source"
import { Minus, Plus, TrendingDown, TrendingUp } from "lucide-react"

export interface StatChangeNotification {
  metricChanges: readonly MetricChange[]
  addedBuffIds: readonly BuffOrDebuffId[]
  removedBuffIds: readonly BuffOrDebuffId[]
}

function formatDelta(delta: number, metric: MetricChange["metric"]): string {
  const sign = delta > 0 ? "+" : ""
  switch (metric.valueType) {
    case "fractional-change":
      return `${sign}${(delta * 100).toFixed(1)}%`
    case "number-per-second":
      return `${sign}${Math.round(delta)}/s`
    case "rating": {
      const pctDelta = (delta / metric.divisor) * 100
      return `(${sign}${Math.round(delta).toLocaleString()}) ${sign}${pctDelta.toFixed(2)}%`
    }
    case "integer":
      return `${sign}${Math.round(delta).toLocaleString()}`
    default:
      return assertNever(metric)
  }
}

function BuffChangeRow({ buffId, isAdded }: { buffId: BuffOrDebuffId; isAdded: boolean }) {
  const buffData = buffOrDebuff.data[buffId]
  const name = buffData?.name ?? buffId

  return (
    <div className="flex items-center justify-between gap-3 text-sm">
      <div className="flex items-center gap-2">
        {isAdded ? (
          <Plus className="h-3.5 w-3.5 shrink-0 text-green" />
        ) : (
          <Minus className="h-3.5 w-3.5 shrink-0 text-red" />
        )}
        <span className="text-secondary text-xs">{name}</span>
      </div>
      <span className={`font-medium text-xs ${isAdded ? "text-green" : "text-red"}`}>
        {isAdded ? "Added" : "Removed"}
      </span>
    </div>
  )
}

function MetricChangeRow({ change }: { change: MetricChange }) {
  const isBeneficial =
    change.metric.polarity === "higher-is-better" ? change.delta > 0 : change.delta < 0
  const name = getMetricDisplayName(change.metric.id) ?? change.metric.id

  return (
    <div className="flex items-center justify-between gap-3 text-sm">
      <div className="flex items-center gap-2">
        {isBeneficial ? (
          <TrendingUp className="h-3.5 w-3.5 shrink-0 text-green" />
        ) : (
          <TrendingDown className="h-3.5 w-3.5 shrink-0 text-red" />
        )}
        <span className="text-secondary text-xs">{name}</span>
      </div>
      <span
        className={`font-medium font-mono text-xs tabular-nums ${
          isBeneficial ? "text-green" : "text-red"
        }`}
      >
        {formatDelta(change.delta, change.metric)}
      </span>
    </div>
  )
}

export function StatChangesDescription({
  notification,
  changes,
}: {
  notification?: StatChangeNotification
  changes?: readonly MetricChange[]
}) {
  const metricChanges = notification?.metricChanges ?? changes ?? []
  const addedBuffIds = notification?.addedBuffIds ?? []
  const removedBuffIds = notification?.removedBuffIds ?? []

  return (
    <div className="space-y-2">
      {addedBuffIds.map((buffId) => (
        <BuffChangeRow key={`added-${buffId}`} buffId={buffId} isAdded />
      ))}
      {removedBuffIds.map((buffId) => (
        <BuffChangeRow key={`removed-${buffId}`} buffId={buffId} isAdded={false} />
      ))}
      {metricChanges.map((change) => (
        <MetricChangeRow key={change.metric.id} change={change} />
      ))}
    </div>
  )
}
