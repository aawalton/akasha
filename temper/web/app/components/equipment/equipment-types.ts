import type { CharacterState } from "@temper/game-characters-character/build-types"
import type { ClassId } from "@akasha/temper-formula-framework/class-id"
import type { SetsAll } from "@temper/game-characters-equipment/sets/sets-all-data"

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
