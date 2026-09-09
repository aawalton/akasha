import type { CharacterState } from "akasha/temper/temper-character-build/build-types/build-types.module.code.ts"
import type { SetTemplate as SetsAll } from "akasha/temper/temper-equipment/set-template/set-template.module.code.ts"
import type { ClassId } from "../../formula-framework/class-id/class-id.module.code.ts"

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
