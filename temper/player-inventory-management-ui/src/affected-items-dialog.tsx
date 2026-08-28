"use client"

import { Dialog, DialogBody, DialogContent, DialogHeader, DialogTitle } from "@shared/design-primitives/components/dialog"
import type { AffectedItem } from "@temper/game-items-rules-core/inventory-rule-matcher-types"
import type { ReactNode } from "react"
import { AffectedItemsViews } from "./affected-items-views"

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
