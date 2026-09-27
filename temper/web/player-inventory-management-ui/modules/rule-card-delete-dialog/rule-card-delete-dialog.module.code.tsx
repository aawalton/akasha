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
import { titleIn } from "akasha/temper/items/core/modules/keyed-titles/keyed-titles.module.code.ts"
import type { CategoryRule } from "akasha/temper/items/rules/core/modules/inventory-rule-types/inventory-rule-types.module.code.ts"
import { getActionLabel } from "akasha/temper/web/player-inventory-management-ui/modules/action-options/action-options.module.code.ts"
import {
  phraseOf,
  useRuleCardPhrases,
} from "akasha/temper/web/player-inventory-management-ui/modules/rule-card-phrase/rule-card-phrase.module.code.tsx"
import { cancel } from "akasha/temper/web/player-inventory-management-ui/temper-rule-card-phrase/pages/cancel.temper-rule-card-phrase.ts"
import { deleteRule } from "akasha/temper/web/player-inventory-management-ui/temper-rule-card-phrase/pages/delete-rule.temper-rule-card-phrase.ts"
import { deleteRuleQuestion } from "akasha/temper/web/player-inventory-management-ui/temper-rule-card-phrase/pages/delete-rule-question.temper-rule-card-phrase.ts"
import { deleteRuleWarning } from "akasha/temper/web/player-inventory-management-ui/temper-rule-card-phrase/pages/delete-rule-warning.temper-rule-card-phrase.ts"
import { ruleSummary } from "akasha/temper/web/player-inventory-management-ui/temper-rule-card-phrase/pages/rule-summary.temper-rule-card-phrase.ts"

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
  const phrases = useRuleCardPhrases()
  const summary =
    phrases === null
      ? ""
      : phraseOf(phrases, ruleSummary.key, {
          title:
            rule.title != null && rule.title !== ""
              ? rule.title
              : path.map((p) => p.name).join(" > "),
          action: getActionLabel(rule.action),
        })

  return (
    <AlertDialog open={open} onOpenChange={onOpenChange}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>{titleIn(phrases, deleteRuleQuestion.key)}</AlertDialogTitle>
          <AlertDialogDescription asChild>
            <div className="space-y-3 text-secondary text-sm">
              <div>{titleIn(phrases, deleteRuleWarning.key)}</div>
              <div className={`rounded-md ${surfaceClass(surface + 1)} px-3 py-2`}>
                <span className="text-primary text-sm">{summary}</span>
              </div>
            </div>
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogAction variant="destructive" onClick={onConfirm}>
            {titleIn(phrases, deleteRule.key)}
          </AlertDialogAction>
          <AlertDialogCancel>{titleIn(phrases, cancel.key)}</AlertDialogCancel>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}
