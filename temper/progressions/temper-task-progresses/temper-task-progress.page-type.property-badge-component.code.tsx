"use client"

import { ProgressPropertyBadge } from "akasha/pages/ui/components/modules/progress-property-badge/progress-property-badge.module.code.tsx"
import type { PropertyBadgeProps } from "akasha/pages/ui/components/modules/property-badge/property-badge.module.code.tsx"

export function Drawing(props: PropertyBadgeProps) {
  return <ProgressPropertyBadge {...props} />
}
