"use client"

import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from "@shared/design-primitives/components/alert-dialog"
import { useSurface } from "@shared/design-primitives/components/surface-provider"
import { surfaceClass } from "@shared/design-primitives/components/surface-class"
import type { CategoryRule } from "@temper/game-items-rules-core/inventory-rule-types"
import { getActionLabel } from "./action-options"

interface RuleCardDeleteDialogProps {
  rule: CategoryRule
  open: boolean
  onOpenChange: (open: boolean) => void
  path: readonly { id: string; name: string }[]
  onConfirm: () => void
}

export function RuleCardDeleteDialog({
  rule,
  open,
  onOpenChange,
  path,
  onConfirm,
}: RuleCardDeleteDialogProps) {
  const surface = useSurface()

  return (
    <AlertDialog open={open} onOpenChange={onOpenChange}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Delete Rule?</AlertDialogTitle>
          <AlertDialogDescription asChild>
            <div className="space-y-3 text-secondary text-sm">
              <div>This will permanently delete this rule. This action cannot be undone.</div>
              <div className={`rounded-md ${surfaceClass(surface + 1)} px-3 py-2`}>
                <span className="text-primary text-sm">
                  {rule.title != null && rule.title !== ""
                    ? rule.title
                    : path.map((p) => p.name).join(" > ")}{" "}
                  — {getActionLabel(rule.action)}
                </span>
              </div>
            </div>
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogAction variant="destructive" onClick={onConfirm}>
            Delete
          </AlertDialogAction>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}
