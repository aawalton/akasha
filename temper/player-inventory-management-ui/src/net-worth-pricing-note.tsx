"use client"

import { Text } from "@shared/design-primitives/components/text"
import type { ReactNode } from "react"
import { DEFAULT_PRICING_PLATFORM, DEFAULT_PRICING_SERVER } from "./pricing-region"

export function NetWorthPricingNote(): ReactNode {
  return (
    <Text variant="caption">
      Priced currency and Crown-consumable values use {DEFAULT_PRICING_PLATFORM} /{" "}
      {DEFAULT_PRICING_SERVER} market prices. Unpriced ones count as nothing.
    </Text>
  )
}
