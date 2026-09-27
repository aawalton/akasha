"use client"

import { PanelCard } from "akasha/design/interface/layout/modules/panel-card/panel-card.module.code.tsx"
import { cn } from "akasha/design/interface/primitive/modules/cn/cn.module.code.ts"
import { Spinner } from "akasha/design/interface/primitive/modules/spinner/spinner.module.code.tsx"
import { Text } from "akasha/design/interface/primitive/modules/text-body/text-body.module.code.tsx"
import { useNewCompanion } from "akasha/temper/web/companions-ui/modules/use-companions/use-companions.module.code.ts"
import { usePhrase } from "akasha/temper/web/modules/use-web-phrases/use-web-phrases.module.code.tsx"
import { newCompanionPanelCardCreate } from "akasha/temper/web/phrase/pages/new-companion-panel-card-create.temper-web-phrase.ts"
import { newCompanionPanelCardCreating } from "akasha/temper/web/phrase/pages/new-companion-panel-card-creating.temper-web-phrase.ts"
import { newCompanionPanelCardInvitation } from "akasha/temper/web/phrase/pages/new-companion-panel-card-invitation.temper-web-phrase.ts"
import { Plus } from "lucide-react"

export function NewCompanionPanelCard() {
  const { isCreating, handleCreate } = useNewCompanion()
  const phrase = usePhrase()

  return (
    <PanelCard
      id="new-companion"
      className={cn(
        "flex h-[232px] cursor-pointer items-center justify-center transition-colors",
        "hover:bg-primary/8",
        isCreating && "cursor-wait opacity-50"
      )}
      onClick={handleCreate}
    >
      <div className="flex flex-col items-center justify-center gap-4">
        <div className="rounded-full bg-accent/[0.15] p-6">
          {isCreating ? (
            <Spinner className="h-8 w-8 text-accent" />
          ) : (
            <Plus className="h-8 w-8 text-accent" />
          )}
        </div>
        <div className="space-y-1 text-center">
          <p className="font-semibold text-lg">
            {phrase(
              isCreating ? newCompanionPanelCardCreating.slug : newCompanionPanelCardCreate.slug
            )}
          </p>
          <Text>{phrase(newCompanionPanelCardInvitation.slug)}</Text>
        </div>
      </div>
    </PanelCard>
  )
}
