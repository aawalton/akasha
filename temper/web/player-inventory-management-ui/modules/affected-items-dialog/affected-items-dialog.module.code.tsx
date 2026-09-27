"use client"

import {
  Dialog,
  DialogBody,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "akasha/design/interface/primitive/modules/dialog/dialog.module.code.tsx"
import type { AffectedItem } from "akasha/temper/items/rules/core/modules/inventory-rule-matcher-types/inventory-rule-matcher-types.module.code.ts"
import { usePhrase } from "akasha/temper/web/modules/use-web-phrases/use-web-phrases.module.code.tsx"
import { affectedItemsDialogTitle } from "akasha/temper/web/phrase/pages/affected-items-dialog-title.temper-web-phrase.ts"
import { AffectedItemsViews } from "akasha/temper/web/player-inventory-management-ui/modules/affected-items-views/affected-items-views.module.code.tsx"
import type { ReactNode } from "react"

interface AffectedItemsDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  header: ReactNode
  items: readonly AffectedItem[]
}

export function AffectedItemsDialog({
  open,
  onOpenChange,
  header,
  items,
}: AffectedItemsDialogProps) {
  const phrase = usePhrase()
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-lg">
        <DialogHeader>
          <DialogTitle>{phrase(affectedItemsDialogTitle.slug)}</DialogTitle>
        </DialogHeader>
        {header}
        <DialogBody className="flex h-[30vh] min-h-0 flex-col gap-4">
          <AffectedItemsViews items={items} />
        </DialogBody>
      </DialogContent>
    </Dialog>
  )
}
