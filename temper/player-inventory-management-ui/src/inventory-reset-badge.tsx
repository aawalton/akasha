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
  ButtonBadge,
} from "@shared/design-system"
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
