"use client"

import { formatGold } from "@shared/design-primitives/utils/format-gold"
import { useSurface } from "@shared/design-primitives/components/surface-provider"
import { surfaceClass } from "@shared/design-primitives/components/surface-class"
import {
  Area,
  AreaChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  type TooltipContentProps,
  XAxis,
  YAxis,
} from "recharts"
import { formatDayLabel } from "./net-worth-history"

interface NetWorthDataPoint {
  date: string
  netWorth: number
}

interface NetWorthChartProps {
  data: readonly NetWorthDataPoint[]
}

function formatCompactGold(value: number): string {
  if (value >= 1_000_000) return `${(value / 1_000_000).toFixed(1)}M`
  if (value >= 1_000) return `${(value / 1_000).toFixed(0)}K`
  return String(value)
}

const CHART_COLOR = {
  stroke: "var(--yellow)",
  fill: "oklch(from var(--yellow) l c h / 0.15)",
  dot: "var(--yellow)",
}
const GRID_STROKE = "var(--surface-3)"
const TICK_FILL = "var(--tertiary)"

function ChartTooltipContent({ active, payload, label }: TooltipContentProps) {
  const surface = useSurface()
  if (!active || !payload || payload.length === 0) return null

  const netWorth = Number(payload[0]?.value ?? 0)

  return (
    <div
      className={`flex flex-col gap-1 rounded-lg border border-surface-3 ${surfaceClass(surface + 1)} px-3 py-2 shadow-md`}
    >
      <p className="font-medium text-primary text-xs">{formatDayLabel(String(label ?? ""))}</p>
      <div className="font-mono text-xs">
        <div className="flex items-center justify-between gap-4">
          <span className="text-secondary">Net Worth</span>
          <span className="text-primary">{formatGold(netWorth)}</span>
        </div>
      </div>
    </div>
  )
}

export function NetWorthChart({ data }: NetWorthChartProps) {
  return (
    <ResponsiveContainer width="100%" height={300}>
      <AreaChart data={data} className="cursor-default">
        <CartesianGrid strokeDasharray="3 3" stroke={GRID_STROKE} vertical={false} />
        <XAxis
          dataKey="date"
          tickFormatter={formatDayLabel}
          tick={{ fill: TICK_FILL, fontSize: 12 }}
          axisLine={{ stroke: GRID_STROKE }}
          tickLine={false}
          minTickGap={40}
        />
        <YAxis
          tickFormatter={formatCompactGold}
          tick={{ fill: TICK_FILL, fontSize: 12 }}
          axisLine={false}
          tickLine={false}
          width={48}
        />
        <Tooltip content={ChartTooltipContent} />
        <Area
          type="monotone"
          dataKey="netWorth"
          name="Net Worth"
          stroke={CHART_COLOR.stroke}
          fill={CHART_COLOR.fill}
          strokeWidth={1.5}
          dot={{ fill: CHART_COLOR.dot, r: 3, strokeWidth: 0 }}
          activeDot={{ fill: CHART_COLOR.dot, r: 4, strokeWidth: 0 }}
        />
      </AreaChart>
    </ResponsiveContainer>
  )
}
