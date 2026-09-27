"use client"

import { Badge } from "akasha/design/interface/badge/modules/badge/badge.module.code.tsx"
import { ButtonBadge } from "akasha/design/interface/badge/modules/button-badge/button-badge.module.code.tsx"
import { NumberBadge } from "akasha/design/interface/badge/modules/number-badge/number-badge.module.code.tsx"
import { InlineEditableText } from "akasha/design/interface/form/modules/inline-editable-text/inline-editable-text.module.code.tsx"
import { ItemCard } from "akasha/design/interface/pattern/modules/item-card/item-card.module.code.tsx"
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
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "akasha/design/interface/primitive/modules/dropdown-menu/dropdown-menu.module.code.tsx"
import { surfaceClass } from "akasha/design/interface/primitive/modules/surface-class/surface-class.module.code.ts"
import { useSurface } from "akasha/design/interface/primitive/modules/surface-provider/surface-provider.module.code.tsx"
import { Text } from "akasha/design/interface/primitive/modules/text-body/text-body.module.code.tsx"
import { titleIn } from "akasha/temper/items/core/modules/keyed-titles/keyed-titles.module.code.ts"
import type { BuyRule } from "akasha/temper/items/rules/core/modules/buy-rule-types/buy-rule-types.module.code.ts"
import { vendor } from "akasha/temper/items/rules/routing/core/temper-venue/pages/vendor.temper-venue.ts"
import { temperVenue } from "akasha/temper/items/rules/routing/core/temper-venue/temper-venue.page-type.ts"
import { useKeyedTitles } from "akasha/temper/web/modules/use-keyed-titles/use-keyed-titles.module.code.tsx"
import {
  phraseOf,
  useRuleCardPhrases,
} from "akasha/temper/web/player-inventory-management-ui/modules/rule-card-phrase/rule-card-phrase.module.code.tsx"
import { RuleNotesDialog } from "akasha/temper/web/player-inventory-management-ui/modules/rule-notes-dialog/rule-notes-dialog.module.code.tsx"
import { addNotes } from "akasha/temper/web/player-inventory-management-ui/temper-rule-card-phrase/pages/add-notes.temper-rule-card-phrase.ts"
import { addTitle } from "akasha/temper/web/player-inventory-management-ui/temper-rule-card-phrase/pages/add-title.temper-rule-card-phrase.ts"
import { buyRuleSummary } from "akasha/temper/web/player-inventory-management-ui/temper-rule-card-phrase/pages/buy-rule-summary.temper-rule-card-phrase.ts"
import { cancel } from "akasha/temper/web/player-inventory-management-ui/temper-rule-card-phrase/pages/cancel.temper-rule-card-phrase.ts"
import { deleteBuyRuleQuestion } from "akasha/temper/web/player-inventory-management-ui/temper-rule-card-phrase/pages/delete-buy-rule-question.temper-rule-card-phrase.ts"
import { deleteRule } from "akasha/temper/web/player-inventory-management-ui/temper-rule-card-phrase/pages/delete-rule.temper-rule-card-phrase.ts"
import { deleteRuleWarning } from "akasha/temper/web/player-inventory-management-ui/temper-rule-card-phrase/pages/delete-rule-warning.temper-rule-card-phrase.ts"
import { duplicateRule } from "akasha/temper/web/player-inventory-management-ui/temper-rule-card-phrase/pages/duplicate-rule.temper-rule-card-phrase.ts"
import { editNotes } from "akasha/temper/web/player-inventory-management-ui/temper-rule-card-phrase/pages/edit-notes.temper-rule-card-phrase.ts"
import { ruleActions } from "akasha/temper/web/player-inventory-management-ui/temper-rule-card-phrase/pages/rule-actions.temper-rule-card-phrase.ts"
import { EllipsisVertical, Info, ShoppingCart } from "lucide-react"
import { memo, useEffect, useState } from "react"

interface BuyRuleCardProps {
  rule: BuyRule
  onUpdate: (
    ruleId: string,
    patch: Partial<
      Pick<BuyRule, "targetQuantity" | "source" | "active" | "goal" | "title" | "notes">
    >
  ) => void
  onRemove: (ruleId: string) => void
  onDuplicate: (ruleId: string) => void
  onLock: (ruleId: string, locked: boolean) => void
}

