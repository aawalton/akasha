"use client"

import { PanelCard } from "@shared/design-layout/components/panel-card"
import { CardContent, CardHeader, CardTitle } from "@shared/design-primitives/components/card"
import { useSurface } from "@shared/design-primitives/components/surface-provider"
import { Tabs, TabsList, TabsTrigger } from "@shared/design-patterns/components/tabs"
import { surfaceClass } from "@shared/design-primitives/components/surface-class"
import { Shield, Swords } from "lucide-react"
import { StatsToolbar } from "@/components/stats/components/stats-toolbar"

type StatsTab = "primary" | "backup"

function isStatsTab(value: string): value is StatsTab {
  return value === "primary" || value === "backup"
}

interface StatsHeaderPanelCardProps {
  activeTab: StatsTab
  onTabChange: (tab: StatsTab) => void
  searchFilter: string
  onSearchChange: (value: string) => void
  onExpandAll: () => void
  onCollapseAll: () => void
  showAdvancedMetrics: boolean
  onShowAdvancedMetricsChange: (value: boolean) => void
  className?: string
}

export function StatsHeaderPanelCard({
  activeTab,
  onTabChange,
  searchFilter,
  onSearchChange,
  onExpandAll,
  onCollapseAll,
  showAdvancedMetrics,
  onShowAdvancedMetricsChange,
  className,
}: StatsHeaderPanelCardProps) {
  const surface = useSurface()
  return (
    <PanelCard id="stats-header" collapsible={false} className={className}>
      <CardHeader>
        <CardTitle className="text-lg">Stats</CardTitle>
      </CardHeader>
      <CardContent>
        <Tabs
          value={activeTab}
          className="space-y-4"
          onValueChange={(v) => {
            if (isStatsTab(v)) onTabChange(v)
          }}
        >
          {}
          <StatsToolbar
            searchFilter={searchFilter}
            onSearchChange={onSearchChange}
            onExpandAll={onExpandAll}
            onCollapseAll={onCollapseAll}
            showAdvancedMetrics={showAdvancedMetrics}
            onShowAdvancedMetricsChange={onShowAdvancedMetricsChange}
          />

          <TabsList className={`grid w-full grid-cols-2 ${surfaceClass(surface + 1)}`}>
            <TabsTrigger value="primary" className="gap-2" aria-label="Primary">
              <Swords className="h-4 w-4" />
              <span className="hidden sm:inline">Primary</span>
            </TabsTrigger>
            <TabsTrigger value="backup" className="gap-2" aria-label="Backup">
              <Shield className="h-4 w-4" />
              <span className="hidden sm:inline">Backup</span>
            </TabsTrigger>
          </TabsList>
        </Tabs>
      </CardContent>
    </PanelCard>
  )
}
