"use client"

import { ButtonBadge } from "akasha/design/interface/badge/modules/button-badge/button-badge.module.code.tsx"
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
import { inventoryResetBadgeCancel } from "akasha/temper/web/phrase/pages/inventory-reset-badge-cancel.temper-web-phrase.ts"
import { inventoryResetBadgeReset } from "akasha/temper/web/phrase/pages/inventory-reset-badge-reset.temper-web-phrase.ts"
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
  const phrase = usePhrase()
  const reset = phrase(inventoryResetBadgeReset.slug)

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
        {reset}
      </ButtonBadge>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>{title}</AlertDialogTitle>
          <AlertDialogDescription>{description}</AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogAction variant="destructive" onClick={onReset}>
            {reset}
          </AlertDialogAction>
          <AlertDialogCancel>{phrase(inventoryResetBadgeCancel.slug)}</AlertDialogCancel>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}
