"use client"

import { useAuth } from "@shared/auth/use-auth"
import { Button } from "@akasha/design-primitives/button"
import { Spinner } from "@akasha/design-primitives/spinner"
import { usePagesUIRouter } from "@akasha/pages-ui/navigation-context"
import { extractCompanionMetadata } from "@temper/game-characters/build-metadata"
import { encodeCompanion } from "@temper/game-codec/companions/companion-codec"
import { createNewCompanion } from "@temper/game-companions-core/companion-factory"
import { useCompanionLifecycle } from "@temper/game-companions-ui/use-companions"
import { companionUrl } from "@akasha/temper-build-support/build-url"
import { buildId } from "@akasha/temper-formula-framework/branded-id"
import { Plus } from "lucide-react"
import { useState } from "react"
import { toast } from "sonner"

export function NewCompanionButton() {
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
