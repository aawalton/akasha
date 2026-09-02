"use client"

import { useAuth } from "@shared/auth/use-auth"
import { PanelCard } from "@akasha/design-layout/panel-card"
import { Spinner } from "@akasha/design-primitives/spinner"
import { Text } from "@akasha/design-primitives/text-body"
import { cn } from "@akasha/design-primitives/cn"
import { usePagesUIRouter } from "@akasha/pages-ui/navigation-context"
import { extractCompanionMetadata } from "@temper/game-characters/build-metadata"
import { encodeCompanion } from "@temper/game-codec/companions/companion-codec"
import { createNewCompanion } from "@akasha/temper-companions-core/companion-factory"
import { useCompanionLifecycle } from "@temper/game-companions-ui/use-companions"
import { companionUrl } from "@akasha/temper-build-support/build-url"
import { buildId } from "@akasha/temper-formula-framework/branded-id"
import { Plus } from "lucide-react"
import { useState } from "react"
import { toast } from "sonner"

export function NewCompanionPanelCard() {
  const [isCreating, setIsCreating] = useState(false)
  const router = usePagesUIRouter()
  const { userId } = useAuth()
  const { createNew } = useCompanionLifecycle()

  const handleCreate = async () => {
    if (userId == null) return
    setIsCreating(true)
    try {
      const build = createNewCompanion()
      const buildHash = encodeCompanion(build)
      const buildMetadata = extractCompanionMetadata(build)
      const id = crypto.randomUUID()
      await createNew({ id, userId, buildHash, buildMetadata })
      router.push(`${companionUrl(buildId(id), build.name)}?tab=companion`)
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Failed to create companion")
      setIsCreating(false)
    }
  }

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
