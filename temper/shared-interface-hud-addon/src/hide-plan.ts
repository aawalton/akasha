import type { HudComponentRecord } from "@temper/shared-interface-hud-scene-catalog/schema"
import type { HidePlanEntry, HideRegistration } from "./hide-types"

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
