"use client"

import { Button } from "akasha/design/interface/primitive/modules/button/button.module.code.tsx"
import { Spinner } from "akasha/design/interface/primitive/modules/spinner/spinner.module.code.tsx"
import { useNewCharacter } from "akasha/temper/web/characters-character-ui/modules/use-characters/use-characters.module.code.ts"
import { usePhrase } from "akasha/temper/web/modules/use-web-phrases/use-web-phrases.module.code.tsx"
import { newCharacterButtonCreating } from "akasha/temper/web/phrase/pages/new-character-button-creating.temper-web-phrase.ts"
import { newCharacterButtonNew } from "akasha/temper/web/phrase/pages/new-character-button-new.temper-web-phrase.ts"
import { Plus } from "lucide-react"

export function NewCharacterButton() {
  const { isCreating, handleCreate } = useNewCharacter()
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
          {phrase(newCharacterButtonCreating.slug)}
        </>
      ) : (
        <>
          <Plus className="h-4 w-4" />
          {phrase(newCharacterButtonNew.slug)}
        </>
      )}
    </Button>
  )
}
