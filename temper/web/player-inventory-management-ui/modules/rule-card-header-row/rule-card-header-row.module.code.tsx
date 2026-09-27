"use client"

import { InlineEditableText } from "akasha/design/interface/form/modules/inline-editable-text/inline-editable-text.module.code.tsx"
import { cn } from "akasha/design/interface/primitive/modules/cn/cn.module.code.ts"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "akasha/design/interface/primitive/modules/dropdown-menu/dropdown-menu.module.code.tsx"
import { titleIn } from "akasha/temper/items/core/modules/keyed-titles/keyed-titles.module.code.ts"
import type { CategoryRule } from "akasha/temper/items/rules/core/modules/inventory-rule-types/inventory-rule-types.module.code.ts"
import { useRuleCardPhrases } from "akasha/temper/web/player-inventory-management-ui/modules/rule-card-phrase/rule-card-phrase.module.code.tsx"
import { addNotes } from "akasha/temper/web/player-inventory-management-ui/temper-rule-card-phrase/pages/add-notes.temper-rule-card-phrase.ts"
import { addTitle } from "akasha/temper/web/player-inventory-management-ui/temper-rule-card-phrase/pages/add-title.temper-rule-card-phrase.ts"
import { collapseRule } from "akasha/temper/web/player-inventory-management-ui/temper-rule-card-phrase/pages/collapse-rule.temper-rule-card-phrase.ts"
import { deleteRule } from "akasha/temper/web/player-inventory-management-ui/temper-rule-card-phrase/pages/delete-rule.temper-rule-card-phrase.ts"
import { duplicateRule } from "akasha/temper/web/player-inventory-management-ui/temper-rule-card-phrase/pages/duplicate-rule.temper-rule-card-phrase.ts"
import { editNotes } from "akasha/temper/web/player-inventory-management-ui/temper-rule-card-phrase/pages/edit-notes.temper-rule-card-phrase.ts"
import { expandRule } from "akasha/temper/web/player-inventory-management-ui/temper-rule-card-phrase/pages/expand-rule.temper-rule-card-phrase.ts"
import { moveDown } from "akasha/temper/web/player-inventory-management-ui/temper-rule-card-phrase/pages/move-down.temper-rule-card-phrase.ts"
import { moveToBottom } from "akasha/temper/web/player-inventory-management-ui/temper-rule-card-phrase/pages/move-to-bottom.temper-rule-card-phrase.ts"
import { moveToTop } from "akasha/temper/web/player-inventory-management-ui/temper-rule-card-phrase/pages/move-to-top.temper-rule-card-phrase.ts"
import { moveUp } from "akasha/temper/web/player-inventory-management-ui/temper-rule-card-phrase/pages/move-up.temper-rule-card-phrase.ts"
import { ruleActions } from "akasha/temper/web/player-inventory-management-ui/temper-rule-card-phrase/pages/rule-actions.temper-rule-card-phrase.ts"
import { viewDescription } from "akasha/temper/web/player-inventory-management-ui/temper-rule-card-phrase/pages/view-description.temper-rule-card-phrase.ts"
import { ChevronDown, EllipsisVertical, Info } from "lucide-react"

interface RuleCardHeaderRowProps {
  rule: CategoryRule
  isControlled: boolean
  isLocked: boolean
  isExpanded: boolean
  isSortActive: boolean
  localIndex: number
  totalRules: number | undefined
  controlledRulesCount: number | undefined
  countInteractive: boolean
  onUpdate?: (ruleId: string, patch: Partial<Pick<CategoryRule, "title">>) => void
  onToggleExpand: (ruleId: string) => void
  onReorder?: (ruleId: string, toIndex: number) => void
  onDuplicate?: (ruleId: string) => void
  openNotesDialog: () => void
  openDeleteDialog: () => void
}

