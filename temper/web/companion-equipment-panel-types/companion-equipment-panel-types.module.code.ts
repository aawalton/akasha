import type { CompanionState } from "akasha/temper/temper-companions-core/companion-types/companion-types.module.code.ts"

export interface CompanionEquipmentPanelProps {
  equipment: CompanionState["equipment"]
  onUpdate: (updates: Partial<CompanionState["equipment"]>) => void
  readOnly?: boolean
}
