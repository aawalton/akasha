"use client"

import {
  Dialog,
  DialogBody,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@akasha/design-primitives/dialog"
import { surfaceClass } from "@akasha/design-primitives/surface-class"
import { useSurface } from "@akasha/design-primitives/surface-provider"
import { Textarea } from "@akasha/design-primitives/textarea"
import { type ChangeEvent, useEffect, useState } from "react"

interface RuleNotesDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  notes: string | null | undefined
  onSave: (notes: string | null) => void
  readOnly?: boolean
}

export function RuleNotesDialog({
  open,
  onOpenChange,
  notes,
  onSave,
  readOnly,
}: RuleNotesDialogProps) {
  const surface = useSurface()
  const [draft, setDraft] = useState(notes ?? "")

  useEffect(() => {
    if (open) {
      setDraft(notes ?? "")
    }
  }, [open, notes])

  function save() {
    const trimmed = draft.trim()
    const normalized = trimmed.length === 0 ? null : trimmed
    if (normalized !== (notes ?? null)) {
      onSave(normalized)
    }
  }

  return (
    <Dialog
      open={open}
      onOpenChange={(nextOpen) => {
        if (!nextOpen) save()
        onOpenChange(nextOpen)
      }}
    >
      <DialogContent showCloseButton>
        <DialogHeader>
          <DialogTitle>Rule Notes</DialogTitle>
        </DialogHeader>
        <DialogBody>
          <Textarea
            placeholder="Add notes about this rule..."
            value={draft}
            onChange={(e: ChangeEvent<HTMLTextAreaElement>) => setDraft(e.target.value)}
            onBlur={save}
            className={`h-[140px] resize-none ${surfaceClass(surface + 1)} [field-sizing:fixed]`}
            readOnly={readOnly}
          />
        </DialogBody>
      </DialogContent>
    </Dialog>
  )
}
