import type { CompanionMetricValue } from "@akasha/temper-companions-core/companion-metrics"

interface CompanionStatValueProps {
  stat: CompanionMetricValue
}

export function CompanionStatValue({ stat }: CompanionStatValueProps) {
  const { value, valueType } = stat

  if (valueType === "fractional-change") {
    const percentage = value * 100
    const sign = percentage > 0 ? "+" : ""
    return <>{`${sign}${percentage.toFixed(2)}%`}</>
  }

  if (valueType === "rating") {
    if (stat.surplus) {
      const effectivePercentage = stat.surplus.effectiveValue * 100
      return (
        <>
          <span className="text-tertiary">({Math.round(value).toLocaleString()})</span>{" "}
          {effectivePercentage.toFixed(0)}%
        </>
      )
    }

    const divisor = stat.divisor ?? 1
    const uncapped = value / divisor
    const capped = stat.cap !== undefined ? Math.min(stat.cap, uncapped) : uncapped
    const percentage = capped * 100
    return (
      <>
        <span className="text-tertiary">({Math.round(value).toLocaleString()})</span>{" "}
        {percentage.toFixed(2)}%
      </>
    )
  }

  if (valueType === "integer") {
    return <>{Math.round(value).toLocaleString()}</>
  }

  return <>{String(value)}</>
}
