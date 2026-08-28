"use client"

import { ResponsiveColumns } from "@shared/design-layout/components/responsive-columns"
import type { CharacterState } from "@temper/game-characters-character/build-types"
import type { MundusId } from "@temper/game-characters-character/mundus-source"
import { AttributesPanelCard } from "@/components/character/attributes-panel-card"
import { CharacterAutomationPanelCard } from "@/components/character/automation-panel-card"
import { ConsumablesPanelCard } from "@/components/character/consumables-panel-card"
import { IdentityPanelCard } from "@/components/character/identity-panel-card"
import { OtherPanelCard } from "@/components/character/other-panel-card"
import { TargetPanelCard } from "@/components/character/target-panel-card"
import { useCharacterMetadata } from "@/components/characters/context/use-character"

interface CharacterPanelProps {
  character: CharacterState["character"]
  consumables: CharacterState["consumables"]
  mundusStone: MundusId
  target: CharacterState["target"]
  account: CharacterState["account"]
  onUpdate: (updates: Partial<CharacterState["character"]>) => void
  onUpdateConsumables: (updates: Partial<CharacterState["consumables"]>) => void
  onUpdateMundus: (mundusStone: MundusId) => void
  onUpdateTarget: (updates: Partial<CharacterState["target"]>) => void
  onUpdateAccount: (updates: Partial<CharacterState["account"]>) => void
  columnCount: 1 | 2
  readOnly?: boolean
  esoCharacterId?: string
}

export function CharacterPanel({
  character,
  consumables,
  mundusStone,
  target,
  account,
  onUpdate,
  onUpdateConsumables,
  onUpdateMundus,
  onUpdateTarget,
  onUpdateAccount,
  columnCount,
  readOnly,
  esoCharacterId,
}: CharacterPanelProps) {
  const { updateMeta } = useCharacterMetadata()
  return (
    <ResponsiveColumns columnCount={columnCount}>
      <IdentityPanelCard
        character={{
          class: character.class,
          race: character.race,
          curseState: character.curseState,
          vampireStage: character.vampireStage,
        }}
        onUpdate={(updates) => onUpdate(updates)}
        readOnly={readOnly}
        collapseProtected
      />
      <AttributesPanelCard
        attributes={character.attributes}
        onUpdate={(attributes) => onUpdate({ attributes })}
        readOnly={readOnly}
      />
      <ConsumablesPanelCard
        consumables={consumables}
        mundusStone={mundusStone}
        onUpdateConsumables={onUpdateConsumables}
        onUpdateMundus={onUpdateMundus}
        readOnly={readOnly}
      />
      <TargetPanelCard
        target={target}
        onUpdate={onUpdateTarget}
        onUpdateTargetCount={(targetCount) => updateMeta({ targetCount })}
        readOnly={readOnly}
      />
      <OtherPanelCard
        alliance={character.alliance}
        onUpdateAlliance={(alliance) => onUpdate({ alliance })}
        account={account}
        onUpdateAccount={onUpdateAccount}
        readOnly={readOnly}
      />
      {esoCharacterId != null && !readOnly && (
        <CharacterAutomationPanelCard esoCharacterId={esoCharacterId} />
      )}
    </ResponsiveColumns>
  )
}
