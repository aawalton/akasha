"use client"

import { Button } from "akasha/design/interface/primitive/modules/button/button.module.code.tsx"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "akasha/design/interface/primitive/modules/dialog/dialog.module.code.tsx"
import { usePhrase } from "akasha/temper/web/modules/use-web-phrases/use-web-phrases.module.code.tsx"
import { underConstructionDialogClose } from "akasha/temper/web/phrase/pages/under-construction-dialog-close.temper-web-phrase.ts"
import { underConstructionDialogDescription } from "akasha/temper/web/phrase/pages/under-construction-dialog-description.temper-web-phrase.ts"
import { underConstructionDialogTitle } from "akasha/temper/web/phrase/pages/under-construction-dialog-title.temper-web-phrase.ts"
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
  const phrase = usePhrase()
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Construction className="h-5 w-5 text-tertiary" />
            {phrase(underConstructionDialogTitle.slug)}
          </DialogTitle>
          <DialogDescription>
            {phrase(underConstructionDialogDescription.slug, { feature: featureName })}
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <Button variant="secondary" onClick={() => onOpenChange(false)}>
            {phrase(underConstructionDialogClose.slug)}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