export function RuleCardHeaderRow({
  rule,
  isControlled,
  isLocked,
  isExpanded,
  isSortActive,
  localIndex,
  totalRules,
  controlledRulesCount,
  countInteractive,
  onUpdate,
  onToggleExpand,
  onReorder,
  onDuplicate,
  openNotesDialog,
  openDeleteDialog,
}: RuleCardHeaderRowProps) {
  const lastLocalIndex = (totalRules ?? 0) - 1 - (controlledRulesCount ?? 0)
  const phrases = useRuleCardPhrases()
  const notesTitle = titleIn(
    phrases,
    isControlled ? viewDescription.key : rule.notes != null ? editNotes.key : addNotes.key
  )

  return (
    <div className="flex items-center gap-1.5">
      {isControlled || isLocked ? (
        rule.title != null ? (
          <span className="min-w-0 flex-1 truncate font-medium text-primary text-sm">
            {rule.title}
          </span>
        ) : (
          <span className="min-w-0 flex-1" />
        )
      ) : (
        <InlineEditableText
          value={rule.title ?? ""}
          onChange={(v) => onUpdate?.(rule.id, { title: v.trim().length === 0 ? null : v.trim() })}
          placeholder={titleIn(phrases, addTitle.key)}
          className="min-w-0 flex-1 font-medium text-primary text-sm"
        />
      )}
      {countInteractive && (
        <button
          type="button"
          className="inline-flex h-5 w-5 shrink-0 cursor-pointer items-center justify-center rounded transition-colors hover:bg-primary/8"
          onClick={openNotesDialog}
          title={notesTitle}
          aria-label={notesTitle}
        >
          <Info
            className={`h-3.5 w-3.5 ${isControlled || rule.notes != null ? "text-secondary" : "text-tertiary"}`}
          />
        </button>
      )}
      {countInteractive && !isControlled && (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <button
              type="button"
              className="inline-flex h-5 w-5 shrink-0 cursor-pointer items-center justify-center rounded text-tertiary transition-colors hover:bg-primary/8"
              aria-label={titleIn(phrases, ruleActions.key)}
            >
              <EllipsisVertical className="h-3.5 w-3.5" />
            </button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem
              disabled={isSortActive || localIndex === 0}
              onClick={() => onReorder?.(rule.id, 0)}
            >
              {titleIn(phrases, moveToTop.key)}
            </DropdownMenuItem>
            <DropdownMenuItem
              disabled={isSortActive || localIndex === 0}
              onClick={() => onReorder?.(rule.id, localIndex - 1)}
            >
              {titleIn(phrases, moveUp.key)}
            </DropdownMenuItem>
            <DropdownMenuItem
              disabled={isSortActive || localIndex === lastLocalIndex}
              onClick={() => onReorder?.(rule.id, localIndex + 1)}
            >
              {titleIn(phrases, moveDown.key)}
            </DropdownMenuItem>
            <DropdownMenuItem
              disabled={isSortActive || localIndex === lastLocalIndex}
              onClick={() => onReorder?.(rule.id, lastLocalIndex)}
            >
              {titleIn(phrases, moveToBottom.key)}
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => onDuplicate?.(rule.id)}>
              {titleIn(phrases, duplicateRule.key)}
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem variant="destructive" disabled={isLocked} onClick={openDeleteDialog}>
              {titleIn(phrases, deleteRule.key)}
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      )}
      {countInteractive && (
        <button
          type="button"
          className="inline-flex h-5 w-5 shrink-0 cursor-pointer items-center justify-center rounded text-tertiary transition-colors hover:bg-primary/8"
          onClick={() => onToggleExpand(rule.id)}
          aria-label={titleIn(phrases, isExpanded ? collapseRule.key : expandRule.key)}
        >
          <ChevronDown
            className={cn(
              "h-3.5 w-3.5 transition-transform duration-200",
              isExpanded && "rotate-180"
            )}
          />
        </button>
      )}
      {!countInteractive && (
        <button
          type="button"
          className="inline-flex h-5 w-5 shrink-0 cursor-pointer items-center justify-center rounded transition-colors hover:bg-primary/8"
          onClick={openNotesDialog}
          title={notesTitle}
          aria-label={notesTitle}
        >
          <Info
            className={`h-3.5 w-3.5 ${isControlled || rule.notes != null ? "text-secondary" : "text-tertiary"}`}
          />
        </button>
      )}
    </div>
  )
}
