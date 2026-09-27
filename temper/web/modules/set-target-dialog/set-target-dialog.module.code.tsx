"use client"

import {
  Dialog,
  DialogBody,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "akasha/design/interface/primitive/modules/dialog/dialog.module.code.tsx"
import { usePhrase } from "akasha/temper/web/modules/use-web-phrases/use-web-phrases.module.code.tsx"
import { setTargetDialogEdited } from "akasha/temper/web/phrase/pages/set-target-dialog-edited.temper-web-phrase.ts"
import { setTargetDialogHasTarget } from "akasha/temper/web/phrase/pages/set-target-dialog-has-target.temper-web-phrase.ts"
import { setTargetDialogNoCharacters } from "akasha/temper/web/phrase/pages/set-target-dialog-no-characters.temper-web-phrase.ts"
import { setTargetDialogNoCompanions } from "akasha/temper/web/phrase/pages/set-target-dialog-no-companions.temper-web-phrase.ts"
import { setTargetDialogNoTarget } from "akasha/temper/web/phrase/pages/set-target-dialog-no-target.temper-web-phrase.ts"
import { setTargetDialogSelectCharacter } from "akasha/temper/web/phrase/pages/set-target-dialog-select-character.temper-web-phrase.ts"
import { setTargetDialogSelectCompanion } from "akasha/temper/web/phrase/pages/set-target-dialog-select-companion.temper-web-phrase.ts"
import { setTargetDialogTitle } from "akasha/temper/web/phrase/pages/set-target-dialog-title.temper-web-phrase.ts"
import { AlertTriangle } from "lucide-react"

const SELECT_PHRASE = {
  character: setTargetDialogSelectCharacter.slug,
  companion: setTargetDialogSelectCompanion.slug,
} as const

const NONE_PHRASE = {
  character: setTargetDialogNoCharacters.slug,
  companion: setTargetDialogNoCompanions.slug,
} as const

export interface SetTargetEntity {
  entityId: string
  name: string
  subtitle: string
  hasTargetBuild: boolean
  targetManuallyEdited: boolean
}

interface SetTargetDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  entities: readonly SetTargetEntity[]
  onSelect: (entity: SetTargetEntity) => void
  buildType: "character" | "companion"
}

export function SetTargetDialog({
  open,
  onOpenChange,
  entities,
  onSelect,
  buildType,
}: SetTargetDialogProps) {
  const phrase = usePhrase()
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>{phrase(setTargetDialogTitle.slug)}</DialogTitle>
          <DialogDescription>{phrase(SELECT_PHRASE[buildType])}</DialogDescription>
        </DialogHeader>
        <DialogBody>
          {entities.length === 0 ? (
            <p className="py-4 text-center text-secondary text-sm">
              {phrase(NONE_PHRASE[buildType])}
            </p>
          ) : (
            <div className="flex flex-col gap-1">
              {entities.map((entity) => (
                <button
                  key={entity.entityId}
                  type="button"
                  className="flex items-center justify-between gap-3 rounded-lg px-3 py-2.5 text-left transition-colors hover:bg-surface-2"
                  onClick={() => onSelect(entity)}
                >
                  <div className="min-w-0">
                    <div className="truncate font-medium text-sm">{entity.name}</div>
                    <div className="truncate text-secondary text-xs">{entity.subtitle}</div>
                  </div>
                  <div className="shrink-0">
                    {entity.hasTargetBuild && entity.targetManuallyEdited ? (
                      <span className="flex items-center gap-1 text-xs text-yellow">
                        <AlertTriangle className="h-3 w-3" />
                        {phrase(setTargetDialogEdited.slug)}
                      </span>
                    ) : entity.hasTargetBuild ? (
                      <span className="text-secondary text-xs">
                        {phrase(setTargetDialogHasTarget.slug)}
                      </span>
                    ) : (
                      <span className="text-tertiary text-xs">
                        {phrase(setTargetDialogNoTarget.slug)}
                      </span>
                    )}
                  </div>
                </button>
              ))}
            </div>
          )}
        </DialogBody>
      </DialogContent>
    </Dialog>
  )
}
