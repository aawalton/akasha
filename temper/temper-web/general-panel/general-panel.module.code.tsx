"use client"

import { ResponsiveColumns } from "@akasha/design-layout/responsive-columns"
import type { CharacterState } from "@akasha/temper-character-build/build-types"
import type { BuildId } from "@akasha/temper-formula-framework/branded-id"
import { BuildDescriptionPanelCard } from "../build-description-panel-card/build-description-panel-card.module.code.tsx"
import { BuildInfoPanelCard } from "../build-info-panel-card/build-info-panel-card.module.code.tsx"
import { CharacterManagementPanelCard } from "../character-management-panel-card/character-management-panel-card.module.code.tsx"

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
