"use client"

import {
  metricCatalogContext,
  useMetricCatalog,
} from "akasha/temper/web/modules/use-metric-catalog/use-metric-catalog.module.code.tsx"
import type { ReactNode } from "react"

export function MetricCatalogGate({
  children,
  fallback,
}: {
  children: () => ReactNode
  fallback: ReactNode
}) {
  const catalog = useMetricCatalog()
  if (catalog === null) return <>{fallback}</>
  return <metricCatalogContext.Provider value={catalog}>{children()}</metricCatalogContext.Provider>
}
