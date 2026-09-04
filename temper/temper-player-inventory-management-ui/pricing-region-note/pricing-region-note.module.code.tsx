"use client"

import { LayoutLink } from "@akasha/design-layout/router-context"
import { Text } from "@akasha/design-primitives/text-body"
import { assertNever } from "@akasha/utils-narrow/assert-never"
import type { ReactNode } from "react"
import {
  DEFAULT_PRICING_PLATFORM,
  DEFAULT_PRICING_SERVER,
  type PricingRegionNoteKind,
} from "../pricing-region/pricing-region.module.code.ts"

export function PricingRegionNote({
  kind,
  platform,
  server,
}: {
  kind: PricingRegionNoteKind
  platform: string
  server: string
}): ReactNode {
  switch (kind) {
    case "none":
      return undefined
    case "defaulted":
      return (
        <Text variant="caption">
          Prices shown for {platform} / {server} — set your platform and server in{" "}
          <LayoutLink href="/settings" className="text-accent hover:underline">
            Settings
          </LayoutLink>
        </Text>
      )
    case "no-data":
      return (
        <Text variant="caption">
          No market prices for {platform} / {server} yet — market data covers{" "}
          {DEFAULT_PRICING_PLATFORM} / {DEFAULT_PRICING_SERVER} only for now. Your region is set in{" "}
          <LayoutLink href="/settings" className="text-accent hover:underline">
            Settings
          </LayoutLink>
        </Text>
      )
    default:
      return assertNever(kind)
  }
}
