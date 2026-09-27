"use client"

import {
  Dialog,
  DialogBody,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "akasha/design/interface/primitive/modules/dialog/dialog.module.code.tsx"
import { Text } from "akasha/design/interface/primitive/modules/text-body/text-body.module.code.tsx"
import { titleIn } from "akasha/temper/items/core/modules/keyed-titles/keyed-titles.module.code.ts"
import { useRuleCardPhrases } from "akasha/temper/web/player-inventory-management-ui/modules/rule-card-phrase/rule-card-phrase.module.code.tsx"
import { Lock } from "lucide-react"
import { useState } from "react"

export function FilterLock({ reason }: { reason: string }) {
  const [open, setOpen] = useState(false)
  const phrases = useRuleCardPhrases()
  return (
    <>
      <button
        type="button"
        aria-label={titleIn(phrases, "why-filter-locked")}
        className="-mr-1 cursor-pointer rounded-sm p-0.5 text-current/50 hover:text-current"
        onPointerDown={(e) => e.stopPropagation()}
        onClick={(e) => {
          e.stopPropagation()
          setOpen(true)
        }}
      >
        <Lock className="size-3" />
      </button>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="sm:max-w-sm">
          <DialogHeader>
            <DialogTitle>{titleIn(phrases, "locked-filter")}</DialogTitle>
          </DialogHeader>
          <DialogBody>
            <Text variant="hint">{reason}</Text>
          </DialogBody>
        </DialogContent>
      </Dialog>
    </>
  )
}
