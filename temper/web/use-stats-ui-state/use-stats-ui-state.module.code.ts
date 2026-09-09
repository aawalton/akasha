import type { MetricValue } from "akasha/temper/characters-stats/metric-value/metric-value.module.code.ts"
import { useState } from "react"
import type { BuffOrDebuffSource } from "../../formula-framework/buff-or-debuff-source/buff-or-debuff-source.module.code.ts"

export function useStatsUIState() {
  const [selectedMetric, setSelectedMetric] = useState<MetricValue | null>(null)
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [selectedBuff, setSelectedBuff] = useState<BuffOrDebuffSource | null>(null)
  const [isBuffDialogOpen, setIsBuffDialogOpen] = useState(false)
  const [showAdvancedMetrics, setShowAdvancedMetrics] = useState(false)

  return {
    selectedMetric,
    setSelectedMetric,
    isDialogOpen,
    setIsDialogOpen,
    selectedBuff,
    setSelectedBuff,
    isBuffDialogOpen,
    setIsBuffDialogOpen,
    showAdvancedMetrics,
    setShowAdvancedMetrics,
  }
}
