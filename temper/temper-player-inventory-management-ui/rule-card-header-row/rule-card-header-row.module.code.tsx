"use client"

import { InlineEditableText } from "@akasha/design-forms/inline-editable-text"
import { cn } from "@akasha/design-primitives/cn"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@akasha/design-primitives/dropdown-menu"
import type { CategoryRule } from "@akasha/temper-items-rules-core/inventory-rule-types"
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
          placeholder="Add a title..."
          className="min-w-0 flex-1 font-medium text-primary text-sm"
        />
      )}
      {countInteractive && (
        <button
          type="button"
          className="inline-flex h-5 w-5 shrink-0 cursor-pointer items-center justify-center rounded transition-colors hover:bg-primary/8"
          onClick={openNotesDialog}
          title={
            isControlled ? "View description" : rule.notes != null ? "Edit notes" : "Add notes"
          }
          aria-label={
            isControlled ? "View description" : rule.notes != null ? "Edit notes" : "Add notes"
          }
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
              aria-label="Rule actions"
            >
              <EllipsisVertical className="h-3.5 w-3.5" />
            </button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem
              disabled={isSortActive || localIndex === 0}
              onClick={() => onReorder?.(rule.id, 0)}
            >
              Move to Top
            </DropdownMenuItem>
            <DropdownMenuItem
              disabled={isSortActive || localIndex === 0}
              onClick={() => onReorder?.(rule.id, localIndex - 1)}
            >
              Move Up
            </DropdownMenuItem>
            <DropdownMenuItem
              disabled={isSortActive || localIndex === lastLocalIndex}
              onClick={() => onReorder?.(rule.id, localIndex + 1)}
            >
              Move Down
            </DropdownMenuItem>
            <DropdownMenuItem
              disabled={isSortActive || localIndex === lastLocalIndex}
              onClick={() => onReorder?.(rule.id, lastLocalIndex)}
            >
              Move to Bottom
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => onDuplicate?.(rule.id)}>Duplicate</DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem variant="destructive" disabled={isLocked} onClick={openDeleteDialog}>
              Delete
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      )}
      {countInteractive && (
        <button
          type="button"
          className="inline-flex h-5 w-5 shrink-0 cursor-pointer items-center justify-center rounded text-tertiary transition-colors hover:bg-primary/8"
          onClick={() => onToggleExpand(rule.id)}
          aria-label={isExpanded ? "Collapse rule" : "Expand rule"}
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
          title={
            isControlled ? "View description" : rule.notes != null ? "Edit notes" : "Add notes"
          }
          aria-label={
            isControlled ? "View description" : rule.notes != null ? "Edit notes" : "Add notes"
          }
        >
          <Info
            className={`h-3.5 w-3.5 ${isControlled || rule.notes != null ? "text-secondary" : "text-tertiary"}`}
          />
        </button>
      )}
    </div>
  )
}
