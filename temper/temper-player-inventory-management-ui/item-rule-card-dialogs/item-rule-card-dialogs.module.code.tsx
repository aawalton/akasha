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
import type { ItemRule } from "@akasha/temper-items-rules-core/inventory-rule-types"
import { getActionLabel } from "../action-options/action-options.module.code.ts"
import { RuleNotesDialog } from "../rule-notes-dialog/rule-notes-dialog.module.code.tsx"

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
