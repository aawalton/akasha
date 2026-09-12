"use client"

import { Text } from "akasha/design/interfaces/primitives/text-body/text-body.module.code.tsx"
import type { PricingSourceNoteKind } from "akasha/temper/player-inventory-management-ui/pricing-source/pricing-source.module.code.ts"
import { assertNever } from "akasha/utils/narrow/modules/assert-never/assert-never.module.code.ts"
import type { ReactNode } from "react"

export function PricingSourceNote({ kind }: { kind: PricingSourceNoteKind }): ReactNode {
  switch (kind) {
    case "none":
      return undefined
    case "missing-source":
      return (
        <Text variant="caption">
          Item values are missing — Temper prices items with the Tamriel Trade Centre add-on, which
          was not running during your last sync. Only vendor prices are counted, so your totals are
          far too low.
        </Text>
      )
    case "source-empty":
      return (
        <Text variant="caption">
          Item values are missing — Tamriel Trade Centre was running during your last sync but
          priced none of your items. Its price tables come from the separate Tamriel Trade Centre
          desktop client rather than the add-on itself, so if that has not run, the add-on loads
          with nothing to price from. Until then only vendor prices are counted, and your totals are
          far too low.
        </Text>
      )
    default:
      return assertNever(kind)
  }
}
