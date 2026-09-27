"use client"

import { LayoutLink } from "akasha/design/interface/layout/modules/router-context/router-context.module.code.tsx"
import {
  Alert,
  AlertDescription,
  AlertTitle,
} from "akasha/design/interface/primitive/modules/alert/alert.module.code.tsx"
import {
  usePhrase,
  usePhraseDescription,
} from "akasha/temper/web/modules/use-web-phrases/use-web-phrases.module.code.tsx"
import { inventoryRulesNoInventoryBody } from "akasha/temper/web/phrase/pages/inventory-rules-no-inventory-body.temper-web-phrase.ts"
import { inventoryRulesNoInventoryCheckSync } from "akasha/temper/web/phrase/pages/inventory-rules-no-inventory-check-sync.temper-web-phrase.ts"
import { inventoryRulesNoInventoryTitle } from "akasha/temper/web/phrase/pages/inventory-rules-no-inventory-title.temper-web-phrase.ts"
import { Package } from "lucide-react"

export function InventoryRulesNoInventory() {
  const phrase = usePhrase()
  const phraseDescription = usePhraseDescription()
  return (
    <Alert>
      <Package />
      <AlertTitle>{phrase(inventoryRulesNoInventoryTitle.slug)}</AlertTitle>
      <AlertDescription>
        <p>
          {phraseDescription(inventoryRulesNoInventoryBody.slug)}{" "}
          <LayoutLink href="/watcher" className="font-medium underline">
            {phrase(inventoryRulesNoInventoryCheckSync.slug)}
          </LayoutLink>
          .
        </p>
      </AlertDescription>
    </Alert>
  )
}
