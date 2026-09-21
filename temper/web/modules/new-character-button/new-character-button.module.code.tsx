"use client"

import { Button } from "akasha/design/interface/primitive/modules/button/button.module.code.tsx"
import { Spinner } from "akasha/design/interface/primitive/modules/spinner/spinner.module.code.tsx"
import { useNewCharacter } from "akasha/temper/web/characters-character-ui/modules/use-characters/use-characters.module.code.ts"
import { Plus } from "lucide-react"

export function NewCharacterButton() {
  const { isCreating, handleCreate } = useNewCharacter()

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
