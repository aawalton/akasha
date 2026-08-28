"use client"

import { useAuth } from "@shared/auth/use-auth"
import { Button } from "@shared/design-primitives/components/button"
import { Spinner } from "@shared/design-primitives/components/spinner"
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
      router.push(`${companionUrl(BuildId(id), build.name)}?tab=companion`)
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
