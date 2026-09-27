"use client"

import { usePhrase } from "akasha/temper/web/modules/use-web-phrases/use-web-phrases.module.code.tsx"
import {
  describeInventoryScope,
  type InventoryScopeFacts,
} from "akasha/temper/web/player-inventory-management-ui/modules/inventory-scope-note-text/inventory-scope-note-text.module.code.ts"

export function InventoryScopeNote(props: InventoryScopeFacts) {
  const phrase = usePhrase()
  return (
    <p className="text-secondary text-xs" data-testid="inventory-scope-note">
      {describeInventoryScope(props, phrase)}
    </p>
  )
}
