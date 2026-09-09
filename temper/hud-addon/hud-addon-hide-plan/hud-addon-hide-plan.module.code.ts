import type { HudComponentRecord } from "@akasha/temper-hud-components/hud-component-record"
import type {
  HidePlanEntry,
  HideRegistration,
} from "../hud-addon-hide-types/hud-addon-hide-types.module.code.ts"

export function indexInventoryById(
  records: readonly HudComponentRecord[]
): Record<string, HudComponentRecord> {
  const index: Record<string, HudComponentRecord> = {}
  for (const record of records) {
    index[record.id] = record
  }
  return index
}

export function computeHidePlan(
  inventoryIndex: Readonly<Record<string, HudComponentRecord>>,
  registrations: readonly HideRegistration[],
  hiddenById: Readonly<Record<string, boolean>>
): readonly HidePlanEntry[] {
  const plan: HidePlanEntry[] = []
  for (const registration of registrations) {
    const record = inventoryIndex[registration.id]
    if (record === undefined) continue
    plan.push({
      id: registration.id,
      reason: registration.reason,
      hidden: hiddenById[registration.id] === true,
      mechanism: record.hideMechanism,
    })
  }
  return plan
}
