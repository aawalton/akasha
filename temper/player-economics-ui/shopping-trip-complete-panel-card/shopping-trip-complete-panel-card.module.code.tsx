"use client"

import {
  Empty,
  EmptyContent,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from "akasha/design/interfaces/patterns/empty/empty.module.code.tsx"
import { Button } from "akasha/design/interfaces/primitives/button/button.module.code.tsx"
import { Card, CardContent } from "akasha/design/interfaces/primitives/card/card.module.code.tsx"
import { PackageCheck } from "lucide-react"
import { formatGold } from "../companion-gear-pricing-rules/companion-gear-pricing-rules.module.code.ts"

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
  const itemLabel = purchasedCount === 1 ? "item" : "items"
  const stopLabel = completedLocationCount === 1 ? "stop" : "stops"

  return (
    <Card>
      <CardContent>
        <Empty>
          <EmptyHeader>
            <EmptyMedia variant="icon">
              <PackageCheck />
            </EmptyMedia>
            <EmptyTitle>Trip complete</EmptyTitle>
            <EmptyDescription>
              You spent {formatGold(spentTotal)}g on {purchasedCount} {itemLabel}
              {completedLocationCount > 0 ? ` across ${completedLocationCount} ${stopLabel}` : ""}.
            </EmptyDescription>
          </EmptyHeader>
          <EmptyContent>
            <Button variant="secondary" onClick={onStartOver}>
              Start New List
            </Button>
          </EmptyContent>
        </Empty>
      </CardContent>
    </Card>
  )
}
