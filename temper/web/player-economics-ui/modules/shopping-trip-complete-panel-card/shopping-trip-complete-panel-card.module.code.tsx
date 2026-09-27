"use client"

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
import { usePhrase } from "akasha/temper/web/modules/use-web-phrases/use-web-phrases.module.code.tsx"
import { shoppingTripCompletePanelCardSpentItem } from "akasha/temper/web/phrase/pages/shopping-trip-complete-panel-card-spent-item.temper-web-phrase.ts"
import { shoppingTripCompletePanelCardSpentItemStop } from "akasha/temper/web/phrase/pages/shopping-trip-complete-panel-card-spent-item-stop.temper-web-phrase.ts"
import { shoppingTripCompletePanelCardSpentItemStops } from "akasha/temper/web/phrase/pages/shopping-trip-complete-panel-card-spent-item-stops.temper-web-phrase.ts"
import { shoppingTripCompletePanelCardSpentItems } from "akasha/temper/web/phrase/pages/shopping-trip-complete-panel-card-spent-items.temper-web-phrase.ts"
import { shoppingTripCompletePanelCardSpentItemsStop } from "akasha/temper/web/phrase/pages/shopping-trip-complete-panel-card-spent-items-stop.temper-web-phrase.ts"
import { shoppingTripCompletePanelCardSpentItemsStops } from "akasha/temper/web/phrase/pages/shopping-trip-complete-panel-card-spent-items-stops.temper-web-phrase.ts"
import { shoppingTripCompletePanelCardStartNewList } from "akasha/temper/web/phrase/pages/shopping-trip-complete-panel-card-start-new-list.temper-web-phrase.ts"
import { shoppingTripCompletePanelCardTitle } from "akasha/temper/web/phrase/pages/shopping-trip-complete-panel-card-title.temper-web-phrase.ts"
import { goldIn } from "akasha/temper/web/player-economics-ui/modules/companion-gear-pricing-rules/companion-gear-pricing-rules.module.code.ts"
import { PackageCheck } from "lucide-react"

const SPENT = {
  item: [
    shoppingTripCompletePanelCardSpentItem,
    shoppingTripCompletePanelCardSpentItemStop,
    shoppingTripCompletePanelCardSpentItemStops,
  ],
  items: [
    shoppingTripCompletePanelCardSpentItems,
    shoppingTripCompletePanelCardSpentItemsStop,
    shoppingTripCompletePanelCardSpentItemsStops,
  ],
} as const

function stopsAt(stops: number): 0 | 1 | 2 {
  if (stops <= 0) return 0
  return stops === 1 ? 1 : 2
}

interface ShoppingTripCompletePanelCardProps {
  spentTotal: number
  purchasedCount: number
  completedLocationCount: number
  onStartOver: () => void
}

export function ShoppingTripCompletePanelCard({
  spentTotal,
  purchasedCount,
  completedLocationCount,
  onStartOver,
}: ShoppingTripCompletePanelCardProps) {
  const phrase = usePhrase()
  const spent = SPENT[purchasedCount === 1 ? "item" : "items"][stopsAt(completedLocationCount)]

  return (
    <Card>
      <CardContent>
        <Empty>
          <EmptyHeader>
            <EmptyMedia variant="icon">
              <PackageCheck />
            </EmptyMedia>
            <EmptyTitle>{phrase(shoppingTripCompletePanelCardTitle.slug)}</EmptyTitle>
            <EmptyDescription>
              {phrase(spent.slug, {
                gold: goldIn(phrase, spentTotal),
                count: purchasedCount,
                stops: completedLocationCount,
              })}
            </EmptyDescription>
          </EmptyHeader>
          <EmptyContent>
            <Button variant="secondary" onClick={onStartOver}>
              {phrase(shoppingTripCompletePanelCardStartNewList.slug)}
            </Button>
          </EmptyContent>
        </Empty>
      </CardContent>
    </Card>
  )
}
