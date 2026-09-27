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
import { surfaceClass } from "akasha/design/interface/primitive/modules/surface-class/surface-class.module.code.ts"
import { useSurface } from "akasha/design/interface/primitive/modules/surface-provider/surface-provider.module.code.tsx"
import { usePhrase } from "akasha/temper/web/modules/use-web-phrases/use-web-phrases.module.code.tsx"
import { restoreConfirmDialogCancel } from "akasha/temper/web/phrase/pages/restore-confirm-dialog-cancel.temper-web-phrase.ts"
import { restoreConfirmDialogDescription } from "akasha/temper/web/phrase/pages/restore-confirm-dialog-description.temper-web-phrase.ts"
import { restoreConfirmDialogRestore } from "akasha/temper/web/phrase/pages/restore-confirm-dialog-restore.temper-web-phrase.ts"
import { restoreConfirmDialogRestoring } from "akasha/temper/web/phrase/pages/restore-confirm-dialog-restoring.temper-web-phrase.ts"
import { restoreConfirmDialogTitle } from "akasha/temper/web/phrase/pages/restore-confirm-dialog-title.temper-web-phrase.ts"

interface RestoreConfirmDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  onConfirm: () => void
  isRestoring: boolean
}

export function RestoreConfirmDialog({
  open,
  onOpenChange,
  onConfirm,
  isRestoring,
}: RestoreConfirmDialogProps) {
  const surface = useSurface()
  const phrase = usePhrase()
  return (
    <AlertDialog open={open} onOpenChange={onOpenChange}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>{phrase(restoreConfirmDialogTitle.slug)}</AlertDialogTitle>
          <AlertDialogDescription>
            {phrase(restoreConfirmDialogDescription.slug)}
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter className="sm:justify-between">
          <AlertDialogAction
            onClick={onConfirm}
            disabled={isRestoring}
            className={isRestoring ? "disabled:cursor-wait" : undefined}
          >
            {phrase(
              isRestoring ? restoreConfirmDialogRestoring.slug : restoreConfirmDialogRestore.slug
            )}
          </AlertDialogAction>
          <AlertDialogCancel disabled={isRestoring} className={surfaceClass(surface + 1)}>
            {phrase(restoreConfirmDialogCancel.slug)}
          </AlertDialogCancel>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}
