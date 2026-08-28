"use client"

import { useAuth } from "@shared/auth/use-auth"
import { PanelCard } from "@shared/design-layout/components/panel-card"
import { Spinner } from "@shared/design-primitives/components/spinner"
import { Text } from "@shared/design-primitives/components/text"
import { cn } from "@shared/design-primitives/utils/cn"
import { usePagesUIRouter } from "@shared/pages-ui/router-context"
import { extractCharacterMetadata } from "@temper/game-characters/build-metadata"
import { createNewCharacter } from "@temper/game-characters-character/build-factory"
import { useCharacterLifecycle } from "@temper/game-characters-character-ui/use-characters"
import { encodeBuild } from "@temper/game-codec/character/build-codec"
import { characterUrl } from "@temper/shared-engine/utils/slug"
import { BuildId } from "@temper/shared-formula-framework/branded"
import { Plus } from "lucide-react"
import { useState } from "react"
import { toast } from "sonner"

export function NewCharacterPanelCard() {
  const [isCreating, setIsCreating] = useState(false)
  const router = usePagesUIRouter()
  const { userId } = useAuth()
  const { createNew } = useCharacterLifecycle()

  const handleCreate = async () => {
    if (userId == null) return
    setIsCreating(true)
    try {
      const build = createNewCharacter()
      const buildHash = encodeBuild(build)
      const buildMetadata = extractCharacterMetadata(build)
      const id = crypto.randomUUID()
      await createNew({ id, userId, buildHash, buildMetadata })
      router.push(`${characterUrl(BuildId(id), build.name)}?tab=character`)
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Failed to create build")
      setIsCreating(false)
    }
  }

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
