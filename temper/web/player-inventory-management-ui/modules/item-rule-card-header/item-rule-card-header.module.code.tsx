import { Badge } from "akasha/design/interface/badge/modules/badge/badge.module.code.tsx"
import { InlineEditableText } from "akasha/design/interface/form/modules/inline-editable-text/inline-editable-text.module.code.tsx"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "akasha/design/interface/primitive/modules/dropdown-menu/dropdown-menu.module.code.tsx"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "akasha/design/interface/primitive/modules/select-control/select-control.module.code.tsx"
import { Text } from "akasha/design/interface/primitive/modules/text-body/text-body.module.code.tsx"
import { titleIn } from "akasha/temper/items/core/modules/keyed-titles/keyed-titles.module.code.ts"
import {
  goalIdToValue,
  goalValueToId,
  inventoryRuleGoals,
} from "akasha/temper/items/rules/core/modules/inventory-rule-goals/inventory-rule-goals.module.code.ts"
import type { ItemRule } from "akasha/temper/items/rules/core/modules/inventory-rule-types/inventory-rule-types.module.code.ts"
import { useRuleCardPhrases } from "akasha/temper/web/player-inventory-management-ui/modules/rule-card-phrase/rule-card-phrase.module.code.tsx"
import {
  goalTitleIn,
  useRuleGoalTitles,
} from "akasha/temper/web/player-inventory-management-ui/modules/use-rule-goal-titles/use-rule-goal-titles.module.code.tsx"
import { addNotes } from "akasha/temper/web/player-inventory-management-ui/temper-rule-card-phrase/pages/add-notes.temper-rule-card-phrase.ts"
import { addTitle } from "akasha/temper/web/player-inventory-management-ui/temper-rule-card-phrase/pages/add-title.temper-rule-card-phrase.ts"
import { deleteRule } from "akasha/temper/web/player-inventory-management-ui/temper-rule-card-phrase/pages/delete-rule.temper-rule-card-phrase.ts"
import { duplicateRule } from "akasha/temper/web/player-inventory-management-ui/temper-rule-card-phrase/pages/duplicate-rule.temper-rule-card-phrase.ts"
import { editNotes } from "akasha/temper/web/player-inventory-management-ui/temper-rule-card-phrase/pages/edit-notes.temper-rule-card-phrase.ts"
import { noGoal } from "akasha/temper/web/player-inventory-management-ui/temper-rule-card-phrase/pages/no-goal.temper-rule-card-phrase.ts"
import { ruleActions } from "akasha/temper/web/player-inventory-management-ui/temper-rule-card-phrase/pages/rule-actions.temper-rule-card-phrase.ts"
import { EllipsisVertical, Info } from "lucide-react"

interface ItemRuleCardHeaderProps {
  rule: ItemRule
  isLocked: boolean
  onTitleChange: (title: string | null) => void
  onGoalChange: (goal: ItemRule["goal"]) => void
  onDuplicate: (ruleId: string) => void
  onOpenNotes: () => void
  onOpenDelete: () => void
}

export function ItemRuleCardHeader({
  rule,
  isLocked,
  onTitleChange,
  onGoalChange,
  onDuplicate,
  onOpenNotes,
  onOpenDelete,
}: ItemRuleCardHeaderProps) {
  const phrases = useRuleCardPhrases()
  const goals = useRuleGoalTitles()
  const notesTitle = titleIn(phrases, rule.notes != null ? editNotes.key : addNotes.key)
  return (
    <>
      <div className="flex items-center gap-1.5">
        {isLocked ? (
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
            onChange={(v) => onTitleChange(v.trim().length === 0 ? null : v.trim())}
            placeholder={titleIn(phrases, addTitle.key)}
            className="min-w-0 flex-1 font-medium text-primary text-sm"
          />
        )}
        <button
          type="button"
          className="inline-flex h-5 w-5 shrink-0 cursor-pointer items-center justify-center rounded transition-colors hover:bg-primary/8"
          onClick={onOpenNotes}
          title={notesTitle}
          aria-label={notesTitle}
        >
          <Info
            className={`h-3.5 w-3.5 ${rule.notes != null ? "text-secondary" : "text-tertiary"}`}
          />
        </button>
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
            <DropdownMenuItem onClick={() => onDuplicate(rule.id)}>
              {titleIn(phrases, duplicateRule.key)}
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem variant="destructive" disabled={isLocked} onClick={onOpenDelete}>
              {titleIn(phrases, deleteRule.key)}
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
      <div className="flex items-center gap-1.5">
        <Text variant="description" className="font-medium text-primary">
          {rule.itemName}
        </Text>
        <Select
          value={goalValueToId(rule.goal)}
          onValueChange={(val) => onGoalChange(goalIdToValue(val))}
        >
          <SelectTrigger hideChevron>
            <Badge variant="elevation-muted" className="shrink-0">
              <SelectValue />
            </Badge>
          </SelectTrigger>
          <SelectContent
            nullSentinel={{ value: "none", label: titleIn(phrases, noGoal.key) }}
            sorted
          >
            {inventoryRuleGoals.list
              .filter((g) => g.id !== "none")
              .map((g) => (
                <SelectItem key={g.id} value={g.id}>
                  {goalTitleIn(goals, g.id)}
                </SelectItem>
              ))}
          </SelectContent>
        </Select>
      </div>
    </>
  )
}
