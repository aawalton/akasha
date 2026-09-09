"use client"

import {
  Dialog,
  DialogBody,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@akasha/design-primitives/dialog"
import { Text } from "@akasha/design-primitives/text-body"
import { Lock } from "lucide-react"
import { useState } from "react"

export function FilterLock({ reason }: { reason: string }) {
  const [open, setOpen] = useState(false)
  return (
    <>
      <button
        type="button"
        aria-label="Why is this filter locked?"
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
            <DialogTitle>Locked Filter</DialogTitle>
          </DialogHeader>
          <DialogBody>
            <Text variant="hint">{reason}</Text>
          </DialogBody>
        </DialogContent>
      </Dialog>
    </>
  )
}
