import { Button } from "akasha/design/interface/primitive/modules/button/button.module.code.tsx"
import { Input } from "akasha/design/interface/primitive/modules/input/input.module.code.tsx"
import { surfaceClass } from "akasha/design/interface/primitive/modules/surface-class/surface-class.module.code.ts"
import { useSurface } from "akasha/design/interface/primitive/modules/surface-provider/surface-provider.module.code.tsx"
import { Toggle } from "akasha/design/interface/primitive/modules/toggle/toggle.module.code.tsx"
import { usePhrase } from "akasha/temper/web/modules/use-web-phrases/use-web-phrases.module.code.tsx"
import { statsToolbarCollapseAll } from "akasha/temper/web/phrase/pages/stats-toolbar-collapse-all.temper-web-phrase.ts"
import { statsToolbarExpandAll } from "akasha/temper/web/phrase/pages/stats-toolbar-expand-all.temper-web-phrase.ts"
import { statsToolbarHideAdvanced } from "akasha/temper/web/phrase/pages/stats-toolbar-hide-advanced.temper-web-phrase.ts"
import { statsToolbarSearch } from "akasha/temper/web/phrase/pages/stats-toolbar-search.temper-web-phrase.ts"
import { statsToolbarShowAdvanced } from "akasha/temper/web/phrase/pages/stats-toolbar-show-advanced.temper-web-phrase.ts"
import { ChevronsDown, ChevronsUp, Eye, EyeOff, Search } from "lucide-react"

interface StatsToolbarProps {
  searchFilter: string
  onSearchChange: (value: string) => void
  onExpandAll: () => void
  onCollapseAll: () => void
  showAdvancedMetrics: boolean
  onShowAdvancedMetricsChange: (value: boolean) => void
}

export function StatsToolbar({
  searchFilter,
  onSearchChange,
  onExpandAll,
  onCollapseAll,
  showAdvancedMetrics,
  onShowAdvancedMetricsChange,
}: StatsToolbarProps) {
  const surface = useSurface()
  const phrase = usePhrase()
  return (
    <div className="relative flex items-center gap-2">
      <div className="relative flex-1">
        <Search className="absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 text-tertiary" />
        <Input
          placeholder={phrase(statsToolbarSearch.slug)}
          value={searchFilter}
          onChange={(e) => onSearchChange(e.target.value)}
          className={`${surfaceClass(surface + 1)} pl-9`}
        />
      </div>
      <Button
        variant="secondary"
        size="icon"
        onClick={onExpandAll}
        title={phrase(statsToolbarExpandAll.slug)}
        className="shrink-0"
      >
        <ChevronsDown className="h-4 w-4" />
      </Button>
      <Button
        variant="secondary"
        size="icon"
        onClick={onCollapseAll}
        title={phrase(statsToolbarCollapseAll.slug)}
        className="shrink-0"
      >
        <ChevronsUp className="h-4 w-4" />
      </Button>
      <Toggle
        variant="elevation-muted"
        pressed={showAdvancedMetrics}
        onPressedChange={onShowAdvancedMetricsChange}
        title={phrase(
          showAdvancedMetrics ? statsToolbarHideAdvanced.slug : statsToolbarShowAdvanced.slug
        )}
        className="shrink-0"
      >
        {showAdvancedMetrics ? <Eye className="h-4 w-4" /> : <EyeOff className="h-4 w-4" />}
      </Toggle>
    </div>
  )
}
