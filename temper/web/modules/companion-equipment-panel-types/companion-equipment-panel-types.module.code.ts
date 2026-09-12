import type { CompanionState } from "akasha/temper/companions-core/modules/companion-types/companion-types.module.code.ts"

export interface CompanionEquipmentPanelProps {
  equipment: CompanionState["equipment"]
  onUpdate: (updates: Partial<CompanionState["equipment"]>) => void
  readOnly?: boolean
}
