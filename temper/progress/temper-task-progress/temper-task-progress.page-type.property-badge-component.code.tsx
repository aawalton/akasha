"use client"

import { ProgressPropertyBadge } from "akasha/page/ui/component/modules/progress-property-badge/progress-property-badge.module.code.tsx"
import type { PropertyBadgeProps } from "akasha/page/ui/component/modules/property-badge/property-badge.module.code.tsx"

export function Drawing(props: PropertyBadgeProps) {
  return <ProgressPropertyBadge {...props} />
}
