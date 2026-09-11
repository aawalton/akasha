"use client"

import { Button } from "akasha/design/interfaces/primitives/button/button.module.code.tsx"
import { Spinner } from "akasha/design/interfaces/primitives/spinner/spinner.module.code.tsx"
import { useNewCompanion } from "akasha/temper/companions-ui/use-companions/use-companions.module.code.ts"
import { Plus } from "lucide-react"

export function NewCompanionButton() {
  const { isCreating, handleCreate } = useNewCompanion()

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
