import type { CharacterState } from "@akasha/temper-character-build/build-types"
import type { SetTemplate as SetsAll } from "@akasha/temper-equipment/set-template"
import type { ClassId } from "@akasha/temper-formula-framework/class-id"

export interface EquipmentPanelProps {
  equipment: CharacterState["equipment"]
  onUpdate: (updates: Partial<CharacterState["equipment"]>) => void
  availableSets: readonly SetsAll[]
  playerClass?: ClassId | null
  columnCount: 1 | 2
  readOnly?: boolean
}

export interface EquipmentSectionProps {
  equipment: CharacterState["equipment"]
  onUpdate: (updates: Partial<CharacterState["equipment"]>) => void
  availableSets: readonly SetsAll[]
  equippedMythicSetId: string | null
  playerClass?: ClassId | null
  className?: string
  readOnly?: boolean
}
