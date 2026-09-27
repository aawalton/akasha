"use client"

import { assertNever } from "akasha/code/type/narrowing/modules/assert-never/assert-never.module.code.ts"
import { LayoutLink } from "akasha/design/interface/layout/modules/router-context/router-context.module.code.tsx"
import {
  Empty,
  EmptyContent,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from "akasha/design/interface/pattern/modules/empty/empty.module.code.tsx"
import { Button } from "akasha/design/interface/primitive/modules/button/button.module.code.tsx"
import {
  Card,
  CardContent,
} from "akasha/design/interface/primitive/modules/card/card.module.code.tsx"
import type { PlanEmptyState } from "akasha/temper/web/modules/characters-plan-empty-state/characters-plan-empty-state.module.code.ts"
import {
  type Phrase,
  usePhrase,
  usePhraseDescription,
} from "akasha/temper/web/modules/use-web-phrases/use-web-phrases.module.code.tsx"
import { charactersPlanEmptyCheckSyncStatus } from "akasha/temper/web/phrase/pages/characters-plan-empty-check-sync-status.temper-web-phrase.ts"
import { charactersPlanEmptyNoBuildsMany } from "akasha/temper/web/phrase/pages/characters-plan-empty-no-builds-many.temper-web-phrase.ts"
import { charactersPlanEmptyNoBuildsOne } from "akasha/temper/web/phrase/pages/characters-plan-empty-no-builds-one.temper-web-phrase.ts"
import { charactersPlanEmptyNoBuildsTitle } from "akasha/temper/web/phrase/pages/characters-plan-empty-no-builds-title.temper-web-phrase.ts"
import { charactersPlanEmptyNoCharactersDescription } from "akasha/temper/web/phrase/pages/characters-plan-empty-no-characters-description.temper-web-phrase.ts"
import { charactersPlanEmptyNoCharactersTitle } from "akasha/temper/web/phrase/pages/characters-plan-empty-no-characters-title.temper-web-phrase.ts"
import { charactersPlanEmptyUnconfirmedDescription } from "akasha/temper/web/phrase/pages/characters-plan-empty-unconfirmed-description.temper-web-phrase.ts"
import { charactersPlanEmptyUnconfirmedTitle } from "akasha/temper/web/phrase/pages/characters-plan-empty-unconfirmed-title.temper-web-phrase.ts"
import { Gamepad2, Loader2 } from "lucide-react"

interface CharactersPlanEmptyProps {
  state: PlanEmptyState
}

function planEmptyCopy(
  state: PlanEmptyState,
  phrase: Phrase,
  phraseDescription: Phrase
): { title: string; description: string } {
  switch (state.kind) {
    case "unconfirmed":
      return {
        title: phrase(charactersPlanEmptyUnconfirmedTitle.slug),
        description: phrase(charactersPlanEmptyUnconfirmedDescription.slug),
      }
    case "no-characters":
      return {
        title: phrase(charactersPlanEmptyNoCharactersTitle.slug),
        description: phraseDescription(charactersPlanEmptyNoCharactersDescription.slug),
      }
    case "no-builds": {
      const count = state.importedCharacterCount
      const worded = count === 1 ? charactersPlanEmptyNoBuildsOne : charactersPlanEmptyNoBuildsMany
      return {
        title: phrase(charactersPlanEmptyNoBuildsTitle.slug),
        description: phraseDescription(worded.slug, { count }),
      }
    }
    default:
      return assertNever(state)
  }
}

export function CharactersPlanEmpty({ state }: CharactersPlanEmptyProps) {
  const phrase = usePhrase()
  const phraseDescription = usePhraseDescription()
  const { title, description } = planEmptyCopy(state, phrase, phraseDescription)

  return (
    <Card>
      <CardContent>
        <Empty>
          <EmptyHeader>
            <EmptyMedia variant="icon">
              {state.kind === "unconfirmed" ? <Loader2 /> : <Gamepad2 />}
            </EmptyMedia>
            <EmptyTitle>{title}</EmptyTitle>
            <EmptyDescription>{description}</EmptyDescription>
          </EmptyHeader>
          <EmptyContent>
            <Button variant="secondary" asChild>
              <LayoutLink href="/watcher">
                {phrase(charactersPlanEmptyCheckSyncStatus.slug)}
              </LayoutLink>
            </Button>
          </EmptyContent>
        </Empty>
      </CardContent>
    </Card>
  )
}
