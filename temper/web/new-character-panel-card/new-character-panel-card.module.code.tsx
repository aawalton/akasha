"use client"

import { PanelCard } from "akasha/design/interfaces/layout/panel-card/panel-card.module.code.tsx"
import { cn } from "akasha/design/interfaces/primitives/cn/cn.module.code.ts"
import { Spinner } from "akasha/design/interfaces/primitives/spinner/spinner.module.code.tsx"
import { Text } from "akasha/design/interfaces/primitives/text-body/text-body.module.code.tsx"
import { usePagesUIRouter } from "akasha/pages/ui/navigation-context/navigation-context.module.code.tsx"
import { useUserId } from "akasha/pages/ui/use-user-id/use-user-id.module.code.tsx"
import { encodeBuild } from "akasha/temper/build-codec/build-codec/build-codec.module.code.ts"
import { extractCharacterMetadata } from "akasha/temper/build-metadata/build-metadata/build-metadata.module.code.ts"
import { characterUrl } from "akasha/temper/build-support/build-url/build-url.module.code.ts"
import { createNewCharacter } from "akasha/temper/character-build/build-factory/build-factory.module.code.ts"
import { useCharacterLifecycle } from "akasha/temper/characters-character-ui/use-characters/use-characters.module.code.ts"
import { Plus } from "lucide-react"
import { useState } from "react"
import { toast } from "sonner"
import { buildId } from "../../formula-framework/branded-id/branded-id.module.code.ts"

export function NewCharacterPanelCard() {
  const [isCreating, setIsCreating] = useState(false)
  const router = usePagesUIRouter()
  const userId = useUserId()
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
      router.push(`${characterUrl(buildId(id), build.name)}?tab=character`)
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
