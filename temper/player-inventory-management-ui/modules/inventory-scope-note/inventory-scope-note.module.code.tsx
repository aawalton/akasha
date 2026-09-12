"use client"

import {
  describeInventoryScope,
  type InventoryScopeFacts,
} from "akasha/temper/player-inventory-management-ui/modules/inventory-scope-note-text/inventory-scope-note-text.module.code.ts"

export function InventoryScopeNote(props: InventoryScopeFacts) {
  return (
    <p className="text-secondary text-xs" data-testid="inventory-scope-note">
      {describeInventoryScope(props)}
    </p>
  )
}