export const BuyRuleCard = memo(
  ({ rule, onUpdate, onRemove, onDuplicate, onLock }: BuyRuleCardProps) => {
    const surface = useSurface()
    const phrases = useRuleCardPhrases()
    const venues = useKeyedTitles(temperVenue.slug)
    const sourceTitle = titleIn(venues, vendor.key)
    const notesTitle = titleIn(phrases, rule.notes != null ? editNotes.key : addNotes.key)
    const isActive = rule.active === true
    const activeTitle = titleIn(phrases, isActive ? "rule-active" : "rule-inactive")
    const [optimisticLocked, setOptimisticLocked] = useState(rule.locked === true)
    useEffect(() => {
      setOptimisticLocked(rule.locked === true)
    }, [rule.locked])
    const isLocked = optimisticLocked
    const [notesDialogOpen, setNotesDialogOpen] = useState(false)
    const [deleteDialogOpen, setDeleteDialogOpen] = useState(false)

    return (
      <>
        <ItemCard
          className={isActive ? undefined : "opacity-60"}
          renderContent={() => (
            <div className="flex flex-col gap-1.5">
              <div className="flex items-center gap-1.5">
                {isLocked ? (
                  rule.title != null && rule.title !== "" ? (
                    <span className="min-w-0 flex-1 truncate font-medium text-primary text-sm">
                      {rule.title}
                    </span>
                  ) : (
                    <span className="min-w-0 flex-1" />
                  )
                ) : (
                  <InlineEditableText
                    value={rule.title ?? ""}
                    onChange={(v) =>
                      onUpdate(rule.id, { title: v.trim().length === 0 ? null : v.trim() })
                    }
                    placeholder={titleIn(phrases, addTitle.key)}
                    className="min-w-0 flex-1 font-medium text-primary text-sm"
                  />
                )}
                <button
                  type="button"
                  className="inline-flex h-5 w-5 shrink-0 cursor-pointer items-center justify-center rounded transition-colors hover:bg-primary/8"
                  onClick={() => setNotesDialogOpen(true)}
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
                    <DropdownMenuItem
                      variant="destructive"
                      disabled={isLocked}
                      onClick={() => setDeleteDialogOpen(true)}
                    >
                      {titleIn(phrases, deleteRule.key)}
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
              <div className="flex items-center gap-1.5">
                <Text variant="description" className="font-medium text-primary">
                  {rule.itemName}
                </Text>
              </div>
              <div
                className={isLocked ? "pointer-events-none" : undefined}
                inert={isLocked || undefined}
              >
                <div className="flex flex-wrap items-center gap-1.5">
                  {isLocked ? (
                    <Badge variant={isActive ? "accent" : "elevation-muted"} className="shrink-0">
                      {activeTitle}
                    </Badge>
                  ) : (
                    <ButtonBadge
                      variant={isActive ? "accent" : "elevation-muted"}
                      className="shrink-0"
                      onClick={() => onUpdate(rule.id, { active: !isActive })}
                    >
                      {activeTitle}
                    </ButtonBadge>
                  )}
                  <ButtonBadge
                    variant="elevation-muted"
                    className="shrink-0"
                    onClick={() => {
                      setOptimisticLocked(!isLocked)
                      onLock(rule.id, !isLocked)
                    }}
                  >
                    {titleIn(phrases, isLocked ? "rule-locked" : "rule-unlocked")}
                  </ButtonBadge>
                  {}
                  <Badge variant="elevation-muted" className="shrink-0">
                    <ShoppingCart className="size-3" />
                    {sourceTitle}
                  </Badge>
                  {}
                  <NumberBadge
                    editable
                    value={rule.targetQuantity}
                    min={1}
                    max={99999}
                    onChange={(val) => onUpdate(rule.id, { targetQuantity: val })}
                    variant="accent"
                    className="shrink-0"
                  />
                </div>
              </div>
            </div>
          )}
        />
        <RuleNotesDialog
          open={notesDialogOpen}
          onOpenChange={setNotesDialogOpen}
          notes={rule.notes}
          onSave={(notes) => onUpdate(rule.id, { notes })}
          readOnly={isLocked}
        />
        <AlertDialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>{titleIn(phrases, deleteBuyRuleQuestion.key)}</AlertDialogTitle>
              <AlertDialogDescription asChild>
                <div className="space-y-3 text-secondary text-sm">
                  <div>{titleIn(phrases, deleteRuleWarning.key)}</div>
                  <div className={`rounded-md ${surfaceClass(surface + 1)} px-3 py-2`}>
                    <span className="text-primary text-sm">
                      {phrases === null
                        ? ""
                        : phraseOf(phrases, buyRuleSummary.key, {
                            title:
                              rule.title != null && rule.title !== "" ? rule.title : rule.itemName,
                            quantity: String(rule.targetQuantity),
                            venue: sourceTitle,
                          })}
                    </span>
                  </div>
                </div>
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogAction variant="destructive" onClick={() => onRemove(rule.id)}>
                {titleIn(phrases, deleteRule.key)}
              </AlertDialogAction>
              <AlertDialogCancel>{titleIn(phrases, cancel.key)}</AlertDialogCancel>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </>
    )
  }
)
