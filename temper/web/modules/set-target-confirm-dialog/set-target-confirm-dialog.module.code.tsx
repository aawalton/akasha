"use client"

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "akasha/design/interface/primitive/modules/alert-dialog/alert-dialog.module.code.tsx"
import { usePhrase } from "akasha/temper/web/modules/use-web-phrases/use-web-phrases.module.code.tsx"
import { setTargetConfirmDialogCancel } from "akasha/temper/web/phrase/pages/set-target-confirm-dialog-cancel.temper-web-phrase.ts"
import { setTargetConfirmDialogConfirm } from "akasha/temper/web/phrase/pages/set-target-confirm-dialog-confirm.temper-web-phrase.ts"
import { setTargetConfirmDialogDescription } from "akasha/temper/web/phrase/pages/set-target-confirm-dialog-description.temper-web-phrase.ts"
import { setTargetConfirmDialogTitle } from "akasha/temper/web/phrase/pages/set-target-confirm-dialog-title.temper-web-phrase.ts"

interface SetTargetConfirmDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  entityName: string
  onConfirm: () => void
}

export function SetTargetConfirmDialog({
  open,
  onOpenChange,
  entityName,
  onConfirm,
}: SetTargetConfirmDialogProps) {
  const phrase = usePhrase()
  return (
    <AlertDialog open={open} onOpenChange={onOpenChange}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>{phrase(setTargetConfirmDialogTitle.slug)}</AlertDialogTitle>
          <AlertDialogDescription>
            {phrase(setTargetConfirmDialogDescription.slug, { name: entityName })}
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>{phrase(setTargetConfirmDialogCancel.slug)}</AlertDialogCancel>
          <AlertDialogAction onClick={onConfirm}>
            {phrase(setTargetConfirmDialogConfirm.slug)}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}
