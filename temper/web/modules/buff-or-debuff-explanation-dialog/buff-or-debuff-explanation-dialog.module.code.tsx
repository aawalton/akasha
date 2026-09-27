"use client"

import { cn } from "akasha/design/interface/primitive/modules/cn/cn.module.code.ts"
import {
  Dialog,
  DialogBody,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "akasha/design/interface/primitive/modules/dialog/dialog.module.code.tsx"
import { Heading } from "akasha/design/interface/primitive/modules/heading/heading.module.code.tsx"
import { surfaceClass } from "akasha/design/interface/primitive/modules/surface-class/surface-class.module.code.ts"
import { useSurface } from "akasha/design/interface/primitive/modules/surface-provider/surface-provider.module.code.tsx"
import type { BuffOrDebuffSource } from "akasha/temper/player/character/formula-framework/modules/buff-or-debuff-source/buff-or-debuff-source.module.code.ts"
import type { EffectSource } from "akasha/temper/player/character/formula-framework/modules/effect-source/effect-source.module.code.ts"
import { explainBuff } from "akasha/temper/player/character/stat/modules/buff-or-debuff-explainer/buff-or-debuff-explainer.module.code.ts"
import { usePhrase } from "akasha/temper/web/modules/use-web-phrases/use-web-phrases.module.code.tsx"
import { buffOrDebuffExplanationDialogNoSource } from "akasha/temper/web/phrase/pages/buff-or-debuff-explanation-dialog-no-source.temper-web-phrase.ts"
import { buffOrDebuffExplanationDialogProvidedBy } from "akasha/temper/web/phrase/pages/buff-or-debuff-explanation-dialog-provided-by.temper-web-phrase.ts"

interface BuffOrDebuffExplanationDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  buff: BuffOrDebuffSource | null
  sources: readonly EffectSource[]
}

export function BuffOrDebuffExplanationDialog({
  open,
  onOpenChange,
  buff,
  sources,
}: BuffOrDebuffExplanationDialogProps) {
  const surface = useSurface()
  const phrase = usePhrase()

  if (!buff) {
    return null
  }

  const explanation = explainBuff(buff, sources)

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle>{explanation.buffName}</DialogTitle>
          <p className="pt-2 text-secondary text-sm">{explanation.description}</p>
        </DialogHeader>
        <DialogBody className="space-y-4">
          {}
          {explanation.sources.length > 0 && (
            <div className="space-y-2">
              <h3 className="font-semibold text-sm">
                {phrase(buffOrDebuffExplanationDialogProvidedBy.slug)}
              </h3>
              <div className={cn("space-y-2 rounded-md p-3", surfaceClass(surface + 1))}>
                {explanation.sources.map((source, index) => (
                  <div key={index} className="flex items-center justify-between gap-4">
                    <span className="text-sm">{source.sourceName}</span>
                    <Heading variant="label" as="span">
                      {source.sourceType}
                    </Heading>
                  </div>
                ))}
              </div>
            </div>
          )}

          {}
          {explanation.sources.length === 0 && (
            <div className={cn("rounded-md p-4 text-center", surfaceClass(surface + 1))}>
              <p className="text-sm text-tertiary">
                {phrase(buffOrDebuffExplanationDialogNoSource.slug)}
              </p>
            </div>
          )}
        </DialogBody>
      </DialogContent>
    </Dialog>
  )
}
