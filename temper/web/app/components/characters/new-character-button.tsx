"use client"

import { useAuth } from "@shared/auth/use-auth"
import { Button } from "@akasha/design-primitives/button"
import { Spinner } from "@akasha/design-primitives/spinner"
import { usePagesUIRouter } from "@akasha/pages-ui/navigation-context"
import { extractCharacterMetadata } from "@temper/game-characters/build-metadata"
import { createNewCharacter } from "@temper/game-characters-character/build-factory"
import { useCharacterLifecycle } from "@temper/game-characters-character-ui/use-characters"
import { encodeBuild } from "@temper/game-codec/character/build-codec"
import { characterUrl } from "@temper/shared-engine/utils/slug"
import { buildId } from "@akasha/temper-formula-framework/branded-id"
import { Plus } from "lucide-react"
import { useState } from "react"
import { toast } from "sonner"

export function NewCharacterButton() {
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
      router.push(`${characterUrl(buildId(id), build.name)}?tab=character`)
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Failed to create build")
      setIsCreating(false)
    }
  }

  return (
    <Button
      variant="accent"
      onClick={handleCreate}
      disabled={isCreating}
      className={isCreating ? "disabled:cursor-wait" : undefined}
    >
      {isCreating ? (
        <>
          <Spinner />
          Creating...
        </>
      ) : (
        <>
          <Plus className="h-4 w-4" />
          New
        </>
      )}
    </Button>
  )
}
