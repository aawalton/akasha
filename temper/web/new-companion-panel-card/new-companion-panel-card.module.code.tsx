"use client"

import { PanelCard } from "akasha/design/interfaces/layout/panel-card/panel-card.module.code.tsx"
import { cn } from "akasha/design/interfaces/primitives/cn/cn.module.code.ts"
import { Spinner } from "akasha/design/interfaces/primitives/spinner/spinner.module.code.tsx"
import { Text } from "akasha/design/interfaces/primitives/text-body/text-body.module.code.tsx"
import { useNewCompanion } from "akasha/temper/companions-ui/use-companions/use-companions.module.code.ts"
import { Plus } from "lucide-react"

export function NewCompanionPanelCard() {
  const { isCreating, handleCreate } = useNewCompanion()

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
            {isCreating ? "Creating Build..." : "Create New Build"}
          </p>
          <Text>Optimize your companion&apos;s gear and skills.</Text>
        </div>
      </div>
    </PanelCard>
  )
}
