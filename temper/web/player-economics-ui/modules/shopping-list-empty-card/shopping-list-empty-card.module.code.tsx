"use client"

import {
  Empty,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from "akasha/design/interface/pattern/modules/empty/empty.module.code.tsx"
import {
  Card,
  CardContent,
} from "akasha/design/interface/primitive/modules/card/card.module.code.tsx"
import {
  usePhrase,
  usePhraseDescription,
} from "akasha/temper/web/modules/use-web-phrases/use-web-phrases.module.code.tsx"
import { shoppingListEmptyCardEmpty } from "akasha/temper/web/phrase/pages/shopping-list-empty-card-empty.temper-web-phrase.ts"
import { ShoppingCart } from "lucide-react"

export function ShoppingListEmptyCard() {
  const phrase = usePhrase()
  const phraseDescription = usePhraseDescription()
  return (
    <Card>
      <CardContent>
        <Empty>
          <EmptyHeader>
            <EmptyMedia variant="icon">
              <ShoppingCart />
            </EmptyMedia>
            <EmptyTitle>{phrase(shoppingListEmptyCardEmpty.slug)}</EmptyTitle>
            <EmptyDescription>
              {phraseDescription(shoppingListEmptyCardEmpty.slug)}
            </EmptyDescription>
          </EmptyHeader>
        </Empty>
      </CardContent>
    </Card>
  )
}
