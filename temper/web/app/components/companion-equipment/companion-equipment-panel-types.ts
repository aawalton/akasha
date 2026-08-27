import type { CompanionState } from "@temper/game-companions-core/companion-types"

export interface CompanionEquipmentPanelProps {
  equipment: CompanionState["equipment"]
  onUpdate: (updates: Partial<CompanionState["equipment"]>) => void
  readOnly?: boolean
}
