"use client"

import { Badge } from "akasha/design/interfaces/badges/badge/badge.module.code.tsx"
import { ButtonBadge } from "akasha/design/interfaces/badges/button-badge/button-badge.module.code.tsx"
import { NumberBadge } from "akasha/design/interfaces/badges/number-badge/number-badge.module.code.tsx"
import { InlineEditableText } from "akasha/design/interfaces/forms/inline-editable-text/inline-editable-text.module.code.tsx"
import { ItemCard } from "akasha/design/interfaces/patterns/item-card/item-card.module.code.tsx"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "akasha/design/interfaces/primitives/alert-dialog/alert-dialog.module.code.tsx"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "akasha/design/interfaces/primitives/dropdown-menu/dropdown-menu.module.code.tsx"
import { surfaceClass } from "akasha/design/interfaces/primitives/surface-class/surface-class.module.code.ts"
import { useSurface } from "akasha/design/interfaces/primitives/surface-provider/surface-provider.module.code.tsx"
import { Text } from "akasha/design/interfaces/primitives/text-body/text-body.module.code.tsx"
import type { BuyRule } from "akasha/temper/items-rules-core/buy-rule-types/buy-rule-types.module.code.ts"
import { RuleNotesDialog } from "akasha/temper/player-inventory-management-ui/rule-notes-dialog/rule-notes-dialog.module.code.tsx"
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

const SOURCE_LABEL = "Merchant"

export const BuyRuleCard = memo(
  ({ rule, onUpdate, onRemove, onDuplicate, onLock }: BuyRuleCardProps) => {
    const surface = useSurface()
    const isActive = rule.active === true
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
                    placeholder="Add a title..."
                    className="min-w-0 flex-1 font-medium text-primary text-sm"
                  />
                )}
                <button
                  type="button"
                  className="inline-flex h-5 w-5 shrink-0 cursor-pointer items-center justify-center rounded transition-colors hover:bg-primary/8"
                  onClick={() => setNotesDialogOpen(true)}
                  title={rule.notes != null ? "Edit notes" : "Add notes"}
                  aria-label={rule.notes != null ? "Edit notes" : "Add notes"}
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
                      aria-label="Rule actions"
                    >
                      <EllipsisVertical className="h-3.5 w-3.5" />
                    </button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem onClick={() => onDuplicate(rule.id)}>
                      Duplicate
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem
                      variant="destructive"
                      disabled={isLocked}
                      onClick={() => setDeleteDialogOpen(true)}
                    >
                      Delete
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
                      {isActive ? "Active" : "Inactive"}
                    </Badge>
                  ) : (
                    <ButtonBadge
                      variant={isActive ? "accent" : "elevation-muted"}
                      className="shrink-0"
                      onClick={() => onUpdate(rule.id, { active: !isActive })}
                    >
                      {isActive ? "Active" : "Inactive"}
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
                    {isLocked ? "Locked" : "Unlocked"}
                  </ButtonBadge>
                  {}
                  <Badge variant="elevation-muted" className="shrink-0">
                    <ShoppingCart className="size-3" />
                    {SOURCE_LABEL}
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
              <AlertDialogTitle>Delete Buy Rule?</AlertDialogTitle>
              <AlertDialogDescription asChild>
                <div className="space-y-3 text-secondary text-sm">
                  <div>This will permanently delete this rule. This action cannot be undone.</div>
                  <div className={`rounded-md ${surfaceClass(surface + 1)} px-3 py-2`}>
                    <span className="text-primary text-sm">
                      {rule.title != null && rule.title !== "" ? rule.title : rule.itemName} — Buy{" "}
                      {rule.targetQuantity} at {SOURCE_LABEL}
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
)
