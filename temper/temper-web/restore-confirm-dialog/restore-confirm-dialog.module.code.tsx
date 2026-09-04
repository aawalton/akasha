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
} from "@akasha/design-primitives/alert-dialog"
import { surfaceClass } from "@akasha/design-primitives/surface-class"
import { useSurface } from "@akasha/design-primitives/surface-provider"

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
  return (
    <AlertDialog open={open} onOpenChange={onOpenChange}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Restore Version?</AlertDialogTitle>
          <AlertDialogDescription>
            This will replace your current build with the selected version.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter className="sm:justify-between">
          <AlertDialogAction
            onClick={onConfirm}
            disabled={isRestoring}
            className={isRestoring ? "disabled:cursor-wait" : undefined}
          >
            {isRestoring ? "Restoring..." : "Restore"}
          </AlertDialogAction>
          <AlertDialogCancel disabled={isRestoring} className={surfaceClass(surface + 1)}>
            Cancel
          </AlertDialogCancel>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}
