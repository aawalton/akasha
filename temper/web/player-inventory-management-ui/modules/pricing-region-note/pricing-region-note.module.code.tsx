"use client"

import { assertNever } from "akasha/code/type/narrowing/modules/assert-never/assert-never.module.code.ts"
import { LayoutLink } from "akasha/design/interface/layout/modules/router-context/router-context.module.code.tsx"
import { Text } from "akasha/design/interface/primitive/modules/text-body/text-body.module.code.tsx"
import { usePhrase } from "akasha/temper/web/modules/use-web-phrases/use-web-phrases.module.code.tsx"
import { pricingRegionNoteDefaulted } from "akasha/temper/web/phrase/pages/pricing-region-note-defaulted.temper-web-phrase.ts"
import { pricingRegionNoteNoData } from "akasha/temper/web/phrase/pages/pricing-region-note-no-data.temper-web-phrase.ts"
import { pricingRegionNoteSettings } from "akasha/temper/web/phrase/pages/pricing-region-note-settings.temper-web-phrase.ts"
import {
  DEFAULT_PRICING_PLATFORM,
  DEFAULT_PRICING_SERVER,
  type PricingRegionNoteKind,
} from "akasha/temper/web/player-inventory-management-ui/modules/pricing-region/pricing-region.module.code.ts"
import type { ReactNode } from "react"

export function PricingRegionNote({
  kind,
  platform,
  server,
}: {
  kind: PricingRegionNoteKind
  platform: string
  server: string
}): ReactNode {
  const phrase = usePhrase()
  const settingsLink = (
    <LayoutLink href="/settings" className="text-accent hover:underline">
      {phrase(pricingRegionNoteSettings.slug)}
    </LayoutLink>
  )
  switch (kind) {
    case "none":
      return undefined
    case "defaulted":
      return (
        <Text variant="caption">
          {phrase(pricingRegionNoteDefaulted.slug, { platform, server })} {settingsLink}
        </Text>
      )
    case "no-data":
      return (
        <Text variant="caption">
          {phrase(pricingRegionNoteNoData.slug, {
            platform,
            server,
            defaultPlatform: DEFAULT_PRICING_PLATFORM,
            defaultServer: DEFAULT_PRICING_SERVER,
          })}{" "}
          {settingsLink}
        </Text>
      )
    default:
      return assertNever(kind)
  }
}
