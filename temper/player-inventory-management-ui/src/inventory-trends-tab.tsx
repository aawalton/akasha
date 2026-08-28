"use client"

import { useAuth } from "@shared/auth/use-auth"
import { formatGold } from "@shared/design-primitives/utils/format-gold"
import { ListContentSkeleton } from "@shared/design-layout/components/list-content-skeleton"
import { PageTabHeader } from "@shared/design-layout/components/page-tab-header"
import { PanelCard } from "@shared/design-layout/components/panel-card"
import { ResponsiveColumns } from "@shared/design-layout/components/responsive-columns"
import { Empty, EmptyDescription, EmptyHeader, EmptyMedia, EmptyTitle } from "@shared/design-patterns/components/empty"
import { TrendingUp } from "lucide-react"
import { useMemo } from "react"
import { useInventory, useNetWorthHistory } from "./hooks-inventory"
import { NetWorthBasisNote } from "./net-worth-basis-note"
import { NetWorthChart } from "./net-worth-chart"
import { toDailyCloses } from "./net-worth-history"
import {
  formatPeriodAmount,
  formatPeriodComparedAt,
  formatPeriodPercent,
  NET_WORTH_PERIOD_UNMEASURED_TEXT,
  type NetWorthPeriodReading,
  readNetWorthPeriods,
} from "./net-worth-periods"
import { NetWorthPricingNote } from "./net-worth-pricing-note"
import { resolvePricingSourceNote } from "./pricing-source"
import { PricingSourceNote } from "./pricing-source-note"

function changeToneClass(diff: number): string {
  if (diff > 0) return "text-green"
  if (diff < 0) return "text-orange"
  return "text-secondary"
}

function PeriodStat({ reading }: { reading: NetWorthPeriodReading }) {
  if (reading.state === "unmeasured") {
    return (
      <div>
        <span className="text-secondary text-sm">{reading.label} </span>
        <span className="text-sm text-tertiary">{NET_WORTH_PERIOD_UNMEASURED_TEXT}</span>
      </div>
    )
  }
  const percent = formatPeriodPercent(reading.percent)
  return (
    <div>
      <span className="text-secondary text-sm">{reading.label} </span>
      <span className={`font-mono text-sm ${changeToneClass(reading.diff)}`}>
        {formatPeriodAmount(reading.diff)}
      </span>
      {percent !== null && <span className="text-sm text-tertiary"> {percent}</span>}
      {!reading.onHorizon && (
        <span className="text-sm text-tertiary"> {formatPeriodComparedAt(reading.comparedAt)}</span>
      )}
    </div>
  )
}

export function InventoryTrendsTab() {
  const { userId } = useAuth()
  const { history, guildBankBasisChange, isLoading } = useNetWorthHistory(userId)
  const { inventory, isLoading: inventoryLoading } = useInventory(userId)

  const chartData = useMemo(() => toDailyCloses(history), [history])
  const periods = useMemo(() => readNetWorthPeriods(history), [history])
  const latest = history.at(-1)

  if (isLoading) return <ListContentSkeleton />

  if (chartData.length === 0) {
    return (
      <div className="flex flex-col gap-6">
        <PageTabHeader title="Trends" />
        <ResponsiveColumns>
          <PanelCard id="net-worth" title="Net Worth">
            <Empty>
              <EmptyHeader>
                <EmptyMedia variant="icon">
                  <TrendingUp />
                </EmptyMedia>
                <EmptyTitle>No data yet</EmptyTitle>
                <EmptyDescription>
                  Import your inventory to start tracking net worth over time.
                </EmptyDescription>
              </EmptyHeader>
            </Empty>
          </PanelCard>
        </ResponsiveColumns>
      </div>
    )
  }

  return (
    <div className="flex flex-col gap-6">
      <PageTabHeader title="Trends" />
      <ResponsiveColumns>
        <PanelCard id="net-worth" title="Net Worth">
          {latest && (
            <div className="flex flex-wrap items-baseline gap-x-6 gap-y-1">
              <div>
                <span className="text-secondary text-sm">Net Worth </span>
                <span className="font-mono font-semibold text-accent text-lg">
                  {formatGold(latest.netWorth)}
                </span>
              </div>
              {periods.map((reading) => (
                <PeriodStat key={reading.label} reading={reading} />
              ))}
            </div>
          )}
          <NetWorthChart data={chartData} />
          {guildBankBasisChange && <NetWorthBasisNote change={guildBankBasisChange} />}
          <NetWorthPricingNote />
          <PricingSourceNote
            kind={resolvePricingSourceNote({
              inventory: inventory ?? null,
              isSettled: !inventoryLoading,
            })}
          />
        </PanelCard>
      </ResponsiveColumns>
    </div>
  )
}
