"use client"

import { PanelCard } from "akasha/design/interfaces/layout/panel-card/panel-card.module.code.tsx"
import { cn } from "akasha/design/interfaces/primitives/modules/cn/cn.module.code.ts"
import { Spinner } from "akasha/design/interfaces/primitives/spinner/spinner.module.code.tsx"
import { Text } from "akasha/design/interfaces/primitives/text-body/text-body.module.code.tsx"
import { useNewCharacter } from "akasha/temper/characters-character-ui/use-characters/use-characters.module.code.ts"
import { Plus } from "lucide-react"

export function NewCharacterPanelCard() {
  const { isCreating, handleCreate } = useNewCharacter()

  return (
    <PanelCard
      id="new-character"
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
            {isCreating ? "Creating Build..." : "Create New Build"}
          </p>
          <Text>Plan your stats and optimize your potential.</Text>
        </div>
      </div>
    </PanelCard>
  )
}
