"use client"

import { cn } from "@akasha/design-primitives/cn"
import {
  Dialog,
  DialogBody,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@akasha/design-primitives/dialog"
import { Heading } from "@akasha/design-primitives/heading"
import { surfaceClass } from "@akasha/design-primitives/surface-class"
import { useSurface } from "@akasha/design-primitives/surface-provider"
import { explainBuff } from "@akasha/temper-characters-stats/buff-or-debuff-explainer"
import type { BuffOrDebuffSource } from "@akasha/temper-formula-framework/buff-or-debuff-source"
import type { EffectSource } from "@akasha/temper-formula-framework/effect-source"

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
              <h3 className="font-semibold text-sm">Provided By</h3>
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
                No skill or potion in this build provides this buff. Some set bonuses grant buffs
                directly, so check your equipped sets.
              </p>
            </div>
          )}
        </DialogBody>
      </DialogContent>
    </Dialog>
  )
}
