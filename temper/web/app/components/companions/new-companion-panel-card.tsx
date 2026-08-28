"use client"

import { useAuth } from "@shared/auth/use-auth"
import { PanelCard } from "@shared/design-layout/components/panel-card"
import { Spinner } from "@shared/design-primitives/components/spinner"
import { Text } from "@shared/design-primitives/components/text"
import { cn } from "@shared/design-primitives/utils/cn"
import { usePagesUIRouter } from "@shared/pages-ui/router-context"
import { extractCompanionMetadata } from "@temper/game-characters/build-metadata"
import { encodeCompanion } from "@temper/game-codec/companions/companion-codec"
import { createNewCompanion } from "@temper/game-companions-core/companion-factory"
import { useCompanionLifecycle } from "@temper/game-companions-ui/use-companions"
import { companionUrl } from "@temper/shared-engine/utils/slug"
import { BuildId } from "@temper/shared-formula-framework/branded"
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
      router.push(`${companionUrl(BuildId(id), build.name)}?tab=companion`)
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
