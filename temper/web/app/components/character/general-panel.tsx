"use client"

import { ResponsiveColumns } from "@shared/design-layout/components/responsive-columns"
import type { CharacterState } from "@temper/game-characters-character/build-types"
import type { BuildId } from "@temper/shared-formula-framework/branded"
import { BuildDescriptionPanelCard } from "@/components/character/build-description-panel-card"
import { BuildInfoPanelCard } from "@/components/character/build-info-panel-card"
import { CharacterManagementPanelCard } from "@/components/characters/character-management-panel-card"

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
