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
  return (
    <AlertDialog open={open} onOpenChange={onOpenChange}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Overwrite Target Build?</AlertDialogTitle>
          <AlertDialogDescription>
            The target build for {entityName} has been manually edited. This will overwrite those
            changes.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction onClick={onConfirm}>Set Target</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}
