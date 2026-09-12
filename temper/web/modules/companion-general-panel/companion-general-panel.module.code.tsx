"use client"

import { ResponsiveColumns } from "akasha/design/interfaces/layout/responsive-columns/responsive-columns.module.code.tsx"
import type { BuildId } from "akasha/temper/formula-framework/modules/branded-id/branded-id.module.code.ts"
import { CompanionManagementPanelCard } from "akasha/temper/web/companion-management-panel-card/companion-management-panel-card.module.code.tsx"
import { BuildDescriptionPanelCard } from "akasha/temper/web/modules/build-description-panel-card/build-description-panel-card.module.code.tsx"
import { CompanionInfoPanelCard } from "akasha/temper/web/modules/companion-info-panel-card/companion-info-panel-card.module.code.tsx"

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
