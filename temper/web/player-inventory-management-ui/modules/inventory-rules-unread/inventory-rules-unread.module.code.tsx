"use client"

import {
  Alert,
  AlertDescription,
  AlertTitle,
} from "akasha/design/interface/primitive/modules/alert/alert.module.code.tsx"
import {
  usePhrase,
  usePhraseDescription,
} from "akasha/temper/web/modules/use-web-phrases/use-web-phrases.module.code.tsx"
import { inventoryRulesUnreadBody } from "akasha/temper/web/phrase/pages/inventory-rules-unread-body.temper-web-phrase.ts"
import { inventoryRulesUnreadTitle } from "akasha/temper/web/phrase/pages/inventory-rules-unread-title.temper-web-phrase.ts"
import { TriangleAlert } from "lucide-react"

export function InventoryRulesUnread({ said }: { said: string }) {
  const phrase = usePhrase()
  const phraseDescription = usePhraseDescription()
  return (
    <div className="flex flex-col gap-6">
      <Alert variant="destructive">
        <TriangleAlert />
        <AlertTitle>{phrase(inventoryRulesUnreadTitle.slug)}</AlertTitle>
        <AlertDescription>
          <p>{phraseDescription(inventoryRulesUnreadBody.slug)}</p>
          <p className="font-mono text-xs">{said}</p>
        </AlertDescription>
      </Alert>
    </div>
  )
}
