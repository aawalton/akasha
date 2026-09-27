"use client"

import {
  Dialog,
  DialogBody,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "akasha/design/interface/primitive/modules/dialog/dialog.module.code.tsx"
import { surfaceClass } from "akasha/design/interface/primitive/modules/surface-class/surface-class.module.code.ts"
import { useSurface } from "akasha/design/interface/primitive/modules/surface-provider/surface-provider.module.code.tsx"
import { Textarea } from "akasha/design/interface/primitive/modules/textarea/textarea.module.code.tsx"
import { usePhrase } from "akasha/temper/web/modules/use-web-phrases/use-web-phrases.module.code.tsx"
import { ruleNotesDialogPlaceholder } from "akasha/temper/web/phrase/pages/rule-notes-dialog-placeholder.temper-web-phrase.ts"
import { ruleNotesDialogTitle } from "akasha/temper/web/phrase/pages/rule-notes-dialog-title.temper-web-phrase.ts"
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
  const phrase = usePhrase()
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
          <DialogTitle>{phrase(ruleNotesDialogTitle.slug)}</DialogTitle>
        </DialogHeader>
        <DialogBody>
          <Textarea
            placeholder={phrase(ruleNotesDialogPlaceholder.slug)}
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
