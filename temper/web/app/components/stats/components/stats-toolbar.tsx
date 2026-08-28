import { Button } from "@shared/design-primitives/components/button"
import { Input } from "@shared/design-primitives/components/input"
import { useSurface } from "@shared/design-primitives/components/surface-provider"
import { Toggle } from "@shared/design-primitives/components/toggle"
import { surfaceClass } from "@shared/design-primitives/components/surface-class"
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
  return (
    <div className="relative flex items-center gap-2">
      <div className="relative flex-1">
        <Search className="absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 text-tertiary" />
        <Input
          placeholder="Search stats, buffs, debuffs..."
          value={searchFilter}
          onChange={(e) => onSearchChange(e.target.value)}
          className={`${surfaceClass(surface + 1)} pl-9`}
        />
      </div>
      <Button
        variant="secondary"
        size="icon"
        onClick={onExpandAll}
        title="Expand all sections"
        className="shrink-0"
      >
        <ChevronsDown className="h-4 w-4" />
      </Button>
      <Button
        variant="secondary"
        size="icon"
        onClick={onCollapseAll}
        title="Collapse all sections"
        className="shrink-0"
      >
        <ChevronsUp className="h-4 w-4" />
      </Button>
      <Toggle
        variant="elevation-muted"
        pressed={showAdvancedMetrics}
        onPressedChange={onShowAdvancedMetricsChange}
        title={showAdvancedMetrics ? "Hide Advanced Stats" : "Show Advanced Stats"}
        className="shrink-0"
      >
        {showAdvancedMetrics ? <Eye className="h-4 w-4" /> : <EyeOff className="h-4 w-4" />}
      </Toggle>
    </div>
  )
}
