"use client"

import {
  Dialog,
  DialogBody,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "akasha/design/interfaces/primitives/dialog/dialog.module.code.tsx"
import type { AffectedItem } from "akasha/temper/items-rules-core/inventory-rule-matcher-types/inventory-rule-matcher-types.module.code.ts"
import { AffectedItemsViews } from "akasha/temper/player-inventory-management-ui/affected-items-views/affected-items-views.module.code.tsx"
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
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-lg">
        <DialogHeader>
          <DialogTitle>Affected Items</DialogTitle>
        </DialogHeader>
        {header}
        <DialogBody className="flex h-[30vh] min-h-0 flex-col gap-4">
          <AffectedItemsViews items={items} />
        </DialogBody>
      </DialogContent>
    </Dialog>
  )
}
