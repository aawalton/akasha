"use client"

import { ResponsiveColumns } from "@shared/design-layout/components/responsive-columns"
import type { BuildId } from "@temper/shared-formula-framework/branded"
import { BuildDescriptionPanelCard } from "@/components/character/build-description-panel-card"
import { CompanionInfoPanelCard } from "@/components/companion-character/companion-info-panel-card"
import { CompanionManagementPanelCard } from "@/components/companions/companion-management-panel-card"

interface CompanionGeneralPanelProps {
  buildId: BuildId
  buildName: string
  buildDescription: string
  onUpdateMeta: (updates: { name?: string; description?: string }) => void
  columnCount: 1 | 2
  readOnly?: boolean
  buildFieldsReadOnly?: boolean
}

export function CompanionGeneralPanel({
  buildId,
  buildName,
  buildDescription,
  onUpdateMeta,
  columnCount,
  readOnly,
  buildFieldsReadOnly,
}: CompanionGeneralPanelProps) {
  return (
    <ResponsiveColumns columnCount={columnCount}>
      <CompanionInfoPanelCard
        buildName={buildName}
        onUpdateMeta={onUpdateMeta}
        readOnly={readOnly}
        collapseProtected
      />
      <BuildDescriptionPanelCard
        buildDescription={buildDescription}
        onUpdateMeta={onUpdateMeta}
        readOnly={buildFieldsReadOnly ?? readOnly}
      />
      {!readOnly && <CompanionManagementPanelCard buildId={buildId} buildName={buildName} />}
    </ResponsiveColumns>
  )
}
