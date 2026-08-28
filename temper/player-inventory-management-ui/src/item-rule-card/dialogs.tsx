"use client"

import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from "@shared/design-primitives/components/alert-dialog"
import { useSurface } from "@shared/design-primitives/components/surface-provider"
import { surfaceClass } from "@shared/design-primitives/components/surface-class"
import type { ItemRule } from "@temper/game-items-rules-core/inventory-rule-types"
import { getActionLabel } from "../action-options"
import { RuleNotesDialog } from "../rule-notes-dialog"

interface ItemRuleCardDialogsProps {
  rule: ItemRule
  isLocked: boolean
  notesDialogOpen: boolean
  onNotesDialogOpenChange: (open: boolean) => void
  deleteDialogOpen: boolean
  onDeleteDialogOpenChange: (open: boolean) => void
  onSaveNotes: (notes: string | null) => void
  onRemove: (ruleId: string) => void
}

export function ItemRuleCardDialogs({
  rule,
  isLocked,
  notesDialogOpen,
  onNotesDialogOpenChange,
  deleteDialogOpen,
  onDeleteDialogOpenChange,
  onSaveNotes,
  onRemove,
}: ItemRuleCardDialogsProps) {
  const surface = useSurface()
  return (
    <>
      <RuleNotesDialog
        open={notesDialogOpen}
        onOpenChange={onNotesDialogOpenChange}
        notes={rule.notes}
        onSave={onSaveNotes}
        readOnly={isLocked}
      />
      <AlertDialog open={deleteDialogOpen} onOpenChange={onDeleteDialogOpenChange}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete Rule?</AlertDialogTitle>
            <AlertDialogDescription asChild>
              <div className="space-y-3 text-secondary text-sm">
                <div>This will permanently delete this rule. This action cannot be undone.</div>
                <div className={`rounded-md ${surfaceClass(surface + 1)} px-3 py-2`}>
                  <span className="text-primary text-sm">
                    {rule.title != null && rule.title !== "" ? rule.title : rule.itemName} —{" "}
                    {getActionLabel(rule.action)}
                  </span>
                </div>
              </div>
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogAction variant="destructive" onClick={() => onRemove(rule.id)}>
              Delete
            </AlertDialogAction>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  )
}
