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
import { shoppingAbandonTripDialogClearList } from "akasha/temper/web/phrase/pages/shopping-abandon-trip-dialog-clear-list.temper-web-phrase.ts"
import { shoppingAbandonTripDialogKeepTrip } from "akasha/temper/web/phrase/pages/shopping-abandon-trip-dialog-keep-trip.temper-web-phrase.ts"
import { shoppingAbandonTripDialogSpentMany } from "akasha/temper/web/phrase/pages/shopping-abandon-trip-dialog-spent-many.temper-web-phrase.ts"
import { shoppingAbandonTripDialogSpentOne } from "akasha/temper/web/phrase/pages/shopping-abandon-trip-dialog-spent-one.temper-web-phrase.ts"
import { shoppingAbandonTripDialogTitle } from "akasha/temper/web/phrase/pages/shopping-abandon-trip-dialog-title.temper-web-phrase.ts"
import { goldIn } from "akasha/temper/web/player-economics-ui/modules/companion-gear-pricing-rules/companion-gear-pricing-rules.module.code.ts"

interface ShoppingAbandonTripDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  spentTotal: number
  purchasedCount: number
  onConfirm: () => void
}

export function ShoppingAbandonTripDialog({
  open,
  onOpenChange,
  spentTotal,
  purchasedCount,
  onConfirm,
}: ShoppingAbandonTripDialogProps) {
  const phrase = usePhrase()
  const spent =
    purchasedCount === 1 ? shoppingAbandonTripDialogSpentOne : shoppingAbandonTripDialogSpentMany
  return (
    <AlertDialog open={open} onOpenChange={onOpenChange}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>{phrase(shoppingAbandonTripDialogTitle.slug)}</AlertDialogTitle>
          <AlertDialogDescription>
            {phrase(spent.slug, { gold: goldIn(phrase, spentTotal), count: purchasedCount })}
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>{phrase(shoppingAbandonTripDialogKeepTrip.slug)}</AlertDialogCancel>
          <AlertDialogAction variant="destructive" onClick={onConfirm}>
            {phrase(shoppingAbandonTripDialogClearList.slug)}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}
