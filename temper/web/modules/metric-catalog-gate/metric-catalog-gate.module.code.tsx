"use client"

import { useMetricCatalog } from "akasha/temper/web/modules/use-metric-catalog/use-metric-catalog.module.code.tsx"
import type { ReactNode } from "react"

export function MetricCatalogGate({
  children,
  fallback,
}: {
  children: () => ReactNode
  fallback: ReactNode
}) {
  return <>{useMetricCatalog() === null ? fallback : children()}</>
}
