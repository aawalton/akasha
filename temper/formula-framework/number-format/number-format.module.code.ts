type MetricValue = { value: number; valueType: string; divisor?: number; cap?: number }

function formatInteger(value: number): string {
  return Math.round(value).toLocaleString()
}

export function formatAbbreviated(value: number): string {
  if (value < 10000) {
    return value.toLocaleString("en-US", { maximumFractionDigits: 0 })
  }

  const thousands = value / 1000
  let decimals: number
  if (thousands < 100) {
    decimals = 1
  } else {
    decimals = 0
  }

  const formatted = thousands.toLocaleString("en-US", {
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  })

  return `${formatted}k`
}

export function formatPercent(value: number): string {
  const pct = value * 100
  return `${pct.toFixed(2).replace(/\.?0+$/, "")}%`
}

export function formatDecimal(value: number, precision = 4): string {
  if (value === 0) return "0"
  if (Math.abs(value) < 1) {
    return value.toFixed(precision).replace(/\.?0+$/, "")
  }
  return Math.round(value).toLocaleString()
}

export function formatStatValue(stat: MetricValue): string {
  const { value, valueType } = stat

  switch (valueType) {
    case "fractional-change":
      return formatPercent(value)
    case "rating": {
      const uncapped = value / (stat.divisor ?? 1)
      const capped = stat.cap !== undefined ? Math.min(stat.cap, uncapped) : uncapped
      const pct = capped * 100
      return `(${formatInteger(value)}) ${pct.toFixed(2)}%`
    }
    default:
      return formatInteger(value)
  }
}
