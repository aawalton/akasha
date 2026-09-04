"use client"

import { PANEL_CARD_WIDTH_CLASSES } from "@akasha/design-layout/panel-card-data"
import {
  Card,
  CardAction,
  CardContent,
  CardHeader,
  CardTitle,
} from "@akasha/design-primitives/card"
import { cn } from "@akasha/design-primitives/cn"
import { Skeleton } from "@akasha/design-primitives/skeleton"
import { ChevronDown } from "lucide-react"

interface PanelCardSkeletonProps {
  collapsible?: boolean
  rows?: number
  className?: string
  title?: string
}

export function PanelCardSkeleton({
  collapsible = false,
  rows = 3,
  className,
  title,
}: PanelCardSkeletonProps) {
  return (
    <Card className={cn(PANEL_CARD_WIDTH_CLASSES, className)}>
      <CardHeader>
        <CardTitle className="text-lg">
          {title != null ? (
            <span className="text-tertiary">{title}</span>
          ) : (
            <Skeleton className="h-5 w-32" />
          )}
        </CardTitle>
        {collapsible && (
          <CardAction className="flex items-center gap-2 self-center">
            <ChevronDown className="h-4 w-4 text-tertiary" />
          </CardAction>
        )}
      </CardHeader>
      <CardContent className="space-y-4">
        {Array.from({ length: rows }).map((_, index) => (
          <div key={index} className="space-y-2">
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-3/4" />
          </div>
        ))}
      </CardContent>
    </Card>
  )
}
