"use client"

import { Button } from "akasha/design/interface/primitive/modules/button/button.module.code.tsx"
import { Spinner } from "akasha/design/interface/primitive/modules/spinner/spinner.module.code.tsx"
import { useNewCompanion } from "akasha/temper/web/companions-ui/modules/use-companions/use-companions.module.code.ts"
import { usePhrase } from "akasha/temper/web/modules/use-web-phrases/use-web-phrases.module.code.tsx"
import { newCompanionButtonCreating } from "akasha/temper/web/phrase/pages/new-companion-button-creating.temper-web-phrase.ts"
import { newCompanionButtonNew } from "akasha/temper/web/phrase/pages/new-companion-button-new.temper-web-phrase.ts"
import { Plus } from "lucide-react"

export function NewCompanionButton() {
  const { isCreating, handleCreate } = useNewCompanion()
  const phrase = usePhrase()

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
          {phrase(newCompanionButtonCreating.slug)}
        </>
      ) : (
        <>
          <Plus className="h-4 w-4" />
          {phrase(newCompanionButtonNew.slug)}
        </>
      )}
    </Button>
  )
}
