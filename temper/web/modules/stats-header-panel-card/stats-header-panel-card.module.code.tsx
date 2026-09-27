"use client"

import { PanelCard } from "akasha/design/interface/layout/modules/panel-card/panel-card.module.code.tsx"
import {
  Tabs,
  TabsList,
  TabsTrigger,
} from "akasha/design/interface/pattern/modules/tabs/tabs.module.code.tsx"
import {
  CardContent,
  CardHeader,
  CardTitle,
} from "akasha/design/interface/primitive/modules/card/card.module.code.tsx"
import { surfaceClass } from "akasha/design/interface/primitive/modules/surface-class/surface-class.module.code.ts"
import { useSurface } from "akasha/design/interface/primitive/modules/surface-provider/surface-provider.module.code.tsx"
import { StatsToolbar } from "akasha/temper/web/modules/stats-toolbar/stats-toolbar.module.code.tsx"
import { usePhrase } from "akasha/temper/web/modules/use-web-phrases/use-web-phrases.module.code.tsx"
import { statsHeaderPanelCardBackup } from "akasha/temper/web/phrase/pages/stats-header-panel-card-backup.temper-web-phrase.ts"
import { statsHeaderPanelCardPrimary } from "akasha/temper/web/phrase/pages/stats-header-panel-card-primary.temper-web-phrase.ts"
import { statsHeaderPanelCardTitle } from "akasha/temper/web/phrase/pages/stats-header-panel-card-title.temper-web-phrase.ts"
import { Shield, Swords } from "lucide-react"

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
  const phrase = usePhrase()
  const primary = phrase(statsHeaderPanelCardPrimary.slug)
  const backup = phrase(statsHeaderPanelCardBackup.slug)
  return (
    <PanelCard id="stats-header" collapsible={false} className={className}>
      <CardHeader>
        <CardTitle className="text-lg">{phrase(statsHeaderPanelCardTitle.slug)}</CardTitle>
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
            <TabsTrigger value="primary" className="gap-2" aria-label={primary}>
              <Swords className="h-4 w-4" />
              <span className="hidden sm:inline">{primary}</span>
            </TabsTrigger>
            <TabsTrigger value="backup" className="gap-2" aria-label={backup}>
              <Shield className="h-4 w-4" />
              <span className="hidden sm:inline">{backup}</span>
            </TabsTrigger>
          </TabsList>
        </Tabs>
      </CardContent>
    </PanelCard>
  )
}
