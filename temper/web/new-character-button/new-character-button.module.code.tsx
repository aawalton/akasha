"use client"

import { Button } from "@akasha/design-primitives/button"
import { Spinner } from "@akasha/design-primitives/spinner"
import { usePagesUIRouter } from "@akasha/pages-ui/navigation-context"
import { useUserId } from "@akasha/pages-ui/use-user-id"
import { encodeBuild } from "akasha/temper/build-codec/build-codec/build-codec.module.code.ts"
import { extractCharacterMetadata } from "akasha/temper/build-metadata/build-metadata/build-metadata.module.code.ts"
import { characterUrl } from "akasha/temper/build-support/build-url/build-url.module.code.ts"
import { createNewCharacter } from "akasha/temper/character-build/build-factory/build-factory.module.code.ts"
import { useCharacterLifecycle } from "akasha/temper/characters-character-ui/use-characters/use-characters.module.code.ts"
import { Plus } from "lucide-react"
import { useState } from "react"
import { toast } from "sonner"
import { buildId } from "../../formula-framework/branded-id/branded-id.module.code.ts"

export function NewCharacterButton() {
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
