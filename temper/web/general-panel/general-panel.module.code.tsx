"use client"

import { ResponsiveColumns } from "akasha/design/interfaces/layout/responsive-columns/responsive-columns.module.code.tsx"
import type { CharacterState } from "akasha/temper/character-build/build-types/build-types.module.code.ts"
import type { BuildId } from "akasha/temper/formula-framework/modules/branded-id/branded-id.module.code.ts"
import { CharacterManagementPanelCard } from "akasha/temper/web/character-management-panel-card/character-management-panel-card.module.code.tsx"
import { BuildDescriptionPanelCard } from "akasha/temper/web/modules/build-description-panel-card/build-description-panel-card.module.code.tsx"
import { BuildInfoPanelCard } from "akasha/temper/web/modules/build-info-panel-card/build-info-panel-card.module.code.tsx"

interface GeneralPanelProps {
  buildId: BuildId
  buildName: string
  buildDescription: string
  character: Pick<CharacterState["character"], "name">
  onUpdateMeta: (updates: { name?: string; description?: string }) => void
  onUpdateCharacter: (updates: Partial<CharacterState["character"]>) => void
  columnCount: 1 | 2
  readOnly?: boolean
  buildFieldsReadOnly?: boolean
}

export function GeneralPanel({
  buildId,
  buildName,
  buildDescription,
  character,
  onUpdateMeta,
  onUpdateCharacter,
  columnCount,
  readOnly,
  buildFieldsReadOnly,
}: GeneralPanelProps) {
  return (
    <ResponsiveColumns columnCount={columnCount}>
      <BuildInfoPanelCard
        buildName={buildName}
        character={{ name: character.name }}
        onUpdateMeta={onUpdateMeta}
        onUpdateCharacter={onUpdateCharacter}
        readOnly={readOnly}
        collapseProtected
      />
      <BuildDescriptionPanelCard
        buildDescription={buildDescription}
        onUpdateMeta={onUpdateMeta}
        readOnly={buildFieldsReadOnly ?? readOnly}
      />
      {!readOnly && <CharacterManagementPanelCard buildId={buildId} buildName={buildName} />}
    </ResponsiveColumns>
  )
}
