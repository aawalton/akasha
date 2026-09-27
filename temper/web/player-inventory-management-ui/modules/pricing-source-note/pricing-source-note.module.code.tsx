"use client"

import { assertNever } from "akasha/code/type/narrowing/modules/assert-never/assert-never.module.code.ts"
import { Text } from "akasha/design/interface/primitive/modules/text-body/text-body.module.code.tsx"
import { usePhraseDescription } from "akasha/temper/web/modules/use-web-phrases/use-web-phrases.module.code.tsx"
import { pricingSourceNoteMissingSource } from "akasha/temper/web/phrase/pages/pricing-source-note-missing-source.temper-web-phrase.ts"
import { pricingSourceNoteSourceEmpty } from "akasha/temper/web/phrase/pages/pricing-source-note-source-empty.temper-web-phrase.ts"
import type { PricingSourceNoteKind } from "akasha/temper/web/player-inventory-management-ui/modules/pricing-source/pricing-source.module.code.ts"
import type { ReactNode } from "react"

export function PricingSourceNote({ kind }: { kind: PricingSourceNoteKind }): ReactNode {
  const phraseDescription = usePhraseDescription()
  switch (kind) {
    case "none":
      return undefined
    case "missing-source":
      return <Text variant="caption">{phraseDescription(pricingSourceNoteMissingSource.slug)}</Text>
    case "source-empty":
      return <Text variant="caption">{phraseDescription(pricingSourceNoteSourceEmpty.slug)}</Text>
    default:
      return assertNever(kind)
  }
}
