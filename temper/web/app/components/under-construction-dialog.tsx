"use client"

import { Button } from "@shared/design-primitives/components/button"
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@shared/design-primitives/components/dialog"
import { Construction } from "lucide-react"

interface UnderConstructionDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  featureName: string
}

export function UnderConstructionDialog({
  open,
  onOpenChange,
  featureName,
}: UnderConstructionDialogProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Construction className="h-5 w-5 text-tertiary" />
            Under Construction
          </DialogTitle>
          <DialogDescription>
            The {featureName} feature is currently under development and will be available soon.
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <Button variant="secondary" onClick={() => onOpenChange(false)}>
            Close
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
