"use client"

import { Button } from "@shared/design-primitives/components/button"
import { Card, CardContent } from "@shared/design-primitives/components/card"
import { Empty, EmptyContent, EmptyDescription, EmptyHeader, EmptyMedia, EmptyTitle } from "@shared/design-patterns/components/empty"
import { PackageCheck } from "lucide-react"
import { formatGold } from "./companion-gear-pricing-helpers"

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
