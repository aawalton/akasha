"use client"

import { ButtonBadge } from "@shared/design-badges/components/button-badge"
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from "@shared/design-primitives/components/alert-dialog"
import { useState } from "react"

export function ResetBadge({
  title,
  description,
  onReset,
}: {
  title: string
  description: string
  onReset: () => void
}) {
  const [open, setOpen] = useState(false)

  return (
    <AlertDialog open={open} onOpenChange={setOpen}>
      <ButtonBadge
        variant="elevation-muted"
        className="active:opacity-70"
        onClick={(e) => {
          e.stopPropagation()
          setOpen(true)
        }}
      >
        Reset
      </ButtonBadge>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>{title}</AlertDialogTitle>
          <AlertDialogDescription>{description}</AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogAction variant="destructive" onClick={onReset}>
            Reset
          </AlertDialogAction>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}
